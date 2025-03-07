import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export interface Page {
  id: number
  title: string
  slug: string
  content: string | null
  meta_title: string | null
  meta_description: string | null
  meta_keywords: string | null
  featured_image: string | null
  is_active: boolean
  is_featured: boolean
  order: number
  created_at: string
  updated_at: string
  deleted_at: string | null
}

interface PagesResponse {
  data: Page[]
  total: number
  current_page: number
  per_page: number
}

export const usePagesStore = defineStore('pages', () => {
  const pages = ref<Page[]>([])

  const getPages = async (params: { page?: number; search?: string; status?: string } = {}) => {
    const response = await api.get<PagesResponse>('/admin/pages', { params })
    return response.data
  }

  const getPage = async (id: number) => {
    const response = await api.get<Page>(`/admin/pages/${id}`)
    return response.data
  }

  const createPage = async (data: Partial<Page>) => {
    const response = await api.post<Page>('/admin/pages', data)
    return response.data
  }

  const updatePage = async (id: number, data: Partial<Page>) => {
    const response = await api.put<Page>(`/admin/pages/${id}`, data)
    return response.data
  }

  const deletePage = async (id: number) => {
    await api.delete(`/admin/pages/${id}`)
  }

  const restorePage = async (id: number) => {
    await api.post(`/admin/pages/${id}/restore`)
  }

  const togglePageStatus = async (id: number) => {
    await api.post(`/admin/pages/${id}/toggle-status`)
  }

  const updatePageOrder = async (pageIds: number[]) => {
    await api.post('/admin/pages/reorder', { pageIds })
  }

  return {
    pages,
    getPages,
    getPage,
    createPage,
    updatePage,
    deletePage,
    restorePage,
    togglePageStatus,
    updatePageOrder
  }
}) 