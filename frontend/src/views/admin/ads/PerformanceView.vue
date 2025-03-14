<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Reklam Performansı</h1>
      <select 
        v-model="selectedPeriod"
        class="bg-white border border-gray-300 rounded-lg px-4 py-2"
        @change="fetchPerformanceData"
      >
        <option value="last7days">Son 7 Gün</option>
        <option value="last30days">Son 30 Gün</option>
        <option value="last90days">Son 90 Gün</option>
      </select>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {{ error }}
    </div>

    <div v-else>
      <!-- Metrik Kartları -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-sm font-medium text-gray-500 mb-2">Gösterim</h3>
          <p class="text-2xl font-bold text-gray-900">{{ metrics.impressions.toLocaleString() }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-sm font-medium text-gray-500 mb-2">Tıklama</h3>
          <p class="text-2xl font-bold text-gray-900">{{ metrics.clicks.toLocaleString() }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-sm font-medium text-gray-500 mb-2">CTR</h3>
          <p class="text-2xl font-bold text-gray-900">{{ metrics.ctr.toFixed(2) }}%</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-sm font-medium text-gray-500 mb-2">Dönüşüm</h3>
          <p class="text-2xl font-bold text-gray-900">{{ metrics.conversions.toLocaleString() }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-sm font-medium text-gray-500 mb-2">Harcama</h3>
          <p class="text-2xl font-bold text-gray-900">{{ metrics.cost.toLocaleString() }} ₺</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-sm font-medium text-gray-500 mb-2">CPA</h3>
          <p class="text-2xl font-bold text-gray-900">{{ metrics.cpa.toLocaleString() }} ₺</p>
        </div>
      </div>

      <!-- Kampanya Performans Tablosu -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kampanya
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gösterim
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tıklama
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CTR
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dönüşüm
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Harcama
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CPA
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="campaign in campaigns" :key="campaign.id">
              <td class="px-6 py-4 whitespace-nowrap">
                {{ campaign.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ campaign.impressions.toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ campaign.clicks.toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ campaign.ctr.toFixed(2) }}%
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ campaign.conversions.toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ campaign.cost.toLocaleString() }} ₺
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ campaign.cpa.toLocaleString() }} ₺
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const loading = ref(false)
const error = ref('')
const metrics = ref({
  impressions: 0,
  clicks: 0,
  ctr: 0,
  conversions: 0,
  cost: 0,
  cpa: 0
})

const campaigns = ref([])
const selectedPeriod = ref('last30days')
const chartData = ref([])

const fetchPerformanceData = async () => {
  try {
    loading.value = true
    const response = await axios.get(`/api/admin/ads/performance?period=${selectedPeriod.value}`)
    metrics.value = response.data.metrics
    chartData.value = response.data.chartData
    campaigns.value = response.data.campaigns
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Performans verileri alınamadı'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPerformanceData()
})
</script> 