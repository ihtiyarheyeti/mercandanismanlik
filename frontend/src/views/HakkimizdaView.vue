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
            <div class="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 mx-auto mb-4"></div>
            <h3 class="text-xl font-semibold text-white mb-1">Ahmet Yılmaz</h3>
            <p class="text-gray-300 mb-2">Kurucu & CEO</p>
            <div class="flex justify-center space-x-3 text-gray-300">
              <a href="#" class="hover:text-blue-400 transition-colors"><i class="fab fa-linkedin"></i></a>
              <a href="#" class="hover:text-blue-400 transition-colors"><i class="fab fa-twitter"></i></a>
            </div>
          </div>

          <div class="team-member bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
            <div class="w-32 h-32 rounded-full bg-gradient-to-br from-pink-400 to-red-400 mx-auto mb-4"></div>
            <h3 class="text-xl font-semibold text-white mb-1">Ayşe Demir</h3>
            <p class="text-gray-300 mb-2">Dijital Pazarlama Uzmanı</p>
            <div class="flex justify-center space-x-3 text-gray-300">
              <a href="#" class="hover:text-blue-400 transition-colors"><i class="fab fa-linkedin"></i></a>
              <a href="#" class="hover:text-blue-400 transition-colors"><i class="fab fa-twitter"></i></a>
            </div>
          </div>

          <div class="team-member bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
            <div class="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-teal-400 mx-auto mb-4"></div>
            <h3 class="text-xl font-semibold text-white mb-1">Mehmet Kaya</h3>
            <p class="text-gray-300 mb-2">Yazılım Geliştirici</p>
            <div class="flex justify-center space-x-3 text-gray-300">
              <a href="#" class="hover:text-blue-400 transition-colors"><i class="fab fa-linkedin"></i></a>
              <a href="#" class="hover:text-blue-400 transition-colors"><i class="fab fa-github"></i></a>
            </div>
          </div>

          <div class="team-member bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
            <div class="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 mx-auto mb-4"></div>
            <h3 class="text-xl font-semibold text-white mb-1">Zeynep Şahin</h3>
            <p class="text-gray-300 mb-2">UI/UX Tasarımcı</p>
            <div class="flex justify-center space-x-3 text-gray-300">
              <a href="#" class="hover:text-blue-400 transition-colors"><i class="fab fa-linkedin"></i></a>
              <a href="#" class="hover:text-blue-400 transition-colors"><i class="fab fa-dribbble"></i></a>
            </div>
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