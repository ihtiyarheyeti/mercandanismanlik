<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Siparişler</h1>
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
              Sipariş No
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Müşteri
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tarih
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tutar
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
          <tr v-for="order in orders" :key="order.id">
            <td class="px-6 py-4 whitespace-nowrap">
              #{{ order.order_number }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ order.customer_name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ new Date(order.created_at).toLocaleDateString('tr-TR') }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ order.total.toLocaleString() }} ₺
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span 
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="{
                  'bg-green-100 text-green-800': order.status === 'completed',
                  'bg-yellow-100 text-yellow-800': order.status === 'pending',
                  'bg-red-100 text-red-800': order.status === 'cancelled'
                }"
              >
                {{ 
                  order.status === 'completed' ? 'Tamamlandı' : 
                  order.status === 'pending' ? 'Beklemede' : 
                  'İptal Edildi'
                }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button 
                class="text-blue-600 hover:text-blue-900 mr-3"
                @click="router.push(`/admin/sales/orders/${order.id}`)"
              >
                Detay
              </button>
              <button 
                v-if="order.status === 'pending'"
                class="text-green-600 hover:text-green-900 mr-3"
                @click="updateOrderStatus(order.id, 'completed')"
              >
                Tamamla
              </button>
              <button 
                v-if="order.status === 'pending'"
                class="text-red-600 hover:text-red-900"
                @click="updateOrderStatus(order.id, 'cancelled')"
              >
                İptal Et
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
const orders = ref([])
const loading = ref(false)
const error = ref('')

const fetchOrders = async () => {
  try {
    loading.value = true
    const response = await axios.get('/api/admin/sales/orders')
    orders.value = response.data.data
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Siparişler alınamadı'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchOrders()
})
</script> 