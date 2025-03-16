import { defineStore } from 'pinia'

export const useEditModeStore = defineStore('editMode', {
  state: () => ({
    isEditMode: false,
    editableElements: [] as Array<{
      id: string,
      content: string,
      type: 'text' | 'html' | 'image'
    }>
  }),
  
  actions: {
    toggleEditMode() {
      this.isEditMode = !this.isEditMode
    },
    
    updateContent(id: string, content: string) {
      const element = this.editableElements.find(el => el.id === id)
      if (element) {
        element.content = content
      }
    },
    
    async saveChanges() {
      try {
        // API'ye değişiklikleri gönder
        const response = await fetch('/api/content/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            elements: this.editableElements
          })
        })
        
        if (!response.ok) {
          throw new Error('Değişiklikler kaydedilemedi')
        }
        
        return true
      } catch (error) {
        console.error('Kaydetme hatası:', error)
        return false
      }
    }
  }
}) 