import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

interface Referans {
  id: number
  firmaAdi: string
  logo: string
  aciklama: string
  websitesi?: string
  category_name: string
}

export const useReferansStore = defineStore('referans', () => {
  const referanslar = ref<Referans[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getReferanslar = computed(() => referanslar.value)

  async function fetchReferanslar() {
    try {
      loading.value = true
      error.value = null
      const response = await api.get('/referanslar')
      referanslar.value = response.data
    } catch (err) {
      console.error('Referanslar yüklenirken hata:', err)
      error.value = 'Referanslar yüklenirken bir hata oluştu'
    } finally {
      loading.value = false
    }
  }

  async function addReferans(referans: Omit<Referans, 'id'>) {
    try {
      loading.value = true
      error.value = null
      const response = await api.post('/referanslar', referans)
      referanslar.value.push(response.data)
      return response.data
    } catch (err) {
      console.error('Referans eklenirken hata:', err)
      error.value = 'Referans eklenirken bir hata oluştu'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateReferans(id: number, referans: Partial<Referans>) {
    try {
      loading.value = true
      error.value = null
      const response = await api.put(`/referanslar/${id}`, referans)
      const index = referanslar.value.findIndex(r => r.id === id)
      if (index !== -1) {
        referanslar.value[index] = response.data
      }
      return response.data
    } catch (err) {
      console.error('Referans güncellenirken hata:', err)
      error.value = 'Referans güncellenirken bir hata oluştu'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteReferans(id: number) {
    try {
      loading.value = true
      error.value = null
      await api.delete(`/referanslar/${id}`)
      referanslar.value = referanslar.value.filter(r => r.id !== id)
    } catch (err) {
      console.error('Referans silinirken hata:', err)
      error.value = 'Referans silinirken bir hata oluştu'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    referanslar,
    loading,
    error,
    getReferanslar,
    fetchReferanslar,
    addReferans,
    updateReferans,
    deleteReferans
  }
}) 