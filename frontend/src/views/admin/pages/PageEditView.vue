<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Sayfa Düzenle</h1>
      <router-link
        to="/admin/sayfalar"
        class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
      >
        Geri Dön
      </router-link>
    </div>

    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {{ error }}
    </div>

    <form v-else @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow p-6 space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Sol Kolon -->
        <div class="space-y-4">
          <!-- Başlık -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Başlık
            </label>
            <input
              v-model="form.title"
              type="text"
              class="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <!-- URL (Slug) -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              URL
            </label>
            <div class="flex items-center space-x-2">
              <input
                v-model="form.slug"
                type="text"
                class="flex-1 border rounded px-3 py-2"
                required
              />
              <button
                type="button"
                @click="generateSlug"
                class="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded text-sm"
              >
                URL Oluştur
              </button>
            </div>
          </div>

          <!-- Meta Başlık -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Meta Başlık
            </label>
            <input
              v-model="form.meta_title"
              type="text"
              class="w-full border rounded px-3 py-2"
            />
          </div>

          <!-- Meta Açıklama -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Meta Açıklama
            </label>
            <textarea
              v-model="form.meta_description"
              rows="3"
              class="w-full border rounded px-3 py-2"
            ></textarea>
          </div>

          <!-- Meta Anahtar Kelimeler -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Meta Anahtar Kelimeler
            </label>
            <input
              v-model="form.meta_keywords"
              type="text"
              class="w-full border rounded px-3 py-2"
              placeholder="Virgülle ayırın"
            />
          </div>
        </div>

        <!-- Sağ Kolon -->
        <div class="space-y-4">
          <!-- Kapak Görseli -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Kapak Görseli
            </label>
            <div class="border rounded p-4 space-y-4">
              <img
                v-if="form.featured_image"
                :src="form.featured_image"
                alt="Kapak görseli"
                class="max-h-40 rounded mx-auto"
              />
              <div v-else class="text-center text-gray-500">
                Henüz görsel yüklenmemiş
              </div>
              <input
                type="file"
                @change="handleImageUpload"
                accept="image/*"
                class="w-full"
              />
              <button
                v-if="form.featured_image"
                type="button"
                @click="removeFeaturedImage"
                class="text-red-600 hover:text-red-800 text-sm"
              >
                Görseli Kaldır
              </button>
            </div>
          </div>

          <!-- Durum ve Öne Çıkarma -->
          <div class="border rounded p-4 space-y-4">
            <div class="flex items-center justify-between">
              <label class="text-sm font-medium text-gray-700">
                Durum
              </label>
              <div class="relative inline-block w-12 align-middle select-none">
                <input
                  v-model="form.is_active"
                  type="checkbox"
                  class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                  class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                ></label>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <label class="text-sm font-medium text-gray-700">
                Öne Çıkar
              </label>
              <div class="relative inline-block w-12 align-middle select-none">
                <input
                  v-model="form.is_featured"
                  type="checkbox"
                  class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                  class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                ></label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Sıralama
              </label>
              <input
                v-model.number="form.order"
                type="number"
                min="0"
                class="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- İçerik Editörü -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          İçerik
        </label>
        <div class="border rounded">
          <QuillEditor
            v-model:content="form.content"
            toolbar="full"
            theme="snow"
            contentType="html"
            :options="{
              modules: {
                toolbar: [
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  [{ color: [] }, { background: [] }],
                  [{ align: [] }],
                  ['link', 'image', 'video'],
                  ['clean']
                ]
              }
            }"
          />
        </div>
      </div>

      <!-- Butonlar -->
      <div class="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          @click="$router.push('/admin/sayfalar')"
          class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded"
        >
          İptal
        </button>
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          :disabled="saving"
        >
          <span v-if="saving">Kaydediliyor...</span>
          <span v-else>Kaydet</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { usePagesStore } from '@/stores/pages'
import type { Page } from '@/stores/pages'
import api from '@/services/api'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const pagesStore = usePagesStore()

const loading = ref(true)
const saving = ref(false)
const error = ref('')

const form = ref<Partial<Page>>({
  title: '',
  slug: '',
  content: '',
  meta_title: '',
  meta_description: '',
  meta_keywords: '',
  featured_image: null,
  is_active: true,
  is_featured: false,
  order: 0
})

const loadPage = async () => {
  try {
    const pageId = route.params.id as string
    const page = await pagesStore.getPage(parseInt(pageId))
    form.value = { ...page }
    loading.value = false
  } catch (err: any) {
    error.value = 'Sayfa yüklenirken bir hata oluştu'
    loading.value = false
    console.error('Sayfa yükleme hatası:', err)
  }
}

const generateSlug = () => {
  if (form.value.title) {
    form.value.slug = form.value.title
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
  }
}

const handleImageUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  const formData = new FormData()
  formData.append('image', file)

  try {
    const response = await api.post('/admin/upload', formData)
    form.value.featured_image = response.data.url
    toast.success('Görsel başarıyla yüklendi')
  } catch (err) {
    toast.error('Görsel yüklenirken bir hata oluştu')
    console.error('Görsel yükleme hatası:', err)
  }
}

const removeFeaturedImage = () => {
  form.value.featured_image = null
}

const handleSubmit = async () => {
  saving.value = true

  try {
    const pageId = route.params.id as string
    await pagesStore.updatePage(parseInt(pageId), form.value)
    toast.success('Sayfa başarıyla güncellendi')
    router.push('/admin/sayfalar')
  } catch (err: any) {
    toast.error('Sayfa güncellenirken bir hata oluştu')
    console.error('Sayfa güncelleme hatası:', err)
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  loadPage()
})
</script>

<style scoped>
.toggle-checkbox:checked {
  @apply right-0 border-blue-500;
  right: 0;
  border-color: #3b82f6;
}
.toggle-checkbox:checked + .toggle-label {
  @apply bg-blue-500;
  background-color: #3b82f6;
}
.toggle-label {
  width: 48px;
}
</style> 