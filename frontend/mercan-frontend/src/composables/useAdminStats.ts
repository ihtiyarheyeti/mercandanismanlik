import { ref, onMounted } from 'vue'
import { adminStatsService } from '@/services/adminStats'
import type { OverviewStats, ChartData, LocationData } from '@/services/adminStats'

export function useAdminStats() {
  // State tanımlamaları
  const overview = ref<OverviewStats | null>(null)
  const visitors = ref<ChartData | null>(null)
  const pageViews = ref<ChartData | null>(null)
  const browsers = ref<ChartData | null>(null)
  const devices = ref<ChartData | null>(null)
  const locations = ref<LocationData | null>(null)

  const loading = ref({
    overview: false,
    visitors: false,
    pageViews: false,
    browsers: false,
    devices: false,
    locations: false
  })

  const error = ref<{
    overview: string | null,
    visitors: string | null,
    pageViews: string | null,
    browsers: string | null,
    devices: string | null,
    locations: string | null
  }>({
    overview: null,
    visitors: null,
    pageViews: null,
    browsers: null,
    devices: null,
    locations: null
  })

  // Veri yükleme fonksiyonları
  const fetchOverview = async () => {
    loading.value.overview = true
    error.value.overview = null
    try {
      const response = await adminStatsService.getOverview()
      overview.value = response.data
    } catch (err) {
      error.value.overview = 'İstatistikler yüklenirken bir hata oluştu.'
      console.error('Overview error:', err)
    } finally {
      loading.value.overview = false
    }
  }

  const fetchVisitors = async () => {
    loading.value.visitors = true
    error.value.visitors = null
    try {
      const response = await adminStatsService.getVisitors()
      visitors.value = response.data
    } catch (err) {
      error.value.visitors = 'Ziyaretçi istatistikleri yüklenirken bir hata oluştu.'
      console.error('Visitors error:', err)
    } finally {
      loading.value.visitors = false
    }
  }

  const fetchPageViews = async () => {
    loading.value.pageViews = true
    error.value.pageViews = null
    try {
      const response = await adminStatsService.getPageViews()
      pageViews.value = response.data
    } catch (err) {
      error.value.pageViews = 'Sayfa görüntülenme istatistikleri yüklenirken bir hata oluştu.'
      console.error('Page views error:', err)
    } finally {
      loading.value.pageViews = false
    }
  }

  const fetchBrowsers = async () => {
    loading.value.browsers = true
    error.value.browsers = null
    try {
      const response = await adminStatsService.getBrowsers()
      browsers.value = response.data
    } catch (err) {
      error.value.browsers = 'Tarayıcı istatistikleri yüklenirken bir hata oluştu.'
      console.error('Browsers error:', err)
    } finally {
      loading.value.browsers = false
    }
  }

  const fetchDevices = async () => {
    loading.value.devices = true
    error.value.devices = null
    try {
      const response = await adminStatsService.getDevices()
      devices.value = response.data
    } catch (err) {
      error.value.devices = 'Cihaz istatistikleri yüklenirken bir hata oluştu.'
      console.error('Devices error:', err)
    } finally {
      loading.value.devices = false
    }
  }

  const fetchLocations = async () => {
    loading.value.locations = true
    error.value.locations = null
    try {
      const response = await adminStatsService.getLocations()
      locations.value = response.data
    } catch (err) {
      error.value.locations = 'Konum istatistikleri yüklenirken bir hata oluştu.'
      console.error('Locations error:', err)
    } finally {
      loading.value.locations = false
    }
  }

  // Tüm verileri yükle
  const fetchAllStats = async () => {
    await Promise.all([
      fetchOverview(),
      fetchVisitors(),
      fetchPageViews(),
      fetchBrowsers(),
      fetchDevices(),
      fetchLocations()
    ])
  }

  // Component mount edildiğinde verileri yükle
  onMounted(() => {
    fetchAllStats()
  })

  return {
    // State
    overview,
    visitors,
    pageViews,
    browsers,
    devices,
    locations,
    loading,
    error,

    // Methods
    fetchOverview,
    fetchVisitors,
    fetchPageViews,
    fetchBrowsers,
    fetchDevices,
    fetchLocations,
    fetchAllStats
  }
} 