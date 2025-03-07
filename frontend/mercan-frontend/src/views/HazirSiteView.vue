<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const paketler = ref([
  {
    id: 1,
    baslik: 'E-ticaret Paketi',
    fiyat: '4.999₺',
    ozellikler: [
      'Modern ve responsive tasarım',
      'Ürün yönetim sistemi',
      'Ödeme sistemi entegrasyonu',
      'Stok takip sistemi',
      'Sipariş yönetimi',
      'SEO optimizasyonu'
    ],
    icon: 'fa-shopping-cart',
    renk: 'from-blue-400 to-blue-600'
  },
  {
    id: 2,
    baslik: 'Kurumsal Site',
    fiyat: '2.999₺',
    ozellikler: [
      'Profesyonel tasarım',
      'İçerik yönetim sistemi',
      'Blog modülü',
      'İletişim formu',
      'Google Maps entegrasyonu',
      'Sosyal medya entegrasyonu'
    ],
    icon: 'fa-building',
    renk: 'from-purple-400 to-purple-600'
  },
  {
    id: 3,
    baslik: 'Blog & Haber',
    fiyat: '3.499₺',
    ozellikler: [
      'Özel blog tasarımı',
      'Kategori sistemi',
      'Etiket sistemi',
      'Yorum sistemi',
      'Editör paneli',
      'RSS feed desteği'
    ],
    icon: 'fa-newspaper',
    renk: 'from-green-400 to-green-600'
  }
])

