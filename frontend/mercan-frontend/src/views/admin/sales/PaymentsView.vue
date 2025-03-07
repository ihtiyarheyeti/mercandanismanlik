<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Ödeme Yönetimi</h2>

    <!-- Filtreler -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Durum
          </label>
          <select 
            v-model="filtreler.durum"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Tümü</option>
            <option value="beklemede">Beklemede</option>
            <option value="onaylandi">Onaylandı</option>
            <option value="iptal">İptal Edildi</option>
            <option value="iade">İade Edildi</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tarih Aralığı
          </label>
          <div class="flex space-x-2">
            <input 
              v-model="filtreler.baslangicTarihi"
              type="date"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <input 
              v-model="filtreler.bitisTarihi"
              type="date"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Ödeme Yöntemi
          </label>
          <select 
            v-model="filtreler.yontem"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Tümü</option>
            <option value="kredi_karti">Kredi Kartı</option>
            <option value="havale">Havale/EFT</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Arama
          </label>
          <input 
            v-model="filtreler.arama"
            type="text"
            placeholder="İşlem no veya müşteri adı"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>
    </div>

    <!-- Ödeme Listesi -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-50 dark:bg-gray-700">
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                İşlem No
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Müşteri
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Tutar
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Yöntem
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Durum
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Tarih
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="odeme in filtrelenmisOdemeler" :key="odeme.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                #{{ odeme.islemNo }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {{ odeme.musteriAdi }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {{ formatFiyat(odeme.tutar) }} ₺
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {{ odemeYontemiText(odeme.yontem) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="durumRengi(odeme.durum)" class="px-2 py-1 text-xs rounded-full">
                  {{ odeme.durum }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {{ new Date(odeme.tarih).toLocaleDateString('tr-TR') }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button @click="odemeDuzenle(odeme)" class="text-blue-500 hover:text-blue-600">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="odemeDetay(odeme.id)" class="text-gray-500 hover:text-gray-600">
                  <i class="fas fa-eye"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Ödeme Düzenleme Modalı -->
    <div v-if="modalAcik" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Ödeme Düzenle
        </h3>

        <form @submit.prevent="odemeKaydet" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ödeme Durumu
              </label>
              <select
                v-model="aktifOdeme.durum"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="beklemede">Beklemede</option>
                <option value="onaylandi">Onaylandı</option>
                <option value="iptal">İptal Edildi</option>
                <option value="iade">İade Edildi</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                İşlem Tarihi
              </label>
              <input
                v-model="aktifOdeme.tarih"
                type="datetime-local"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Notlar
            </label>
            <textarea
              v-model="aktifOdeme.notlar"
              rows="4"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Odeme {
  id: number
  islemNo: string
  musteriAdi: string
  tutar: number
  yontem: 'kredi_karti' | 'havale' | 'paypal'
  durum: 'beklemede' | 'onaylandi' | 'iptal' | 'iade'
  tarih: string
  notlar?: string
}

interface Filtreler {
  durum: string
  baslangicTarihi: string
  bitisTarihi: string
  yontem: string
  arama: string
}

const odemeler = ref<Odeme[]>([
  {
    id: 1,
    islemNo: 'ODM001',
    musteriAdi: 'Ahmet Yılmaz',
    tutar: 4999.99,
    yontem: 'kredi_karti',
    durum: 'onaylandi',
    tarih: '2024-02-28T10:00:00',
    notlar: 'Ödeme başarıyla tamamlandı'
  },
  {
    id: 2,
    islemNo: 'ODM002',
    musteriAdi: 'Ayşe Demir',
    tutar: 2499.99,
    yontem: 'havale',
    durum: 'beklemede',
    tarih: '2024-02-28T11:30:00'
  }
])

const filtreler = ref<Filtreler>({
  durum: '',
  baslangicTarihi: '',
  bitisTarihi: '',
  yontem: '',
  arama: ''
})

const modalAcik = ref(false)
const aktifOdeme = ref<Odeme>({
  id: 0,
  islemNo: '',
  musteriAdi: '',
  tutar: 0,
  yontem: 'kredi_karti',
  durum: 'beklemede',
  tarih: new Date().toISOString(),
  notlar: ''
})

const filtrelenmisOdemeler = computed(() => {
  return odemeler.value.filter(odeme => {
    const durumUygun = !filtreler.value.durum || odeme.durum === filtreler.value.durum
    const yontemUygun = !filtreler.value.yontem || odeme.yontem === filtreler.value.yontem
    
    const odemeTarihi = new Date(odeme.tarih)
    const baslangicTarihi = filtreler.value.baslangicTarihi ? new Date(filtreler.value.baslangicTarihi) : null
    const bitisTarihi = filtreler.value.bitisTarihi ? new Date(filtreler.value.bitisTarihi) : null
    
    const tarihUygun = (!baslangicTarihi || odemeTarihi >= baslangicTarihi) && 
                      (!bitisTarihi || odemeTarihi <= bitisTarihi)

    const aramaUygun = !filtreler.value.arama || 
                      odeme.islemNo.toLowerCase().includes(filtreler.value.arama.toLowerCase()) ||
                      odeme.musteriAdi.toLowerCase().includes(filtreler.value.arama.toLowerCase())

    return durumUygun && yontemUygun && tarihUygun && aramaUygun
  })
})

const formatFiyat = (fiyat: number): string => {
  return fiyat.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const odemeYontemiText = (yontem: string): string => {
  switch (yontem) {
    case 'kredi_karti':
      return 'Kredi Kartı'
    case 'havale':
      return 'Havale/EFT'
    case 'paypal':
      return 'PayPal'
    default:
      return yontem
  }
}

const durumRengi = (durum: string): string => {
  switch (durum) {
    case 'beklemede':
      return 'bg-yellow-100 text-yellow-800'
    case 'onaylandi':
      return 'bg-green-100 text-green-800'
    case 'iptal':
      return 'bg-red-100 text-red-800'
    case 'iade':
      return 'bg-purple-100 text-purple-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const odemeDuzenle = (odeme: Odeme) => {
  aktifOdeme.value = { ...odeme }
  modalAcik.value = true
}

const odemeDetay = (id: number) => {
  // Ödeme detay sayfasına yönlendir
  console.log('Ödeme detayı:', id)
}

const odemeKaydet = async () => {
  try {
    // API çağrısı yapılacak
    const index = odemeler.value.findIndex(o => o.id === aktifOdeme.value.id)
    if (index !== -1) {
      odemeler.value[index] = { ...aktifOdeme.value }
    }
    modalKapat()
  } catch (error) {
    console.error('Ödeme kaydedilirken hata:', error)
  }
}

const modalKapat = () => {
  modalAcik.value = false
  aktifOdeme.value = {
    id: 0,
    islemNo: '',
    musteriAdi: '',
    tutar: 0,
    yontem: 'kredi_karti',
    durum: 'beklemede',
    tarih: new Date().toISOString(),
    notlar: ''
  }
}
</script> 