from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, JSON
from sqlalchemy.orm import relationship

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    spotify_id = Column(String, unique=True, index=True)
    email = Column(String(255), unique=True)
    is_active = Column(Boolean, default=True)
    name = Column(String(255))
    image_url = Column(String)
    refresh_token = Column(String)
    access_token = Column(String)
    token_expires = Column(String)
    taste = relationship("Taste", uselist=False, back_populates="user")

    def update(self, **kwargs):
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)


class Taste(Base):
    __tablename__ = 'tastes'
    id = Column(Integer, primary_key=True)
    user = relationship("User", back_populates="taste")
    user_id = Column(Integer, ForeignKey('users.id'))
    taste = Column(JSON)
