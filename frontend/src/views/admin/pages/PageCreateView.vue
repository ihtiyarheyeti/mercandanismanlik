<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Yeni Sayfa Oluştur</h1>
      <router-link
        to="/admin/sayfalar"
        class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
      >
        Geri Dön
      </router-link>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
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

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                URL
              </label>
              <input
                v-model="form.slug"
                type="text"
                class="w-full border rounded px-3 py-2"
                required
              />
            </div>

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

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Kapak Görseli
              </label>
              <input
                type="file"
                @change="handleImageUpload"
                accept="image/*"
                class="w-full border rounded px-3 py-2"
              />
              <img
                v-if="form.featured_image"
                :src="form.featured_image"
                alt="Kapak görseli"
                class="mt-2 max-h-40 rounded"
              />
            </div>

            <div class="flex items-center space-x-4">
              <div class="flex items-center">
                <input
                  v-model="form.is_active"
                  type="checkbox"
                  class="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <label class="ml-2 text-sm text-gray-700">Aktif</label>
              </div>

              <div class="flex items-center">
                <input
                  v-model="form.is_featured"
                  type="checkbox"
                  class="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <label class="ml-2 text-sm text-gray-700">Öne Çıkar</label>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            İçerik
          </label>
          <div class="border rounded">
            <QuillEditor
              v-model:content="form.content"
              toolbar="full"
              theme="snow"
            />
          </div>
        </div>

        <div class="flex justify-end space-x-4">
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
            :disabled="loading"
          >
            <span v-if="loading">Kaydediliyor...</span>
            <span v-else>Kaydet</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { usePagesStore } from '@/stores/pages'
import type { Page } from '@/stores/pages'

const router = useRouter()
const toast = useToast()
const pagesStore = usePagesStore()
const loading = ref(false)

const form = ref<Partial<Page>>({
  title: '',
  slug: '',
  content: '',
  meta_title: '',
  meta_description: '',
  meta_keywords: '',
  featured_image: null,
  is_active: true,
  is_featured: false
})

const handleImageUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  const formData = new FormData()
  formData.append('image', file)

  try {
    const response = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData
    })
    const data = await response.json()
    form.value.featured_image = data.url
  } catch (error) {
    toast.error('Görsel yüklenirken bir hata oluştu')
  }
}

const handleSubmit = async () => {
  loading.value = true
  try {
    await pagesStore.createPage(form.value)
    toast.success('Sayfa başarıyla oluşturuldu')
    router.push('/admin/sayfalar')
  } catch (error) {
    toast.error('Sayfa oluşturulurken bir hata oluştu')
  } finally {
    loading.value = false
  }
}
</script> 