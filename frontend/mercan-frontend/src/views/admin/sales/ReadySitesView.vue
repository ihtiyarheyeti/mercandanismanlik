<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Hazır Siteler Yönetimi</h2>

    <!-- Filtreler -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Kategori
          </label>
          <select 
            v-model="filtreler.kategori"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Tümü</option>
            <option v-for="kategori in kategoriler" :key="kategori" :value="kategori">
              {{ kategori }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Fiyat Aralığı
          </label>
          <div class="flex space-x-2">
            <input 
              v-model="filtreler.minFiyat"
              type="number"
              placeholder="Min"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <input 
              v-model="filtreler.maxFiyat"
              type="number"
              placeholder="Max"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Durum
          </label>
          <select 
            v-model="filtreler.durum"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Tümü</option>
            <option value="aktif">Aktif</option>
            <option value="pasif">Pasif</option>
            <option value="satildi">Satıldı</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Hazır Site Listesi -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Hazır Siteler</h3>
        <button @click="yeniSiteEkle" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          <i class="fas fa-plus mr-2"></i>Yeni Site Ekle
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="site in filtrelenmisHazirSiteler" :key="site.id" 
          class="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
          <div class="aspect-w-16 aspect-h-9 relative">
            <img 
              :src="site.onizlemeResmi" 
              :alt="site.baslik"
              class="w-full h-full object-cover"
              @error="(e: Event) => { const target = e.target as HTMLImageElement; if (target) target.src = '/images/default-site.png' }"
            />
            <div class="absolute top-2 right-2">
              <span :class="durumRengi(site.durum)" class="px-2 py-1 rounded-full text-xs font-medium">
                {{ site.durum }}
              </span>
            </div>
          </div>
          <div class="p-4">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {{ site.baslik }}
            </h4>
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {{ site.aciklama }}
            </p>
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {{ site.kategori }}
              </span>
              <span class="text-lg font-bold text-blue-500">
                {{ formatFiyat(site.fiyat) }} ₺
              </span>
            </div>
            <div class="flex space-x-2">
              <button @click="siteDuzenle(site)" class="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                <i class="fas fa-edit mr-2"></i>Düzenle
              </button>
              <button @click="siteSil(site.id)" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Site Ekleme/Düzenleme Modalı -->
    <div v-if="modalAcik" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {{ duzenlemeModu ? 'Hazır Site Düzenle' : 'Yeni Hazır Site Ekle' }}
        </h3>

        <form @submit.prevent="siteKaydet" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Site Başlığı
            </label>
            <input
              v-model="aktifSite.baslik"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Önizleme Resmi URL
            </label>
            <input
              v-model="aktifSite.onizlemeResmi"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Kategori
            </label>
            <select
              v-model="aktifSite.kategori"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
              <option v-for="kategori in kategoriler" :key="kategori" :value="kategori">
                {{ kategori }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Fiyat (₺)
            </label>
            <input
              v-model="aktifSite.fiyat"
              type="number"
              min="0"
              step="0.01"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Açıklama
            </label>
            <textarea
              v-model="aktifSite.aciklama"
              rows="4"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Özellikler
            </label>
            <div v-for="(ozellik, index) in aktifSite.ozellikler" :key="index" class="flex space-x-2 mb-2">
              <input
                v-model="aktifSite.ozellikler[index]"
                type="text"
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Özellik ekleyin"
              />
              <button 
                type="button"
                @click="ozellikSil(index)"
                class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
            <button 
              type="button"
              @click="ozellikEkle"
              class="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              <i class="fas fa-plus mr-2"></i>Özellik Ekle
            </button>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Durum
            </label>
            <select
              v-model="aktifSite.durum"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
              <option value="aktif">Aktif</option>
              <option value="pasif">Pasif</option>
              <option value="satildi">Satıldı</option>
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
import { ref, computed } from 'vue'

interface HazirSite {
  id: number
  baslik: string
  onizlemeResmi: string
  kategori: string
  fiyat: number
  aciklama: string
  ozellikler: string[]
  durum: 'aktif' | 'pasif' | 'satildi'
}

interface Filtreler {
  kategori: string
  minFiyat: number | null
  maxFiyat: number | null
  durum: string
}

const kategoriler = [
  'Kurumsal',
  'E-ticaret',
  'Blog',
  'Portfolio',
  'Landing Page',
  'Restoran',
  'Otel',
  'Emlak',
  'Eğitim'
]

const hazirSiteler = ref<HazirSite[]>([
  {
    id: 1,
    baslik: 'Modern Kurumsal Site',
    onizlemeResmi: '/images/sites/kurumsal-1.jpg',
    kategori: 'Kurumsal',
    fiyat: 2499.99,
    aciklama: 'Modern tasarımlı, responsive kurumsal web sitesi. Blog, hizmetler ve iletişim sayfaları dahil.',
    ozellikler: [
      'Responsive Tasarım',
      'Blog Sistemi',
      'İletişim Formu',
      'SEO Uyumlu',
      'Hızlı Yükleme'
    ],
    durum: 'aktif'
  },
  {
    id: 2,
    baslik: 'E-ticaret Çözümü',
    onizlemeResmi: '/images/sites/eticaret-1.jpg',
    kategori: 'E-ticaret',
    fiyat: 4999.99,
    aciklama: 'Tam donanımlı e-ticaret sitesi. Ödeme sistemi, stok takibi ve sipariş yönetimi dahil.',
    ozellikler: [
      'Ödeme Sistemi',
      'Stok Yönetimi',
      'Sipariş Takibi',
      'Üyelik Sistemi',
      'Mobil Uyumlu'
    ],
    durum: 'aktif'
  }
])

const filtreler = ref<Filtreler>({
  kategori: '',
  minFiyat: null,
  maxFiyat: null,
  durum: ''
})

const modalAcik = ref(false)
const duzenlemeModu = ref(false)
const aktifSite = ref<HazirSite>({
  id: 0,
  baslik: '',
  onizlemeResmi: '',
  kategori: kategoriler[0],
  fiyat: 0,
  aciklama: '',
  ozellikler: [],
  durum: 'aktif'
})

const filtrelenmisHazirSiteler = computed(() => {
  return hazirSiteler.value.filter(site => {
    const kategoriUygun = !filtreler.value.kategori || site.kategori === filtreler.value.kategori
    const minFiyatUygun = !filtreler.value.minFiyat || site.fiyat >= filtreler.value.minFiyat
    const maxFiyatUygun = !filtreler.value.maxFiyat || site.fiyat <= filtreler.value.maxFiyat
    const durumUygun = !filtreler.value.durum || site.durum === filtreler.value.durum

    return kategoriUygun && minFiyatUygun && maxFiyatUygun && durumUygun
  })
})

const formatFiyat = (fiyat: number): string => {
  return fiyat.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const durumRengi = (durum: string): string => {
  switch (durum) {
    case 'aktif':
      return 'bg-green-100 text-green-800'
    case 'pasif':
      return 'bg-gray-100 text-gray-800'
    case 'satildi':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const yeniSiteEkle = () => {
  duzenlemeModu.value = false
  aktifSite.value = {
    id: Math.max(0, ...hazirSiteler.value.map(s => s.id)) + 1,
    baslik: '',
    onizlemeResmi: '',
    kategori: kategoriler[0],
    fiyat: 0,
    aciklama: '',
    ozellikler: [],
    durum: 'aktif'
  }
  modalAcik.value = true
}

const siteDuzenle = (site: HazirSite) => {
  duzenlemeModu.value = true
  aktifSite.value = { ...site }
  modalAcik.value = true
}

const siteSil = async (id: number) => {
  if (confirm('Bu hazır siteyi silmek istediğinizden emin misiniz?')) {
    try {
      // API çağrısı yapılacak
      hazirSiteler.value = hazirSiteler.value.filter(s => s.id !== id)
    } catch (error) {
      console.error('Site silinirken hata:', error)
    }
  }
}

const siteKaydet = async () => {
  try {
    if (duzenlemeModu.value) {
      // Güncelleme API çağrısı yapılacak
      const index = hazirSiteler.value.findIndex(s => s.id === aktifSite.value.id)
      if (index !== -1) {
        hazirSiteler.value[index] = { ...aktifSite.value }
      }
    } else {
      // Yeni site ekleme API çağrısı yapılacak
      hazirSiteler.value.push({ ...aktifSite.value })
    }
    modalKapat()
  } catch (error) {
    console.error('Site kaydedilirken hata:', error)
  }
}

const ozellikEkle = () => {
  aktifSite.value.ozellikler.push('')
}

const ozellikSil = (index: number) => {
  aktifSite.value.ozellikler.splice(index, 1)
}

const modalKapat = () => {
  modalAcik.value = false
  aktifSite.value = {
    id: 0,
    baslik: '',
    onizlemeResmi: '',
    kategori: kategoriler[0],
    fiyat: 0,
    aciklama: '',
    ozellikler: [],
    durum: 'aktif'
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