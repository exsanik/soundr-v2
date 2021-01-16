import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance
} from 'axios'

import { merge } from '~/utils/functions'

import LocalStorageEnum from '~/constants/LocalStorage'

type Handler = (url: string, config?: AxiosRequestConfig) => Promise<any>

type Handlers = {
  get: Handler
  post: Handler
  put: Handler
  patch: Handler
  del: Handler
}

class Api {
  private config: any
  private instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.config = config
    this.instance = axios.create(config)
  }

  update(config: AxiosRequestConfig): void {
    this.instance = axios.create(merge(this.config, config))
  }

  setAuthToken(authToken?: string): void {
    if (authToken) {
      this.instance.defaults.headers.common.Authorization = `Bearer ${authToken}`
      localStorage.setItem(LocalStorageEnum.ACCESS_TOKEN, authToken)
    } else {
      delete this.instance.defaults.headers.common.Authorization
      localStorage.removeItem(LocalStorageEnum.ACCESS_TOKEN)
    }
  }

  /**
   * Set instance default header
   *
   * @param header header name
   * @param value header value
   */
  setHeader(header: string, value: string): void {
    this.instance.defaults.headers.common[header] = value
  }

  appendErrorInterceptor = (interceptor: any): void => {
    this.instance.interceptors.response.use((r: any) => r, interceptor)
  }

  makeRequest(
    method: AxiosRequestConfig['method'],
    url: string,
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse | Error> {
    const headers = { ...this.instance.defaults.headers, ...options.headers }

    return this.instance({
      ...options,
      method,
      url,
      headers
    })
      .then((resp: AxiosResponse) => {
        if (resp.headers['authorization']) {
          const authToken = resp.headers['authorization'].split(' ')?.[1]
          if (authToken) {
            this.setAuthToken(authToken)
          }
        }
        return resp?.data
      })
      .catch(({ response }: AxiosError) => Promise.reject(response?.data))
  }

  get: Handler = (url, config) => this.makeRequest('get', url, config)

  post: Handler = (url, config) => this.makeRequest('post', url, config)

  put: Handler = (url, config) => this.makeRequest('put', url, config)

  patch: Handler = (url, config) => this.makeRequest('patch', url, config)

  del: Handler = (url, config) => this.makeRequest('delete', url, config)

  requestHandlers: Handlers = {
    get: this.get,
    post: this.post,
    put: this.put,
    patch: this.patch,
    del: this.del
  }
}

export default Api
