<template>
  <div class="page-form">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold">{{ isEditing ? 'Sayfa Düzenle' : 'Yeni Sayfa' }}</h1>
      <router-link
        to="/admin/pages"
        class="text-gray-600 hover:text-gray-900"
      >
        Geri Dön
      </router-link>
    </div>

    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>

    <form v-else @submit.prevent="savePage" class="bg-white rounded-lg shadow p-6">
      <div class="grid grid-cols-1 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Başlık</label>
          <input
            type="text"
            v-model="form.title"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            required
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">İçerik</label>
          <textarea
            v-model="form.content"
            rows="10"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            required
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Meta Başlık</label>
          <input
            type="text"
            v-model="form.meta_title"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Meta Açıklama</label>
          <textarea
            v-model="form.meta_description"
            rows="2"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Meta Anahtar Kelimeler</label>
          <input
            type="text"
            v-model="form.meta_keywords"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Şablon</label>
          <select
            v-model="form.template"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          >
            <option value="default">Varsayılan</option>
            <option value="home">Ana Sayfa</option>
            <option value="full-width">Tam Genişlik</option>
            <option value="sidebar">Kenar Çubuklu</option>
          </select>
        </div>

        <div class="flex items-center space-x-4">
          <div class="flex items-center">
            <input
              type="checkbox"
              v-model="form.is_active"
              class="rounded border-gray-300 text-primary focus:ring-primary"
            >
            <label class="ml-2 text-sm text-gray-700">Aktif</label>
          </div>

          <div class="flex items-center">
            <input
              type="checkbox"
              v-model="form.show_in_menu"
              class="rounded border-gray-300 text-primary focus:ring-primary"
            >
            <label class="ml-2 text-sm text-gray-700">Menüde Göster</label>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Sıralama</label>
          <input
            type="number"
            v-model="form.order"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Öne Çıkan Görsel</label>
          <input
            type="file"
            @change="handleImageUpload"
            accept="image/*"
            class="mt-1 block w-full"
          >
          <img
            v-if="form.featured_image"
            :src="form.featured_image"
            class="mt-2 h-32 w-auto object-cover rounded"
          >
        </div>
      </div>

      <div class="mt-6 flex justify-end">
        <button
          type="submit"
          class="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
          :disabled="saving"
        >
          {{ saving ? 'Kaydediliyor...' : 'Kaydet' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useToast } from 'vue-toastification'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const loading = ref(false)
const saving = ref(false)
const error = ref(null)

const form = ref({
  title: '',
  content: '',
  meta_title: '',
  meta_description: '',
  meta_keywords: '',
  featured_image: null,
  is_active: true,
  show_in_menu: true,
  order: 0,
  template: 'default'
})

const isEditing = computed(() => route.params.id !== undefined)

const fetchPage = async () => {
  if (!isEditing.value) return

  try {
    loading.value = true
    const response = await axios.get(`/api/pages/${route.params.id}`)
    form.value = response.data
  } catch (err) {
    error.value = 'Sayfa yüklenirken bir hata oluştu.'
    toast.error(error.value)
  } finally {
    loading.value = false
  }
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    form.value.featured_image = URL.createObjectURL(file)
  }
}

const savePage = async () => {
  try {
    saving.value = true
    const formData = new FormData()
    
    Object.keys(form.value).forEach(key => {
      if (key === 'featured_image' && form.value[key] instanceof File) {
        formData.append(key, form.value[key])
      } else {
        formData.append(key, form.value[key])
      }
    })

    if (isEditing.value) {
      await axios.put(`/api/pages/${route.params.id}`, formData)
      toast.success('Sayfa başarıyla güncellendi')
    } else {
      await axios.post('/api/pages', formData)
      toast.success('Sayfa başarıyla oluşturuldu')
    }

    router.push('/admin/pages')
  } catch (err) {
    toast.error('Sayfa kaydedilirken bir hata oluştu')
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  fetchPage()
})
</script> 