<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import MobileMenu from './components/MobileMenu.vue'

const isMobileMenuOpen = ref(false)
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <RouterLink to="/" class="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            Mercan Danışmanlık
          </RouterLink>

          <!-- Navigation -->
          <div class="hidden md:flex space-x-8">
            <RouterLink 
              v-for="(link, index) in [
                { to: '/', text: 'Ana Sayfa' },
                { to: '/hizmetler', text: 'Hizmetler' },
                { to: '/analiz', text: 'Site Analizi' },
                { to: '/blog', text: 'Blog' },
                { to: '/iletisim', text: 'İletişim' }
              ]"
              :key="index"
              :to="link.to"
              class="text-gray-600 hover:text-blue-600 transition-colors"
              active-class="text-blue-600 font-medium"
            >
              {{ link.text }}
            </RouterLink>
          </div>

          <!-- Mobile Menu Button -->
          <button 
            class="md:hidden p-2 rounded-lg hover:bg-gray-100"
            @click="isMobileMenuOpen = true"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>

    <!-- Mobile Menu -->
    <MobileMenu 
      :is-open="isMobileMenuOpen"
      @close="isMobileMenuOpen = false"
    />

    <!-- Main Content -->
    <main class="flex-grow pt-20 md:pt-24">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white mt-auto">
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Company Info -->
          <div>
            <h3 class="text-xl font-bold mb-4">Mercan Danışmanlık</h3>
            <p class="text-gray-300">
              Dijital dünyada işinizi büyütmenize yardımcı oluyoruz.
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-xl font-bold mb-4">Hızlı Bağlantılar</h3>
            <ul class="space-y-2">
              <li>
                <RouterLink to="/hizmetler" class="text-gray-300 hover:text-white transition-colors">
                  Hizmetlerimiz
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/blog" class="text-gray-300 hover:text-white transition-colors">
                  Blog
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/iletisim" class="text-gray-300 hover:text-white transition-colors">
                  İletişim
                </RouterLink>
              </li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div>
            <h3 class="text-xl font-bold mb-4">İletişim</h3>
            <ul class="space-y-2 text-gray-300">
              <li>Email: info@mercandanismanlik.com</li>
              <li>Tel: +90 (555) 123 45 67</li>
              <li>Adres: İstanbul, Türkiye</li>
            </ul>
          </div>
        </div>

        <!-- Copyright -->
        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Mercan Danışmanlık. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
@import './assets/main.css';

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 