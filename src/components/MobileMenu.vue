<template>
  <div 
    v-show="isOpen" 
    class="fixed inset-0 z-50 bg-black bg-opacity-50"
    @click="close"
  >
    <div 
      class="fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform transition-transform duration-300"
      :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
      @click.stop
    >
      <div class="p-4">
        <button 
          class="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100"
          @click="close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <nav class="mt-8">
          <RouterLink 
            v-for="(link, index) in links"
            :key="index"
            :to="link.to"
            class="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
            active-class="text-blue-600 font-medium"
            @click="close"
          >
            {{ link.text }}
          </RouterLink>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* Author: Serdar Topal */
import { RouterLink } from 'vue-router'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const links = [
  { to: '/', text: 'Ana Sayfa' },
  { to: '/hizmetler', text: 'Hizmetler' },
  { to: '/analiz', text: 'Site Analizi' },
  { to: '/blog', text: 'Blog' },
  { to: '/iletisim', text: 'İletişim' }
]

const close = () => {
  emit('close')
}
</script> 