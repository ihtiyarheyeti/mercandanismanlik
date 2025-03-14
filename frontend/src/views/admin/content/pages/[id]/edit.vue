<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const route = useRoute()
const loading = ref(false)
const error = ref('')

const page = ref({
  title: '',
  slug: '',
  content: '',
  status: 'draft',
  meta_title: '',
  meta_description: '',
  template: 'default'
})

const fetchPage = async () => {
  try {
    loading.value = true
    const response = await axios.get(`/api/admin/pages/${route.params.id}`)
    page.value = response.data.data
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Sayfa alınamadı'
  } finally {
    loading.value = false
  }
}

const updatePage = async () => {
  try {
    loading.value = true
    await axios.put(`/api/admin/pages/${route.params.id}`, page.value)
    router.push('/admin/content/pages')
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Sayfa güncellenemedi'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPage()
})
</script>

<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Sayfayı Düzenle</h1>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>

    <form v-else @submit.prevent="updatePage" class="space-y-6">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="grid grid-cols-1 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Başlık
            </label>
            <input
              v-model="page.title"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              URL
            </label>
            <input
              v-model="page.slug"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              İçerik
            </label>
            <textarea
              v-model="page.content"
              rows="10"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Şablon
            </label>
            <select
              v-model="page.template"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="default">Varsayılan</option>
              <option value="full-width">Tam Genişlik</option>
              <option value="sidebar">Kenar Çubuklu</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Durum
            </label>
            <select
              v-model="page.status"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Taslak</option>
              <option value="published">Yayında</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Meta Başlık
            </label>
            <input
              v-model="page.meta_title"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Meta Açıklama
            </label>
            <textarea
              v-model="page.meta_description"
              rows="2"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="flex justify-end space-x-4">
        <button
          type="button"
          class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          @click="router.push('/admin/content/pages')"
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