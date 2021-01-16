from typing import List, Tuple
import pandas as pd
import numpy as np

from app.schemas.taste_schemas import TasteDict
from app.utils.logger import logger


class MatchUsers():
    def __init__(self, current_user: TasteDict, db_user: TasteDict):
        self.current_user = current_user
        self.db_user = db_user

    def match_features(self) -> float:
        db_df_track_mean_values = pd.DataFrame.from_dict(
            self.db_user.track_mean_values)
        current_track_mean_values = pd.DataFrame.from_dict(
            self.current_user.track_mean_values)

        percents_diff = db_df_track_mean_values.loc['user'].div(
            current_track_mean_values.loc['user']).mul(100)

        over_hungred_df = percents_diff[percents_diff > 100].sub(100)
        low_hungret_df = percents_diff[percents_diff < 100].sub(100).mul(-1)

        mean_percent = low_hungret_df.append(over_hungred_df).mean()

        return 100 - mean_percent

    def match_artists(self) -> Tuple[List[str], float]:
        db_df_artists = pd.DataFrame.from_dict(self.db_user.artists)
        current_df_artists = pd.DataFrame.from_dict(self.current_user.artists)

        artists_intersection = list(np.intersect1d(
            db_df_artists['name'].values,
            current_df_artists['name'].values))

        return (artists_intersection, len(artists_intersection))

    def match_genres(self) -> Tuple[List[str], float]:
        db_genres = self.db_user.genres
        current_genres = self.current_user.genres

        high_impact_db = dict()
        for (key, value) in db_genres.items():
            if value > 3:
                high_impact_db[key] = value

        high_impact_current = dict()
        for (key, value) in current_genres.items():
            if value > 3:
                high_impact_current[key] = value

        genres_intersection = list(set(
            high_impact_db.keys()).intersection(
            high_impact_current.keys()))

        total_genres = min(
            len(high_impact_db.keys()),
            len(high_impact_current.keys())) or 1

        logger.debug(len(genres_intersection))

        return (genres_intersection, len(genres_intersection) / total_genres * 100)
