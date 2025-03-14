import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/user'
import api from '@/services/api'
import axios from 'axios'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const loading = ref(false)
  const error = ref<string | null>(null)
  const router = useRouter()

  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = null

    try {
      // CSRF token al
      await axios.get('https://mercandanismanlik.com/sanctum/csrf-cookie')
      
      // Login isteği
      const response = await api.post('/login', {
        email,
        password
      })

      const { access_token, user: userData } = response.data
      token.value = access_token
      user.value = userData
      localStorage.setItem('token', access_token)

      return true
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Giriş yapılırken bir hata oluştu'
      return false
    } finally {
      loading.value = false
    }
  }

  // ... existing code ...
}) 