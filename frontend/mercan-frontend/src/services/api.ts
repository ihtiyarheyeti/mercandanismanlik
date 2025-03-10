import axios from 'axios'

const api = axios.create({
  baseURL: 'https://mercandanismanlik.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

// Response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Hatası:', error.response || error)
    return Promise.reject(error)
  }
)

export default api