import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

declare global {
  interface ImportMeta {
    env: {
      VITE_API_URL: string
    }
  }
}

// API için instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.mercandanismanlik.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

// Request interceptor
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // URL'yi olduğu gibi kullan, /api prefix'i eklemeye gerek yok
    if (config.url) {
      config.url = config.url.startsWith('/') ? config.url : '/' + config.url
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error('API Hatası:', {
      config: error.config,
      response: error.response,
      message: error.message
    })
    return Promise.reject(error)
  }
)

export default api