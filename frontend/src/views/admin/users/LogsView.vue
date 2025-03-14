<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Güvenlik ve Log Yönetimi</h2>

    <!-- Filtreler -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tarih Aralığı
          </label>
          <select v-model="filtreler.tarihAraligi" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="bugun">Bugün</option>
            <option value="dun">Dün</option>
            <option value="hafta">Son 7 Gün</option>
            <option value="ay">Son 30 Gün</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Log Tipi
          </label>
          <select v-model="filtreler.logTipi" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="tumu">Tümü</option>
            <option value="giris">Giriş İşlemleri</option>
            <option value="hata">Hatalar</option>
            <option value="degisiklik">Değişiklikler</option>
            <option value="guvenlik">Güvenlik</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Kullanıcı
          </label>
          <select v-model="filtreler.kullanici" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="tumu">Tüm Kullanıcılar</option>
            <option v-for="user in kullanicilar" :key="user.id" :value="user.id">
              {{ user.ad }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Seviye
          </label>
          <select v-model="filtreler.seviye" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="tumu">Tüm Seviyeler</option>
            <option value="bilgi">Bilgi</option>
            <option value="uyari">Uyarı</option>
            <option value="hata">Hata</option>
            <option value="kritik">Kritik</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Log Tablosu -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-50 dark:bg-gray-700">
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Tarih/Saat
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Kullanıcı
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                İşlem
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                IP Adresi
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Seviye
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Detay
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="log in loglar" :key="log.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                {{ new Date(log.tarih).toLocaleString('tr-TR') }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                {{ log.kullanici }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                {{ log.islem }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                {{ log.ip }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="{
                  'px-2 py-1 text-xs rounded-full': true,
                  'bg-blue-100 text-blue-800': log.seviye === 'bilgi',
                  'bg-yellow-100 text-yellow-800': log.seviye === 'uyari',
                  'bg-red-100 text-red-800': log.seviye === 'hata',
                  'bg-purple-100 text-purple-800': log.seviye === 'kritik'
                }">
                  {{ log.seviye }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                {{ log.detay }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
        <div class="flex-1 flex justify-between items-center">
          <div>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              Toplam <span class="font-medium">{{ toplamKayit }}</span> kayıt
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                :disabled="sayfa === 1"
                @click="sayfaDegistir(sayfa - 1)"
              >
                Önceki
              </button>
              <button
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                :disabled="sayfa === toplamSayfa"
                @click="sayfaDegistir(sayfa + 1)"
              >
                Sonraki
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Filtreler {
  tarihAraligi: string
  logTipi: string
  kullanici: string
  seviye: string
}

interface Kullanici {
  id: number
  ad: string
}

interface Log {
  id: number
  tarih: string
  kullanici: string
  islem: string
  ip: string
  seviye: 'bilgi' | 'uyari' | 'hata' | 'kritik'
  detay: string
}

const filtreler = ref<Filtreler>({
  tarihAraligi: 'bugun',
  logTipi: 'tumu',
  kullanici: 'tumu',
  seviye: 'tumu'
})

const kullanicilar = ref<Kullanici[]>([
  { id: 1, ad: 'Admin' },
  { id: 2, ad: 'Editor' },
  { id: 3, ad: 'User' }
])

const loglar = ref<Log[]>([
  {
    id: 1,
    tarih: new Date().toISOString(),
    kullanici: 'Admin',
    islem: 'Giriş',
    ip: '192.168.1.1',
    seviye: 'bilgi',
    detay: 'Başarılı giriş'
  },
  {
    id: 2,
    tarih: new Date().toISOString(),
    kullanici: 'Editor',
    islem: 'İçerik Düzenleme',
    ip: '192.168.1.2',
    seviye: 'uyari',
    detay: 'Blog yazısı güncellendi'
  }
])

const sayfa = ref(1)
const toplamKayit = ref(100)
const toplamSayfa = ref(10)

const sayfaDegistir = (yeniSayfa: number) => {
  sayfa.value = yeniSayfa
  // API'den yeni sayfanın verilerini getir
}
</script> 