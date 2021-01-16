from sqlalchemy.orm.session import Session
from app.models import models
from app.schemas.taste_schemas import TasteCreate

from app.utils import encrypt
from app.utils.logger import logger


def create_taste(db: Session, taste: TasteCreate):
    db_taste = models.Taste(**taste.dict())

    db.add(db_taste)
    db.commit()
    db.refresh(db_taste)

    return db_taste


def get_taste(db: Session, user_id: int):
    db_taste = db.query(models.Taste) \
        .filter(models.Taste.user_id == user_id) \
        .first()

    return db_taste
