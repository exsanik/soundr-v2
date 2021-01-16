from typing import Optional
import json
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import requests

from app.routers import spotify, users
from app.utils.logger import logger
from app.models import models
from app.database import engine

models.Base.metadata.create_all(bind=engine)


app = FastAPI(redoc_url=None)

app.include_router(spotify.router)
app.include_router(users.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.getenv('FRONTEND_URL'),
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/hello')
def hello():
    return {'hello': 'sometxt'}
