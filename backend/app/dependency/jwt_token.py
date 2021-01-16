import os
from datetime import datetime
from typing import cast

from fastapi import Depends, HTTPException, status, Response
from spotipy.oauth2 import SpotifyOAuth
from sqlalchemy.orm import Session

from jose import JWTError, jwt

from app.utils.jwt_token import ACCESS_TOKEN_EXPIRE_MINUTES, \
    create_access_token, oauth2_scheme, ALGORITHM

from app.schemas.token_schemas import TokenData
from app.schemas.user_schemas import User, UserBase, UserUpdate
from app.dependency.db import get_db
from app.dependency.spotipy import get_spotipy_oauth
from app.models.user_crud import get_user, update_user
from app.utils.logger import logger


def refresh_spotify(refresh_token: str, spotify_oauth: SpotifyOAuth):
    auth_creds = spotify_oauth.refresh_access_token(refresh_token)
    return auth_creds


def get_responce(response: Response):
    return response


async def get_current_user(token: str = Depends(oauth2_scheme),
                           db: Session = Depends(get_db),
                           spotify_oauth: SpotifyOAuth = Depends(get_spotipy_oauth),
                           response: Response = Depends(get_responce)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(
            token, os.getenv('ACCESS_KEY'),
            algorithms=[ALGORITHM])
        payload_id: str = payload.get("spotify_id")

        if payload_id is None:
            raise credentials_exception
        # token_data = TokenData(spotify_id=payload_id)
    except JWTError:
        raise credentials_exception
    user = get_user(db, payload_id)
    if user is None:
        raise credentials_exception
    payload_expires: str = payload.get("spotify_expires")
    is_token_expired = float(
        payload_expires) - datetime.now().timestamp() < 0

    if is_token_expired:
        auth_creds = refresh_spotify(user.refresh_token, spotify_oauth)
        logger.debug("AUTH", auth_creds)
        user_creds = UserBase(access_token=auth_creds["access_token"],
                              refresh_token=auth_creds["refresh_token"],
                              token_expires=auth_creds["expires_at"])
        user = update_user(db, user.spotify_id, cast(UserUpdate, user_creds))
        access_token = create_access_token(
            data=TokenData(
                spotify_id=user.spotify_id,
                spotify_expires=user.token_expires - 600).dict(),
            expires_delta=ACCESS_TOKEN_EXPIRE_MINUTES)

        response.headers['authorization'] = f"Bearer {access_token}"
        response.headers['Access-Control-Expose-Headers'] = 'authorization'

    return user
