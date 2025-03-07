<template>
  <div class="services-design-container">
    <h2 class="text-2xl font-bold mb-6">Hizmetler Sayfası Tasarımı</h2>
    
    <div class="services-list">
      <div v-for="(service, index) in services" :key="index" class="service-card bg-white p-4 rounded-lg shadow-md mb-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">Hizmet {{ index + 1 }}</h3>
          <button @click="removeService(index)" class="text-red-500 hover:text-red-700">
            <i class="fas fa-trash"></i>
          </button>
        </div>
        
        <div class="grid grid-cols-1 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Başlık</label>
            <input v-model="service.title" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Açıklama</label>
            <textarea v-model="service.description" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">İkon (Font Awesome class)</label>
            <input v-model="service.icon" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Resim URL</label>
            <input v-model="service.image" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>
        </div>
      </div>
    </div>
    
    <div class="flex justify-between mt-6">
      <button @click="addService" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Yeni Hizmet Ekle
      </button>
      
      <button @click="saveServices" class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
        Değişiklikleri Kaydet
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useDesignStore } from '@/stores/design'
import { useNotification } from '@/composables/useNotification'

const designStore = useDesignStore()
const { showNotification } = useNotification()

interface Service {
  title: string
  description: string
  icon: string
  image: string
}

const services = ref<Service[]>([
  {
    title: '',
    description: '',
    icon: '',
    image: ''
  }
])

const addService = () => {
  services.value.push({
    title: '',
    description: '',
    icon: '',
    image: ''
  })
}

const removeService = (index: number) => {
  services.value.splice(index, 1)
}

const saveServices = async () => {
  try {
    await axios.post('/api/admin/design/services', {
      services: services.value
    })
    showNotification({
      type: 'success',
      message: 'Hizmetler başarıyla kaydedildi!'
    })
  } catch (error) {
    console.error('Hizmetler kaydedilirken hata oluştu:', error)
    showNotification({
      type: 'error',
      message: 'Hizmetler kaydedilirken bir hata oluştu!'
    })
  }
}
</script>

<style scoped>
.services-design-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.service-card {
  border: 1px solid #e5e7eb;
}
</style> 