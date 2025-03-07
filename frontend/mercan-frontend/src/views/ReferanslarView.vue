<script setup lang="ts">
import { ref, computed } from 'vue'

const referanslar = ref([
  {
    id: 1,
    isim: 'ABC Teknoloji',
    icon: 'fas fa-desktop',
    aciklama: 'E-ticaret sitesi tasarımı ve SEO optimizasyonu',
    kategori: 'E-ticaret',
    color: 'from-blue-400 to-purple-400'
  },
  {
    id: 2,
    isim: 'XYZ Medya',
    icon: 'fas fa-bullhorn',
    aciklama: 'Sosyal medya yönetimi ve içerik üretimi',
    kategori: 'Sosyal Medya',
    color: 'from-pink-400 to-red-400'
  },
  {
    id: 3,
    isim: 'Delta Group',
    icon: 'fas fa-building',
    aciklama: 'Kurumsal web sitesi ve dijital pazarlama',
    kategori: 'Web Tasarım',
    color: 'from-green-400 to-teal-400'
  },
  {
    id: 4,
    isim: 'Smart Solutions',
    icon: 'fas fa-chart-line',
    aciklama: 'Google Ads ve Facebook reklamları yönetimi',
    kategori: 'Dijital Reklam',
    color: 'from-yellow-400 to-orange-400'
  },
  {
    id: 5,
    isim: 'Green Energy',
    icon: 'fas fa-leaf',
    aciklama: 'SEO ve içerik stratejisi',
    kategori: 'SEO',
    color: 'from-emerald-400 to-green-400'
  },
  {
    id: 6,
    isim: 'Tech Start',
    icon: 'fas fa-rocket',
    aciklama: 'Mobil uygulama geliştirme',
    kategori: 'Yazılım',
    color: 'from-indigo-400 to-purple-400'
  }
])

const secilenKategori = ref('Tümü')
const kategoriler = ['Tümü', 'E-ticaret', 'Sosyal Medya', 'Web Tasarım', 'Dijital Reklam', 'SEO', 'Yazılım']

const filtrelenmisReferanslar = computed(() => {
  if (secilenKategori.value === 'Tümü') {
    return referanslar.value
  }
  return referanslar.value.filter(ref => ref.kategori === secilenKategori.value)
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 py-16">
    <div class="container mx-auto px-4">
      <!-- Hero Section -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">
          Referanslarımız
        </h1>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
          Başarı hikayelerimizden bazıları. Her projede en iyi sonucu elde etmek için çalışıyoruz.
        </p>
      </div>

      <!-- Kategori Filtreleme -->
      <div class="flex flex-wrap justify-center gap-4 mb-12">
        <button
          v-for="kategori in kategoriler"
          :key="kategori"
          class="px-6 py-2 rounded-full transition-all duration-300"
          :class="{
            'bg-blue-600 text-white': secilenKategori === kategori,
            'bg-white/10 text-gray-300 hover:bg-white/20': secilenKategori !== kategori
          }"
          @click="secilenKategori = kategori"
        >
          {{ kategori }}
        </button>
      </div>

      <!-- Referanslar Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="referans in filtrelenmisReferanslar"
          :key="referans.id"
          class="referans-card bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 animate-fadeIn"
        >
          <div class="h-32 flex items-center justify-center mb-6">
            <div 
              class="w-24 h-24 bg-gradient-to-br rounded-xl flex items-center justify-center transform transition-all duration-300 hover:scale-110" 
              :class="referans.color"
            >
              <i :class="[referans.icon, 'text-4xl text-white']"></i>
            </div>
          </div>
          <h3 class="text-2xl font-semibold text-white mb-2">{{ referans.isim }}</h3>
          <p class="text-gray-300 mb-4">{{ referans.aciklama }}</p>
          <span class="inline-block px-4 py-1 bg-white/5 rounded-full text-sm text-gray-300">
            {{ referans.kategori }}
          </span>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="text-center mt-16">
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-6">
          Siz de Başarı Hikayemizin Bir Parçası Olun
        </h2>
        <p class="text-gray-300 mb-8 max-w-2xl mx-auto">
          Dijital dünyada işinizi büyütmek için yanınızdayız. Hemen iletişime geçin, projelerinizi konuşalım.
        </p>
        <router-link
          to="/iletisim"
          class="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-110"
        >
          İletişime Geçin
        </router-link>
      </div>
    </div>
  </div>
</template>

<style>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
}

.referans-card {
  opacity: 0;
}

.referans-card:nth-child(1) { animation-delay: 0.1s; }
.referans-card:nth-child(2) { animation-delay: 0.2s; }
.referans-card:nth-child(3) { animation-delay: 0.3s; }
.referans-card:nth-child(4) { animation-delay: 0.4s; }
.referans-card:nth-child(5) { animation-delay: 0.5s; }
.referans-card:nth-child(6) { animation-delay: 0.6s; }
</style> 