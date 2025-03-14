<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <div class="mb-8">
      <h2 class="text-xl font-semibold text-gray-800">Blog Sayfası Tasarımı</h2>
      <p class="text-gray-600">Blog sayfasının tasarımını ve içeriğini buradan yönetebilirsiniz.</p>
    </div>

    <!-- Blog Kategorileri -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Kategoriler</h3>
      <div class="space-y-4">
        <div v-for="(category, index) in categories" :key="index" class="flex items-center space-x-4">
          <input
            v-model="category.name"
            type="text"
            class="flex-1 border rounded-lg px-3 py-2"
            placeholder="Kategori adı"
          >
          <input
            v-model="category.slug"
            type="text"
            class="flex-1 border rounded-lg px-3 py-2"
            placeholder="Kategori URL"
          >
          <button @click="removeCategory(index)" class="text-red-600 hover:text-red-700">
            <i class="fas fa-trash"></i>
          </button>
        </div>
        <button
          @click="addCategory"
          class="text-blue-600 hover:text-blue-700"
        >
          <i class="fas fa-plus mr-1"></i> Kategori Ekle
        </button>
      </div>
    </div>

    <!-- Blog Listesi Tasarımı -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Blog Listesi Görünümü</h3>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Sayfa Başına Gösterilecek Blog Sayısı</label>
          <input
            v-model="listSettings.perPage"
            type="number"
            min="1"
            class="w-32 border rounded-lg px-3 py-2"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Sıralama</label>
          <select v-model="listSettings.sortBy" class="border rounded-lg px-3 py-2">
            <option value="date_desc">En Yeni</option>
            <option value="date_asc">En Eski</option>
            <option value="title_asc">Başlık (A-Z)</option>
            <option value="title_desc">Başlık (Z-A)</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Kart Tasarımı</label>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Arkaplan Rengi</label>
              <input v-model="listSettings.cardColors.background" type="color" class="w-full h-10 rounded-lg">
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Yazı Rengi</label>
              <input v-model="listSettings.cardColors.text" type="color" class="w-full h-10 rounded-lg">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Blog Detay Sayfası Tasarımı -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Blog Detay Sayfası</h3>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Yazı Tipi</label>
          <select v-model="detailSettings.font" class="border rounded-lg px-3 py-2">
            <option value="serif">Serif</option>
            <option value="sans">Sans-serif</option>
            <option value="mono">Monospace</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Yazı Boyutu</label>
          <input
            v-model="detailSettings.fontSize"
            type="number"
            min="12"
            max="24"
            class="w-32 border rounded-lg px-3 py-2"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Sosyal Medya Paylaşım Butonları</label>
          <div class="space-x-4">
            <label class="inline-flex items-center">
              <input v-model="detailSettings.socialShare.facebook" type="checkbox" class="form-checkbox">
              <span class="ml-2">Facebook</span>
            </label>
            <label class="inline-flex items-center">
              <input v-model="detailSettings.socialShare.twitter" type="checkbox" class="form-checkbox">
              <span class="ml-2">Twitter</span>
            </label>
            <label class="inline-flex items-center">
              <input v-model="detailSettings.socialShare.linkedin" type="checkbox" class="form-checkbox">
              <span class="ml-2">LinkedIn</span>
            </label>
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

// Kategoriler
const categories = ref([
  { name: 'Dijital Pazarlama', slug: 'dijital-pazarlama' },
  { name: 'SEO', slug: 'seo' },
  { name: 'Web Tasarım', slug: 'web-tasarim' }
])

// Liste görünümü ayarları
const listSettings = ref({
  perPage: 12,
  sortBy: 'date_desc',
  cardColors: {
    background: '#ffffff',
    text: '#1f2937'
  }
})

// Detay sayfası ayarları
const detailSettings = ref({
  font: 'sans',
  fontSize: 16,
  socialShare: {
    facebook: true,
    twitter: true,
    linkedin: true
  }
})

// Kategori ekle/çıkar
const addCategory = () => {
  categories.value.push({ name: '', slug: '' })
}

const removeCategory = (index: number) => {
  categories.value.splice(index, 1)
}

// Değişiklikleri kaydet
const saveChanges = async () => {
  try {
    await designStore.saveBlogDesign({
      categories: categories.value,
      listSettings: listSettings.value,
      detailSettings: detailSettings.value
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