import axios from 'axios'

// API istekleri için ana axios instance'ı
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

// Request interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  
  // Multipart form data için content type'ı kaldır
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type']
  }

  // URL'deki çift api'yi düzelt
  if (config.url && config.url.startsWith('/api/')) {
    config.url = config.url.replace('/api/', '/')
  }
  
  return config
})

// Response interceptor
api.interceptors.response.use(
  response => {
    // Logo ve favicon URL'lerini tam URL'ye çevir
    if (response.data && response.data.logo && typeof response.data.logo === 'string' && !response.data.logo.startsWith('http')) {
      response.data.logo = `http://127.0.0.1:8000${response.data.logo}`
    }
    if (response.data && response.data.favicon && typeof response.data.favicon === 'string' && !response.data.favicon.startsWith('http')) {
      response.data.favicon = `http://127.0.0.1:8000${response.data.favicon}`
    }
    return response
  },
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api 