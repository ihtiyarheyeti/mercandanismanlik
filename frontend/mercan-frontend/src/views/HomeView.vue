<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import { loadFull } from 'tsparticles'
import { tsParticles } from 'tsparticles-engine'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

gsap.registerPlugin(ScrollTrigger)

const showChat = ref(false)
const newMessage = ref('')
const chatMessages = ref([
  { type: 'agent', text: 'Merhaba! Size nasıl yardımcı olabilirim?' }
])

// Yeni animasyon değişkenleri
const isHeroVisible = ref(false)
const heroTextRef = ref(null)
const servicesRef = ref(null)
const mousePos = ref({ x: 0, y: 0 })
const windowSize = ref({ width: 0, height: 0 })

// Teknoloji logoları için data
const technologies = [
  { name: 'HTML5', icon: 'fab fa-html5 text-orange-500' },
  { name: 'CSS3', icon: 'fab fa-css3-alt text-blue-500' },
  { name: 'JavaScript', icon: 'fab fa-js text-yellow-400' },
  { name: 'Vue.js', icon: 'fab fa-vuejs text-green-500' },
  { name: 'React', icon: 'fab fa-react text-blue-400' },
  { name: 'Node.js', icon: 'fab fa-node-js text-green-600' },
  { name: 'PHP', icon: 'fab fa-php text-purple-500' },
  { name: 'Laravel', icon: 'fab fa-laravel text-red-500' },
  { name: 'Python', icon: 'fab fa-python text-blue-500' },
  { name: 'Docker', icon: 'fab fa-docker text-blue-600' },
  { name: 'Git', icon: 'fab fa-git-alt text-orange-600' },
  { name: 'AWS', icon: 'fab fa-aws text-yellow-500' }
]

const toggleChat = () => {
  showChat.value = !showChat.value
}

const sendMessage = () => {
  if (!newMessage.value.trim()) return
  
  chatMessages.value.push({
    type: 'user',
    text: newMessage.value
  })
  
  // Simulate agent response
  setTimeout(() => {
    chatMessages.value.push({
      type: 'agent',
      text: 'Mesajınız alındı. En kısa sürede size dönüş yapacağız.'
    })
  }, 1000)
  
  newMessage.value = ''
}

const updateMousePosition = (event: MouseEvent) => {
  mousePos.value = {
    x: event.clientX,
    y: event.clientY
  }
}

const updateWindowSize = () => {
  windowSize.value = {
    width: window.innerWidth,
    height: window.innerHeight
  }
}

onMounted(() => {
  updateWindowSize()
  window.addEventListener('mousemove', updateMousePosition)
  window.addEventListener('resize', updateWindowSize)

  loadFull(tsParticles).then(() => {
    tsParticles.load('tsparticles', {
      fullScreen: {
        enable: false
      },
      background: {
        color: {
          value: 'transparent'
        }
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push"
          },
          onHover: {
            enable: true,
            mode: "repulse"
          },
          resize: true
        },
        modes: {
          push: {
            quantity: 4
          },
          repulse: {
            distance: 150,
            duration: 0.4
          }
        }
      },
      particles: {
        color: {
          value: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899']
        },
        links: {
          color: '#ffffff',
          distance: 150,
          enable: true,
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 3,
          direction: "none",
          random: true,
          straight: false,
          outModes: {
            default: "bounce"
          },
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200
          }
        },
        number: {
          density: {
            enable: true,
            area: 800
          },
          value: 100
        },
        opacity: {
          value: 0.8,
          random: true,
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.1,
            sync: false
          }
        },
        size: {
          value: { min: 1, max: 5 },
          random: true,
          animation: {
            enable: true,
            speed: 2,
            minimumValue: 0.1,
            sync: false
          }
        }
      },
      detectRetina: true
    })
  })

  gsap.from(heroTextRef.value, {
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: 'power4.out',
    onComplete: () => isHeroVisible.value = true
  })

  const cards = document.querySelectorAll('.service-card')
  cards.forEach((card, index) => {
    gsap.from(card, {
      y: 100,
      opacity: 0,
      duration: 1,
      delay: index * 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top bottom-=100',
        end: 'top center',
        toggleActions: 'play none none reverse'
      }
    })

    // Kart içindeki ikonlar için hover animasyonu
    const icon = card.querySelector('.service-icon')
    if (icon) {
      gsap.to(icon, {
        rotation: 360,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: icon,
          start: 'top center',
          toggleActions: 'play none none reverse'
        }
      })
    }
  })

  // Features kartları için animasyonlar
  const features = document.querySelectorAll('.feature-card')
  features.forEach((feature, index) => {
    gsap.from(feature, {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.2,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: feature,
        start: 'top bottom-=50',
        toggleActions: 'play none none reverse'
      }
    })
  })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', updateMousePosition)
  window.removeEventListener('resize', updateWindowSize)
})
</script>

