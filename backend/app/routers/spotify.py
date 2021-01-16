import os
from pprint import pformat
from typing import List, cast
from datetime import datetime

from starlette.responses import RedirectResponse
from fastapi import APIRouter
from fastapi.params import Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

import pandas as pd
from spotipy.oauth2 import SpotifyOAuth
from spotipy import Spotify

from app.utils.logger import logger
from app.dependency.spotipy import get_spotipy_oauth
from app.dependency.db import get_db
from app.models import user_crud
from app.schemas.user_schemas import UserCreate, UserUpdate, User
from app.schemas.taste_schemas import Taste
from app.utils.jwt_token import ACCESS_TOKEN_EXPIRE_MINUTES, create_access_token
from app.schemas.token_schemas import TokenData
from app.dependency.jwt_token import get_current_user

router = APIRouter()


router = APIRouter(
    prefix="/v1/spotify",
    tags=["spotify"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)


class LoginUrl(BaseModel):
    login_url: str


@router.get("/login", response_model=LoginUrl)
async def read_login_url(spotipy_oauth: SpotifyOAuth = Depends(get_spotipy_oauth)):
    """
    Get login url for SpotifyApi
    """
    url = spotipy_oauth.get_authorize_url()
    return LoginUrl(login_url=url)


@router.get("/callback")
async def callback_for_spotify(
        code: str,
        spotipy_oauth: SpotifyOAuth = Depends(get_spotipy_oauth),
        db: Session = Depends(get_db)):
    """
    Callback for spotify api
    Redirects to /dashboard on frontend
    Creates user if not exsists
    Returns pait of jwt tokens in cookies
    """
    # auth_creds = requests.post(
    #     'https://accounts.spotify.com/api/token',
    #     data={"grant_type": "authorization_code", "code": code,
    #           "redirect_uri": os.getenv('REDIRECT_URL')},
    #     headers={
    #         "Authorization":
    #             f"Basic YjMyMzcwNDExZTcwNGE1NzkxNDRlNTVmYjY3OTgyY2U6YmMwNzljOTllMjIzNDMxNWJjZjMxY2Y2NzE2ZTI3YmY="}).json()
    auth_creds = spotipy_oauth.get_access_token(code=code, check_cache=False)
    spotify_client = Spotify(
        auth=auth_creds["access_token"])
    spotify_user = spotify_client.me()
    db_user = user_crud.get_user(db, spotify_id=spotify_user['id'])

    UserSchema = UserCreate if not db_user else UserUpdate
    if spotify_user and auth_creds:
        image = spotify_user['images']
        user = UserSchema(
            email=spotify_user['email'],
            name=spotify_user['display_name'],
            image_url=image[0]['url'] if len(image) else '',
            spotify_id=spotify_user['id'],
            access_token=auth_creds['access_token'],
            refresh_token=auth_creds['refresh_token'],
            token_expires=datetime.now().timestamp() +
            float(auth_creds['expires_in']))
        if db_user:
            user_crud.update_user(
                db, spotify_user['id'], cast(UserUpdate, user))
        else:
            user_crud.create_user(db, cast(UserCreate, user))

    frontend_url = os.getenv('FRONTEND_URL')
    if not spotify_user and not auth_creds:
        return RedirectResponse(
            url=f"{frontend_url}", status_code=500)

    access_token = create_access_token(
        data=TokenData(
            spotify_id=spotify_user['id'],
            spotify_expires=user.token_expires - 600).dict(),
        expires_delta=ACCESS_TOKEN_EXPIRE_MINUTES)

    return RedirectResponse(
        url=f"{frontend_url}/token?token={access_token}")


@router.get("/artist")
def search_artist(query: str, user: User = Depends(get_current_user)):
    spotify_client = Spotify(auth=user.access_token)
    resp = spotify_client.search(query, type="artist")

    return resp["artists"]["items"]


class MatchBody(BaseModel):
    type: str
    genres: List[str]
    id: str


@router.post("/match")
def match_user(body: MatchBody,  user: User = Depends(get_current_user)):
    if body.type == 'artist':
        user_taste = Taste.from_orm(user.taste)
        genres_dict = user_taste.taste.genres
        recomend = False
        for genre in body.genres:
            if genre in genres_dict:
                if genres_dict[genre] > 5:
                    recomend = True
                    break

        return {'recomend': recomend, 'id': body.id}
