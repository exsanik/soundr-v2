import os
from spotipy.oauth2 import SpotifyOAuth

SCOPES = [
    'user-read-private',
    'user-read-email',
    'user-read-recently-played',
    'user-top-read',
    'user-read-playback-position',
    'user-read-playback-state',
    'user-read-currently-playing',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-follow-read',
    'user-library-read'
]


async def get_spotipy_oauth():
    spotify_oauth = SpotifyOAuth(
        client_id=os.getenv('CLIENT_ID'),
        client_secret=os.getenv('CLIENT_SECRET'),
        redirect_uri=os.getenv('REDIRECT_URL'),
        scope=" ".join(SCOPES),
        show_dialog=True,
        requests_session=False,
        requests_timeout=None,
        open_browser=False)
    yield spotify_oauth
