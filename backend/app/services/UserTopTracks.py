from spotipy import Spotify
import pandas as pd


class UserTopTracks:
    def __init__(self, spotify_client: Spotify):
        self.spotify_client = spotify_client
        self.song_df = pd.DataFrame()
        self.meta_df = pd.DataFrame()

    def get_user_top(self):
        results = self.spotify_client.current_user_top_tracks(
            limit=49, offset=0)
        tracks = results['items']
        results = self.spotify_client.current_user_top_tracks(
            limit=50, offset=49)
        tracks = tracks + results['items']

        tids = []
        for i, t in enumerate(tracks):
            tids.append(t['uri'])

        # get features
        features, features_base = [], []
        j, n, step = 0, len(tracks), 30
        while True:
            features_base = self.spotify_client.audio_features(tids[j: j+step])
            features.extend(features_base)
            if(j > n):
                break
            else:
                j += step
        del features[-1]

        self.song_df = pd.DataFrame()
        for i, feature in enumerate(features):
            self.song_df.loc[i,
                             'artist_name'] = tracks[i]['artists'][0]['name']
            self.song_df.loc[i, 'album_name'] = tracks[i]['album']['name']
            self.song_df.loc[i, 'track_name'] = tracks[i]['name']
            self.song_df.loc[i, 'popularity'] = tracks[i]['popularity']
            self.song_df.loc[i, 'album_uri'] = tracks[i]['album']['uri']
            self.song_df.loc[i, 'track_uri'] = tracks[i]['uri']
            self.song_df.loc[i, 'valence'] = feature['valence']
            self.song_df.loc[i, 'danceability'] = feature['danceability']
            self.song_df.loc[i, 'energy'] = feature['energy']
            self.song_df.loc[i, 'speechiness'] = feature['speechiness']
            self.song_df.loc[i, 'acousticness'] = feature['acousticness']
            self.song_df.loc[i, 'liveness'] = feature['liveness']
            self.song_df.loc[i, 'tempo'] = feature['tempo']
            self.song_df.loc[i, 'mode'] = feature['mode']
            self.song_df.loc[i, 'key'] = feature['key']
            self.song_df.loc[i, 'time_signature'] = feature['time_signature']
            self.song_df.loc[i, 'duration'] = feature['duration_ms']
            self.song_df.loc[i, 'analysis_url'] = feature['analysis_url']

        return self.song_df

    def get_mean_values(self, top_traks=None):
        self.df_meta = pd.DataFrame()
        tracks_df = top_traks or self.song_df

        self.df_meta.loc['user',
                         'speechiness'] = tracks_df['speechiness'].mean()
        self.df_meta.loc['user',
                         'danceability'] = tracks_df['danceability'].mean()
        self.df_meta.loc['user', 'energy'] = tracks_df['energy'].mean()

        self.df_meta.loc['user', 'valence'] = tracks_df['valence'].mean()
        self.df_meta.loc['user',
                         'acousticness'] = tracks_df['acousticness'].mean()
        self.df_meta.loc['user', 'liveness'] = tracks_df['liveness'].mean()

        self.df_meta.loc['user',
                         'popularity'] = tracks_df['popularity'].mean()
        self.df_meta.loc['user', 'tempo'] = tracks_df['tempo'].mean()
        self.df_meta.loc['user', 'duration'] = tracks_df['duration'].mean()

        return self.df_meta
