<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Reklam Bütçesi Yönetimi</h2>

    <!-- Bütçe Özeti -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          Toplam Bütçe
        </h3>
        <p class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ formatFiyat(butceOzeti.toplamButce) }} ₺
        </p>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Yıllık bütçe
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          Harcanan
        </h3>
        <p class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ formatFiyat(butceOzeti.harcanan) }} ₺
        </p>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Bu ay: {{ formatFiyat(butceOzeti.buAyHarcanan) }} ₺
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          Kalan
        </h3>
        <p class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ formatFiyat(butceOzeti.kalan) }} ₺
        </p>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Günlük limit: {{ formatFiyat(butceOzeti.gunlukLimit) }} ₺
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          ROI
        </h3>
        <p class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ butceOzeti.roi }}%
        </p>
        <p :class="[
          'text-sm mt-2',
          butceOzeti.roiDegisim > 0 ? 'text-green-600' : 'text-red-600'
        ]">
          {{ butceOzeti.roiDegisim > 0 ? '+' : '' }}{{ butceOzeti.roiDegisim }}%
        </p>
      </div>
    </div>

    <!-- Platform Bazlı Bütçe -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Platform Bazlı Bütçe</h3>
      
      <div class="space-y-6">
        <div v-for="platform in platformButceleri" :key="platform.id" class="space-y-2">
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ platform.ad }}</span>
            <span class="text-sm text-gray-600 dark:text-gray-400">
              {{ formatFiyat(platform.harcanan) }} / {{ formatFiyat(platform.butce) }} ₺
            </span>
          </div>
          <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div
              class="h-full rounded-full"
              :class="{
                'bg-green-500': (platform.harcanan / platform.butce) < 0.8,
                'bg-yellow-500': (platform.harcanan / platform.butce) >= 0.8 && (platform.harcanan / platform.butce) < 0.95,
                'bg-red-500': (platform.harcanan / platform.butce) >= 0.95
              }"
              :style="{ width: `${Math.min((platform.harcanan / platform.butce) * 100, 100)}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bütçe Ayarları -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Bütçe Ayarları</h3>
        <button @click="ayarlariKaydet" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Değişiklikleri Kaydet
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Yıllık Bütçe
          </label>
          <div class="flex items-center">
            <input
              v-model="ayarlar.yillikButce"
              type="number"
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <span class="ml-2 text-gray-600 dark:text-gray-400">₺</span>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Günlük Limit
          </label>
          <div class="flex items-center">
            <input
              v-model="ayarlar.gunlukLimit"
              type="number"
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <span class="ml-2 text-gray-600 dark:text-gray-400">₺</span>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Otomatik Bütçe Optimizasyonu
          </label>
          <div class="flex items-center mt-2">
            <input
              v-model="ayarlar.otomatikOptimizasyon"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">
              Performansa göre bütçeyi otomatik optimize et
            </span>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Bütçe Aşımı Uyarıları
          </label>
          <div class="flex items-center mt-2">
            <input
              v-model="ayarlar.butceUyarilari"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">
              Bütçe limitleri aşıldığında e-posta bildirimi gönder
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface ButceOzeti {
  toplamButce: number
  harcanan: number
  buAyHarcanan: number
  kalan: number
  gunlukLimit: number
  roi: number
  roiDegisim: number
}

interface PlatformButce {
  id: number
  ad: string
  butce: number
  harcanan: number
}

interface ButceAyarlari {
  yillikButce: number
  gunlukLimit: number
  otomatikOptimizasyon: boolean
  butceUyarilari: boolean
}

const butceOzeti = ref<ButceOzeti>({
  toplamButce: 120000,
  harcanan: 45000,
  buAyHarcanan: 5000,
  kalan: 75000,
  gunlukLimit: 500,
  roi: 245,
  roiDegisim: 12
})

const platformButceleri = ref<PlatformButce[]>([
  {
    id: 1,
    ad: 'Google Ads',
    butce: 60000,
    harcanan: 25000
  },
  {
    id: 2,
    ad: 'Facebook Ads',
    butce: 40000,
    harcanan: 15000
  },
  {
    id: 3,
    ad: 'Instagram Ads',
    butce: 20000,
    harcanan: 5000
  }
])

const ayarlar = ref<ButceAyarlari>({
  yillikButce: 120000,
  gunlukLimit: 500,
  otomatikOptimizasyon: true,
  butceUyarilari: true
})

const formatFiyat = (fiyat: number): string => {
  return fiyat.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const ayarlariKaydet = async () => {
  try {
    // API'ye kaydetme işlemi burada yapılacak
    console.log('Bütçe ayarları kaydediliyor:', ayarlar.value)
  } catch (error) {
    console.error('Bütçe ayarları kaydedilirken hata:', error)
  }
}
</script> 