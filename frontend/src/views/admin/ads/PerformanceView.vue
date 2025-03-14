<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Reklam Performansı</h2>

    <!-- Filtreler -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tarih Aralığı
          </label>
          <select 
            v-model="filtreler.tarihAraligi"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="bugun">Bugün</option>
            <option value="dun">Dün</option>
            <option value="hafta">Son 7 Gün</option>
            <option value="ay">Son 30 Gün</option>
            <option value="yil">Son 365 Gün</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Kampanya
          </label>
          <select 
            v-model="filtreler.kampanya"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Tüm Kampanyalar</option>
            <option v-for="kampanya in kampanyalar" :key="kampanya.id" :value="kampanya.id">
              {{ kampanya.baslik }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Platform
          </label>
          <select 
            v-model="filtreler.platform"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Tüm Platformlar</option>
            <option value="google">Google Ads</option>
            <option value="facebook">Facebook Ads</option>
            <option value="instagram">Instagram Ads</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Metrik
          </label>
          <select 
            v-model="filtreler.metrik"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="gosterim">Gösterim</option>
            <option value="tiklanma">Tıklanma</option>
            <option value="donusum">Dönüşüm</option>
            <option value="maliyet">Maliyet</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Performans Özeti -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          Toplam Gösterim
        </h3>
        <p class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ formatSayi(performansOzeti.gosterim) }}
        </p>
        <p :class="[
          'text-sm mt-2',
          performansOzeti.gosterimDegisim > 0 ? 'text-green-600' : 'text-red-600'
        ]">
          {{ performansOzeti.gosterimDegisim > 0 ? '+' : '' }}{{ performansOzeti.gosterimDegisim }}%
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          Toplam Tıklanma
        </h3>
        <p class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ formatSayi(performansOzeti.tiklanma) }}
        </p>
        <p :class="[
          'text-sm mt-2',
          performansOzeti.tiklanmaDegisim > 0 ? 'text-green-600' : 'text-red-600'
        ]">
          {{ performansOzeti.tiklanmaDegisim > 0 ? '+' : '' }}{{ performansOzeti.tiklanmaDegisim }}%
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          Toplam Dönüşüm
        </h3>
        <p class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ formatSayi(performansOzeti.donusum) }}
        </p>
        <p :class="[
          'text-sm mt-2',
          performansOzeti.donusumDegisim > 0 ? 'text-green-600' : 'text-red-600'
        ]">
          {{ performansOzeti.donusumDegisim > 0 ? '+' : '' }}{{ performansOzeti.donusumDegisim }}%
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          Toplam Maliyet
        </h3>
        <p class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ formatFiyat(performansOzeti.maliyet) }} ₺
        </p>
        <p :class="[
          'text-sm mt-2',
          performansOzeti.maliyetDegisim > 0 ? 'text-red-600' : 'text-green-600'
        ]">
          {{ performansOzeti.maliyetDegisim > 0 ? '+' : '' }}{{ performansOzeti.maliyetDegisim }}%
        </p>
      </div>
    </div>

    <!-- Grafik -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
      <canvas ref="grafikRef" class="w-full h-96"></canvas>
    </div>

    <!-- Platform Bazlı Performans -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-50 dark:bg-gray-700">
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Platform
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Gösterim
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Tıklanma
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                CTR
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Dönüşüm
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Maliyet
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                CPC
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="platform in platformPerformans" :key="platform.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {{ platform.ad }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {{ formatSayi(platform.gosterim) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {{ formatSayi(platform.tiklanma) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {{ platform.ctr }}%
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {{ formatSayi(platform.donusum) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {{ formatFiyat(platform.maliyet) }} ₺
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {{ formatFiyat(platform.cpc) }} ₺
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

interface Kampanya {
  id: number
  baslik: string
}

interface Filtreler {
  tarihAraligi: string
  kampanya: number | string
  platform: string
  metrik: string
}

interface PerformansOzeti {
  gosterim: number
  gosterimDegisim: number
  tiklanma: number
  tiklanmaDegisim: number
  donusum: number
  donusumDegisim: number
  maliyet: number
  maliyetDegisim: number
}

interface PlatformPerformans {
  id: number
  ad: string
  gosterim: number
  tiklanma: number
  ctr: number
  donusum: number
  maliyet: number
  cpc: number
}

const grafikRef = ref<HTMLCanvasElement | null>(null)
let grafikInstance: Chart | null = null

const kampanyalar = ref<Kampanya[]>([
  { id: 1, baslik: 'Yaz Sezonu İndirimi' },
  { id: 2, baslik: 'Dijital Pazarlama Paketi' }
])

const filtreler = ref<Filtreler>({
  tarihAraligi: 'hafta',
  kampanya: '',
  platform: '',
  metrik: 'gosterim'
})

const performansOzeti = ref<PerformansOzeti>({
  gosterim: 125000,
  gosterimDegisim: 15,
  tiklanma: 2500,
  tiklanmaDegisim: 8,
  donusum: 150,
  donusumDegisim: 12,
  maliyet: 5000,
  maliyetDegisim: -5
})

const platformPerformans = ref<PlatformPerformans[]>([
  {
    id: 1,
    ad: 'Google Ads',
    gosterim: 75000,
    tiklanma: 1500,
    ctr: 2,
    donusum: 90,
    maliyet: 3000,
    cpc: 2
  },
  {
    id: 2,
    ad: 'Facebook Ads',
    gosterim: 35000,
    tiklanma: 700,
    ctr: 2,
    donusum: 40,
    maliyet: 1400,
    cpc: 2
  },
  {
    id: 3,
    ad: 'Instagram Ads',
    gosterim: 15000,
    tiklanma: 300,
    ctr: 2,
    donusum: 20,
    maliyet: 600,
    cpc: 2
  }
])

const formatSayi = (sayi: number): string => {
  return sayi.toLocaleString('tr-TR')
}

const formatFiyat = (fiyat: number): string => {
  return fiyat.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

onMounted(() => {
  if (grafikRef.value) {
    const ctx = grafikRef.value.getContext('2d')
    if (ctx) {
      grafikInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['1 Şub', '2 Şub', '3 Şub', '4 Şub', '5 Şub', '6 Şub', '7 Şub'],
          datasets: [
            {
              label: 'Gösterim',
              data: [15000, 17000, 16500, 18000, 17500, 19000, 22000],
              borderColor: '#3B82F6',
              tension: 0.4
            },
            {
              label: 'Tıklanma',
              data: [300, 340, 330, 360, 350, 380, 440],
              borderColor: '#10B981',
              tension: 0.4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top'
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      })
    }
  }
})
</script> 