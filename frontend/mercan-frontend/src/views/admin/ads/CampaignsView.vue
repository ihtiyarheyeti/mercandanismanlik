<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Kampanya Yönetimi</h2>

    <!-- Kampanya Ekleme Butonu -->
    <div class="mb-6">
      <button @click="yeniKampanyaEkle" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        <i class="fas fa-plus mr-2"></i>Yeni Kampanya
      </button>
    </div>

    <!-- Kampanya Listesi -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="kampanya in kampanyalar" :key="kampanya.id" 
        class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div class="relative">
          <img 
            :src="kampanya.gorsel" 
            :alt="kampanya.baslik"
            class="w-full h-48 object-cover"
            @error="(e) => { if (e.target instanceof HTMLImageElement) e.target.src = '/images/default-campaign.jpg' }"
          />
          <span :class="[
            'absolute top-4 right-4 px-2 py-1 text-xs rounded-full',
            kampanya.durum === 'aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          ]">
            {{ kampanya.durum === 'aktif' ? 'Aktif' : 'Pasif' }}
          </span>
        </div>
        
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {{ kampanya.baslik }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            {{ kampanya.aciklama }}
          </p>
          
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400">Başlangıç:</span>
              <span class="text-gray-900 dark:text-white">
                {{ new Date(kampanya.baslangicTarihi).toLocaleDateString('tr-TR') }}
              </span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400">Bitiş:</span>
              <span class="text-gray-900 dark:text-white">
                {{ new Date(kampanya.bitisTarihi).toLocaleDateString('tr-TR') }}
              </span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400">Bütçe:</span>
              <span class="text-gray-900 dark:text-white">
                {{ formatFiyat(kampanya.butce) }} ₺
              </span>
            </div>
          </div>

          <div class="mt-6 flex justify-end space-x-2">
            <button @click="kampanyaDuzenle(kampanya)" class="text-blue-500 hover:text-blue-600">
              <i class="fas fa-edit"></i>
            </button>
            <button @click="kampanyaSil(kampanya.id)" class="text-red-500 hover:text-red-600">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Kampanya Ekleme/Düzenleme Modalı -->
    <div v-if="modalAcik" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {{ duzenlemeModu ? 'Kampanya Düzenle' : 'Yeni Kampanya Ekle' }}
        </h3>

        <form @submit.prevent="kampanyaKaydet" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Kampanya Başlığı
            </label>
            <input
              v-model="aktifKampanya.baslik"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Açıklama
            </label>
            <textarea
              v-model="aktifKampanya.aciklama"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Görsel URL
            </label>
            <input
              v-model="aktifKampanya.gorsel"
              type="url"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Başlangıç Tarihi
              </label>
              <input
                v-model="aktifKampanya.baslangicTarihi"
                type="date"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bitiş Tarihi
              </label>
              <input
                v-model="aktifKampanya.bitisTarihi"
                type="date"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Bütçe (₺)
            </label>
            <input
              v-model="aktifKampanya.butce"
              type="number"
              min="0"
              step="0.01"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Durum
            </label>
            <select
              v-model="aktifKampanya.durum"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="aktif">Aktif</option>
              <option value="pasif">Pasif</option>
            </select>
          </div>

          <div class="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              @click="modalKapat"
              class="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              İptal
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {{ duzenlemeModu ? 'Güncelle' : 'Kaydet' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Kampanya {
  id: number
  baslik: string
  aciklama: string
  gorsel: string
  baslangicTarihi: string
  bitisTarihi: string
  butce: number
  durum: 'aktif' | 'pasif'
}

const kampanyalar = ref<Kampanya[]>([
  {
    id: 1,
    baslik: 'Yaz Sezonu İndirimi',
    aciklama: 'Tüm web tasarım paketlerinde %20 indirim fırsatı!',
    gorsel: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
    baslangicTarihi: '2024-06-01',
    bitisTarihi: '2024-08-31',
    butce: 5000,
    durum: 'aktif'
  },
  {
    id: 2,
    baslik: 'Dijital Pazarlama Paketi',
    aciklama: 'SEO ve sosyal medya yönetimi bir arada!',
    gorsel: 'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg',
    baslangicTarihi: '2024-03-01',
    bitisTarihi: '2024-05-31',
    butce: 7500,
    durum: 'aktif'
  }
])

const modalAcik = ref(false)
const duzenlemeModu = ref(false)
const aktifKampanya = ref<Kampanya>({
  id: 0,
  baslik: '',
  aciklama: '',
  gorsel: '',
  baslangicTarihi: '',
  bitisTarihi: '',
  butce: 0,
  durum: 'aktif'
})

const formatFiyat = (fiyat: number): string => {
  return fiyat.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const yeniKampanyaEkle = () => {
  duzenlemeModu.value = false
  aktifKampanya.value = {
    id: Math.max(0, ...kampanyalar.value.map(k => k.id)) + 1,
    baslik: '',
    aciklama: '',
    gorsel: '',
    baslangicTarihi: '',
    bitisTarihi: '',
    butce: 0,
    durum: 'aktif'
  }
  modalAcik.value = true
}

const kampanyaDuzenle = (kampanya: Kampanya) => {
  duzenlemeModu.value = true
  aktifKampanya.value = { ...kampanya }
  modalAcik.value = true
}

const kampanyaSil = async (id: number) => {
  if (confirm('Bu kampanyayı silmek istediğinizden emin misiniz?')) {
    try {
      // API çağrısı yapılacak
      kampanyalar.value = kampanyalar.value.filter(k => k.id !== id)
    } catch (error) {
      console.error('Kampanya silinirken hata:', error)
    }
  }
}

const kampanyaKaydet = async () => {
  try {
    if (duzenlemeModu.value) {
      // Güncelleme API çağrısı yapılacak
      const index = kampanyalar.value.findIndex(k => k.id === aktifKampanya.value.id)
      if (index !== -1) {
        kampanyalar.value[index] = { ...aktifKampanya.value }
      }
    } else {
      // Yeni kampanya ekleme API çağrısı yapılacak
      kampanyalar.value.push({ ...aktifKampanya.value })
    }
    modalKapat()
  } catch (error) {
    console.error('Kampanya kaydedilirken hata:', error)
  }
}

const modalKapat = () => {
  modalAcik.value = false
  aktifKampanya.value = {
    id: 0,
    baslik: '',
    aciklama: '',
    gorsel: '',
    baslangicTarihi: '',
    bitisTarihi: '',
    butce: 0,
    durum: 'aktif'
  }
}
</script> 