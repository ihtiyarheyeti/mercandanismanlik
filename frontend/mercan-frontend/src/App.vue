<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import CookieConsent from './components/CookieConsent.vue'
import Notification from '@/components/Notification.vue'
import { useSettingsStore } from '@/stores/settings'
import { storeToRefs } from 'pinia'
import { useSeoStore } from '@/stores/seo'
import { useCookieStore } from '@/stores/cookie'
import logo from '@/assets/images/logo.png'

const route = useRoute()
const router = useRouter()
const mobileMenuOpen = ref(false)
const dropdownOpen = ref(false)

const settingsStore = useSettingsStore()
const { seoSettings } = storeToRefs(settingsStore)
const seoStore = useSeoStore()
const cookieStore = useCookieStore()

// Favicon'u güncelle
watch(() => settingsStore.favicon, (newFavicon) => {
  if (newFavicon) {
    const link = document.querySelector("link[rel='icon']") as HTMLLinkElement
    if (link) {
      link.href = newFavicon
    }
  }
})

const isAdminRoute = computed(() => {
  return route.path.startsWith('/admin')
})

const isLoginPage = computed(() => {
  return route.path === '/login'
})

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const closeDropdown = () => {
  dropdownOpen.value = false
}

const menuItems = ref([
  { text: 'Ana Sayfa', to: '/' },
  { text: 'Hizmetlerimiz', to: '/hizmetler' },
  { text: 'Hazır Site', to: '/hazir-site' },
  { text: 'Araçlar', to: '/araclar' },
  { text: 'Blog', to: '/blog' },
  { text: 'SSS', to: '/sss' },
  { text: 'Hakkımızda', to: '/hakkimizda' },
  { text: 'İletişim', to: '/iletisim' }
])

// Rota değişikliklerini izle
watch(() => router.currentRoute.value.path, (newPath) => {
  // Eğer login sayfasında değilsek ve token varsa ayarları yükle
  if (newPath !== '/login' && localStorage.getItem('token')) {
    settingsStore.fetchSettings()
  }
})

const isMobileMenuOpen = ref(false)

const updateMetaTags = () => {
  // Meta title güncelleme
  document.title = seoSettings.value.metaTitle || 'Mercan Danışmanlık'
  
  // Meta description güncelleme
  let metaDescription = document.querySelector('meta[name="description"]')
  if (!metaDescription) {
    metaDescription = document.createElement('meta')
    metaDescription.setAttribute('name', 'description')
    document.head.appendChild(metaDescription)
  }
  metaDescription.setAttribute('content', seoSettings.value.metaDescription || '')

  // Meta keywords güncelleme
  let metaKeywords = document.querySelector('meta[name="keywords"]')
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta')
    metaKeywords.setAttribute('name', 'keywords')
    document.head.appendChild(metaKeywords)
  }
  metaKeywords.setAttribute('content', seoSettings.value.metaKeywords || '')
}

// SEO ayarları değiştiğinde meta etiketlerini güncelle
watch(() => seoSettings.value, () => {
  updateMetaTags()
}, { deep: true })

onMounted(async () => {
  await settingsStore.fetchSettings()
  updateMetaTags()
})
</script>

