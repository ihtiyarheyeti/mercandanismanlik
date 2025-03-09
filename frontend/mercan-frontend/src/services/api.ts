import axios from 'axios'

// API istekleri için ana axios instance'ı
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

// Request interceptor
api.interceptors.request.use(
  async config => {
    console.log('API İsteği:', {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers
    });
    
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  error => {
    console.error('API İstek Hatası:', error);
    return Promise.reject(error);
  }
)

// Response interceptor
api.interceptors.response.use(
  response => {
    console.log('API Yanıtı:', {
      url: response.config.url,
      method: response.config.method,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data
    });
    return response;
  },
  error => {
    console.error('API Yanıt Hatası:', {
      url: error.config?.url,
      method: error.config?.method,
      message: error.message,
      response: {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers
      }
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    
    const errorMessage = error.response?.data?.message 
      || error.response?.data?.error 
      || 'Bir hata oluştu';
      
    return Promise.reject({
      ...error,
      message: errorMessage
    });
  }
)

export default api 