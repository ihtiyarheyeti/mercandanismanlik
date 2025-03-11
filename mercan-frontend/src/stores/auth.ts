import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
})

const authStore = {
  async login(email, password) {
    try {
      // CSRF token al
      await axios.get(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`)
      
      // Login isteği
      const response = await api.post('/login', {
        email,
        password
      })

      // ... existing code ...
    } catch (error) {
      // ... existing code ...
    }
  }
}

export default authStore 