<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import { loadFull } from 'tsparticles'
import { tsParticles } from 'tsparticles-engine'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

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
  { name: 'Laravel', icon: 'fab fa-laravel text-red-500' },
  { name: 'Python', icon: 'fab fa-python text-blue-500' },
  { name: 'Docker', icon: 'fab fa-docker text-blue-600' },
  { name: 'Git', icon: 'fab fa-git-alt text-orange-600' },
  { name: 'AWS', icon: 'fab fa-aws text-yellow-500' }
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
    <!-- Hero section with particles -->
    <div class="relative h-[70vh] bg-black overflow-hidden">
      <!-- Particles background -->
      <div id="tsparticles" class="absolute inset-0" style="height: 100%"></div>

      <!-- Interactive background effect -->
      <div 
        class="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"
        :style="{
          transform: windowSize.width ? `translate(${(mousePos.x / windowSize.width - 0.5) * 20}px, ${(mousePos.y / windowSize.height - 0.5) * 20}px)` : 'none'
        }"
      ></div>

      <!-- Content -->
      <div class="relative h-full flex items-center">
        <div ref="heroTextRef" class="container mx-auto px-4 py-16 text-center">
          <h1 
            class="text-5xl md:text-6xl font-bold text-white mb-6 relative"
            :class="{ 'animate-bounce-slow': isHeroVisible }"
          >
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Mercan Danışmanlık
            </span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-300 mb-8 md:mb-12 max-w-3xl mx-auto">
            Dijital dünyada işinizi büyütmenize yardımcı oluyoruz. 
            <span class="text-blue-400">SEO</span>, 
            <span class="text-purple-400">web tasarım</span> ve 
            <span class="text-pink-400">dijital pazarlama</span> 
            çözümleriyle yanınızdayız.
          </p>
          <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a 
              href="/hizmetler" 
              class="w-full sm:w-auto btn-primary text-base md:text-lg px-6 md:px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:rotate-1 text-center"
            >
              Hizmetlerimiz
            </a>
            <a 
              href="/iletisim" 
              class="w-full sm:w-auto btn-secondary text-base md:text-lg px-6 md:px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:-rotate-1 text-center"
            >
              İletişime Geçin
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Services section -->
    <div ref="servicesRef" class="services-section relative py-24 bg-gradient-to-b from-gray-900 to-blue-900">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center text-white mb-4 relative">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Profesyonel Dijital Çözümler
          </span>
        </h2>
        <p class="text-gray-300 text-center mb-16 max-w-3xl mx-auto">
          İşinizi büyütmek için ihtiyacınız olan tüm dijital hizmetleri tek çatı altında sunuyoruz.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Yazılım Geliştirme -->
          <div class="service-card group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-lg p-8 transition-all duration-500">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-600/50 to-cyan-600/50 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div class="relative z-10">
              <div class="text-blue-400 text-5xl mb-6 transform group-hover:scale-110 group-hover:text-white transition-all duration-500">
                <i class="fas fa-code"></i>
              </div>
              <h3 class="text-2xl font-semibold text-white mb-4 group-hover:text-white transition-colors duration-500">Yazılım Geliştirme</h3>
              <p class="text-gray-300 mb-6 group-hover:text-white/90 transition-colors duration-500">İşinize özel yazılım çözümleri geliştiriyoruz.</p>
              <ul class="text-gray-300 space-y-2 transition-all duration-500 group-hover:translate-x-2">
                <li class="flex items-center group-hover:text-white/90">
                  <i class="fas fa-check text-green-400 mr-2 group-hover:text-white"></i>
                  Özel Web Uygulamaları
                </li>
                <li class="flex items-center group-hover:text-white/90">
                  <i class="fas fa-check text-green-400 mr-2 group-hover:text-white"></i>
                  E-ticaret Sistemleri
                </li>
                <li class="flex items-center group-hover:text-white/90">
                  <i class="fas fa-check text-green-400 mr-2 group-hover:text-white"></i>
                  API Entegrasyonları
                </li>
              </ul>
            </div>
          </div>

          <!-- Web Tasarım -->
          <div class="service-card group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-lg p-8 transition-all duration-500">
            <div class="absolute inset-0 bg-gradient-to-br from-purple-600/50 to-pink-600/50 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div class="relative z-10">
              <div class="text-purple-400 text-5xl mb-6 transform group-hover:scale-110 group-hover:text-white transition-all duration-500">
                <i class="fas fa-laptop-code"></i>
              </div>
              <h3 class="text-2xl font-semibold text-white mb-4 group-hover:text-white transition-colors duration-500">Web Tasarım</h3>
              <p class="text-gray-300 mb-6 group-hover:text-white/90 transition-colors duration-500">Modern ve etkileyici web siteleri tasarlıyoruz.</p>
              <ul class="text-gray-300 space-y-2 transition-all duration-500 group-hover:translate-x-2">
                <li class="flex items-center group-hover:text-white/90">
                  <i class="fas fa-check text-green-400 mr-2 group-hover:text-white"></i>
                  Responsive Tasarım
                </li>
                <li class="flex items-center group-hover:text-white/90">
                  <i class="fas fa-check text-green-400 mr-2 group-hover:text-white"></i>
                  UI/UX Tasarımı
                </li>
                <li class="flex items-center group-hover:text-white/90">
                  <i class="fas fa-check text-green-400 mr-2 group-hover:text-white"></i>
                  WordPress Çözümleri
                </li>
              </ul>
            </div>
          </div>

          <!-- Google Ads -->
          <div class="service-card group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-lg p-8 transition-all duration-500">
            <div class="absolute inset-0 bg-gradient-to-br from-red-600/50 to-yellow-600/50 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div class="relative z-10">
              <div class="text-red-400 text-5xl mb-6 transform group-hover:scale-110 group-hover:text-white transition-all duration-500">
                <i class="fab fa-google"></i>
              </div>
              <h3 class="text-2xl font-semibold text-white mb-4 group-hover:text-white transition-colors duration-500">Google Ads</h3>
              <p class="text-gray-300 mb-6 group-hover:text-white/90 transition-colors duration-500">Etkili Google Ads kampanyaları yönetiyoruz.</p>
              <ul class="text-gray-300 space-y-2 transition-all duration-500 group-hover:translate-x-2">
                <li class="flex items-center group-hover:text-white/90">
                  <i class="fas fa-check text-green-400 mr-2 group-hover:text-white"></i>
                  Arama Ağı Reklamları
                </li>
                <li class="flex items-center group-hover:text-white/90">
                  <i class="fas fa-check text-green-400 mr-2 group-hover:text-white"></i>
                  Görüntülü Reklamlar
                </li>
                <li class="flex items-center group-hover:text-white/90">
                  <i class="fas fa-check text-green-400 mr-2 group-hover:text-white"></i>
                  Remarketing
                </li>
              </ul>
            </div>
          </div>

          <!-- Facebook Ads -->
          <div class="service-card group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-lg p-8 transition-all duration-500">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-700/50 to-blue-400/50 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div class="relative z-10">
              <div class="text-blue-400 text-5xl mb-6 transform group-hover:scale-110 group-hover:text-white transition-all duration-500">
                <i class="fab fa-facebook"></i>
              </div>
              <h3 class="text-2xl font-semibold text-white mb-4 group-hover:text-white transition-colors duration-500">Facebook Ads</h3>
              <p class="text-gray-300 mb-6 group-hover:text-white/90 transition-colors duration-500">Hedefli Facebook & Instagram reklamları.</p>
              <ul class="text-gray-300 space-y-2 transition-all duration-500 group-hover:translate-x-2">
                <li class="flex items-center group-hover:text-white/90">
                  <i class="fas fa-check text-green-400 mr-2 group-hover:text-white"></i>
                  Feed Reklamları
                </li>
                <li class="flex items-center group-hover:text-white/90">
                  <i class="fas fa-check text-green-400 mr-2 group-hover:text-white"></i>
                  Story Reklamları
                </li>
                <li class="flex items-center group-hover:text-white/90">
                  <i class="fas fa-check text-green-400 mr-2 group-hover:text-white"></i>
                  Messenger Reklamları
                </li>
              </ul>
            </div>
          </div>

          <!-- Grafik Tasarım -->
          <div class="service-card group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-lg p-8 transition-all duration-500">
            <div class="absolute inset-0 bg-gradient-to-br from-pink-600/50 to-orange-600/50 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div class="relative z-10">
              <div class="text-pink-400 text-5xl mb-6 transform group-hover:scale-110 group-hover:text-white transition-all duration-500">
                <i class="fas fa-palette"></i>
              </div>
              <h3 class="text-2xl font-semibold text-white mb-4 group-hover:text-white transition-colors duration-500">Grafik Tasarım</h3>
              <p class="text-gray-300 mb-6 group-hover:text-white/90 transition-colors duration-500">Profesyonel grafik tasarım hizmetleri.</p>
              <ul class="text-gray-300 space-y-2 transition-all duration-500 group-hover:translate-x-2">
                <li class="flex items-center group-hover:text-white/90">
                  <i class="fas fa-check text-green-400 mr-2 group-hover:text-white"></i>
                  Katalog Tasarımı
                </li>
                <li class="flex items-center group-hover:text-white/90">
                  <i class="fas fa-check text-green-400 mr-2 group-hover:text-white"></i>
                  Banner Tasarımı
                </li>
                <li class="flex items-center group-hover:text-white/90">
                  <i class="fas fa-check text-green-400 mr-2 group-hover:text-white"></i>
                  Sosyal Medya Görselleri
                </li>
              </ul>
            </div>
          </div>

          <!-- Sosyal Medya Danışmanlığı -->
          <div class="service-card group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-lg p-8 transition-all duration-500">
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-600/50 to-purple-600/50 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div class="relative z-10">
              <div class="text-indigo-400 text-5xl mb-6 transform group-hover:scale-110 group-hover:text-white transition-all duration-500">
                <i class="fas fa-hashtag"></i>
              </div>
              <h3 class="text-2xl font-semibold text-white mb-4 group-hover:text-white transition-colors duration-500">Sosyal Medya Danışmanlığı</h3>
              <p class="text-gray-300 mb-6 group-hover:text-white/90 transition-colors duration-500">Sosyal medya varlığınızı güçlendiriyoruz.</p>
              <ul class="text-gray-300 space-y-2 transition-all duration-500 group-hover:translate-x-2">
                <li class="flex items-center group-hover:text-white/90">
                  <i class="fas fa-check text-green-400 mr-2 group-hover:text-white"></i>
                  İçerik Yönetimi
                </li>
                <li class="flex items-center group-hover:text-white/90">
                  <i class="fas fa-check text-green-400 mr-2 group-hover:text-white"></i>
                  Topluluk Yönetimi
                </li>
                <li class="flex items-center group-hover:text-white/90">
                  <i class="fas fa-check text-green-400 mr-2 group-hover:text-white"></i>
                  Strateji Geliştirme
                </li>
              </ul>
            </div>
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
