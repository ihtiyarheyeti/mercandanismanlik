<template>
  <footer class="bg-gray-900 text-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- İletişim Bilgileri -->
        <div>
          <h3 class="text-xl font-semibold mb-4">İletişim</h3>
          <div class="space-y-2">
            <p v-if="settingsStore.address" class="flex items-center">
              <i class="fas fa-map-marker-alt mr-2"></i>
              {{ settingsStore.address }}
            </p>
            <p v-if="settingsStore.phoneNumber" class="flex items-center">
              <i class="fas fa-phone mr-2"></i>
              <a :href="`tel:${settingsStore.phoneNumber}`">{{ settingsStore.phoneNumber }}</a>
            </p>
            <p v-if="settingsStore.contactEmail" class="flex items-center">
              <i class="fas fa-envelope mr-2"></i>
              <a :href="`mailto:${settingsStore.contactEmail}`">{{ settingsStore.contactEmail }}</a>
            </p>
          </div>
        </div>

        <!-- Hızlı Linkler -->
        <div>
          <h3 class="text-xl font-semibold mb-4">Hızlı Linkler</h3>
          <ul class="space-y-2">
            <li>
              <RouterLink to="/hizmetler" class="hover:text-blue-400 transition-colors">
                Hizmetlerimiz
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/hakkimizda" class="hover:text-blue-400 transition-colors">
                Hakkımızda
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/blog" class="hover:text-blue-400 transition-colors">
                Blog
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/iletisim" class="hover:text-blue-400 transition-colors">
                İletişim
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Sosyal Medya -->
        <div>
          <h3 class="text-xl font-semibold mb-4">Sosyal Medya</h3>
          <div class="flex space-x-4">
            <a href="#" class="hover:text-blue-400 transition-colors">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="hover:text-blue-400 transition-colors">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="hover:text-blue-400 transition-colors">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#" class="hover:text-blue-400 transition-colors">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="mt-8 pt-8 border-t border-gray-800 text-center">
        <p>&copy; {{ new Date().getFullYear() }} {{ settingsStore.siteTitle || 'Mercan Danışmanlık' }}. Tüm hakları saklıdır.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()
</script> 