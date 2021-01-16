from typing import Optional

from pydantic import BaseModel
from app.models.models import Taste


class UserBase(BaseModel):
    access_token: str
    refresh_token: str
    token_expires: int


class UserCreate(UserBase):
    name: str
    image_url: str
    email: str
    spotify_id: str


class UserUpdate(UserBase):
    name: Optional[str] = None
    image_url: Optional[str] = None
    email: Optional[str] = None
    spotify_id: Optional[str] = None


class User(UserCreate):
    id: int
    is_active: bool

    class Config:
        orm_mode = True
