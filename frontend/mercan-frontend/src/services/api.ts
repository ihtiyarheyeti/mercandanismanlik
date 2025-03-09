import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'https://mercandanismanlik.com'

// API istekleri için ana axios instance'ı
const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json'
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

// Her istekten önce CSRF token al
api.interceptors.request.use(
  async config => {
    await getCsrfToken()
    return config
  },
  error => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Hatası:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data
    })
    return Promise.reject(error)
  }
)

export default api