<template>
  <Notification />
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Normal Layout -->
    <div v-if="!isLoginPage" class="layout">
      <header v-if="!isAdminRoute" class="bg-white shadow-sm sticky top-0 z-50">
        <nav class="bg-white shadow-lg w-full">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
              <div class="flex">
                <RouterLink to="/" class="flex items-center">
                  <img :src="logo" alt="Mercan Danışmanlık Logo" class="h-12 w-auto object-contain mr-2" />
                </RouterLink>
              </div>

              <!-- Desktop Navigation -->
              <div class="hidden lg:flex items-center space-x-8">
                <RouterLink
                  v-for="(item, index) in menuItems"
                  :key="index"
                  :to="item.to"
                  class="text-gray-600 hover:text-blue-600 transition-colors"
                  active-class="text-blue-600 font-medium"
                >
                  {{ item.text }}
                </RouterLink>
              </div>

              <!-- Mobile Menu Button -->
              <button
                @click="toggleMobileMenu"
                class="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                aria-label="Menu"
              >
                <svg
                  class="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    v-if="!mobileMenuOpen"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    v-else
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <!-- Mobile Menu -->
            <div
              v-show="mobileMenuOpen"
              class="lg:hidden mt-4 pb-4"
            >
              <div class="space-y-2">
                <RouterLink
                  v-for="(item, index) in menuItems"
                  :key="index"
                  :to="item.to"
                  class="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  active-class="text-blue-600 bg-blue-50 font-medium"
                  @click="mobileMenuOpen = false"
                >
                  {{ item.text }}
                </RouterLink>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <!-- Main Content -->
      <main :class="{ 'flex-grow': !isAdminRoute }">
        <RouterView v-slot="{ Component }">
          <template v-if="Component">
            <Suspense>
              <template #default>
                <component :is="Component" />
              </template>
              <template #fallback>
                <div class="flex items-center justify-center min-h-[60vh]">
                  <div class="text-center">
                    <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p class="text-gray-600">Yükleniyor...</p>
                  </div>
                </div>
              </template>
            </Suspense>
          </template>
        </RouterView>
      </main>

      <!-- Footer -->
      <footer v-if="!isAdminRoute" class="bg-gray-800 text-white mt-auto">
        <div class="container mx-auto px-4 py-12">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <!-- Şirket Bilgileri -->
            <div>
              <h3 class="text-xl font-bold mb-4">Mercan Danışmanlık</h3>
              <p class="text-gray-300 mb-4">
                Dijital dünyada işinizi büyütmenize yardımcı oluyoruz.
              </p>
              <div class="flex space-x-4">
                <a href="https://facebook.com" target="_blank" class="text-gray-300 hover:text-white transition-colors">
                  <i class="fab fa-facebook text-xl"></i>
                </a>
                <a href="https://twitter.com" target="_blank" class="text-gray-300 hover:text-white transition-colors">
                  <i class="fab fa-twitter text-xl"></i>
                </a>
                <a href="https://instagram.com" target="_blank" class="text-gray-300 hover:text-white transition-colors">
                  <i class="fab fa-instagram text-xl"></i>
                </a>
                <a href="https://linkedin.com" target="_blank" class="text-gray-300 hover:text-white transition-colors">
                  <i class="fab fa-linkedin text-xl"></i>
                </a>
              </div>
            </div>

            <!-- Hızlı Bağlantılar -->
            <div>
              <h3 class="text-xl font-bold mb-4">Hızlı Bağlantılar</h3>
              <ul class="space-y-2">
                <li>
                  <RouterLink to="/hizmetler" class="text-gray-300 hover:text-white transition-colors">
                    Hizmetlerimiz
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/araclar" class="text-gray-300 hover:text-white transition-colors">
                    Araçlar
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/blog" class="text-gray-300 hover:text-white transition-colors">
                    Blog
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/hakkimizda" class="text-gray-300 hover:text-white transition-colors">
                    Hakkımızda
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/referanslar" class="text-gray-300 hover:text-white transition-colors">
                    Referanslar
                  </RouterLink>
                </li>
              </ul>
            </div>

            <!-- İletişim -->
            <div>
              <h3 class="text-xl font-bold mb-4">İletişim</h3>
              <ul class="space-y-2 text-gray-300">
                <li v-if="settingsStore.contactEmail" class="flex items-center">
                  <i class="fas fa-envelope mr-2"></i>
                  <a :href="`mailto:${settingsStore.contactEmail}`" class="hover:text-white transition-colors">
                    {{ settingsStore.contactEmail }}
                  </a>
                </li>
                <li v-if="settingsStore.phoneNumber" class="flex items-center">
                  <i class="fas fa-phone mr-2"></i>
                  <a :href="`tel:${settingsStore.phoneNumber}`" class="hover:text-white transition-colors">
                    {{ settingsStore.phoneNumber }}
                  </a>
                </li>
                <li v-if="settingsStore.address" class="flex items-start">
                  <i class="fas fa-map-marker-alt mr-2 mt-1"></i>
                  <span class="hover:text-white transition-colors">
                    {{ settingsStore.address }}
                  </span>
                </li>
              </ul>
            </div>

            <!-- Yasal -->
            <div>
              <h3 class="text-xl font-bold mb-4">Yasal</h3>
              <ul class="space-y-2">
                <li>
                  <RouterLink to="/kvkk" class="text-gray-300 hover:text-white transition-colors">
                    KVKK Aydınlatma Metni
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/gizlilik-politikasi" class="text-gray-300 hover:text-white transition-colors">
                    Gizlilik Politikası
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/kullanim-kosullari" class="text-gray-300 hover:text-white transition-colors">
                    Kullanım Koşulları
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/cerez-politikasi" class="text-gray-300 hover:text-white transition-colors">
                    Çerez Politikası
                  </RouterLink>
                </li>
              </ul>
            </div>
          </div>

          <!-- Alt Footer -->
          <div class="border-t border-gray-700 mt-8 pt-8">
            <div class="flex flex-col md:flex-row justify-between items-center">
              <p class="text-gray-300 text-center md:text-left">
                &copy; {{ new Date().getFullYear() }} Mercan Danışmanlık. Tüm hakları saklıdır.
              </p>
              <div class="mt-4 md:mt-0 flex items-center space-x-4">
                <a href="/odeme/visa" class="hover:text-white transition-colors" title="Visa ile Ödeme">
                  <i class="fab fa-cc-visa text-2xl text-gray-300 hover:text-white"></i>
                </a>
                <a href="/odeme/mastercard" class="hover:text-white transition-colors" title="Mastercard ile Ödeme">
                  <i class="fab fa-cc-mastercard text-2xl text-gray-300 hover:text-white"></i>
                </a>
                <a href="/odeme/paypal" class="hover:text-white transition-colors" title="PayPal ile Ödeme">
                  <i class="fab fa-cc-paypal text-2xl text-gray-300 hover:text-white"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <!-- Cookie Consent -->
      <CookieConsent v-if="!isAdminRoute" />
    </div>

    <!-- Login Layout -->
    <div v-else>
      <RouterView />
    </div>
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
