<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-2xl font-semibold mb-6">{{ isEditing ? 'Blog Yazısını Düzenle' : 'Yeni Blog Yazısı' }}</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Başlık -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
        <input
          v-model="formData.title"
          type="text"
          class="w-full border rounded-lg px-3 py-2"
          required
        >
      </div>

      <!-- Kategori -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
        <select
          v-model="formData.category_id"
          class="w-full border rounded-lg px-3 py-2"
          required
        >
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>

      <!-- Kapak Resmi -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Kapak Resmi</label>
        <div class="flex items-center space-x-4">
          <img
            v-if="formData.featured_image"
            :src="formData.featured_image"
            alt="Kapak resmi"
            class="h-32 w-48 object-cover rounded-lg"
          />
          <div>
            <input
              type="file"
              @change="handleImageUpload"
              accept="image/*"
              class="hidden"
              id="fileInput"
            >
            <button
              type="button"
              @click="() => document.getElementById('fileInput')?.click()"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              <i class="fas fa-upload mr-2"></i>
              Resim Yükle
            </button>
          </div>
        </div>
      </div>

      <!-- Özet -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Özet</label>
        <textarea
          v-model="formData.excerpt"
          rows="3"
          class="w-full border rounded-lg px-3 py-2"
          required
        ></textarea>
      </div>

      <!-- İçerik -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">İçerik</label>
        <textarea
          v-model="formData.content"
          rows="10"
          class="w-full border rounded-lg px-3 py-2"
          required
        ></textarea>
      </div>

      <!-- Durum -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Durum</label>
        <select
          v-model="formData.status"
          class="w-full border rounded-lg px-3 py-2"
        >
          <option value="draft">Taslak</option>
          <option value="published">Yayında</option>
        </select>
      </div>

      <!-- Butonlar -->
      <div class="flex justify-end space-x-4">
        <button
          type="button"
          @click="$router.back()"
          class="px-6 py-2 border rounded-lg hover:bg-gray-50"
        >
          İptal
        </button>
        <button
          type="submit"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {{ isEditing ? 'Güncelle' : 'Oluştur' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogStore } from '@/stores/blog'
import { useNotification } from '@/composables/useNotification'
import api from '@/services/api'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()
const { showNotification } = useNotification()

const isEditing = computed(() => route.params.id !== undefined)

const formData = ref({
  title: '',
  category_id: '',
  featured_image: '',
  excerpt: '',
  content: '',
  status: 'published'
})

interface Category {
  id: number
  name: string
  slug: string
  created_at: string
}

const categories = ref<Category[]>([])

onMounted(async () => {
  try {
    // Kategorileri yükle
    const response = await api.get('/blog/categories')
    categories.value = response.data

    // Düzenleme modundaysa mevcut blog yazısını yükle
    if (isEditing.value) {
      const blogId = Number(route.params.id)
      const blog = await api.get(`/blog/${blogId}`)
      formData.value = blog.data
    }
  } catch (error) {
    console.error('Veriler yüklenirken hata:', error)
    showNotification({
      type: 'error',
      message: 'Veriler yüklenirken bir hata oluştu.'
    })
  }
})

const handleImageUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    try {
      const formDataUpload = new FormData()
      formDataUpload.append('file', file)
      
      const response = await api.post('/admin/media/upload', formDataUpload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      formData.value.featured_image = response.data.url
      showNotification({
        type: 'success',
        message: 'Resim başarıyla yüklendi.'
      })
    } catch (error) {
      console.error('Resim yüklenirken hata:', error)
      showNotification({
        type: 'error',
        message: 'Resim yüklenirken bir hata oluştu.'
      })
    }
  }
}

const handleSubmit = async () => {
  try {
    if (isEditing.value) {
      await api.put(`/blog/${route.params.id}`, formData.value)
      showNotification({
        type: 'success',
        message: 'Blog yazısı başarıyla güncellendi.'
      })
    } else {
      await api.post('/blog', formData.value)
      showNotification({
        type: 'success',
        message: 'Blog yazısı başarıyla oluşturuldu.'
      })
    }
    router.push('/admin/blog')
  } catch (error) {
    console.error('Blog yazısı kaydedilirken hata:', error)
    showNotification({
      type: 'error',
      message: 'Blog yazısı kaydedilirken bir hata oluştu.'
    })
  }
}
</script> 