import api from './api'

// Tip tanımlamaları
export interface OverviewStats {
  total_visitors: number
  active_users: number
  page_views: number
  avg_session_duration: string
  trends: {
    visitors: number
    users: number
    views: number
    duration: number
  }
}

export interface ChartData {
  labels: string[]
  data: number[]
}

export interface LocationData {
  countries: {
    name: string
    percentage: number
    color: string
  }[]
}

// API fonksiyonları
export const adminStatsService = {
  // Özet istatistikler
  getOverview: () => api.get<OverviewStats>('/api/admin/stats/overview'),

  // Ziyaretçi istatistikleri
  getVisitors: () => api.get<ChartData>('/api/admin/stats/visitors'),

  // Sayfa görüntülenmeleri
  getPageViews: () => api.get<ChartData>('/api/admin/stats/pageviews'),

  // Tarayıcı dağılımı
  getBrowsers: () => api.get<ChartData>('/api/admin/stats/browsers'),

  // Cihaz dağılımı
  getDevices: () => api.get<ChartData>('/api/admin/stats/devices'),

  // Ziyaretçi konumları
  getLocations: () => api.get<LocationData>('/api/admin/stats/locations')
} 