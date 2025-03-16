<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  // Animasyonlar
  gsap.from('.fade-up', {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: '.fade-up',
      start: 'top bottom-=100',
      toggleActions: 'play none none reverse'
    }
  })

  gsap.from('.team-member', {
    opacity: 0,
    scale: 0.8,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: '.team-section',
      start: 'top center',
      toggleActions: 'play none none reverse'
    }
  })
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 py-16">
    <div class="container mx-auto px-4">
      <!-- Hero Section -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-6 fade-up">
          Hakkımızda
        </h1>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto fade-up">
          2020 yılından bu yana dijital dünyada işletmelerin başarıya ulaşması için çalışıyoruz.
        </p>
      </div>

      <!-- Misyon & Vizyon -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 fade-up">
          <div class="text-blue-400 text-4xl mb-6">
            <i class="fas fa-bullseye"></i>
          </div>
          <h2 class="text-2xl font-semibold text-white mb-4">Misyonumuz</h2>
          <p class="text-gray-300">
            İşletmelerin dijital dönüşümünü en etkili şekilde gerçekleştirmelerine yardımcı olmak ve 
            sürdürülebilir başarı için stratejik çözümler sunmak.
          </p>
        </div>

        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 fade-up">
          <div class="text-purple-400 text-4xl mb-6">
            <i class="fas fa-eye"></i>
          </div>
          <h2 class="text-2xl font-semibold text-white mb-4">Vizyonumuz</h2>
          <p class="text-gray-300">
            Türkiye'nin önde gelen dijital pazarlama ve teknoloji danışmanlığı şirketi olmak ve 
            global pazarda söz sahibi olmak.
          </p>
        </div>
      </div>

      <!-- Değerlerimiz -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold text-white text-center mb-12 fade-up">Değerlerimiz</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center fade-up">
            <div class="text-yellow-400 text-4xl mb-4">
              <i class="fas fa-star"></i>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Yenilikçilik</h3>
            <p class="text-gray-300">Sürekli gelişim ve yeni teknolojileri takip</p>
          </div>

          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center fade-up">
            <div class="text-green-400 text-4xl mb-4">
              <i class="fas fa-handshake"></i>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Güvenilirlik</h3>
            <p class="text-gray-300">Şeffaf ve dürüst iş ilişkileri</p>
          </div>

          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center fade-up">
            <div class="text-red-400 text-4xl mb-4">
              <i class="fas fa-heart"></i>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Müşteri Odaklılık</h3>
            <p class="text-gray-300">Müşterilerimizin başarısı için tam odaklanma</p>
          </div>
        </div>
      </div>

      <!-- Ekibimiz -->
      <div class="team-section">
        <h2 class="text-3xl font-bold text-white text-center mb-12 fade-up">Ekibimiz</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="team-member bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
            <img src="@/assets/images/serdar-avatar.jpg" alt="Serdar T." class="w-32 h-32 mx-auto rounded-full mb-4 object-cover" />
            <h3 class="text-xl font-semibold text-white mb-1">Serdar T.</h3>
            <p class="text-gray-300 mb-2">Kurucu</p>
            <p class="text-gray-400 text-sm">Yazılım geliştirme ve dijital pazarlama alanlarında 10+ yıl deneyim</p>
          </div>

          <div class="team-member bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
            <img src="@/assets/images/hilal-avatar.jpg" alt="Hilal Ç." class="w-32 h-32 mx-auto rounded-full mb-4 object-cover" />
            <h3 class="text-xl font-semibold text-white mb-1">Hilal Ç.</h3>
            <p class="text-gray-300 mb-2">Sosyal Medya Uzmanı</p>
          </div>

          <div class="team-member bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
            <img src="@/assets/images/lutfullah-avatar.jpg" alt="Lütfullah Ö." class="w-32 h-32 mx-auto rounded-full mb-4 object-cover" />
            <h3 class="text-xl font-semibold text-white mb-1">Lütfullah Ö.</h3>
            <p class="text-gray-300 mb-2">Yazılım Geliştirme</p>
          </div>

          <div class="team-member bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
            <img src="@/assets/images/alaaddin-avatar.jpg" alt="Alaaddin B." class="w-32 h-32 mx-auto rounded-full mb-4 object-cover" />
            <h3 class="text-xl font-semibold text-white mb-1">Alaaddin B.</h3>
            <p class="text-gray-300 mb-2">Grafik Tasarım</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-up {
  will-change: transform, opacity;
}

.team-member {
  will-change: transform, opacity;
}

.team-member:hover {
  transform: translateY(-10px);
  transition: transform 0.3s ease;
}
</style> 