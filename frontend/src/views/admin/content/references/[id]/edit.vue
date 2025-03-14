<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const route = useRoute()
const loading = ref(false)
const error = ref('')

const reference = ref({
  company_name: '',
  logo: '',
  description: '',
  website: '',
  year: new Date().getFullYear(),
  sector: '',
  services: ''
})

const fetchReference = async () => {
  try {
    loading.value = true
    const response = await axios.get(`/api/admin/references/${route.params.id}`)
    reference.value = response.data.data
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Referans alınamadı'
  } finally {
    loading.value = false
  }
}

const updateReference = async () => {
  try {
    loading.value = true
    await axios.put(`/api/admin/references/${route.params.id}`, reference.value)
    router.push('/admin/content/references')
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Referans güncellenemedi'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchReference()
})
</script>

<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Referansı Düzenle</h1>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>

    <form v-else @submit.prevent="updateReference" class="space-y-6">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="grid grid-cols-1 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Firma Adı
            </label>
            <input
              v-model="reference.company_name"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Logo URL
            </label>
            <input
              v-model="reference.logo"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Açıklama
            </label>
            <textarea
              v-model="reference.description"
              rows="4"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Website
            </label>
            <input
              v-model="reference.website"
              type="url"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Yıl
            </label>
            <input
              v-model="reference.year"
              type="number"
              required
              min="1900"
              :max="new Date().getFullYear()"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Sektör
            </label>
            <input
              v-model="reference.sector"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Yapılan İşler
            </label>
            <textarea
              v-model="reference.services"
              rows="4"
              required
              placeholder="Her satıra bir hizmet yazın"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="flex justify-end space-x-4">
        <button
          type="button"
          class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          @click="router.push('/admin/content/references')"
        >
          İptal
        </button>
        <button
          type="submit"
          class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          :disabled="loading"
        >
          <span v-if="loading">Kaydediliyor...</span>
          <span v-else>Kaydet</span>
        </button>
      </div>
    </form>
  </div>
</template> 