<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Reklam Bütçesi</h1>
      <button 
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        @click="router.push('/admin/ads/budget/create')"
      >
        Yeni Bütçe Ekle
      </button>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {{ error }}
    </div>

    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Kampanya
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Platform
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Günlük Bütçe
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Toplam Bütçe
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Durum
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              İşlemler
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="budget in budgets" :key="budget.id">
            <td class="px-6 py-4 whitespace-nowrap">
              {{ budget.campaign_name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ budget.platform }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ budget.daily_budget }} ₺
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ budget.total_budget }} ₺
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span 
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="{
                  'bg-green-100 text-green-800': budget.status === 'active',
                  'bg-red-100 text-red-800': budget.status === 'inactive',
                  'bg-yellow-100 text-yellow-800': budget.status === 'paused'
                }"
              >
                {{ budget.status === 'active' ? 'Aktif' : budget.status === 'inactive' ? 'Pasif' : 'Duraklatıldı' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button 
                class="text-blue-600 hover:text-blue-900 mr-3"
                @click="router.push(`/admin/ads/budget/${budget.id}/edit`)"
              >
                Düzenle
              </button>
              <button 
                class="text-red-600 hover:text-red-900"
                @click="deleteBudget(budget.id)"
              >
                Sil
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const budgets = ref([])
const loading = ref(false)
const error = ref('')

const fetchBudgets = async () => {
  try {
    loading.value = true
    const response = await axios.get('/api/admin/ads/budgets')
    budgets.value = response.data.data
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Bütçe bilgileri alınamadı'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchBudgets()
})
</script> 