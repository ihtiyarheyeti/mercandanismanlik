<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Sipariş Yönetimi</h2>

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
            <option value="hazirlaniyor">Hazırlanıyor</option>
            <option value="tamamlandi">Tamamlandı</option>
            <option value="iptal">İptal Edildi</option>
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
            Ödeme Durumu
          </label>
          <select 
            v-model="filtreler.odemeDurumu"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Tümü</option>
            <option value="bekliyor">Ödeme Bekliyor</option>
            <option value="odendi">Ödendi</option>
            <option value="iade">İade Edildi</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Arama
          </label>
          <input 
            v-model="filtreler.arama"
            type="text"
            placeholder="Sipariş no veya müşteri adı"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>
    </div>

    <!-- Sipariş Listesi -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-50 dark:bg-gray-700">
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Sipariş No
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Müşteri
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Ürün
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Tutar
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Durum
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Ödeme
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
            <tr v-for="siparis in filtrelenmissiparisler" :key="siparis.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                #{{ siparis.siparisNo }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {{ siparis.musteriAdi }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {{ siparis.urun }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {{ formatFiyat(siparis.tutar) }} ₺
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="durumRengi(siparis.durum)" class="px-2 py-1 text-xs rounded-full">
                  {{ siparis.durum }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="odemeDurumuRengi(siparis.odemeDurumu)" class="px-2 py-1 text-xs rounded-full">
                  {{ siparis.odemeDurumu }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {{ new Date(siparis.tarih).toLocaleDateString('tr-TR') }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button @click="siparisDuzenle(siparis)" class="text-blue-500 hover:text-blue-600">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="siparisSil(siparis.id)" class="text-red-500 hover:text-red-600">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Sipariş Düzenleme Modalı -->
    <div v-if="modalAcik" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Sipariş Düzenle
        </h3>

        <form @submit.prevent="siparisKaydet" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sipariş Durumu
              </label>
              <select
                v-model="aktifSiparis.durum"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="beklemede">Beklemede</option>
                <option value="onaylandi">Onaylandı</option>
                <option value="hazirlaniyor">Hazırlanıyor</option>
                <option value="tamamlandi">Tamamlandı</option>
                <option value="iptal">İptal Edildi</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ödeme Durumu
              </label>
              <select
                v-model="aktifSiparis.odemeDurumu"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="bekliyor">Ödeme Bekliyor</option>
                <option value="odendi">Ödendi</option>
                <option value="iade">İade Edildi</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Notlar
            </label>
            <textarea
              v-model="aktifSiparis.notlar"
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

interface Siparis {
  id: number
  siparisNo: string
  musteriAdi: string
  urun: string
  tutar: number
  durum: 'beklemede' | 'onaylandi' | 'hazirlaniyor' | 'tamamlandi' | 'iptal'
  odemeDurumu: 'bekliyor' | 'odendi' | 'iade'
  tarih: string
  notlar?: string
}

interface Filtreler {
  durum: string
  baslangicTarihi: string
  bitisTarihi: string
  odemeDurumu: string
  arama: string
}

const siparisler = ref<Siparis[]>([
  {
    id: 1,
    siparisNo: 'SIP001',
    musteriAdi: 'Ahmet Yılmaz',
    urun: 'E-ticaret Paketi',
    tutar: 4999.99,
    durum: 'hazirlaniyor',
    odemeDurumu: 'odendi',
    tarih: '2024-02-28T10:00:00',
    notlar: 'Müşteri özel renk şeması istedi.'
  },
  {
    id: 2,
    siparisNo: 'SIP002',
    musteriAdi: 'Ayşe Demir',
    urun: 'Kurumsal Site Paketi',
    tutar: 2499.99,
    durum: 'beklemede',
    odemeDurumu: 'bekliyor',
    tarih: '2024-02-28T11:30:00'
  }
])

const filtreler = ref<Filtreler>({
  durum: '',
  baslangicTarihi: '',
  bitisTarihi: '',
  odemeDurumu: '',
  arama: ''
})

const modalAcik = ref(false)
const aktifSiparis = ref<Siparis>({
  id: 0,
  siparisNo: '',
  musteriAdi: '',
  urun: '',
  tutar: 0,
  durum: 'beklemede',
  odemeDurumu: 'bekliyor',
  tarih: new Date().toISOString(),
  notlar: ''
})

const filtrelenmissiparisler = computed(() => {
  return siparisler.value.filter(siparis => {
    const durumUygun = !filtreler.value.durum || siparis.durum === filtreler.value.durum
    const odemeDurumuUygun = !filtreler.value.odemeDurumu || siparis.odemeDurumu === filtreler.value.odemeDurumu
    
    const siparisTarihi = new Date(siparis.tarih)
    const baslangicTarihi = filtreler.value.baslangicTarihi ? new Date(filtreler.value.baslangicTarihi) : null
    const bitisTarihi = filtreler.value.bitisTarihi ? new Date(filtreler.value.bitisTarihi) : null
    
    const tarihUygun = (!baslangicTarihi || siparisTarihi >= baslangicTarihi) && 
                      (!bitisTarihi || siparisTarihi <= bitisTarihi)

    const aramaUygun = !filtreler.value.arama || 
                      siparis.siparisNo.toLowerCase().includes(filtreler.value.arama.toLowerCase()) ||
                      siparis.musteriAdi.toLowerCase().includes(filtreler.value.arama.toLowerCase())

    return durumUygun && odemeDurumuUygun && tarihUygun && aramaUygun
  })
})

const formatFiyat = (fiyat: number): string => {
  return fiyat.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const durumRengi = (durum: string): string => {
  switch (durum) {
    case 'beklemede':
      return 'bg-yellow-100 text-yellow-800'
    case 'onaylandi':
      return 'bg-blue-100 text-blue-800'
    case 'hazirlaniyor':
      return 'bg-purple-100 text-purple-800'
    case 'tamamlandi':
      return 'bg-green-100 text-green-800'
    case 'iptal':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const odemeDurumuRengi = (durum: string): string => {
  switch (durum) {
    case 'bekliyor':
      return 'bg-yellow-100 text-yellow-800'
    case 'odendi':
      return 'bg-green-100 text-green-800'
    case 'iade':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const siparisDuzenle = (siparis: Siparis) => {
  aktifSiparis.value = { ...siparis }
  modalAcik.value = true
}

const siparisSil = async (id: number) => {
  if (confirm('Bu siparişi silmek istediğinizden emin misiniz?')) {
    try {
      // API çağrısı yapılacak
      siparisler.value = siparisler.value.filter(s => s.id !== id)
    } catch (error) {
      console.error('Sipariş silinirken hata:', error)
    }
  }
}

const siparisKaydet = async () => {
  try {
    // API çağrısı yapılacak
    const index = siparisler.value.findIndex(s => s.id === aktifSiparis.value.id)
    if (index !== -1) {
      siparisler.value[index] = { ...aktifSiparis.value }
    }
    modalKapat()
  } catch (error) {
    console.error('Sipariş kaydedilirken hata:', error)
  }
}

const modalKapat = () => {
  modalAcik.value = false
  aktifSiparis.value = {
    id: 0,
    siparisNo: '',
    musteriAdi: '',
    urun: '',
    tutar: 0,
    durum: 'beklemede',
    odemeDurumu: 'bekliyor',
    tarih: new Date().toISOString(),
    notlar: ''
  }
}
</script> 