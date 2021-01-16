from fastapi import APIRouter
from fastapi.params import Depends

from spotipy import Spotify
import pandas as pd
from sqlalchemy.orm.session import Session

from app.schemas.user_schemas import User
from app.services.UserTopArtists import UserTopArtists
from app.services.UserTopTracks import UserTopTracks
from app.services.MatchUsers import MatchUsers
from app.utils.logger import logger
from app.dependency.db import get_db
from app.dependency.jwt_token import get_current_user
from app.schemas.taste_schemas import TasteDict, TasteCreate
from app.schemas.taste_schemas import Taste
from app.models.user_crud import get_user
from app.models.tastes_crud import create_taste, get_taste


router = APIRouter()


router = APIRouter(
    prefix="/v1/users",
    tags=["users"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)


@router.get("/me")
async def read_current_user(current_user: User = Depends(get_current_user)):
    return current_user


@router.get("/load-data")
async def read_user_spotify_data(current_user: User = Depends(get_current_user),
                                 db: Session = Depends(get_db)):
    """
        Loads from spotipy api data about current user
    """
    spotify_client = Spotify(auth=current_user.access_token)
    user_top_tracks = UserTopTracks(spotify_client)
    user_top_artists = UserTopArtists(spotify_client)

    top_tracks = user_top_tracks.get_user_top()
    track_mean_values = user_top_tracks.get_mean_values()

    top_artists = user_top_artists.get_user_top()
    top_genres = user_top_artists.get_top_genres()

    spotify_data: TasteDict = {
        "tracks": top_tracks.to_dict(),
        "track_mean_values":  track_mean_values.to_dict(),
        "artists": top_artists.to_dict(),
        "genres": top_genres.to_dict()
    }
    db_taste = create_taste(db, TasteCreate(
        user_id=current_user.id, taste=spotify_data))

    return db_taste


@router.get("/music-data")
async def read_music_data(current_user: User = Depends(get_current_user),
                          db: Session = Depends(get_db)):
    return get_taste(db, current_user.id)


@router.get("/match/{id}")
async def match_user(id: str, current_user: User = Depends(get_current_user),
                     db: Session = Depends(get_db)):
    db_user = get_user(db, id)
    if not db_user:
        return {"message": "Sorry this user not in out database", "match": 0}

    if db_user.id == current_user.id:
        return {"message": "You have perfect match with yourself", "match": 100}

    if not db_user.taste:
        return {"message": "Your friend should update spotify data to app", "match": 0}

    if not current_user.taste:
        return {"message": "Please update your spotify data", "match": 0}

    db_user_tastes = Taste.from_orm(db_user.taste).taste
    current_user_tastes = Taste.from_orm(current_user.taste).taste

    matcher = MatchUsers(current_user_tastes, db_user_tastes)
    features_match = matcher.match_features()
    artists_match = matcher.match_artists()
    genres_match = matcher.match_genres()

    total_match = pd.Series(
        [features_match, artists_match[1], genres_match[1]]).mean()

    return {
        "features_match": features_match,
        "artists_match": artists_match,
        "genres_match": genres_match,
        "match": total_match
    }
