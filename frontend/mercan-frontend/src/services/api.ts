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
    throw error
  }
}

// Request interceptor
api.interceptors.request.use(
  async config => {
    try {
      await getCsrfToken() // Her istekten önce CSRF token al
    } catch (error) {
      console.error('CSRF token alınırken hata:', error)
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
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    
    const errorMessage = error.response?.data?.message 
      || error.response?.data?.error 
      || error.message 
      || 'Bir hata oluştu'
      
    console.error('API Yanıt Hatası:', {
      status: error.response?.status,
      message: errorMessage,
      data: error.response?.data
    })

    return Promise.reject({
      ...error,
      message: errorMessage
    })
  }
)

export default api