<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Yönetici Girişi
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">E-posta</label>
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="E-posta adresi"
            >
          </div>
          <div>
            <label for="password" class="sr-only">Şifre</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Şifre"
            >
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {{ loading ? 'Giriş yapılıyor...' : 'Giriş Yap' }}
          </button>
        </div>

        <div v-if="error" class="text-red-600 text-center text-sm mt-2">
          {{ error }}
        </div>

        <!-- Debug Bilgileri -->
        <div v-if="debugInfo" class="mt-4 p-4 bg-black text-green-400 rounded-lg overflow-auto text-xs font-mono" style="max-height: 200px;">
          <pre>{{ debugInfo }}</pre>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const debugInfo = ref('')

const log = (message: string, data?: any) => {
  const timestamp = new Date().toISOString()
  const logMessage = `[${timestamp}] ${message}\n${data ? JSON.stringify(data, null, 2) : ''}\n\n`
  debugInfo.value += logMessage
  console.log(message, data)
}

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  debugInfo.value = ''

  log('Login işlemi başlatılıyor...', { email: email.value })

  try {
    // CSRF token isteği
    log('CSRF token isteği yapılıyor...')
    const csrfResponse = await fetch('https://mercandanismanlik.com/sanctum/csrf-cookie', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })

    log('CSRF response alındı:', {
      status: csrfResponse.status,
      ok: csrfResponse.ok,
      headers: Object.fromEntries(csrfResponse.headers.entries())
    })

    if (!csrfResponse.ok) {
      throw new Error(`CSRF token alınamadı: ${csrfResponse.status} ${csrfResponse.statusText}`)
    }

    // Login isteği
    log('Login isteği yapılıyor...')
    const loginResponse = await fetch('https://mercandanismanlik.com/api/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    const responseData = await loginResponse.json()
    
    log('Login response alındı:', {
      status: loginResponse.status,
      ok: loginResponse.ok,
      headers: Object.fromEntries(loginResponse.headers.entries()),
      data: responseData
    })

    if (!loginResponse.ok) {
      throw new Error(responseData.message || 'Login başarısız')
    }

    if (responseData.access_token) {
      localStorage.setItem('token', responseData.access_token)
      log('Token başarıyla alındı ve kaydedildi')
      await router.push('/admin')
    } else {
      throw new Error('Token alınamadı')
    }

  } catch (err: any) {
    log('Hata oluştu:', {
      message: err.message,
      stack: err.stack
    })
    error.value = err.message || 'Giriş yapılırken bir hata oluştu'
  } finally {
    loading.value = false
  }
}
</script> 