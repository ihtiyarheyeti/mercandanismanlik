<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Referans Yönetimi</h2>

    <!-- Referans Listesi -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Referanslar</h3>
        <button @click="yeniReferansEkle" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          <i class="fas fa-plus mr-2"></i>Yeni Referans
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="referans in referanslar" :key="referans.id" 
          class="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
          <div class="aspect-w-16 aspect-h-9 relative">
            <img 
              :src="referans.logo" 
              :alt="referans.firmaAdi"
              class="w-full h-full object-cover"
              @error="(e: Event) => { if (e.target instanceof HTMLImageElement) e.target.src = '/images/default-logo.png' }"
            />
          </div>
          <div class="p-4">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {{ referans.firmaAdi }}
            </h4>
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {{ referans.aciklama }}
            </p>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {{ referans.sektor }}
              </span>
              <div class="flex space-x-2">
                <button @click="referansDuzenle(referans)" class="text-blue-500 hover:text-blue-600">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="referansSil(referans.id)" class="text-red-500 hover:text-red-600">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Referans Düzenleme/Ekleme Modalı -->
    <div v-if="modalAcik" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {{ duzenlemeModu ? 'Referans Düzenle' : 'Yeni Referans' }}
        </h3>

        <form @submit.prevent="referansKaydet" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Firma Adı
            </label>
            <input
              v-model="aktifReferans.firmaAdi"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Logo URL
            </label>
            <input
              v-model="aktifReferans.logo"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sektör
            </label>
            <input
              v-model="aktifReferans.sektor"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Website
            </label>
            <input
              v-model="aktifReferans.website"
              type="url"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Açıklama
            </label>
            <textarea
              v-model="aktifReferans.aciklama"
              rows="4"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Yapılan İşler
            </label>
            <textarea
              v-model="aktifReferans.yapilanIsler"
              rows="4"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Her satıra bir iş yazın"
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

interface Referans {
  id: number
  firmaAdi: string
  logo: string
  sektor: string
  website: string
  aciklama: string
  yapilanIsler: string
}

const referanslar = ref<Referans[]>([
  {
    id: 1,
    firmaAdi: 'ABC Teknoloji',
    logo: '/images/referanslar/abc-tech.png',
    sektor: 'Teknoloji',
    website: 'https://www.abctech.com',
    aciklama: 'E-ticaret platformu geliştirme ve dijital pazarlama hizmetleri',
    yapilanIsler: 'Web Sitesi Tasarımı\nSEO Optimizasyonu\nSosyal Medya Yönetimi'
  },
  {
    id: 2,
    firmaAdi: 'XYZ Holding',
    logo: '/images/referanslar/xyz-holding.png',
    sektor: 'Finans',
    website: 'https://www.xyzholding.com',
    aciklama: 'Kurumsal web sitesi ve dijital dönüşüm danışmanlığı',
    yapilanIsler: 'Kurumsal Web Sitesi\nİçerik Yönetimi\nAnalitik Raporlama'
  }
])

const modalAcik = ref(false)
const duzenlemeModu = ref(false)
const aktifReferans = ref<Referans>({
  id: 0,
  firmaAdi: '',
  logo: '',
  sektor: '',
  website: '',
  aciklama: '',
  yapilanIsler: ''
})

const yeniReferansEkle = () => {
  duzenlemeModu.value = false
  aktifReferans.value = {
    id: Math.max(0, ...referanslar.value.map(r => r.id)) + 1,
    firmaAdi: '',
    logo: '',
    sektor: '',
    website: '',
    aciklama: '',
    yapilanIsler: ''
  }
  modalAcik.value = true
}

const referansDuzenle = (referans: Referans) => {
  duzenlemeModu.value = true
  aktifReferans.value = { ...referans }
  modalAcik.value = true
}

const referansSil = async (id: number) => {
  if (confirm('Bu referansı silmek istediğinizden emin misiniz?')) {
    try {
      // API çağrısı yapılacak
      referanslar.value = referanslar.value.filter(r => r.id !== id)
    } catch (error) {
      console.error('Referans silinirken hata:', error)
    }
  }
}

const referansKaydet = async () => {
  try {
    if (duzenlemeModu.value) {
      // Güncelleme API çağrısı yapılacak
      const index = referanslar.value.findIndex(r => r.id === aktifReferans.value.id)
      if (index !== -1) {
        referanslar.value[index] = { ...aktifReferans.value }
      }
    } else {
      // Yeni referans ekleme API çağrısı yapılacak
      referanslar.value.push({ ...aktifReferans.value })
    }
    modalKapat()
  } catch (error) {
    console.error('Referans kaydedilirken hata:', error)
  }
}

const modalKapat = () => {
  modalAcik.value = false
  aktifReferans.value = {
    id: 0,
    firmaAdi: '',
    logo: '',
    sektor: '',
    website: '',
    aciklama: '',
    yapilanIsler: ''
  }
}
</script>

<style scoped>
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
}

.aspect-w-16 img {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  object-fit: cover;
}
</style> 