<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <div class="mb-8">
      <h2 class="text-xl font-semibold text-gray-800">Referanslar Sayfası Tasarımı</h2>
      <p class="text-gray-600">Referanslar sayfasının tasarımını ve içeriğini buradan yönetebilirsiniz.</p>
    </div>

    <!-- Sayfa Başlığı -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Sayfa Başlığı</h3>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Ana Başlık</label>
          <input
            v-model="header.title"
            type="text"
            class="w-full border rounded-lg px-3 py-2"
            placeholder="Referanslarımız"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Alt Başlık</label>
          <textarea
            v-model="header.subtitle"
            rows="2"
            class="w-full border rounded-lg px-3 py-2"
            placeholder="Referanslarımız hakkında kısa açıklama"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Referans Kategorileri -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium">Kategoriler</h3>
        <button
          @click="addCategory"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <i class="fas fa-plus mr-2"></i>
          Kategori Ekle
        </button>
      </div>

      <div class="space-y-4">
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="border rounded-lg p-4"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-4">
              <input
                v-model="category.name"
                type="text"
                class="border rounded-lg px-3 py-2"
                placeholder="Kategori adı"
              >
              <button
                @click="removeCategory(index)"
                class="text-red-600 hover:text-red-700"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Referanslar -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium">Referanslar</h3>
        <button
          @click="addReference"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <i class="fas fa-plus mr-2"></i>
          Referans Ekle
        </button>
      </div>

      <div class="space-y-6">
        <div
          v-for="(reference, index) in references"
          :key="index"
          class="border rounded-lg p-4"
        >
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-md font-medium">Referans #{{ index + 1 }}</h4>
            <button
              @click="removeReference(index)"
              class="text-red-600 hover:text-red-700"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Firma Adı</label>
              <input
                v-model="reference.name"
                type="text"
                class="w-full border rounded-lg px-3 py-2"
                placeholder="Firma adı"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
              <select
                v-model="reference.category"
                class="w-full border rounded-lg px-3 py-2"
              >
                <option value="">Kategori seçin</option>
                <option
                  v-for="category in categories"
                  :key="category.name"
                  :value="category.name"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
              <textarea
                v-model="reference.description"
                rows="3"
                class="w-full border rounded-lg px-3 py-2"
                placeholder="Referans açıklaması"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Web Sitesi</label>
              <input
                v-model="reference.website"
                type="url"
                class="w-full border rounded-lg px-3 py-2"
                placeholder="https://www.example.com"
              >
            </div>

            <!-- Logo -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Logo</label>
              <div class="flex items-center space-x-4">
                <input
                  type="file"
                  @change="handleLogoUpload($event, reference)"
                  accept="image/*"
                  class="hidden"
                  :id="'logo-' + index"
                >
                <label
                  :for="'logo-' + index"
                  class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer"
                >
                  <i class="fas fa-upload mr-2"></i>
                  Logo Yükle
                </label>
                <img
                  v-if="reference.logo"
                  :src="reference.logo"
                  alt="Firma logosu"
                  class="h-12 rounded-lg"
                >
              </div>
            </div>

            <!-- Proje Görselleri -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Proje Görselleri</label>
              <div class="grid grid-cols-4 gap-4">
                <div
                  v-for="(image, imageIndex) in reference.images"
                  :key="imageIndex"
                  class="relative"
                >
                  <img
                    :src="image"
                    alt="Proje görseli"
                    class="w-full h-24 object-cover rounded-lg"
                  >
                  <button
                    @click="removeImage(reference, imageIndex)"
                    class="absolute top-1 right-1 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </div>
                <div>
                  <input
                    type="file"
                    @change="handleImageUpload($event, reference)"
                    accept="image/*"
                    class="hidden"
                    :id="'image-' + index"
                  >
                  <label
                    :for="'image-' + index"
                    class="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-600 hover:border-blue-500 hover:text-blue-500 cursor-pointer"
                  >
                    <i class="fas fa-plus"></i>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Kaydet Butonu -->
    <div class="flex justify-end">
      <button
        @click="saveChanges"
        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <i class="fas fa-save mr-2"></i>
        Değişiklikleri Kaydet
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDesignStore } from '@/stores/design'
import { useNotification } from '@/composables/useNotification'

const designStore = useDesignStore()
const { showNotification } = useNotification()

// Sayfa başlığı
const header = ref({
  title: 'Referanslarımız',
  subtitle: 'Başarıyla tamamladığımız projeler ve mutlu müşterilerimiz.'
})

// Kategoriler
const categories = ref([
  { name: 'Danışmanlık' },
  { name: 'Eğitim' },
  { name: 'Yazılım' }
])

// Referanslar
const references = ref([
  {
    name: 'Örnek Firma',
    category: 'Danışmanlık',
    description: 'Firma için yapılan çalışmalar hakkında detaylı açıklama.',
    website: 'https://www.example.com',
    logo: null,
    images: []
  }
])

// Kategori ekle/çıkar
const addCategory = () => {
  categories.value.push({ name: '' })
}

const removeCategory = (index: number) => {
  categories.value.splice(index, 1)
}

// Referans ekle/çıkar
const addReference = () => {
  references.value.push({
    name: '',
    category: '',
    description: '',
    website: '',
    logo: null,
    images: []
  })
}

const removeReference = (index: number) => {
  references.value.splice(index, 1)
}

// Logo yükleme
const handleLogoUpload = async (event: Event, reference: any) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await designStore.uploadMedia(formData)
      reference.logo = response.url
      
      showNotification({
        type: 'success',
        message: 'Logo başarıyla yüklendi.'
      })
    } catch (error) {
      showNotification({
        type: 'error',
        message: 'Logo yüklenirken bir hata oluştu.'
      })
    }
  }
}

// Görsel yükleme
const handleImageUpload = async (event: Event, reference: any) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await designStore.uploadMedia(formData)
      reference.images.push(response.url)
      
      showNotification({
        type: 'success',
        message: 'Görsel başarıyla yüklendi.'
      })
    } catch (error) {
      showNotification({
        type: 'error',
        message: 'Görsel yüklenirken bir hata oluştu.'
      })
    }
  }
}

// Görsel silme
const removeImage = (reference: any, index: number) => {
  reference.images.splice(index, 1)
}

// Değişiklikleri kaydet
const saveChanges = async () => {
  try {
    await designStore.saveReferencesDesign({
      header: header.value,
      categories: categories.value,
      references: references.value
    })
    
    showNotification({
      type: 'success',
      message: 'Değişiklikler başarıyla kaydedildi.'
    })
  } catch (error) {
    showNotification({
      type: 'error',
      message: 'Değişiklikler kaydedilirken bir hata oluştu.'
    })
  }
}
</script> 