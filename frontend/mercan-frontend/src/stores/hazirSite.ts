import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'
import type { HazirSite } from '@/types/hazirSite'

export const useHazirSiteStore = defineStore('hazirSite', () => {
  const hazirSiteler = ref<HazirSite[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getHazirSiteler = computed(() => hazirSiteler.value)

  async function fetchHazirSiteler() {
    try {
      loading.value = true
      error.value = null
      const response = await api.get('/hazir-siteler')
      hazirSiteler.value = response.data
    } catch (err) {
      console.error('Hazır siteler yüklenirken hata:', err)
      error.value = 'Hazır siteler yüklenirken bir hata oluştu'
    } finally {
      loading.value = false
    }
  }

  async function addHazirSite(site: Omit<HazirSite, 'id'>) {
    try {
      loading.value = true
      error.value = null
      const response = await api.post('/hazir-siteler', site)
      hazirSiteler.value.push(response.data)
      return response.data
    } catch (err) {
      console.error('Hazır site eklenirken hata:', err)
      error.value = 'Hazır site eklenirken bir hata oluştu'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateHazirSite(id: number, site: Partial<HazirSite>) {
    try {
      loading.value = true
      error.value = null
      const response = await api.put(`/hazir-siteler/${id}`, site)
      const index = hazirSiteler.value.findIndex(s => s.id === id)
      if (index !== -1) {
        hazirSiteler.value[index] = response.data
      }
      return response.data
    } catch (err) {
      console.error('Hazır site güncellenirken hata:', err)
      error.value = 'Hazır site güncellenirken bir hata oluştu'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteHazirSite(id: number) {
    try {
      loading.value = true
      error.value = null
      await api.delete(`/hazir-siteler/${id}`)
      hazirSiteler.value = hazirSiteler.value.filter(s => s.id !== id)
    } catch (err) {
      console.error('Hazır site silinirken hata:', err)
      error.value = 'Hazır site silinirken bir hata oluştu'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    hazirSiteler,
    loading,
    error,
    getHazirSiteler,
    fetchHazirSiteler,
    addHazirSite,
    updateHazirSite,
    deleteHazirSite
  }
}) 