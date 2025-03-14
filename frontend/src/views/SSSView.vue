<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const sorular = ref([
  {
    id: 1,
    soru: 'Dijital pazarlama hizmetleriniz neleri kapsar?',
    cevap: 'Dijital pazarlama hizmetlerimiz SEO, sosyal medya yönetimi, Google Ads, Facebook & Instagram reklamları, içerik pazarlaması ve e-posta pazarlamasını kapsar. Her müşterimiz için özel stratejiler geliştiriyoruz.',
    acik: false
  },
  {
    id: 2,
    soru: 'Web sitesi tasarım süreciniz nasıl işliyor?',
    cevap: 'Web sitesi tasarım sürecimiz analiz, planlama, tasarım, geliştirme ve test aşamalarından oluşur. Müşterilerimizle yakın iletişim kurarak, ihtiyaçlarına en uygun çözümü sunuyoruz.',
    acik: false
  },
  {
    id: 3,
    soru: 'SEO çalışmalarının sonuçları ne kadar sürede görülür?',
    cevap: 'SEO çalışmalarının sonuçları genellikle 3-6 ay içerisinde görülmeye başlar. Ancak bu süre, sitenizin mevcut durumu, rekabet ve hedef kelimelerinize göre değişiklik gösterebilir.',
    acik: false
  },
  {
    id: 4,
    soru: 'Sosyal medya yönetimi paketleriniz neler?',
    cevap: 'Sosyal medya paketlerimiz içerik üretimi, görsel tasarım, topluluk yönetimi, reklam yönetimi ve performans raporlamasını içerir. Paketlerimizi işletmenizin büyüklüğüne ve ihtiyaçlarına göre özelleştiriyoruz.',
    acik: false
  },
  {
    id: 5,
    soru: 'Aylık raporlama yapıyor musunuz?',
    cevap: 'Evet, tüm müşterilerimize aylık detaylı performans raporları sunuyoruz. Bu raporlar, yapılan çalışmaları, elde edilen sonuçları ve gelecek dönem stratejilerini içerir.',
    acik: false
  },
  {
    id: 6,
    soru: 'Minimum sözleşme süreniz nedir?',
    cevap: 'Hizmet türüne göre minimum sözleşme süremiz değişmektedir. SEO için genellikle 6 ay, sosyal medya yönetimi için 3 ay minimum süre öneriyoruz. Web tasarım projeleri ise proje bazlı değerlendirilir.',
    acik: false
  }
])

const toggleSoru = (id: number) => {
  const soru = sorular.value.find(s => s.id === id)
  if (soru) {
    soru.acik = !soru.acik
    animateAnswer(id, soru.acik)
  }
}

const animateAnswer = (id: number, isOpen: boolean) => {
  const answer = document.querySelector(`#answer-${id}`)
  if (answer) {
    if (isOpen) {
      gsap.fromTo(answer,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
    } else {
      gsap.to(answer, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      })
    }
  }
}

onMounted(() => {
  gsap.from('.sss-card', {
    y: 50,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out'
  })
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 py-16">
    <div class="container mx-auto px-4">
      <!-- Hero Section -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">
          Sıkça Sorulan Sorular
        </h1>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
          Hizmetlerimiz hakkında merak ettiğiniz soruların cevaplarını burada bulabilirsiniz.
        </p>
      </div>

      <!-- SSS Cards -->
      <div class="max-w-4xl mx-auto">
        <div
          v-for="soru in sorular"
          :key="soru.id"
          class="sss-card bg-white/10 backdrop-blur-lg rounded-xl mb-4 overflow-hidden"
        >
          <button
            class="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors duration-300"
            @click="toggleSoru(soru.id)"
          >
            <h3 class="text-lg md:text-xl font-semibold text-white">{{ soru.soru }}</h3>
            <span
              class="transform transition-transform duration-300"
              :class="{ 'rotate-180': soru.acik }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </button>
          <div
            :id="'answer-' + soru.id"
            class="overflow-hidden"
            :style="{ height: soru.acik ? 'auto' : '0' }"
          >
            <p class="px-6 py-4 text-gray-300">
              {{ soru.cevap }}
            </p>
          </div>
        </div>
      </div>

      <!-- Contact Section -->
      <div class="text-center mt-16">
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-6">
          Başka Sorularınız mı Var?
        </h2>
        <p class="text-gray-300 mb-8 max-w-2xl mx-auto">
          Burada cevabını bulamadığınız sorularınız için bizimle iletişime geçebilirsiniz.
        </p>
        <router-link
          to="/iletisim"
          class="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-110"
        >
          İletişime Geçin
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sss-card {
  will-change: transform, opacity;
}
</style> 