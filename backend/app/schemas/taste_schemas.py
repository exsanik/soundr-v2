from typing import Dict

from pydantic import BaseModel
from app.models.models import User


class TasteBase(BaseModel):
    user_id: int


class TasteDict(BaseModel):
    tracks: Dict
    track_mean_values: Dict
    artists: Dict
    genres: Dict


class TasteCreate(TasteBase):
    taste: TasteDict


class Taste(TasteCreate):
    id: int

    class Config:
        orm_mode = True
