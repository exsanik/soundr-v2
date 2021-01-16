export type User = {
  image_url: string
  is_active: boolean
  spotify_id: string
  id: number
  token_expires: number
  refresh_token: string
  name: string
  email?: string
  access_token: string
}
