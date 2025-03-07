import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

const CACHE_KEY = 'site_settings'
const CACHE_DURATION = 5 * 60 * 1000 // 5 dakika

export const useSettingsStore = defineStore('settings', () => {
  const logo = ref<string | null>(null)
  const favicon = ref<string | null>(null)
  const siteTitle = ref('')
  const siteDescription = ref('')
  const contactEmail = ref('')
  const phoneNumber = ref('')
  const address = ref('')
  const workingHoursWeekday = ref('')
  const workingHoursSaturday = ref('')
  const workingHoursSunday = ref('')
  const isOpenSaturday = ref(true)
  const isOpenSunday = ref(false)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const lastFetch = ref<number>(0)

  // SEO Ayarları
  const seoSettings = ref({
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    robotsTxt: '',
    urlStructure: 'plain',
    autoGenerateSitemap: true,
    includeImagesSitemap: true,
    submitToSearchEngines: true
  })

  const loadFromCache = () => {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      const { data, timestamp } = JSON.parse(cached)
      if (Date.now() - timestamp < CACHE_DURATION) {
        Object.assign(logo, { value: data.logo })
        Object.assign(favicon, { value: data.favicon })
        Object.assign(siteTitle, { value: data.siteTitle })
        Object.assign(siteDescription, { value: data.siteDescription })
        Object.assign(contactEmail, { value: data.contactEmail })
        Object.assign(phoneNumber, { value: data.phoneNumber })
        Object.assign(address, { value: data.address })
        Object.assign(workingHoursWeekday, { value: data.workingHoursWeekday })
        Object.assign(workingHoursSaturday, { value: data.workingHoursSaturday })
        Object.assign(workingHoursSunday, { value: data.workingHoursSunday })
        Object.assign(isOpenSaturday, { value: data.isOpenSaturday })
        Object.assign(isOpenSunday, { value: data.isOpenSunday })
        return true
      }
    }
    return false
  }

  const saveToCache = () => {
    const data = {
      logo: logo.value,
      favicon: favicon.value,
      siteTitle: siteTitle.value,
      siteDescription: siteDescription.value,
      contactEmail: contactEmail.value,
      phoneNumber: phoneNumber.value,
      address: address.value,
      workingHoursWeekday: workingHoursWeekday.value,
      workingHoursSaturday: workingHoursSaturday.value,
      workingHoursSunday: workingHoursSunday.value,
      isOpenSaturday: isOpenSaturday.value,
      isOpenSunday: isOpenSunday.value
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data,
      timestamp: Date.now()
    }))
  }

  const fetchSettings = async (force = false) => {
    // Token kontrolü
    if (!localStorage.getItem('token')) return

    // Cache kontrolü
    if (!force && loadFromCache()) {
      return
    }

    // Son yükleme zamanı kontrolü
    if (!force && Date.now() - lastFetch.value < CACHE_DURATION) {
      return
    }

    loading.value = true
    error.value = null

    try {
      const [settingsResponse, seoResponse] = await Promise.all([
        api.get('/admin/settings'),
        api.get('/admin/seo-settings')
      ])

      if (settingsResponse.data) {
        logo.value = settingsResponse.data.logo
        favicon.value = settingsResponse.data.favicon
        siteTitle.value = settingsResponse.data.site_title || ''
        siteDescription.value = settingsResponse.data.site_description || ''
        contactEmail.value = settingsResponse.data.contact_email || ''
        phoneNumber.value = settingsResponse.data.phone_number || ''
        address.value = settingsResponse.data.address || ''
        workingHoursWeekday.value = settingsResponse.data.working_hours_weekday || ''
        workingHoursSaturday.value = settingsResponse.data.working_hours_saturday || ''
        workingHoursSunday.value = settingsResponse.data.working_hours_sunday || ''
        isOpenSaturday.value = settingsResponse.data.is_open_saturday ?? true
        isOpenSunday.value = settingsResponse.data.is_open_sunday ?? false

        // Favicon güncelleme
        if (favicon.value) {
          const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link')
          link.type = 'image/x-icon'
          link.rel = 'shortcut icon'
          link.href = favicon.value
          document.getElementsByTagName('head')[0].appendChild(link)
        }

        // Cache'e kaydet
        saveToCache()
        lastFetch.value = Date.now()
      }

      if (seoResponse.data) {
        seoSettings.value = {
          metaTitle: seoResponse.data.meta_title || '',
          metaDescription: seoResponse.data.meta_description || '',
          metaKeywords: seoResponse.data.meta_keywords || '',
          robotsTxt: seoResponse.data.robots_txt || '',
          urlStructure: seoResponse.data.url_structure || 'plain',
          autoGenerateSitemap: seoResponse.data.auto_generate_sitemap ?? true,
          includeImagesSitemap: seoResponse.data.include_images_sitemap ?? true,
          submitToSearchEngines: seoResponse.data.submit_to_search_engines ?? true
        }
      }
    } catch (err: any) {
      console.error('Ayarlar yüklenirken hata:', err)
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const updateLogo = (newLogo: string) => {
    logo.value = newLogo
  }

  const updateFavicon = (newFavicon: string) => {
    favicon.value = newFavicon
    if (favicon.value) {
      const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link')
      link.type = 'image/x-icon'
      link.rel = 'shortcut icon'
      link.href = favicon.value
      document.getElementsByTagName('head')[0].appendChild(link)
    }
  }

  const updateSeoSettings = async (settings: any) => {
    try {
      const formattedSettings = {
        meta_title: settings.metaTitle || '',
        meta_description: settings.metaDescription || '',
        meta_keywords: settings.metaKeywords || '',
        robots_txt: settings.robotsTxt || '',
        url_structure: settings.urlStructure || 'plain',
        auto_generate_sitemap: Boolean(settings.autoGenerateSitemap),
        include_images_sitemap: Boolean(settings.includeImagesSitemap),
        submit_to_search_engines: Boolean(settings.submitToSearchEngines)
      }

      const response = await api.post('/admin/seo-settings', formattedSettings)
      
      if (response.data.settings) {
        seoSettings.value = {
          metaTitle: response.data.settings.meta_title || '',
          metaDescription: response.data.settings.meta_description || '',
          metaKeywords: response.data.settings.meta_keywords || '',
          robotsTxt: response.data.settings.robots_txt || '',
          urlStructure: response.data.settings.url_structure || 'plain',
          autoGenerateSitemap: Boolean(response.data.settings.auto_generate_sitemap),
          includeImagesSitemap: Boolean(response.data.settings.include_images_sitemap),
          submitToSearchEngines: Boolean(response.data.settings.submit_to_search_engines)
        }
      }
      return response.data
    } catch (error) {
      console.error('SEO ayarları güncellenirken hata:', error)
      throw error
    }
  }

  const generateSitemap = async () => {
    try {
      const response = await api.post('/admin/seo-settings/generate-sitemap')
      return response.data
    } catch (error) {
      console.error('Site haritası oluşturulurken hata:', error)
      throw error
    }
  }

  const submitSitemap = async () => {
    try {
      const response = await api.post('/admin/seo-settings/submit-to-search-engines')
      return response.data
    } catch (error) {
      console.error('Site haritası gönderilirken hata:', error)
      throw error
    }
  }

  const updateContactInfo = async (data: any) => {
    try {
      const response = await api.post('/admin/settings', {
        site_title: data.siteTitle,
        site_description: data.siteDescription,
        contact_email: data.contactEmail,
        phone_number: data.phoneNumber,
        address: data.address,
        working_hours_weekday: data.workingHoursWeekday,
        working_hours_saturday: data.workingHoursSaturday,
        working_hours_sunday: data.workingHoursSunday,
        is_open_saturday: data.isOpenSaturday,
        is_open_sunday: data.isOpenSunday
      });
      
      if (response.data) {
        // Tüm verileri güncelle
        siteTitle.value = data.siteTitle || '';
        siteDescription.value = data.siteDescription || '';
        contactEmail.value = data.contactEmail || '';
        phoneNumber.value = data.phoneNumber || '';
        address.value = data.address || '';
        workingHoursWeekday.value = data.workingHoursWeekday || '';
        workingHoursSaturday.value = data.workingHoursSaturday || '';
        workingHoursSunday.value = data.workingHoursSunday || '';
        isOpenSaturday.value = data.isOpenSaturday ?? true;
        isOpenSunday.value = data.isOpenSunday ?? false;

        // Cache'i güncelle
        saveToCache();
        
        // Tüm ayarları yeniden yükle
        await fetchSettings(true);
        
        return response.data;
      }
    } catch (err: any) {
      console.error('İletişim bilgileri güncellenirken hata:', err);
      throw err;
    }
  }

  return {
    logo,
    favicon,
    siteTitle,
    siteDescription,
    contactEmail,
    phoneNumber,
    address,
    workingHoursWeekday,
    workingHoursSaturday,
    workingHoursSunday,
    isOpenSaturday,
    isOpenSunday,
    loading,
    error,
    seoSettings,
    fetchSettings,
    updateLogo,
    updateFavicon,
    updateSeoSettings,
    generateSitemap,
    submitSitemap,
    updateContactInfo
  }
}) 