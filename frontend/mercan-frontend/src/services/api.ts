import axios from 'axios'

// API istekleri için ana axios instance'ı
const api = axios.create({
  baseURL: 'https://tasgibisin.com.tr',
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

// CSRF token'ı al
const getCsrfToken = async () => {
  try {
    await axios.get('https://tasgibisin.com.tr/sanctum/csrf-cookie', { withCredentials: true })
  } catch (error) {
    console.error('CSRF token alınamadı:', error)
  }
}

// Request interceptor
api.interceptors.request.use(async config => {
  // Her istekten önce CSRF token'ı al
  await getCsrfToken()

  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  
  // Multipart form data için content type'ı kaldır
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type']
  }

  // URL'yi düzenle
  if (config.url && !config.url.startsWith('/api/')) {
    config.url = `/api${config.url}`
  }
  
  return config
})

// Response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api 