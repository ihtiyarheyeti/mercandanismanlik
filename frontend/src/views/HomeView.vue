<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import { loadFull } from 'tsparticles'
import { tsParticles } from 'tsparticles-engine'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import EditableContent from '@/components/EditableContent.vue'
import { useEditModeStore } from '@/stores/editMode'

gsap.registerPlugin(ScrollTrigger)

const isChatOpen = ref(false)
const message = ref('')
const chatMessages = ref([
  {
    id: 1,
    type: 'system',
    message: 'Mercan Danışmanlık\'a hoş geldiniz! Size nasıl yardımcı olabiliriz?',
    time: new Date()
  }
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
  { name: 'WordPress', icon: 'fab fa-wordpress text-blue-600' },
  { name: 'Instagram', icon: 'fab fa-instagram text-pink-500' },
  { name: 'Twitter', icon: 'fab fa-twitter text-blue-400' },
  { name: 'TikTok', icon: 'fab fa-tiktok text-black' },
  { name: 'Facebook', icon: 'fab fa-facebook text-blue-600' }
]

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value
}

const sendMessage = () => {
  if (!message.value.trim()) return

  chatMessages.value.push({
    id: chatMessages.value.length + 1,
    type: 'user',
    message: message.value,
    time: new Date()
  })

  // Simüle edilmiş otomatik yanıt
  setTimeout(() => {
    chatMessages.value.push({
      id: chatMessages.value.length + 1,
      type: 'agent',
      message: 'Mesajınız için teşekkürler. En kısa sürede size dönüş yapacağız.',
      time: new Date()
    })
  }, 1000)

  message.value = ''
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

const editModeStore = useEditModeStore()

const content = ref({
  hero: {
    title: 'Mercan Danışmanlık',
    description: 'Profesyonel danışmanlık hizmetleri'
  },
  services: {
    title: 'Hizmetlerimiz',
    items: [
      {
        icon: '/icons/service1.svg',
        title: 'Hizmet 1',
        description: 'Hizmet açıklaması 1'
      },
      {
        icon: '/icons/service2.svg',
        title: 'Hizmet 2',
        description: 'Hizmet açıklaması 2'
      },
      {
        icon: '/icons/service3.svg',
        title: 'Hizmet 3',
        description: 'Hizmet açıklaması 3'
      }
    ]
  },
  contact: {
    title: 'İletişim',
    address: 'Adres bilgisi',
    phone: 'Telefon numarası',
    email: 'E-posta adresi'
  }
})

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
  <div class="home">
    <!-- Hero Section -->
    <section class="hero bg-primary text-white py-16">
      <div class="container mx-auto px-4">
        <EditableContent
          v-model="content.hero.title"
          content-id="hero-title"
          tag="h1"
          content-class="text-4xl font-bold mb-4"
        />
        <EditableContent
          v-model="content.hero.description"
          content-id="hero-description"
          tag="p"
          content-class="text-lg mb-8"
        />
      </div>
    </section>

    <!-- Hizmetler -->
    <section class="services py-16">
      <div class="container mx-auto px-4">
        <EditableContent
          v-model="content.services.title"
          content-id="services-title"
          tag="h2"
          content-class="text-3xl font-bold text-center mb-12"
        />
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(service, index) in content.services.items" :key="index" class="service-card">
            <EditableContent
              v-model="service.icon"
              :content-id="'service-icon-' + index"
              type="image"
              tag="img"
              content-class="w-16 h-16 mx-auto mb-4"
            />
            <EditableContent
              v-model="service.title"
              :content-id="'service-title-' + index"
              tag="h3"
              content-class="text-xl font-semibold mb-2 text-center"
            />
            <EditableContent
              v-model="service.description"
              :content-id="'service-description-' + index"
              tag="p"
              content-class="text-gray-600 text-center"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- İletişim -->
    <section class="contact bg-gray-100 py-16">
      <div class="container mx-auto px-4">
        <EditableContent
          v-model="content.contact.title"
          content-id="contact-title"
          tag="h2"
          content-class="text-3xl font-bold text-center mb-12"
        />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="contact-info">
            <EditableContent
              v-model="content.contact.address"
              content-id="contact-address"
              tag="p"
              content-class="mb-4"
            />
            <EditableContent
              v-model="content.contact.phone"
              content-id="contact-phone"
              tag="p"
              content-class="mb-4"
            />
            <EditableContent
              v-model="content.contact.email"
              content-id="contact-email"
              tag="p"
              content-class="mb-4"
            />
          </div>
          <div class="contact-form">
            <!-- Form bileşeni buraya gelecek -->
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- Canlı Sohbet -->
  <div class="fixed bottom-4 right-4 z-50">
    <!-- Sohbet Butonu -->
    <button 
      @click="toggleChat"
      class="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors duration-300"
    >
      <i :class="isChatOpen ? 'fas fa-times' : 'fas fa-comments'" class="text-2xl"></i>
    </button>

    <!-- Sohbet Penceresi -->
    <div 
      v-if="isChatOpen"
      class="absolute bottom-16 right-0 w-96 bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300"
    >
      <!-- Başlık -->
      <div class="bg-blue-600 text-white p-4">
        <h3 class="text-lg font-semibold">Canlı Destek</h3>
        <p class="text-sm opacity-90">Size nasıl yardımcı olabiliriz?</p>
      </div>

      <!-- Mesajlar -->
      <div class="h-96 overflow-y-auto p-4 bg-gray-50">
        <div 
          v-for="msg in chatMessages" 
          :key="msg.id"
          :class="[
            'mb-4 max-w-[80%] rounded-lg p-3',
            msg.type === 'user' ? 'ml-auto bg-blue-600 text-white' : 
            msg.type === 'agent' ? 'bg-gray-200 text-gray-800' :
            'bg-gray-100 text-gray-600 text-sm italic w-full text-center'
          ]"
        >
          <p>{{ msg.message }}</p>
          <span class="text-xs opacity-75 block mt-1">
            {{ new Date(msg.time).toLocaleTimeString() }}
          </span>
        </div>
      </div>

      <!-- Mesaj Gönderme -->
      <div class="p-4 border-t">
        <form @submit.prevent="sendMessage" class="flex gap-2">
          <input
            v-model="message"
            type="text"
            placeholder="Mesajınızı yazın..."
            class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
          <button 
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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
