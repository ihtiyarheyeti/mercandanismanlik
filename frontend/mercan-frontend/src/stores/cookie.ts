import { defineStore } from 'pinia'

export const useCookieStore = defineStore('cookie', {
  state: () => ({
    cookiesAccepted: false,
    preferences: {
      necessary: true,
      analytics: false,
      marketing: false
    }
  }),

  actions: {
    acceptAllCookies() {
      this.cookiesAccepted = true
      this.preferences = {
        necessary: true,
        analytics: true,
        marketing: true
      }
      this.saveCookiePreferences()
    },

    saveCookiePreferences(preferences?: any) {
      if (preferences) {
        this.preferences = {
          ...this.preferences,
          ...preferences
        }
      }
      this.cookiesAccepted = true
      localStorage.setItem('cookiePreferences', JSON.stringify(this.preferences))
      localStorage.setItem('cookiesAccepted', 'true')
    },

    loadCookiePreferences() {
      const savedPreferences = localStorage.getItem('cookiePreferences')
      const cookiesAccepted = localStorage.getItem('cookiesAccepted')
      
      if (savedPreferences) {
        this.preferences = JSON.parse(savedPreferences)
      }
      
      if (cookiesAccepted === 'true') {
        this.cookiesAccepted = true
      }
    }
  }
}) 