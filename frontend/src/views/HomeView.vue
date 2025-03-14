<script setup lang="ts">
import { onMounted } from 'vue'
import { loadFull } from 'tsparticles'
import Particles from 'vue3-particles'

const particlesInit = async (engine: any) => {
  await loadFull(engine)
}

const particlesOptions = {
  background: {
    color: {
      value: 'transparent'
    }
  },
  fpsLimit: 60,
  particles: {
    color: {
      value: '#0ea5e9'
    },
    links: {
      color: '#0ea5e9',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1
    },
    move: {
      enable: true,
      speed: 2
    },
    number: {
      density: {
        enable: true,
        area: 800
      },
      value: 80
    },
    opacity: {
      value: 0.5
    },
    size: {
      value: { min: 1, max: 3 }
    }
  },
  detectRetina: true
}
</script>

<template>
  <div class="min-h-screen bg-blue-600 text-white flex items-center">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-bold">Mercan Danışmanlık</h1>
      <p class="mt-4 text-xl">Dijital çözümler için yanınızdayız.</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  @apply bg-white rounded-xl shadow p-8;
}
</style> 