<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 py-16">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold text-white text-center mb-12">Dijital Araçlar</h1>

      <!-- Araçlar Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Site Analizi -->
        <RouterLink to="/araclar/site-analizi" class="tool-card">
          <div class="text-blue-400 text-4xl mb-4">
            <i class="fas fa-search"></i>
          </div>
          <h3 class="text-xl font-semibold text-white mb-2">Site Analizi</h3>
          <p class="text-gray-300">Web sitenizin performansını ve SEO durumunu analiz edin.</p>
        </RouterLink>

        <!-- Hız Testi -->
        <RouterLink to="/araclar/hiz-testi" class="tool-card">
          <div class="text-green-400 text-4xl mb-4">
            <i class="fas fa-tachometer-alt"></i>
          </div>
          <h3 class="text-xl font-semibold text-white mb-2">Hız Testi</h3>
          <p class="text-gray-300">Dijital pazarlama terimlerini ne kadar hızlı yazabiliyorsunuz?</p>
        </RouterLink>

        <!-- SEO Quiz -->
        <RouterLink to="/araclar/seo-quiz" class="tool-card">
          <div class="text-purple-400 text-4xl mb-4">
            <i class="fas fa-question-circle"></i>
          </div>
          <h3 class="text-xl font-semibold text-white mb-2">SEO Quiz</h3>
          <p class="text-gray-300">SEO bilginizi test edin ve yeni şeyler öğrenin.</p>
        </RouterLink>

        <!-- Renk Paleti -->
        <RouterLink to="/araclar/renk-paleti" class="tool-card">
          <div class="text-yellow-400 text-4xl mb-4">
            <i class="fas fa-palette"></i>
          </div>
          <h3 class="text-xl font-semibold text-white mb-2">Renk Paleti</h3>
          <p class="text-gray-300">Markanız için mükemmel renk kombinasyonunu oluşturun.</p>
        </RouterLink>

        <!-- Logo Oluşturucu -->
        <RouterLink to="/araclar/logo-olusturucu" class="tool-card">
          <div class="text-red-400 text-4xl mb-4">
            <i class="fas fa-paint-brush"></i>
          </div>
          <h3 class="text-xl font-semibold text-white mb-2">Logo Oluşturucu</h3>
          <p class="text-gray-300">Basit ve etkileyici logolar tasarlayın.</p>
        </RouterLink>

        <!-- Sosyal Medya Planlama -->
        <RouterLink to="/araclar/sosyal-medya-planlama" class="tool-card">
          <div class="text-pink-400 text-4xl mb-4">
            <i class="fas fa-calendar-alt"></i>
          </div>
          <h3 class="text-xl font-semibold text-white mb-2">Sosyal Medya Planlama</h3>
          <p class="text-gray-300">Sosyal medya gönderilerinizi planlayın ve organize edin.</p>
        </RouterLink>
      </div>

      <!-- Alt İçerik -->
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.tool-card {
  @apply bg-white/10 backdrop-blur-lg rounded-2xl p-8 transition-all duration-500 hover:transform hover:scale-105 hover:bg-white/20;
}

.tool-card:hover i {
  @apply transform scale-110 transition-transform duration-500;
}
</style> 