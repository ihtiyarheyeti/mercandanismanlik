<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Ana İçerik -->
    <div class="container mx-auto px-4 py-8">
      <!-- Özet Kartları -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Toplam Ziyaretçi -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="text-gray-600">Toplam Ziyaretçi</div>
            <div class="text-blue-500 bg-blue-100 p-2 rounded-lg">
              <i class="fas fa-users"></i>
            </div>
          </div>
          <div v-if="loading.overview" class="animate-pulse">
            <div class="h-8 bg-gray-200 rounded w-24 mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-32"></div>
          </div>
          <template v-else>
            <div class="text-3xl font-bold text-gray-800 mb-2">
              {{ overview?.total_visitors ? overview.total_visitors.toLocaleString() : '0' }}
            </div>
            <div class="flex items-center text-sm">
              <span :class="[(overview?.trends?.visitors || 0) >= 0 ? 'text-green-500' : 'text-red-500']" class="mr-2">
                <i :class="[(overview?.trends?.visitors || 0) >= 0 ? 'fa-arrow-up' : 'fa-arrow-down']" class="fas"></i>
                {{ Math.abs(overview?.trends?.visitors || 0) }}%
              </span>
              <span class="text-gray-500">Geçen aya göre</span>
            </div>
          </template>
        </div>

        <!-- Aktif Kullanıcılar -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="text-gray-600">Aktif Kullanıcılar</div>
            <div class="text-purple-500 bg-purple-100 p-2 rounded-lg">
              <i class="fas fa-user-clock"></i>
            </div>
          </div>
          <div v-if="loading.overview" class="animate-pulse">
            <div class="h-8 bg-gray-200 rounded w-24 mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-32"></div>
          </div>
          <template v-else>
            <div class="text-3xl font-bold text-gray-800 mb-2">
              {{ overview?.active_users ? overview.active_users.toLocaleString() : '0' }}
            </div>
            <div class="flex items-center text-sm">
              <span :class="[(overview?.trends?.users || 0) >= 0 ? 'text-green-500' : 'text-red-500']" class="mr-2">
                <i :class="[(overview?.trends?.users || 0) >= 0 ? 'fa-arrow-up' : 'fa-arrow-down']" class="fas"></i>
                {{ Math.abs(overview?.trends?.users || 0) }}%
              </span>
              <span class="text-gray-500">Son 24 saat</span>
            </div>
          </template>
        </div>

        <!-- Sayfa Görüntülenme -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="text-gray-600">Sayfa Görüntülenme</div>
            <div class="text-green-500 bg-green-100 p-2 rounded-lg">
              <i class="fas fa-eye"></i>
            </div>
          </div>
          <div v-if="loading.overview" class="animate-pulse">
            <div class="h-8 bg-gray-200 rounded w-24 mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-32"></div>
          </div>
          <template v-else>
            <div class="text-3xl font-bold text-gray-800 mb-2">
              {{ overview?.page_views ? overview.page_views.toLocaleString() : '0' }}
            </div>
            <div class="flex items-center text-sm">
              <span :class="[(overview?.trends?.views || 0) >= 0 ? 'text-green-500' : 'text-red-500']" class="mr-2">
                <i :class="[(overview?.trends?.views || 0) >= 0 ? 'fa-arrow-up' : 'fa-arrow-down']" class="fas"></i>
                {{ Math.abs(overview?.trends?.views || 0) }}%
              </span>
              <span class="text-gray-500">Geçen haftaya göre</span>
            </div>
          </template>
        </div>

        <!-- Ortalama Oturum Süresi -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="text-gray-600">Ort. Oturum Süresi</div>
            <div class="text-orange-500 bg-orange-100 p-2 rounded-lg">
              <i class="fas fa-clock"></i>
            </div>
          </div>
          <div v-if="loading.overview" class="animate-pulse">
            <div class="h-8 bg-gray-200 rounded w-24 mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-32"></div>
          </div>
          <template v-else>
            <div class="text-3xl font-bold text-gray-800 mb-2">
              {{ overview?.avg_session_duration || '0:00' }}
            </div>
            <div class="flex items-center text-sm">
              <span :class="[(overview?.trends?.duration || 0) >= 0 ? 'text-green-500' : 'text-red-500']" class="mr-2">
                <i :class="[(overview?.trends?.duration || 0) >= 0 ? 'fa-arrow-up' : 'fa-arrow-down']" class="fas"></i>
                {{ Math.abs(overview?.trends?.duration || 0) }}%
              </span>
              <span class="text-gray-500">Geçen aya göre</span>
            </div>
          </template>
        </div>
      </div>

      <!-- Grafikler -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Ziyaretçi Grafiği -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Ziyaretçi İstatistikleri</h2>
          <div v-if="loading.visitors" class="h-80 flex items-center justify-center">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
          <div v-else-if="error.visitors" class="h-80 flex items-center justify-center text-red-500">
            {{ error.visitors }}
          </div>
          <div v-else class="h-80">
            <canvas ref="visitorChart"></canvas>
          </div>
        </div>

        <!-- Sayfa Görüntülenme Grafiği -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Sayfa Görüntülenmeleri</h2>
          <div v-if="loading.pageViews" class="h-80 flex items-center justify-center">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
          <div v-else-if="error.pageViews" class="h-80 flex items-center justify-center text-red-500">
            {{ error.pageViews }}
          </div>
          <div v-else class="h-80">
            <canvas ref="pageViewsChart"></canvas>
          </div>
        </div>
      </div>

      <!-- Alt Grafikler -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Tarayıcı Dağılımı -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Tarayıcı Dağılımı</h2>
          <div v-if="loading.browsers" class="h-64 flex items-center justify-center">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
          <div v-else-if="error.browsers" class="h-64 flex items-center justify-center text-red-500">
            {{ error.browsers }}
          </div>
          <div v-else class="h-64">
            <canvas ref="browserChart"></canvas>
          </div>
        </div>

        <!-- Cihaz Dağılımı -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Cihaz Dağılımı</h2>
          <div v-if="loading.devices" class="h-64 flex items-center justify-center">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
          <div v-else-if="error.devices" class="h-64 flex items-center justify-center text-red-500">
            {{ error.devices }}
          </div>
          <div v-else class="h-64">
            <canvas ref="deviceChart"></canvas>
          </div>
        </div>

        <!-- Ziyaretçi Konumları -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Ziyaretçi Konumları</h2>
          <div v-if="loading.locations" class="flex items-center justify-center h-64">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
          <div v-else-if="error.locations" class="h-64 flex items-center justify-center text-red-500">
            {{ error.locations }}
          </div>
          <div v-else class="space-y-4">
            <div v-for="country in locations?.countries" :key="country.name" class="flex items-center justify-between">
              <div class="flex items-center">
                <i :class="['fas fa-flag', `text-${country.color}-500`]" class="mr-2"></i>
                <span class="text-gray-600">{{ country.name }}</span>
              </div>
              <div class="flex items-center">
                <span class="text-gray-800 font-semibold mr-2">{{ country.percentage }}%</span>
                <div class="w-24 h-2 bg-gray-200 rounded-full">
                  <div
                    class="h-full bg-blue-500 rounded-full"
                    :style="{ width: country.percentage + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Chart from 'chart.js/auto'
