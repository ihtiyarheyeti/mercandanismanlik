import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'
import type { SSS } from '@/types/sss'

export const useSSSStore = defineStore('sss', () => {
  const sorular = ref<SSS[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getSSS = computed(() => sorular.value)

  async function fetchSSS() {
    try {
      loading.value = true
      error.value = null
      const response = await api.get('/sss')
      sorular.value = response.data
    } catch (err) {
      console.error('SSS yüklenirken hata:', err)
      error.value = 'SSS yüklenirken bir hata oluştu'
    } finally {
      loading.value = false
    }
  }

  async function addSSS(soru: Omit<SSS, 'id'>) {
    try {
      loading.value = true
      error.value = null
      const response = await api.post('/sss', soru)
      sorular.value.push(response.data)
      return response.data
    } catch (err) {
      console.error('SSS eklenirken hata:', err)
      error.value = 'SSS eklenirken bir hata oluştu'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateSSS(id: number, soru: Partial<SSS>) {
    try {
      loading.value = true
      error.value = null
      const response = await api.put(`/sss/${id}`, soru)
      const index = sorular.value.findIndex(s => s.id === id)
      if (index !== -1) {
        sorular.value[index] = response.data
      }
      return response.data
    } catch (err) {
      console.error('SSS güncellenirken hata:', err)
      error.value = 'SSS güncellenirken bir hata oluştu'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteSSS(id: number) {
    try {
      loading.value = true
      error.value = null
      await api.delete(`/sss/${id}`)
      sorular.value = sorular.value.filter(s => s.id !== id)
    } catch (err) {
      console.error('SSS silinirken hata:', err)
      error.value = 'SSS silinirken bir hata oluştu'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    sorular,
    loading,
    error,
    getSSS,
    fetchSSS,
    addSSS,
    updateSSS,
    deleteSSS
  }
}) 