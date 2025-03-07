<!-- Admin Layout -->
<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Sidebar -->
    <aside class="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <router-link to="/admin" class="flex items-center justify-center space-x-2">
          <template v-if="settingsStore.logo">
            <img 
              :src="logoUrl" 
              alt="Logo" 
              class="h-12 w-auto object-contain"
              @error="handleLogoError"
              ref="logoImg"
            />
          </template>
          <span v-else class="text-lg font-semibold text-gray-900 dark:text-white">Mercan Panel</span>
        </router-link>
      </div>
      
      <nav class="p-4 space-y-1">
        <!-- Dashboard -->
        <router-link to="/admin" class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white rounded-lg transition-colors">
          <i class="fas fa-home mr-3"></i>
          <span>Dashboard</span>
        </router-link>

        <!-- Site Yönetimi -->
        <div class="space-y-1">
          <div class="px-4 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400">Site Yönetimi</div>
          <router-link to="/admin/site-ayarlari" class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white rounded-lg transition-colors">
            <i class="fas fa-cog mr-3"></i>
            <span>Site Ayarları</span>
          </router-link>
          <router-link to="/admin/seo" class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white rounded-lg transition-colors">
            <i class="fas fa-search mr-3"></i>
            <span>SEO Yönetimi</span>
          </router-link>
          <router-link to="/admin/sayfalar" class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white rounded-lg transition-colors">
            <i class="fas fa-file-alt mr-3"></i>
            <span>Sayfa Yönetimi</span>
          </router-link>
        </div>

        <!-- İçerik Yönetimi -->
        <div class="space-y-1">
          <div class="px-4 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400">İçerik Yönetimi</div>
          <router-link to="/admin/blog" class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white rounded-lg transition-colors">
            <i class="fas fa-blog mr-3"></i>
            <span>Blog Yönetimi</span>
          </router-link>
          <router-link to="/admin/hizmetler" class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white rounded-lg transition-colors">
            <i class="fas fa-briefcase mr-3"></i>
            <span>Hizmet Yönetimi</span>
          </router-link>
          <router-link to="/admin/referanslar" class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white rounded-lg transition-colors">
            <i class="fas fa-star mr-3"></i>
            <span>Referanslar</span>
          </router-link>
        </div>

        <!-- Web Tasarım Satış -->
        <div class="space-y-1">
          <div class="px-4 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400">Web Tasarım Satış</div>
          <router-link to="/admin/hazir-siteler" class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white rounded-lg transition-colors">
            <i class="fas fa-store mr-3"></i>
            <span>Hazır Siteler</span>
          </router-link>
          <router-link to="/admin/siparisler" class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white rounded-lg transition-colors">
            <i class="fas fa-shopping-cart mr-3"></i>
            <span>Sipariş Takibi</span>
          </router-link>
          <router-link to="/admin/odemeler" class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white rounded-lg transition-colors">
            <i class="fas fa-credit-card mr-3"></i>
            <span>Ödeme Yönetimi</span>
          </router-link>
        </div>

        <!-- Reklam Yönetimi -->
        <div class="space-y-1">
          <div class="px-4 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400">Reklam Yönetimi</div>
          <router-link to="/admin/kampanyalar" class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white rounded-lg transition-colors">
            <i class="fas fa-ad mr-3"></i>
            <span>Kampanyalar</span>
          </router-link>
          <router-link to="/admin/performans" class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white rounded-lg transition-colors">
            <i class="fas fa-chart-line mr-3"></i>
            <span>Performans</span>
          </router-link>
          <router-link to="/admin/butce" class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white rounded-lg transition-colors">
            <i class="fas fa-wallet mr-3"></i>
            <span>Bütçe</span>
          </router-link>
        </div>

        <!-- Kullanıcı & Güvenlik -->
        <div class="space-y-1">
          <div class="px-4 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400">Kullanıcı & Güvenlik</div>
          <router-link to="/admin/kullanicilar" class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white rounded-lg transition-colors">
            <i class="fas fa-users mr-3"></i>
            <span>Kullanıcılar</span>
          </router-link>
          <router-link to="/admin/loglar" class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white rounded-lg transition-colors">
            <i class="fas fa-shield-alt mr-3"></i>
            <span>Güvenlik & Loglar</span>
          </router-link>
        </div>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="ml-64 p-8">
      <!-- Header -->
      <header class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          <slot name="header">Admin Panel</slot>
        </h1>
        
        <div class="flex items-center space-x-4">
          <!-- Notifications -->
          <button class="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <i class="fas fa-bell"></i>
          </button>
          
          <!-- User Menu -->
          <div class="relative">
            <button class="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">
              <i class="fas fa-user-circle text-2xl"></i>
              <span>Admin</span>
              <i class="fas fa-chevron-down"></i>
            </button>
          </div>
          
          <!-- Theme Toggle -->
          <button class="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <i class="fas fa-moon"></i>
          </button>
        </div>
      </header>

      <!-- Content -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'

const router = useRouter()
const isDarkMode = ref(false)
const settingsStore = useSettingsStore()
const hasLogoError = ref(false)
const logoImg = ref<HTMLImageElement | null>(null)

const logoUrl = computed(() => {
  if (hasLogoError.value) {
    return '/images/default-logo.png'
  }
  return settingsStore.logo || '/images/default-logo.png'
})

onMounted(async () => {
  await settingsStore.fetchSettings()
})

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark')
}

const logout = async () => {
  // Çıkış işlemleri burada yapılacak
  localStorage.removeItem('token')
  await router.push('/login')
}

const handleLogoError = () => {
  if (!hasLogoError.value) {
    hasLogoError.value = true
    if (logoImg.value) {
      logoImg.value.src = '/images/default-logo.png'
    }
  }
}
</script>

<style scoped>
.router-link-active {
  @apply bg-blue-500 text-white;
}
</style> 