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
  <main>
    <h1>Mercan Danışmanlık</h1>
  </main>
</template>

<style scoped>
main {
  padding: 2rem;
}

h1 {
  font-size: 2rem;
  color: var(--primary-color);
}

.card {
  @apply bg-white rounded-xl shadow p-8;
}
</style> 