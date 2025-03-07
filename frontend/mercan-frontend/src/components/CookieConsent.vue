<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import CookieManager from '@/services/CookieManager'

const showBanner = ref(false)
const showDetails = ref(false)
const cookieManager = CookieManager.getInstance()

const categories = ref(cookieManager.getCategories())
const cookies = computed(() => cookieManager.getCookies())

const cookiesByCategory = computed(() => ({
  necessary: cookieManager.getCookiesByCategory('necessary'),
  functional: cookieManager.getCookiesByCategory('functional'),
  analytics: cookieManager.getCookiesByCategory('analytics'),
  marketing: cookieManager.getCookiesByCategory('marketing')
}))

onMounted(() => {
  if (!localStorage.getItem('cookiePreferences')) {
    showBanner.value = true
  }
})

const acceptAll = () => {
  categories.value = {
    necessary: true,
    functional: true,
    analytics: true,
    marketing: true
  }
  savePreferences()
}

const acceptNecessary = () => {
  categories.value = {
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false
  }
  savePreferences()
}

const savePreferences = () => {
  cookieManager.savePreferences(categories.value)
  showBanner.value = false
  showDetails.value = false
}

const getCategoryTitle = (category: string): string => {
  const titles: Record<string, string> = {
    necessary: 'Zorunlu Çerezler',
    functional: 'Fonksiyonel Çerezler',
    analytics: 'Analitik Çerezler',
    marketing: 'Pazarlama Çerezleri'
  }
  return titles[category] || category
}

const getCategoryDescription = (category: string): string => {
  const descriptions: Record<string, string> = {
    necessary: 'Web sitesinin temel işlevleri için gerekli olan çerezler. Site bu çerezler olmadan düzgün çalışamaz.',
    functional: 'Size daha iyi bir kullanıcı deneyimi sağlamak için kullanılan çerezler. Tercihlerinizi hatırlar.',
    analytics: 'Siteyi nasıl kullandığınızı anlamamıza yardımcı olan çerezler. Bu bilgiler sitenin iyileştirilmesi için kullanılır.',
    marketing: 'Reklam ve pazarlama faaliyetleri için kullanılan çerezler. Size özel reklamlar göstermek için kullanılır.'
  }
  return descriptions[category] || ''
}
</script>

<template>
  <Transition name="slide-up">
    <div v-if="showBanner" class="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg shadow-lg z-50">
      <div class="container mx-auto p-4 md:p-6">
        <!-- Ana Banner -->
        <div v-if="!showDetails" class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">🍪 Çerez Politikası</h3>
            <p class="text-gray-600">
              Size daha iyi bir deneyim sunmak için çerezleri kullanıyoruz. Web sitemizi kullanarak,
              <RouterLink to="/cerez-politikasi" class="text-blue-600 hover:underline">çerez politikamızı</RouterLink>
              kabul etmiş olursunuz.
            </p>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-3">
            <button
              @click="showDetails = true"
              class="px-4 py-2 text-gray-600 hover:text-gray-800 underline"
            >
              Tercihleri Yönet
            </button>
            <button
              @click="acceptNecessary"
              class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Sadece Gerekli Olanlar
            </button>
            <button
              @click="acceptAll"
              class="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Tümünü Kabul Et
            </button>
          </div>
        </div>

        <!-- Detaylı Ayarlar -->
        <div v-else class="space-y-6">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-semibold text-gray-800">Çerez Tercihleri</h3>
            <button
              @click="showDetails = false"
              class="text-gray-500 hover:text-gray-700"
            >
              <span class="sr-only">Kapat</span>
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Çerez Kategorileri -->
          <div class="space-y-4">
            <div v-for="(categoryCookies, category) in cookiesByCategory" :key="category" class="border rounded-lg p-4">
              <div class="flex items-center justify-between mb-2">
                <div>
                  <h4 class="font-semibold text-gray-800">{{ getCategoryTitle(category) }}</h4>
                  <p class="text-sm text-gray-600">{{ getCategoryDescription(category) }}</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    v-model="categories[category]"
                    :disabled="category === 'necessary'"
                    class="sr-only peer"
                  >
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <!-- Kategori Detayları -->
              <div class="mt-4 bg-gray-50 rounded-lg p-4">
                <table class="w-full text-sm">
                  <thead>
                    <tr class="text-left text-gray-600">
                      <th class="pb-2">Çerez</th>
                      <th class="pb-2">Açıklama</th>
                      <th class="pb-2">Süre</th>
                      <th class="pb-2">Sağlayıcı</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    <tr v-for="cookie in categoryCookies" :key="cookie.name" class="text-gray-700">
                      <td class="py-2">{{ cookie.name }}</td>
                      <td class="py-2">{{ cookie.description }}</td>
                      <td class="py-2">{{ cookie.duration }}</td>
                      <td class="py-2">{{ cookie.provider }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Kaydet Butonu -->
          <div class="flex justify-end gap-3">
            <button
              @click="showDetails = false"
              class="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              İptal
            </button>
            <button
              @click="savePreferences"
              class="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Tercihleri Kaydet
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-out;
}

.slide-up-enter-from {
  transform: translateY(100%);
}

.slide-up-leave-to {
  transform: translateY(100%);
}
</style> 