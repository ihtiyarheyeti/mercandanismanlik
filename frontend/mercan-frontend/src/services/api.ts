import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// API istekleri için ana axios instance'ı
const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

// CSRF token alma fonksiyonu
const getCsrfToken = async () => {
  try {
    await axios.get(`${baseURL}/sanctum/csrf-cookie`, {
      withCredentials: true
    })
  } catch (error) {
    console.error('CSRF token alınamadı:', error)
  }
}

// Request interceptor
api.interceptors.request.use(
  async config => {
    // CSRF token al
    await getCsrfToken()
    
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  error => {
    console.error('API İstek Hatası:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  response => {
    if (response.data?.status === 'error') {
      return Promise.reject({
        response: {
          data: response.data,
          status: 400
        }
      })
    }
    return response
  },
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    
    const errorMessage = error.response?.data?.message 
      || error.response?.data?.error 
      || error.message 
      || 'Bir hata oluştu'
      
    return Promise.reject({
      ...error,
      message: errorMessage
    })
  }
)

export default api 