<!-- HeroSection.vue -->
<template>
  <div class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Particles Background -->
    <Particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
      :options="{
        background: {
          color: {
            value: '#f8fafc'
          }
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: '#3b82f6'
          },
          links: {
            color: '#3b82f6',
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
        }
      }"
    />

    <!-- Hero Content -->
    <div class="container mx-auto px-4 z-10">
      <div class="text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Dijital Dünyada<br>
          <span class="text-blue-600">Profesyonel Çözümler</span>
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Web tasarım, SEO ve dijital pazarlama çözümleriyle işinizi büyütün.
          Profesyonel ekibimizle yanınızdayız.
        </p>
        <div class="flex justify-center gap-4">
          <a
            href="#services"
            class="btn btn-primary text-lg px-8 py-3"
          >
            Hizmetlerimiz
          </a>
          <a
            href="#contact"
            class="btn btn-secondary text-lg px-8 py-3"
          >
            İletişime Geçin
          </a>
        </div>
      </div>
    </div>

    <!-- Scroll Down Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <a href="#services" class="text-gray-400 hover:text-gray-600">
        <i class="fas fa-chevron-down text-2xl"></i>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { loadFull } from "tsparticles";
import Particles from 'vue3-particles'

const particlesInit = async (engine: any) => {
  await loadFull(engine);
};

const particlesLoaded = async (container: any) => {
  console.log("Particles container loaded", container);
};
</script>

<style scoped>
.btn {
  @apply inline-flex items-center justify-center rounded-lg transition-colors duration-200;
}

.btn-primary {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}

.btn-secondary {
  @apply bg-gray-100 text-gray-800 hover:bg-gray-200;
}
</style> 