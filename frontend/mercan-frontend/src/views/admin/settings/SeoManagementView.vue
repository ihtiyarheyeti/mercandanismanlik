<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold mb-6">SEO Yönetimi</h2>

    <div class="bg-white rounded-lg shadow p-6">
      <form @submit.prevent="saveSeoSettings">
        <!-- Meta Etiketleri -->
        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-4">Meta Etiketleri</h3>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Meta Başlık
            </label>
            <input
              v-model="seoSettings.metaTitle"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Site Meta Başlığı"
            />
            <p class="mt-1 text-sm text-gray-500">Önerilen uzunluk: 50-60 karakter</p>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Meta Açıklama
            </label>
            <textarea
              v-model="seoSettings.metaDescription"
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows="3"
              placeholder="Site Meta Açıklaması"
            ></textarea>
            <p class="mt-1 text-sm text-gray-500">Önerilen uzunluk: 150-160 karakter</p>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Meta Anahtar Kelimeler
            </label>
            <input
              v-model="seoSettings.metaKeywords"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Örnek: seo, web tasarım, dijital pazarlama (virgülle ayırın)"
            />
            <p class="mt-1 text-sm text-gray-500">Anahtar kelimeleri virgülle ayırarak yazın</p>
          </div>
        </div>

        <!-- Robots.txt -->
        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-4">Robots.txt</h3>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Robots.txt İçeriği
            </label>
            <textarea
              v-model="seoSettings.robotsTxt"
              class="w-full px-3 py-2 border border-gray-300 rounded-md font-mono"
              rows="6"
              placeholder="User-agent: *&#10;Allow: /&#10;Disallow: /admin/"
            ></textarea>
          </div>
        </div>

        <!-- Site Haritası -->
        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-4">Site Haritası</h3>
          
          <div class="flex items-center mb-4">
            <input
              v-model="seoSettings.autoGenerateSitemap"
              type="checkbox"
              class="h-4 w-4 text-blue-600"
              id="autoGenerate"
            />
            <label for="autoGenerate" class="ml-2 text-sm text-gray-700">
              Site haritasını otomatik oluştur
            </label>
          </div>

          <div class="flex items-center mb-4">
            <input
              v-model="seoSettings.includeImagesSitemap"
              type="checkbox"
              class="h-4 w-4 text-blue-600"
              id="includeImages"
            />
            <label for="includeImages" class="ml-2 text-sm text-gray-700">
              Görselleri site haritasına dahil et
            </label>
          </div>

          <div class="flex items-center mb-4">
            <input
              v-model="seoSettings.submitToSearchEngines"
              type="checkbox"
              class="h-4 w-4 text-blue-600"
              id="submitToSearchEngines"
            />
            <label for="submitToSearchEngines" class="ml-2 text-sm text-gray-700">
              Site haritasını arama motorlarına otomatik gönder
            </label>
          </div>

          <div class="flex gap-4">
            <button
              type="button"
              @click="generateSitemap"
              class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              :disabled="isGenerating"
            >
              {{ isGenerating ? 'Oluşturuluyor...' : 'Site Haritası Oluştur' }}
            </button>

            <button
              type="button"
              @click="submitSitemap"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Gönderiliyor...' : 'Arama Motorlarına Gönder' }}
            </button>
          </div>
        </div>

        <!-- URL Yapısı -->
        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-4">URL Yapısı</h3>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              URL Formatı
            </label>
            <select
              v-model="seoSettings.urlStructure"
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="plain">Düz URL (/sayfa-basligi)</option>
              <option value="category">Kategorili URL (/kategori/sayfa-basligi)</option>
            </select>
          </div>
        </div>

        <!-- Kaydet Butonu -->
        <div class="flex justify-end">
          <button
            type="submit"
            class="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            :disabled="isSaving"
          >
            {{ isSaving ? 'Kaydediliyor...' : 'Kaydet' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from 'vue-toastification'

const toast = useToast()
const settingsStore = useSettingsStore()

const seoSettings = ref({
  metaTitle: '',
  metaDescription: '',
  metaKeywords: '',
  robotsTxt: '',
  urlStructure: 'plain',
  autoGenerateSitemap: true,
  includeImagesSitemap: true,
  submitToSearchEngines: true
})

const isSaving = ref(false)
const isGenerating = ref(false)
const isSubmitting = ref(false)

onMounted(async () => {
  try {
    await settingsStore.fetchSettings()
    seoSettings.value = { ...settingsStore.seoSettings }
  } catch (error) {
    console.error('SEO ayarları yüklenirken hata:', error)
    toast.error('SEO ayarları yüklenirken bir hata oluştu')
  }
})

const saveSeoSettings = async () => {
  isSaving.value = true
  try {
    await settingsStore.updateSeoSettings(seoSettings.value)
    toast.success('SEO ayarları başarıyla kaydedildi')
  } catch (error) {
    console.error('SEO ayarları kaydedilirken hata:', error)
    toast.error('SEO ayarları kaydedilirken bir hata oluştu')
  } finally {
    isSaving.value = false
  }
}

const generateSitemap = async () => {
  isGenerating.value = true
  try {
    await settingsStore.generateSitemap()
    toast.success('Site haritası başarıyla oluşturuldu')
  } catch (error) {
    console.error('Site haritası oluşturulurken hata:', error)
    toast.error('Site haritası oluşturulurken bir hata oluştu')
  } finally {
    isGenerating.value = false
  }
}

const submitSitemap = async () => {
  isSubmitting.value = true
  try {
    await settingsStore.submitSitemap()
    toast.success('Site haritası arama motorlarına gönderildi')
  } catch (error) {
    console.error('Site haritası gönderilirken hata:', error)
    toast.error('Site haritası gönderilirken bir hata oluştu')
  } finally {
    isSubmitting.value = false
  }
}
</script> 