from typing import Optional

from pydantic import BaseModel


class TokenData(BaseModel):
    spotify_id: Optional[str] = None
    spotify_expires: Optional[int] = None
