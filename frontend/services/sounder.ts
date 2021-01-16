import Api from './baseApi'

import { User } from '~/interfaces/User'

class Sounder extends Api {
  GET_LOGIN_URL = '/v1/spotify/login'
  getLoginUrl = (): Promise<{ login_url: string }> =>
    this.get(this.GET_LOGIN_URL)

  GET_USER_ME = '/v1/users/me'
  getUserMe = (): Promise<User> => this.get(this.GET_USER_ME)

  GET_USER_LOAD_DATA = '/v1/users/load-data'
  getUserLoadData = () => this.get(this.GET_USER_LOAD_DATA)

  GET_SPOTIFY_ARTIST = '/v1/spotify/artist'
  getSpotifyArtist = (query: any) => {
    return this.get(`${this.GET_SPOTIFY_ARTIST}?query=${query}`)
  }

  POST_SPOTIFY_MATCH = '/v1/spotify/match'
  postSpotifyMatch = (data: any) => {
    return this.post(this.POST_SPOTIFY_MATCH, { data })
  }

  GET_USER_MATCH = '/v1/users/match/'
  getUserMatch = (id: any) => {
    return this.get(`${this.GET_USER_MATCH}${id}`)
  }
}

export default new Sounder({
  baseURL: process.env.SOUNDER_API,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
})