onMounted(() => {
  gsap.from('.paket-card', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'back.out(1.7)'
  })
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 py-16">
    <div class="container mx-auto px-4">
      <!-- Hero Section -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">
          Hazır Site Paketleri
        </h1>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
          İşinize en uygun web sitesi paketini seçin, hemen online olun!
        </p>
      </div>

      <!-- Paketler -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <!-- E-ticaret Paketi -->
        <div class="bg-gray-800/90 border border-gray-700 rounded-2xl p-8 transform hover:-translate-y-2 transition-all duration-300">
          <div class="text-center mb-8">
            <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-shopping-cart text-3xl text-white"></i>
            </div>
            <h3 class="text-2xl font-bold text-white mb-2">E-ticaret Paketi</h3>
            <div class="text-4xl font-bold text-white mb-4">
              4999 TL
            </div>
          </div>
          <ul class="space-y-4 mb-8">
            <li class="flex items-center text-gray-300">
              <i class="fas fa-check text-green-500 mr-2"></i>
              Sınırsız Ürün Ekleme
            </li>
            <li class="flex items-center text-gray-300">
              <i class="fas fa-check text-green-500 mr-2"></i>
              Ödeme Sistemi Entegrasyonu
            </li>
            <li class="flex items-center text-gray-300">
              <i class="fas fa-check text-green-500 mr-2"></i>
              Stok Takip Sistemi
            </li>
            <li class="flex items-center text-gray-300">
              <i class="fas fa-check text-green-500 mr-2"></i>
              Mobil Uyumlu Tasarım
            </li>
          </ul>
          <button class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Hemen Başvur
          </button>
        </div>

        <!-- Kurumsal Site -->
        <div class="bg-gray-800/90 border border-gray-700 rounded-2xl p-8 transform hover:-translate-y-2 transition-all duration-300">
          <div class="text-center mb-8">
            <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-building text-3xl text-white"></i>
            </div>
            <h3 class="text-2xl font-bold text-white mb-2">Kurumsal Site</h3>
            <div class="text-4xl font-bold text-white mb-4">
              2999 TL
            </div>
          </div>
          <ul class="space-y-4 mb-8">
            <li class="flex items-center text-gray-300">
              <i class="fas fa-check text-green-500 mr-2"></i>
              5 Sayfa İçerik
            </li>
            <li class="flex items-center text-gray-300">
              <i class="fas fa-check text-green-500 mr-2"></i>
              İletişim Formu
            </li>
            <li class="flex items-center text-gray-300">
              <i class="fas fa-check text-green-500 mr-2"></i>
              SEO Optimizasyonu
            </li>
            <li class="flex items-center text-gray-300">
              <i class="fas fa-check text-green-500 mr-2"></i>
              Mobil Uyumlu Tasarım
            </li>
          </ul>
          <button class="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors">
            Hemen Başvur
          </button>
        </div>

        <!-- Blog & Haber -->
        <div class="bg-gray-800/90 border border-gray-700 rounded-2xl p-8 transform hover:-translate-y-2 transition-all duration-300">
          <div class="text-center mb-8">
            <div class="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-newspaper text-3xl text-white"></i>
            </div>
            <h3 class="text-2xl font-bold text-white mb-2">Blog & Haber</h3>
            <div class="text-4xl font-bold text-white mb-4">
              1999 TL
            </div>
          </div>
          <ul class="space-y-4 mb-8">
            <li class="flex items-center text-gray-300">
              <i class="fas fa-check text-green-500 mr-2"></i>
              Kategori Sistemi
            </li>
            <li class="flex items-center text-gray-300">
              <i class="fas fa-check text-green-500 mr-2"></i>
              Yorum Sistemi
            </li>
            <li class="flex items-center text-gray-300">
              <i class="fas fa-check text-green-500 mr-2"></i>
              Sosyal Medya Entegrasyonu
            </li>
            <li class="flex items-center text-gray-300">
              <i class="fas fa-check text-green-500 mr-2"></i>
              Mobil Uyumlu Tasarım
            </li>
          </ul>
          <button class="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
            Hemen Başvur
          </button>
        </div>
      </div>

      <!-- Özellikler -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
          <div class="text-blue-400 text-4xl mb-4">
            <i class="fas fa-rocket"></i>
          </div>
          <h3 class="text-xl font-semibold text-white mb-2">Hızlı Teslimat</h3>
          <p class="text-gray-300">3-5 iş günü içinde siteniz hazır</p>
        </div>

        <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
          <div class="text-purple-400 text-4xl mb-4">
            <i class="fas fa-mobile-alt"></i>
          </div>
          <h3 class="text-xl font-semibold text-white mb-2">Mobil Uyumlu</h3>
          <p class="text-gray-300">Tüm cihazlarda kusursuz görünüm</p>
        </div>

        <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
          <div class="text-green-400 text-4xl mb-4">
            <i class="fas fa-headset"></i>
          </div>
          <h3 class="text-xl font-semibold text-white mb-2">7/24 Destek</h3>
          <p class="text-gray-300">Teknik destek ve danışmanlık</p>
        </div>

        <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
          <div class="text-yellow-400 text-4xl mb-4">
            <i class="fas fa-shield-alt"></i>
          </div>
          <h3 class="text-xl font-semibold text-white mb-2">Güvenli Altyapı</h3>
          <p class="text-gray-300">SSL sertifikası ve güvenlik</p>
        </div>
      </div>

      <!-- SSS Section -->
      <div class="mt-24">
        <h2 class="text-3xl font-bold text-white text-center mb-12">
          Sıkça Sorulan Sorular
        </h2>
        <div class="max-w-3xl mx-auto space-y-4">
          <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <h3 class="text-xl font-semibold text-white mb-2">Kurulum süreci nasıl işliyor?</h3>
            <p class="text-gray-300">
              Ödeme onayından sonra 24 saat içinde siteniz hazır olacak şekilde çalışmalarımıza başlıyoruz.
              Domain ve hosting ayarlarınızı yapıyor, içeriklerinizi yüklüyor ve sitenizi yayına alıyoruz.
            </p>
          </div>

          <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <h3 class="text-xl font-semibold text-white mb-2">Özelleştirme seçenekleri nelerdir?</h3>
            <p class="text-gray-300">
              Tüm paketlerimizde renk, yazı tipi, logo ve görseller gibi temel özelleştirmeler yapılabilir.
              Ek özellikler için özel teklif sunabiliriz.
            </p>
          </div>

          <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <h3 class="text-xl font-semibold text-white mb-2">Domain ve hosting dahil mi?</h3>
            <p class="text-gray-300">
              Evet, tüm paketlerimize 1 yıllık domain ve hosting hizmeti dahildir.
              Süre sonunda uygun fiyatlarla yenileme yapabilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.paket-card {
  will-change: transform;
}

.bg-gray-800\/90 {
  background-color: rgba(31, 41, 55, 0.9);
}
</style> 