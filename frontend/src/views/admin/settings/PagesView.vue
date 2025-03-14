<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Sayfa Yönetimi</h2>

    <!-- Sayfa Listesi -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Sayfalar</h3>
        <button @click="yeniSayfaEkle" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          <i class="fas fa-plus mr-2"></i>Yeni Sayfa
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Başlık</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">URL</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Durum</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Son Güncelleme</th>
              <th class="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sayfa in sayfalar" :key="sayfa.id" class="border-b border-gray-200 dark:border-gray-700">
              <td class="px-4 py-3 text-sm text-gray-900 dark:text-white">{{ sayfa.baslik }}</td>
              <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{{ sayfa.url }}</td>
              <td class="px-4 py-3">
                <span :class="{
                  'px-2 py-1 text-xs rounded-full': true,
                  'bg-green-100 text-green-800': sayfa.durum === 'yayinda',
                  'bg-yellow-100 text-yellow-800': sayfa.durum === 'taslak'
                }">
                  {{ sayfa.durum === 'yayinda' ? 'Yayında' : 'Taslak' }}
                </span>
              </td>
              <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                {{ new Date(sayfa.sonGuncelleme).toLocaleDateString('tr-TR') }}
              </td>
              <td class="px-4 py-3 text-right space-x-2">
                <button @click="sayfaDuzenle(sayfa)" class="text-blue-500 hover:text-blue-600">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="sayfaSil(sayfa.id)" class="text-red-500 hover:text-red-600">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Sayfa Düzenleme/Ekleme Modalı -->
    <div v-if="modalAcik" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {{ duzenlemeModu ? 'Sayfa Düzenle' : 'Yeni Sayfa Ekle' }}
        </h3>

        <form @submit.prevent="sayfaKaydet" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sayfa Başlığı
            </label>
            <input
              v-model="aktifSayfa.baslik"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              URL (Slug)
            </label>
            <input
              v-model="aktifSayfa.url"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              İçerik
            </label>
            <textarea
              v-model="aktifSayfa.icerik"
              rows="10"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Durum
            </label>
            <select
              v-model="aktifSayfa.durum"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="taslak">Taslak</option>
              <option value="yayinda">Yayında</option>
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

interface Sayfa {
  id: number
  baslik: string
  url: string
  icerik: string
  durum: 'taslak' | 'yayinda'
  sonGuncelleme: string
}

const sayfalar = ref<Sayfa[]>([
  {
    id: 1,
    baslik: 'Anasayfa',
    url: '/',
    icerik: 'Anasayfa içeriği...',
    durum: 'yayinda',
    sonGuncelleme: new Date().toISOString()
  },
  {
    id: 2,
    baslik: 'Hakkımızda',
    url: '/hakkimizda',
    icerik: 'Hakkımızda sayfası içeriği...',
    durum: 'yayinda',
    sonGuncelleme: new Date().toISOString()
  }
])

const modalAcik = ref(false)
const duzenlemeModu = ref(false)
const aktifSayfa = ref<Sayfa>({
  id: 0,
  baslik: '',
  url: '',
  icerik: '',
  durum: 'taslak',
  sonGuncelleme: new Date().toISOString()
})

const yeniSayfaEkle = () => {
  duzenlemeModu.value = false
  aktifSayfa.value = {
    id: Math.max(0, ...sayfalar.value.map(s => s.id)) + 1,
    baslik: '',
    url: '',
    icerik: '',
    durum: 'taslak',
    sonGuncelleme: new Date().toISOString()
  }
  modalAcik.value = true
}

const sayfaDuzenle = (sayfa: Sayfa) => {
  duzenlemeModu.value = true
  aktifSayfa.value = { ...sayfa }
  modalAcik.value = true
}

const sayfaSil = async (id: number) => {
  if (confirm('Bu sayfayı silmek istediğinizden emin misiniz?')) {
    try {
      // API çağrısı yapılacak
      sayfalar.value = sayfalar.value.filter(s => s.id !== id)
    } catch (error) {
      console.error('Sayfa silinirken hata:', error)
    }
  }
}

const sayfaKaydet = async () => {
  try {
    if (duzenlemeModu.value) {
      // Güncelleme API çağrısı yapılacak
      const index = sayfalar.value.findIndex(s => s.id === aktifSayfa.value.id)
      if (index !== -1) {
        sayfalar.value[index] = { ...aktifSayfa.value }
      }
    } else {
      // Yeni sayfa ekleme API çağrısı yapılacak
      sayfalar.value.push({ ...aktifSayfa.value })
    }
    modalKapat()
  } catch (error) {
    console.error('Sayfa kaydedilirken hata:', error)
  }
}

const modalKapat = () => {
  modalAcik.value = false
  aktifSayfa.value = {
    id: 0,
    baslik: '',
    url: '',
    icerik: '',
    durum: 'taslak',
    sonGuncelleme: new Date().toISOString()
  }
}
</script> 