<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Hizmetler</h1>
      <button 
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        @click="router.push('/admin/content/services/create')"
      >
        Yeni Hizmet
      </button>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {{ error }}
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="service in services" :key="service.id" class="bg-white rounded-lg shadow overflow-hidden">
        <img 
          :src="service.image" 
          :alt="service.title"
          class="w-full h-48 object-cover"
        />
        <div class="p-4">
          <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ service.title }}</h2>
          <p class="text-gray-600 text-sm mb-4">{{ service.description }}</p>
          <div class="flex items-center justify-between text-sm text-gray-500">
            <span>{{ service.category }}</span>
            <span>{{ service.price.toLocaleString() }} ₺</span>
          </div>
          <div class="mt-4 flex justify-end space-x-2">
            <button 
              class="text-blue-600 hover:text-blue-900"
              @click="router.push(`/admin/content/services/${service.id}/edit`)"
            >
              Düzenle
            </button>
            <button 
              class="text-red-600 hover:text-red-900"
              @click="deleteService(service.id)"
            >
              Sil
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const services = ref([])
const loading = ref(false)
const error = ref('')

const fetchServices = async () => {
  try {
    loading.value = true
    const response = await axios.get('/api/admin/services')
    services.value = response.data.data
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Hizmetler alınamadı'
  } finally {
    loading.value = false
  }
}

const deleteService = async (id: number) => {
  if (confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) {
    try {
      await axios.delete(`/api/admin/services/${id}`)
      services.value = services.value.filter(service => service.id !== id)
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Hizmet silinemedi'
    }
  }
}

onMounted(() => {
  fetchServices()
})
</script> 