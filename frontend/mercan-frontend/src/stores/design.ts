import { defineStore } from 'pinia'
import axios from 'axios'

// Tasarım tipleri
interface MenuDesign {
  logo: string
  menuItems: Array<{
    text: string
    link: string
  }>
  colors: {
    background: string
    text: string
  }
}

interface HeroDesign {
  title: string
  subtitle: string
  description: string
  background: {
    image: string
    overlay: string
  }
  buttons: Array<{
    text: string
    link: string
    color: string
  }>
}

interface FooterDesign {
  company: {
    name: string
    description: string
  }
  contact: {
    email: string
    phone: string
    address: string
  }
  social: Array<{
    platform: string
    link: string
  }>
  colors: {
    background: string
    text: string
  }
}

interface CookieDesign {
  text: string
  acceptButton: string
  rejectButton: string
  colors: {
    background: string
    text: string
    button: string
  }
}

interface HomeDesign {
  header: MenuDesign
  hero: HeroDesign
  footer: FooterDesign
  cookie: CookieDesign
}

interface DesignState {
  homeDesign: any
  servicesDesign: any
}

export const useDesignStore = defineStore('design', {
  state: (): DesignState => ({
    homeDesign: null,
    servicesDesign: null
  }),
  
  actions: {
    async saveHomeDesign(design: any) {
      try {
        const response = await axios.post('/api/admin/design/home', design)
        this.homeDesign = response.data
        return response.data
      } catch (error) {
        throw error
      }
    },
    
    async saveServicesDesign(design: any) {
      try {
        const response = await axios.post('/api/admin/design/services', design)
        this.servicesDesign = response.data
        return response.data
      } catch (error) {
        throw error
      }
    },
    
    async fetchHomeDesign() {
      try {
        const response = await axios.get('/api/admin/design/home')
        this.homeDesign = response.data
        return response.data
      } catch (error) {
        throw error
      }
    },
    
    async fetchServicesDesign() {
      try {
        const response = await axios.get('/api/admin/design/services')
        this.servicesDesign = response.data
        return response.data
      } catch (error) {
        throw error
      }
    }
  }
}) 