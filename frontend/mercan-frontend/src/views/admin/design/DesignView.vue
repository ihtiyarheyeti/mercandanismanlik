<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-8">
      <!-- Üst Başlık -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-800">Sayfa Tasarımı</h1>
        <p class="text-gray-600">Web sitesi sayfalarının tasarımını ve içeriğini buradan yönetebilirsiniz.</p>
      </div>

      <!-- Ana Grid -->
      <div class="grid grid-cols-12 gap-6">
        <!-- Sol Menü -->
        <div class="col-span-3">
          <div class="bg-white rounded-lg shadow-sm p-4">
            <nav class="space-y-2">
              <router-link
                v-for="page in pages"
                :key="page.path"
                :to="{ name: page.route }"
                class="flex items-center px-4 py-3 rounded-lg transition-colors"
                :class="[
                  $route.name === page.route
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                ]"
              >
                <i :class="['fas', page.icon, 'w-5']"></i>
                <span class="ml-3">{{ page.name }}</span>
              </router-link>
            </nav>
          </div>
        </div>

        <!-- Sağ İçerik -->
        <div class="col-span-9">
          <router-view v-slot="{ Component }">
            <transition
              name="fade"
              mode="out-in"
              @before-enter="beforeEnter"
              @enter="enter"
              @leave="leave"
            >
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import gsap from 'gsap'

const pages = ref([
  {
    name: 'Ana Sayfa',
    route: 'design-home',
    path: '/admin/tasarim/anasayfa',
    icon: 'fa-home'
  },
  {
    name: 'Hizmetler',
    route: 'design-services',
    path: '/admin/tasarim/hizmetler',
    icon: 'fa-briefcase'
  },
  {
    name: 'Araçlar',
    route: 'design-tools',
    path: '/admin/tasarim/araclar',
    icon: 'fa-tools'
  },
  {
    name: 'Blog',
    route: 'design-blog',
    path: '/admin/tasarim/blog',
    icon: 'fa-blog'
  },
  {
    name: 'Hakkımızda',
    route: 'design-about',
    path: '/admin/tasarim/hakkimizda',
    icon: 'fa-info-circle'
  },
  {
    name: 'İletişim',
    route: 'design-contact',
    path: '/admin/tasarim/iletisim',
    icon: 'fa-envelope'
  },
  {
    name: 'Referanslar',
    route: 'design-references',
    path: '/admin/tasarim/referanslar',
    icon: 'fa-handshake'
  },
  {
    name: 'SSS',
    route: 'design-faq',
    path: '/admin/tasarim/sss',
    icon: 'fa-question-circle'
  }
])

// Sayfa geçiş animasyonları
const beforeEnter = (el: Element) => {
  gsap.set(el, {
    opacity: 0,
    y: 20
  })
}

const enter = (el: Element, done: () => void) => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.3,
    onComplete: done
  })
}

const leave = (el: Element, done: () => void) => {
  gsap.to(el, {
    opacity: 0,
    y: -20,
    duration: 0.3,
    onComplete: done
  })
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 