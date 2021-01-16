from spotipy import Spotify
import pandas as pd


class UserTopArtists:
    def __init__(self, spotify_client: Spotify):
        self.spotify_client = spotify_client
        self.artists_df = pd.DataFrame()
        self.meta_df = pd.DataFrame()

    def get_user_top(self):
        results = self.spotify_client.current_user_top_artists(
            limit=49, offset=0)
        tracks = results['items']
        results = self.spotify_client.current_user_top_artists(
            limit=50, offset=49)
        tracks = tracks + results['items']

        self.artists_df = pd.DataFrame()
        for i, artist in enumerate(tracks):
            image = artist['images']
            self.artists_df.loc[i, 'name'] = artist['name']
            self.artists_df.loc[i, 'genres'] = ";".join(artist['genres'])
            self.artists_df.loc[i, 'id'] = artist['id']
            self.artists_df.loc[i, 'images'] = image[0]['url'] if len(
                image) > 0 else ''
            self.artists_df.loc[i, 'popularity'] = artist['popularity']
            self.artists_df.loc[i, 'uri'] = artist['uri']
            self.artists_df.loc[i, 'followers'] = artist['followers']['total']

        return self.artists_df

    def get_top_genres(self, top_artists=None):
        top_artists_df = top_artists or self.artists_df
        genres_arr = []

        for genre in top_artists_df['genres']:
            genres_arr.extend(filter(len, genre.split(';')))

        return pd.Series(genres_arr).value_counts()
