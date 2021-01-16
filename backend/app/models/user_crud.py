import os
import json
from sqlalchemy.orm import Session

from app.models import models
from app.schemas import user_schemas

from app.utils import encrypt
from app.utils.logger import logger


def get_user(db: Session, spotify_id: str):
    user = db.query(models.User) \
        .filter(models.User.spotify_id == spotify_id) \
        .first()
    # if user:
    # access_token = encrypt.decrypt_string(user.access_token)
    # user.access_token = access_token
    return user


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: user_schemas.UserCreate):
    # hashed_access_token = encrypt.encrypt_string(user.access_token)

    db_user = models.User(**user.dict())
    # db_user.access_token = hashed_access_token

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def update_user(db: Session, spotify_id: str, user: user_schemas.UserUpdate):
    # logger.debug("sOs", user.dict())
    # logger.debug("val", user)
    db_user: models.User = db.query(
        models.User).filter(
        models.User.spotify_id == spotify_id).first()
    db_user.update(**user.dict())

    # hashed_access_token = encrypt.encrypt_string(user.access_token)
    # db_user.access_token = hashed_access_token,

    db.commit()
    db.refresh(db_user)

    return db_user
