<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const hoveredCard = ref<string | null>(null)

const services = [
  {
    id: 'web',
    title: 'Web Tasarım ve Geliştirme',
    description: 'Modern ve kullanıcı dostu web siteleri tasarlıyor, SEO uyumlu ve mobil öncelikli yaklaşımla geliştiriyoruz.',
    icon: 'fa-laptop-code',
    color: 'text-purple-400'
  },
  {
    id: 'seo',
    title: 'SEO ve İçerik Stratejisi',
    description: 'Arama motorlarında üst sıralarda yer almanız için kapsamlı SEO çalışmaları ve içerik stratejileri oluşturuyoruz.',
    icon: 'fa-search',
    color: 'text-blue-400'
  },
  {
    id: 'social',
    title: 'Sosyal Medya Yönetimi',
    description: 'Markanızın sosyal medya varlığını güçlendiriyor, etkileşimi artırıyor ve hedef kitlenizle bağ kuruyoruz.',
    icon: 'fa-share-alt',
    color: 'text-pink-400'
  },
  {
    id: 'ads',
    title: 'Google ve Sosyal Medya Reklamları',
    description: 'Google Ads ve sosyal medya platformlarında etkili reklam kampanyaları ile potansiyel müşterilerinize ulaşıyoruz.',
    icon: 'fa-bullhorn',
    color: 'text-red-400'
  },
  {
    id: 'analytics',
    title: 'Analiz ve Raporlama',
    description: 'Dijital varlığınızı düzenli olarak analiz ediyor, veriye dayalı kararlar almanıza yardımcı oluyoruz.',
    icon: 'fa-chart-line',
    color: 'text-green-400'
  },
  {
    id: 'consulting',
    title: 'Dijital Strateji Danışmanlığı',
    description: 'İşletmeniz için özel dijital strateji ve yol haritası oluşturuyor, büyümenize destek oluyoruz.',
    icon: 'fa-lightbulb',
    color: 'text-yellow-400'
  }
]

onMounted(() => {
  // Sosyal medya ikonları için sürekli animasyon
  const socialIcons = document.querySelectorAll('.social-icon')
  socialIcons.forEach(icon => {
    gsap.to(icon, {
      y: -10,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    })
  })

  // Kartlar için giriş animasyonu
  const cards = document.querySelectorAll('.service-card')
  cards.forEach((card, index) => {
    gsap.fromTo(card,
      {
        opacity: 0,
        y: 100,
        rotateY: 45
      },
      {
        opacity: 1,
        y: 0,
        rotateY: 0,
        duration: 1,
        delay: index * 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: card,
          start: 'top bottom-=100',
          end: 'bottom top',
          toggleActions: 'play none none none'
        }
      }
    )
  })

  // Avatar animasyonları
  const avatars = document.querySelectorAll('.floating-avatar')
  avatars.forEach((avatar, index) => {
    // Rastgele başlangıç pozisyonu
    gsap.set(avatar, {
      y: Math.random() * 20 - 10,
      rotation: Math.random() * 10 - 5
    })

    // Sürekli animasyon
    gsap.to(avatar, {
      y: '+=20',
      rotation: index % 2 === 0 ? '+=10' : '-=10',
      duration: 2 + Math.random() * 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: index * 0.2
    })

    // Hover efekti
    avatar.addEventListener('mouseenter', () => {
      gsap.to(avatar, {
        scale: 1.2,
        duration: 0.3,
        ease: "back.out(1.7)"
      })
    })

    avatar.addEventListener('mouseleave', () => {
      gsap.to(avatar, {
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)"
      })
    })
  })
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 py-16 overflow-hidden">
    <div class="container mx-auto px-4">
      <!-- Hero Section with Floating Avatars -->
      <div class="text-center mb-16 relative">
        <!-- Floating Social Media Avatars -->
        <div class="fixed inset-0 pointer-events-none">
          <!-- Sol Taraf -->
          <img src="../assets/avatars/instagram.svg" alt="Instagram Avatar" class="floating-avatar absolute w-16 h-16 top-1/4 left-8">
          <img src="../assets/avatars/facebook.svg" alt="Facebook Avatar" class="floating-avatar absolute w-16 h-16 top-1/3 left-16">
          <img src="../assets/avatars/twitter.svg" alt="Twitter Avatar" class="floating-avatar absolute w-16 h-16 top-1/2 left-8">
          
          <!-- Sağ Taraf -->
          <img src="../assets/avatars/youtube.svg" alt="YouTube Avatar" class="floating-avatar absolute w-16 h-16 top-1/4 right-8">
          <img src="../assets/avatars/google.svg" alt="Google Avatar" class="floating-avatar absolute w-16 h-16 top-1/3 right-16">
          <img src="../assets/avatars/tiktok.svg" alt="TikTok Avatar" class="floating-avatar absolute w-16 h-16 top-1/2 right-8">
        </div>

        <h1 class="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">
          Hizmetlerimiz
        </h1>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto relative z-10">
          Dijital dünyada başarıya ulaşmanız için ihtiyacınız olan tüm hizmetleri sunuyoruz.
        </p>
      </div>

      <!-- Interactive Services Grid -->
      <div class="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="service in services"
          :key="service.id"
          class="service-card transform-gpu bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:scale-105 transition-all duration-500 cursor-pointer"
          @mouseenter="hoveredCard = service.id"
          @mouseleave="hoveredCard = null"
        >
          <div class="relative">
            <div :class="[service.color, 'text-5xl mb-6 social-icon transform-gpu transition-transform duration-300']">
              <i :class="['fas', service.icon]"></i>
            </div>
            <h3 class="text-2xl font-semibold text-white mb-4">{{ service.title }}</h3>
            <p class="text-gray-300">{{ service.description }}</p>
          </div>
        </div>
      </div>

      <!-- Interactive CTA Section -->
      <div class="text-center mt-16 relative">
        <div class="absolute inset-0 pointer-events-none">
          <!-- Animated Particles -->
          <div class="particles"></div>
        </div>
        
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-6 relative z-10">
          Projenizi Birlikte Hayata Geçirelim
        </h2>
        <p class="text-gray-300 mb-8 max-w-2xl mx-auto relative z-10">
          Size özel çözümler için hemen iletişime geçin, ücretsiz danışmanlık hizmetimizden yararlanın.
        </p>
        <router-link
          to="/iletisim"
          class="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 hover:rotate-1 relative z-10"
        >
          İletişime Geçin
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.service-card {
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  perspective: 1000px;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  padding: 2px;
  background: linear-gradient(to right, #4f46e5, #0ea5e9);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.service-card:hover::before {
  opacity: 1;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

.typing-text {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  animation: typing 2s steps(20, end);
}

.particles {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  animation: particleAnimation 20s linear infinite;
}

@keyframes particleAnimation {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}

.floating-avatar {
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  will-change: transform;
  cursor: pointer;
  transition: filter 0.3s ease;
}

.floating-avatar:hover {
  filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.2));
}

.social-icon {
  transition: all 0.3s ease;
  will-change: transform;
}

.service-card:hover .social-icon {
  transform: scale(1.1) rotate(5deg);
}
</style> 