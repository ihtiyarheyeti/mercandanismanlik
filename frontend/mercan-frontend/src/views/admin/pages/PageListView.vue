<template>
  <div class="page-list">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold">Sayfa Yönetimi</h1>
      <router-link
        to="/admin/pages/create"
        class="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
      >
        Yeni Sayfa Ekle
      </router-link>
    </div>

    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {{ error }}
    </div>

    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Başlık
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Slug
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Durum
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Menüde Göster
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              İşlemler
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="page in pages" :key="page.id">
            <td class="px-6 py-4 whitespace-nowrap">
              {{ page.title }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ page.slug }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                :class="[
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                  page.is_active
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                ]"
              >
                {{ page.is_active ? 'Aktif' : 'Pasif' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                :class="[
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                  page.show_in_menu
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                ]"
              >
                {{ page.show_in_menu ? 'Evet' : 'Hayır' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <router-link
                :to="`/admin/pages/${page.id}/edit`"
                class="text-primary hover:text-primary-dark mr-3"
              >
                Düzenle
              </router-link>
              <button
                @click="deletePage(page.id)"
                class="text-red-600 hover:text-red-900"
                :disabled="page.slug === 'ana-sayfa' || page.slug === 'hakkimizda'"
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

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

const pages = ref([])
const loading = ref(true)
const error = ref(null)
const toast = useToast()

const fetchPages = async () => {
  try {
    loading.value = true
    const response = await axios.get('/api/pages')
    pages.value = response.data
  } catch (err) {
    error.value = 'Sayfalar yüklenirken bir hata oluştu.'
    toast.error(error.value)
  } finally {
    loading.value = false
  }
}

const deletePage = async (id) => {
  if (!confirm('Bu sayfayı silmek istediğinizden emin misiniz?')) return

  try {
    await axios.delete(`/api/pages/${id}`)
    toast.success('Sayfa başarıyla silindi')
    await fetchPages()
  } catch (err) {
    toast.error('Sayfa silinirken bir hata oluştu')
  }
}

onMounted(() => {
  fetchPages()
})
</script> 