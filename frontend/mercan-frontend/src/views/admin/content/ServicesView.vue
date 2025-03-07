<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Hizmet Yönetimi</h2>

    <!-- Hizmet Listesi -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Hizmetler</h3>
        <button @click="yeniHizmetEkle" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          <i class="fas fa-plus mr-2"></i>Yeni Hizmet
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Başlık</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Kategori</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Fiyat</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Durum</th>
              <th class="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="hizmet in hizmetler" :key="hizmet.id" class="border-b border-gray-200 dark:border-gray-700">
              <td class="px-4 py-3 text-sm text-gray-900 dark:text-white">{{ hizmet.baslik }}</td>
              <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{{ hizmet.kategori }}</td>
              <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{{ hizmet.fiyat }} ₺</td>
              <td class="px-4 py-3">
                <span :class="{
                  'px-2 py-1 text-xs rounded-full': true,
                  'bg-green-100 text-green-800': hizmet.durum === 'aktif',
                  'bg-red-100 text-red-800': hizmet.durum === 'pasif'
                }">
                  {{ hizmet.durum === 'aktif' ? 'Aktif' : 'Pasif' }}
                </span>
              </td>
              <td class="px-4 py-3 text-right space-x-2">
                <button @click="hizmetDuzenle(hizmet)" class="text-blue-500 hover:text-blue-600">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="hizmetSil(hizmet.id)" class="text-red-500 hover:text-red-600">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Hizmet Düzenleme/Ekleme Modalı -->
    <div v-if="modalAcik" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {{ duzenlemeModu ? 'Hizmet Düzenle' : 'Yeni Hizmet' }}
        </h3>

        <form @submit.prevent="hizmetKaydet" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Hizmet Başlığı
            </label>
            <input
              v-model="aktifHizmet.baslik"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Kategori
              </label>
              <select
                v-model="aktifHizmet.kategori"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="dijital-pazarlama">Dijital Pazarlama</option>
                <option value="web-tasarim">Web Tasarım</option>
                <option value="seo">SEO</option>
                <option value="sosyal-medya">Sosyal Medya</option>
                <option value="yapay-zeka">Yapay Zeka</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Durum
              </label>
              <select
                v-model="aktifHizmet.durum"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="aktif">Aktif</option>
                <option value="pasif">Pasif</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Kısa Açıklama
            </label>
            <textarea
              v-model="aktifHizmet.kisaAciklama"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Detaylı Açıklama
            </label>
            <textarea
              v-model="aktifHizmet.detayliAciklama"
              rows="6"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Fiyat (₺)
            </label>
            <input
              v-model="aktifHizmet.fiyat"
              type="number"
              min="0"
              step="0.01"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Özellikler (her satıra bir özellik)
            </label>
            <textarea
              v-model="aktifHizmet.ozellikler"
              rows="4"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Özellik 1&#10;Özellik 2&#10;Özellik 3"
            ></textarea>
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

interface Hizmet {
  id: number
  baslik: string
  kategori: string
  kisaAciklama: string
  detayliAciklama: string
  fiyat: number
  ozellikler: string
  durum: 'aktif' | 'pasif'
}

const hizmetler = ref<Hizmet[]>([
  {
    id: 1,
    baslik: 'Web Sitesi Tasarımı',
    kategori: 'web-tasarim',
    kisaAciklama: 'Modern ve responsive web sitesi tasarımı',
    detayliAciklama: 'İşletmeniz için özel tasarlanmış, modern ve mobil uyumlu web sitesi çözümleri.',
    fiyat: 5000,
    ozellikler: 'Responsive Tasarım\nSEO Uyumlu\nHızlı Yükleme\nYönetim Paneli',
    durum: 'aktif'
  },
  {
    id: 2,
    baslik: 'SEO Danışmanlığı',
    kategori: 'seo',
    kisaAciklama: 'Arama motoru optimizasyonu hizmetleri',
    detayliAciklama: 'Google ve diğer arama motorlarında üst sıralarda yer almanız için profesyonel SEO hizmetleri.',
    fiyat: 2500,
    ozellikler: 'Anahtar Kelime Analizi\nSite İçi SEO\nBacklink Çalışması\nRaporlama',
    durum: 'aktif'
  }
])

const modalAcik = ref(false)
const duzenlemeModu = ref(false)
const aktifHizmet = ref<Hizmet>({
  id: 0,
  baslik: '',
  kategori: 'web-tasarim',
  kisaAciklama: '',
  detayliAciklama: '',
  fiyat: 0,
  ozellikler: '',
  durum: 'aktif'
})

const yeniHizmetEkle = () => {
  duzenlemeModu.value = false
  aktifHizmet.value = {
    id: Math.max(0, ...hizmetler.value.map(h => h.id)) + 1,
    baslik: '',
    kategori: 'web-tasarim',
    kisaAciklama: '',
    detayliAciklama: '',
    fiyat: 0,
    ozellikler: '',
    durum: 'aktif'
  }
  modalAcik.value = true
}

const hizmetDuzenle = (hizmet: Hizmet) => {
  duzenlemeModu.value = true
  aktifHizmet.value = { ...hizmet }
  modalAcik.value = true
}

const hizmetSil = async (id: number) => {
  if (confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) {
    try {
      // API çağrısı yapılacak
      hizmetler.value = hizmetler.value.filter(h => h.id !== id)
    } catch (error) {
      console.error('Hizmet silinirken hata:', error)
    }
  }
}

const hizmetKaydet = async () => {
  try {
    if (duzenlemeModu.value) {
      // Güncelleme API çağrısı yapılacak
      const index = hizmetler.value.findIndex(h => h.id === aktifHizmet.value.id)
      if (index !== -1) {
        hizmetler.value[index] = { ...aktifHizmet.value }
      }
    } else {
      // Yeni hizmet ekleme API çağrısı yapılacak
      hizmetler.value.push({ ...aktifHizmet.value })
    }
    modalKapat()
  } catch (error) {
    console.error('Hizmet kaydedilirken hata:', error)
  }
}

const modalKapat = () => {
  modalAcik.value = false
  aktifHizmet.value = {
    id: 0,
    baslik: '',
    kategori: 'web-tasarim',
    kisaAciklama: '',
    detayliAciklama: '',
    fiyat: 0,
    ozellikler: '',
    durum: 'aktif'
  }
}
</script> 