<template>
  <div class="relative">
    <!-- Hero Section -->
    <div class="relative min-h-screen flex flex-col justify-start px-4 sm:px-6 lg:px-8">
      <div class="absolute inset-0">
        <div id="tsparticles" ref="particlesContainer" class="absolute inset-0"></div>
        <div class="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-gray-900/90"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto text-center mt-[120px]">
        <div class="space-y-6">
          <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white px-2 leading-tight">
            <span class="block mb-1">Mercan</span>
            <span class="block">Danışmanlık</span>
          </h1>
          <p class="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto px-2">
            Dijital dünyada işinizi büyütmenize yardımcı oluyoruz. 
            <span class="text-blue-400">SEO</span>, 
            <span class="text-purple-400">web tasarım</span> ve 
            <span class="text-pink-400">dijital pazarlama</span> 
            çözümleriyle yanınızdayız.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-2">
            <a href="/hizmetler" class="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white text-sm sm:text-base rounded-lg hover:bg-blue-700 transition-colors duration-300">
              Hizmetlerimiz
            </a>
            <a href="/iletisim" class="w-full sm:w-auto px-6 py-2.5 bg-gray-700 text-white text-sm sm:text-base rounded-lg hover:bg-gray-800 transition-colors duration-300">
              İletişime Geçin
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Services Section -->
    <div class="relative py-16 bg-gradient-to-b from-gray-900 to-blue-900">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl sm:text-4xl font-bold text-center text-white mb-4 relative">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Profesyonel Dijital Çözümler
          </span>
        </h2>
        <p class="text-gray-300 text-center mb-12 sm:mb-16 max-w-3xl mx-auto px-4">
          İşinizi büyütmek için ihtiyacınız olan tüm dijital hizmetleri tek çatı altında sunuyoruz.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <!-- Web Design Card -->
          <div class="service-card bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 transform transition-all duration-300 hover:scale-105">
            <div class="text-center mb-4">
              <i class="fas fa-laptop-code text-4xl text-blue-400"></i>
            </div>
            <h3 class="text-xl sm:text-2xl font-semibold text-white mb-3">Web Tasarım</h3>
            <p class="text-gray-300 text-sm sm:text-base">Modern ve kullanıcı dostu web siteleri tasarlıyoruz.</p>
          </div>

          <!-- Digital Marketing Card -->
          <div class="service-card bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 transform transition-all duration-300 hover:scale-105">
            <div class="text-center mb-4">
              <i class="fas fa-bullhorn text-4xl text-purple-400"></i>
            </div>
            <h3 class="text-xl sm:text-2xl font-semibold text-white mb-3">Dijital Pazarlama</h3>
            <p class="text-gray-300 text-sm sm:text-base">Markanızı dijital dünyada öne çıkarıyoruz.</p>
          </div>

          <!-- SEO Card -->
          <div class="service-card bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 transform transition-all duration-300 hover:scale-105">
            <div class="text-center mb-4">
              <i class="fas fa-search text-4xl text-pink-400"></i>
            </div>
            <h3 class="text-xl sm:text-2xl font-semibold text-white mb-3">SEO Optimizasyonu</h3>
            <p class="text-gray-300 text-sm sm:text-base">Arama motorlarında üst sıralarda yer alın.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Technologies Carousel -->
    <div class="py-16 bg-gradient-to-b from-gray-900 to-blue-900">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-white">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Teknolojilerimiz
          </span>
        </h2>
        <Carousel
          :items-to-show="4"
          :wrap-around="true"
          :autoplay="3000"
          class="mx-auto max-w-6xl"
          :breakpoints="{
            320: {
              itemsToShow: 2,
              snapAlign: 'center',
            },
            768: {
              itemsToShow: 3,
              snapAlign: 'center',
            },
            1024: {
              itemsToShow: 4,
              snapAlign: 'start',
            },
          }"
        >
          <Slide v-for="tech in technologies" :key="tech.name">
            <div class="flex flex-col items-center justify-center p-6 mx-2 bg-white/5 backdrop-blur-lg rounded-xl hover:bg-white/10 transition-all duration-300 group">
              <i :class="[tech.icon, 'text-5xl mb-4 transition-all duration-300 group-hover:scale-110']"></i>
              <span class="text-white/80 group-hover:text-white transition-colors duration-300">{{ tech.name }}</span>
            </div>
          </Slide>

          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
    </div>

    <!-- Features section -->
    <div class="relative py-16 bg-gradient-to-b from-blue-900 to-gray-900">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-white">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Neden Bizi Seçmelisiniz?
          </span>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="feature-card group bg-white/10 backdrop-blur-lg p-8 rounded-2xl hover:bg-white/20 transition-all duration-500">
            <div class="text-blue-400 text-4xl mb-4 service-icon transform transition-all duration-500 group-hover:scale-110">
              <i class="fas fa-chart-line"></i>
            </div>
            <h3 class="text-xl font-semibold mb-3 text-white">SEO Uzmanlığı</h3>
            <p class="text-gray-300">Arama motorlarında üst sıralarda yer almanız için profesyonel SEO hizmetleri sunuyoruz.</p>
          </div>
          <div class="feature-card group bg-white/10 backdrop-blur-lg p-8 rounded-2xl hover:bg-white/20 transition-all duration-500">
            <div class="text-purple-400 text-4xl mb-4 service-icon transform transition-all duration-500 group-hover:scale-110">
              <i class="fas fa-laptop-code"></i>
            </div>
            <h3 class="text-xl font-semibold mb-3 text-white">Modern Tasarım</h3>
            <p class="text-gray-300">Kullanıcı dostu ve modern web siteleri tasarlıyoruz.</p>
          </div>
          <div class="feature-card group bg-white/10 backdrop-blur-lg p-8 rounded-2xl hover:bg-white/20 transition-all duration-500">
            <div class="text-pink-400 text-4xl mb-4 service-icon transform transition-all duration-500 group-hover:scale-110">
              <i class="fas fa-bullhorn"></i>
            </div>
            <h3 class="text-xl font-semibold mb-3 text-white">Dijital Pazarlama</h3>
            <p class="text-gray-300">Sosyal medya ve Google Ads ile markanızı büyütüyoruz.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Chat Section -->
  <div class="fixed bottom-4 right-4 z-50">
    <button 
      @click="toggleChat"
      class="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300"
    >
      <i class="fas fa-comments text-2xl"></i>
    </button>

    <!-- Chat Window -->
    <div 
      v-if="showChat"
      class="absolute bottom-16 right-0 w-[300px] sm:w-[350px] bg-white rounded-lg shadow-xl"
    >
      <div class="p-4 bg-blue-600 text-white rounded-t-lg flex justify-between items-center">
        <h3 class="font-semibold">Canlı Destek</h3>
        <button @click="toggleChat" class="text-white hover:text-gray-200">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <div class="p-4 h-[300px] overflow-y-auto bg-gray-50">
        <div v-for="(message, index) in chatMessages" :key="index" 
          :class="[
            'mb-3 p-2 rounded-lg max-w-[75%]',
            message.type === 'user' ? 'ml-auto bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
          ]"
        >
          {{ message.text }}
        </div>
      </div>

      <div class="p-4 border-t">
        <form @submit.prevent="sendMessage" class="flex gap-2">
          <input 
            v-model="newMessage" 
            type="text" 
            placeholder="Mesajınız..."
            class="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-600"
          >
          <button 
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <i class="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../assets/main.css';

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animate-bounce-slow {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(-5%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

.btn-primary {
  background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
  color: white;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #4338CA 0%, #6D28D9 100%);
  transform: translateY(-2px);
}

.btn-secondary {
  background: linear-gradient(135deg, #6B7280 0%, #4B5563 100%);
  color: white;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: linear-gradient(135deg, #4B5563 0%, #374151 100%);
  transform: translateY(-2px);
}

.service-card {
  transition: all 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
}

.services-section {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  overflow: visible;
}

/* Gradient arka plan için */
.services-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(17, 24, 39, 0.95), rgba(29, 78, 216, 0.95));
  z-index: -1;
}

/* Sohbet animasyonları */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Sohbet mesajları için özel scrollbar */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(59, 130, 246, 0.5) rgba(243, 244, 246, 1);
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(243, 244, 246, 1);
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(59, 130, 246, 0.5);
  border-radius: 3px;
}

.feature-card {
  position: relative;
  overflow: hidden;
  transition: all 0.5s ease;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: -100%;
  left: -100%;
  width: 300%;
  height: 300%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: all 0.5s ease;
}

.feature-card:hover::before {
  top: -50%;
  left: -50%;
}

.service-icon {
  position: relative;
  z-index: 1;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.feature-card:hover .service-icon {
  animation: float 2s ease-in-out infinite;
}

/* Carousel özelleştirmeleri */
:deep(.carousel__slide) {
  padding: 1rem;
}

:deep(.carousel__prev),
:deep(.carousel__next) {
  background-color: rgba(255, 255, 255, 0.1) !important;
  border-radius: 9999px;
  width: 48px !important;
  height: 48px !important;
  color: white !important;
}

:deep(.carousel__prev:hover),
:deep(.carousel__next:hover) {
  background-color: rgba(255, 255, 255, 0.2) !important;
}

:deep(.carousel__icon) {
  width: 24px;
  height: 24px;
}
</style>
