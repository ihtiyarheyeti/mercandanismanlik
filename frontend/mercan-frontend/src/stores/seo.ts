import { defineStore } from 'pinia'

export const useSeoStore = defineStore('seo', {
  state: () => ({
    title: '',
    description: '',
    keywords: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: ''
  }),

  actions: {
    updateSeoData(data: any) {
      this.title = data.title || ''
      this.description = data.description || ''
      this.keywords = data.keywords || ''
      this.ogTitle = data.ogTitle || ''
      this.ogDescription = data.ogDescription || ''
      this.ogImage = data.ogImage || ''
    }
  }
}) 