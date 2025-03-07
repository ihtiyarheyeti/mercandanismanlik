import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export interface Page {
  id: number
  title: string
  slug: string
  content: string
  meta_title: string | null
  meta_description: string | null
  meta_keywords: string | null
  featured_image: string | null
  is_active: boolean
  order: number
  template: 'default' | 'home' | 'full-width' | 'sidebar'
  show_in_menu: boolean
  created_at: string
  updated_at: string
}

export const usePageStore = defineStore('page', () => {
  const pages = ref<Page[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchPages = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await api.get('/pages')
      pages.value = response.data
    } catch (err: any) {
      console.error('Sayfalar yüklenirken hata:', err)
      error.value = err.response?.data?.message || 'Sayfalar yüklenirken bir hata oluştu'
    } finally {
      loading.value = false
    }
  }

  const getPageBySlug = async (slug: string): Promise<Page | null> => {
    try {
      const response = await api.get(`/pages/${slug}`)
      return response.data
    } catch (err: any) {
      console.error('Sayfa yüklenirken hata:', err)
      error.value = err.response?.data?.message || 'Sayfa yüklenirken bir hata oluştu'
      return null
    }
  }

  const createPage = async (pageData: FormData): Promise<Page | null> => {
    loading.value = true
    error.value = null

    try {
      const response = await api.post('/pages', pageData)
      pages.value.push(response.data)
      return response.data
    } catch (err: any) {
      console.error('Sayfa oluşturulurken hata:', err)
      error.value = err.response?.data?.message || 'Sayfa oluşturulurken bir hata oluştu'
      return null
    } finally {
      loading.value = false
    }
  }

  const updatePage = async (id: number, pageData: FormData): Promise<Page | null> => {
    loading.value = true
    error.value = null

    try {
      const response = await api.put(`/pages/${id}`, pageData)
      const index = pages.value.findIndex(p => p.id === id)
      if (index !== -1) {
        pages.value[index] = response.data
      }
      return response.data
    } catch (err: any) {
      console.error('Sayfa güncellenirken hata:', err)
      error.value = err.response?.data?.message || 'Sayfa güncellenirken bir hata oluştu'
      return null
    } finally {
      loading.value = false
    }
  }

  const deletePage = async (id: number): Promise<boolean> => {
    loading.value = true
    error.value = null

    try {
      await api.delete(`/pages/${id}`)
      pages.value = pages.value.filter(p => p.id !== id)
      return true
    } catch (err: any) {
      console.error('Sayfa silinirken hata:', err)
      error.value = err.response?.data?.message || 'Sayfa silinirken bir hata oluştu'
      return false
    } finally {
      loading.value = false
    }
  }

  const updatePagesOrder = async (pagesOrder: { id: number; order: number }[]): Promise<boolean> => {
    loading.value = true
    error.value = null

    try {
      await api.post('/pages/order', { pages: pagesOrder })
      
      // Sıralamayı güncelle
      pagesOrder.forEach(({ id, order }) => {
        const page = pages.value.find(p => p.id === id)
        if (page) {
          page.order = order
        }
      })
      
      // Sayfaları yeni sıralamaya göre sırala
      pages.value.sort((a, b) => a.order - b.order)
      
      return true
    } catch (err: any) {
      console.error('Sayfa sıralaması güncellenirken hata:', err)
      error.value = err.response?.data?.message || 'Sayfa sıralaması güncellenirken bir hata oluştu'
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    pages,
    loading,
    error,
    fetchPages,
    getPageBySlug,
    createPage,
    updatePage,
    deletePage,
    updatePagesOrder
  }
}) 