import { useAdminStats } from '@/composables/useAdminStats'

const {
  overview,
  visitors,
  pageViews,
  browsers,
  devices,
  locations,
  loading,
  error,
  fetchAllStats
} = useAdminStats()

const visitorChart = ref<HTMLCanvasElement | null>(null)
const pageViewsChart = ref<HTMLCanvasElement | null>(null)
const browserChart = ref<HTMLCanvasElement | null>(null)
const deviceChart = ref<HTMLCanvasElement | null>(null)

let visitorChartInstance: Chart | null = null
let pageViewsChartInstance: Chart | null = null
let browserChartInstance: Chart | null = null
let deviceChartInstance: Chart | null = null

// Grafikleri güncelle
watch(visitors, (newData) => {
  try {
    console.log('Ziyaretçi verileri güncelleniyor:', newData)
    if (newData && visitorChart.value) {
      if (visitorChartInstance) {
        visitorChartInstance.destroy()
      }
      visitorChartInstance = new Chart(visitorChart.value, {
        type: 'line',
        data: {
          labels: newData.labels,
          datasets: [{
            label: 'Ziyaretçiler',
            data: newData.data,
            borderColor: '#3B82F6',
            tension: 0.4,
            fill: true,
            backgroundColor: 'rgba(59, 130, 246, 0.1)'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      })
    }
  } catch (err) {
    console.error('Ziyaretçi grafiği oluşturma hatası:', err)
  }
})

watch(pageViews, (newData) => {
  if (newData && pageViewsChart.value) {
    if (pageViewsChartInstance) {
      pageViewsChartInstance.destroy()
    }
    pageViewsChartInstance = new Chart(pageViewsChart.value, {
      type: 'bar',
      data: {
        labels: newData.labels,
        datasets: [{
          label: 'Görüntülenmeler',
          data: newData.data,
          backgroundColor: '#8B5CF6'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  }
})

watch(browsers, (newData) => {
  if (newData && browserChart.value) {
    if (browserChartInstance) {
      browserChartInstance.destroy()
    }
    browserChartInstance = new Chart(browserChart.value, {
      type: 'doughnut',
      data: {
        labels: newData.labels,
        datasets: [{
          data: newData.data,
          backgroundColor: [
            '#3B82F6',
            '#EF4444',
            '#10B981',
            '#F59E0B',
            '#6B7280'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    })
  }
})

watch(devices, (newData) => {
  if (newData && deviceChart.value) {
    if (deviceChartInstance) {
      deviceChartInstance.destroy()
    }
    deviceChartInstance = new Chart(deviceChart.value, {
      type: 'pie',
      data: {
        labels: newData.labels,
        datasets: [{
          data: newData.data,
          backgroundColor: [
            '#8B5CF6',
            '#EC4899',
            '#F59E0B'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    })
  }
})

onMounted(async () => {
  try {
    console.log('Dashboard yükleniyor...')
    await fetchAllStats()
    console.log('Veriler:', {
      overview: overview.value,
      visitors: visitors.value,
      pageViews: pageViews.value,
      browsers: browsers.value,
      devices: devices.value,
      locations: locations.value
    })
  } catch (err) {
    console.error('Veri yükleme hatası:', err)
  }
})
</script> 