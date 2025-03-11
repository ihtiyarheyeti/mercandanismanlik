import axios from 'axios'

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
  config => {
    // URL'yi olduğu gibi kullan
    config.url = config.url?.startsWith('/') ? config.url : '/' + config.url
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Hatası:', {
      config: error.config,
      response: error.response,
      message: error.message
    })
    return Promise.reject(error)
  }
)

export default api