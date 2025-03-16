<script setup lang="ts">
import { ref } from 'vue'

const url = ref('')
const isAnalyzing = ref(false)
const results = ref(null)
const detailedResults = ref(null)
const error = ref('')

const translateDescription = (desc: string) => {
  const translations: { [key: string]: string } = {
    'First Contentful Paint marks the time at which the first text or image is painted.': 'İlk İçerik Görüntüleme, ilk metin veya görselin ekranda göründüğü zamanı işaretler.',
    'Largest Contentful Paint marks the time at which the largest text or image is painted.': 'En Büyük İçerik Görüntüleme, en büyük metin veya görselin ekranda göründüğü zamanı işaretler.',
    'Sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms, expressed in milliseconds.': 'FCP ve Etkileşime Geçilebilir Süre arasında, görev süresi 50ms\'yi aşan tüm zaman periyotlarının toplamı (milisaniye cinsinden).',
    'Cumulative Layout Shift measures the movement of visible elements within the viewport.': 'Kümülatif Düzen Kayması, görünür öğelerin görüntü alanı içindeki hareketini ölçer.',
    'Speed Index shows how quickly the contents of a page are visibly populated.': 'Hız İndeksi, bir sayfanın içeriğinin ne kadar hızlı görünür şekilde doldurulduğunu gösterir.',
    'Search engines are unable to include your pages in search results if they don\'t have permission to crawl them.': 'Arama motorları, tarama izni olmayan sayfalarınızı arama sonuçlarına dahil edemez.',
    'The title gives screen reader users an overview of the page, and search engine users rely on it heavily to determine if a page is relevant to their search.': 'Başlık, ekran okuyucu kullanıcılarına sayfaya genel bir bakış sağlar ve arama motoru kullanıcıları bir sayfanın aramaları ile ilgili olup olmadığını belirlemek için büyük ölçüde buna güvenir.',
    'Meta descriptions may be included in search results to concisely summarize page content.': 'Meta açıklamaları, sayfa içeriğini özlü bir şekilde özetlemek için arama sonuçlarına dahil edilebilir.',
    'Pages with unsuccessful HTTP status codes may not be indexed properly.': 'Başarısız HTTP durum kodlarına sahip sayfalar düzgün şekilde indekslenemeyebilir.',
    'Descriptive link text helps search engines understand your content.': 'Açıklayıcı bağlantı metni, arama motorlarının içeriğinizi anlamasına yardımcı olur.',
    'Learn more about the First Contentful Paint metric': 'İlk İçerik Görüntüleme metriği hakkında daha fazla bilgi edinin',
    'Learn more about the Largest Contentful Paint metric': 'En Büyük İçerik Görüntüleme metriği hakkında daha fazla bilgi edinin',
    'Learn more about the Total Blocking Time metric': 'Toplam Engelleme Süresi metriği hakkında daha fazla bilgi edinin',
    'Learn more about the Cumulative Layout Shift metric': 'Kümülatif Düzen Kayması metriği hakkında daha fazla bilgi edinin',
    'Learn more about the Speed Index metric': 'Hız İndeksi metriği hakkında daha fazla bilgi edinin',
    'Learn more about crawler directives': 'Tarayıcı yönergeleri hakkında daha fazla bilgi edinin',
    'Learn more about document titles': 'Belge başlıkları hakkında daha fazla bilgi edinin',
    'Learn more about the meta description': 'Meta açıklaması hakkında daha fazla bilgi edinin',
    'Learn more about HTTP status codes': 'HTTP durum kodları hakkında daha fazla bilgi edinin',
    'Learn how to make links more accessible': 'Bağlantıları daha erişilebilir hale getirme hakkında bilgi edinin',
    'Learn more about roles and required attributes': 'Roller ve gerekli öznitelikler hakkında daha fazla bilgi edinin',
    'Learn more about ARIA roles': 'ARIA rolleri hakkında daha fazla bilgi edinin',
    'Learn more about valid ARIA attributes': 'Geçerli ARIA öznitelikleri hakkında daha fazla bilgi edinin',
    'Learn more about bypass blocks': 'Atlama blokları hakkında daha fazla bilgi edinin',
    'Learn how to provide sufficient color contrast': 'Yeterli renk kontrastı sağlama hakkında bilgi edinin',
    'Learn more about form labels': 'Form etiketleri hakkında daha fazla bilgi edinin',
    'Learn more about frame titles': 'Çerçeve başlıkları hakkında daha fazla bilgi edinin',
    'Learn more about heading order': 'Başlık sıralaması hakkında daha fazla bilgi edinin',
    'Learn more about the lang attribute': 'Lang özniteliği hakkında daha fazla bilgi edinin',
    'Learn more about the alt attribute': 'Alt özniteliği hakkında daha fazla bilgi edinin',
    'Learn more about input buttons': 'Giriş düğmeleri hakkında daha fazla bilgi edinin',
    'Learn more about proper list structure': 'Uygun liste yapısı hakkında daha fazla bilgi edinin',
    'Learn more about the viewport meta tag': 'Viewport meta etiketi hakkında daha fazla bilgi edinin',
    'Learn more about table headers': 'Tablo başlıkları hakkında daha fazla bilgi edinin',
    'Learn more about video captions': 'Video altyazıları hakkında daha fazla bilgi edinin',
    'Learn more about this JavaScript library detection diagnostic audit': 'JavaScript kütüphanesi algılama tanılama denetimi hakkında daha fazla bilgi edinin',
    'Learn more about deprecated APIs': 'Kullanımdan kaldırılan API\'ler hakkında daha fazla bilgi edinin',
    'Learn more about third-party cookies': 'Üçüncü taraf çerezleri hakkında daha fazla bilgi edinin',
    'Learn more about source maps': 'Kaynak haritaları hakkında daha fazla bilgi edinin'
  }
  return translations[desc] || desc
}

const validateUrl = (url: string) => {
  const regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/
  return regex.test(url)
}

const analyzeSite = async () => {
  if (!url.value) return
  
  if (!validateUrl(url.value)) {
    error.value = 'Lütfen geçerli bir URL girin (örn: https://example.com)'
    return
  }

  isAnalyzing.value = true
  error.value = ''
  results.value = null
  detailedResults.value = null
  
  try {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url.value)}&strategy=mobile&category=performance&category=seo&category=accessibility&category=best-practices&key=AIzaSyAmWe8aWBX1y5yPt2Q10wkTn4YvOGdQRzE`
    const response = await fetch(apiUrl)
    const data = await response.json()

    if (data.error) {
      throw new Error(data.error.message)
    }

    if (!data.lighthouseResult || !data.lighthouseResult.categories) {
      throw new Error('API yanıtı geçerli veri içermiyor')
    }

    const metrics = data.lighthouseResult.categories
    const scores = {
      performance: 0,
      seo: 0,
      accessibility: 0,
      bestPractices: 0
    }

    const details = {
      performance: [],
      seo: [],
      accessibility: [],
      bestPractices: []
    }

    // Ana skorları hesapla
    if (metrics.performance) {
      scores.performance = Math.round(metrics.performance.score * 100)
      details.performance = metrics.performance.auditRefs
        .filter(ref => data.lighthouseResult.audits[ref.id]?.score !== null)
        .map(ref => ({
          id: ref.id,
          title: data.lighthouseResult.audits[ref.id].title,
          score: data.lighthouseResult.audits[ref.id].score,
          description: data.lighthouseResult.audits[ref.id].description
        }))
    }

    if (metrics.seo) {
      scores.seo = Math.round(metrics.seo.score * 100)
      details.seo = metrics.seo.auditRefs
        .filter(ref => data.lighthouseResult.audits[ref.id]?.score !== null)
        .map(ref => ({
          id: ref.id,
          title: data.lighthouseResult.audits[ref.id].title,
          score: data.lighthouseResult.audits[ref.id].score,
          description: data.lighthouseResult.audits[ref.id].description
        }))
    }

    if (metrics.accessibility) {
      scores.accessibility = Math.round(metrics.accessibility.score * 100)
      details.accessibility = metrics.accessibility.auditRefs
        .filter(ref => data.lighthouseResult.audits[ref.id]?.score !== null)
        .map(ref => ({
          id: ref.id,
          title: data.lighthouseResult.audits[ref.id].title,
          score: data.lighthouseResult.audits[ref.id].score,
          description: data.lighthouseResult.audits[ref.id].description
        }))
    }

    if (metrics['best-practices']) {
      scores.bestPractices = Math.round(metrics['best-practices'].score * 100)
      details.bestPractices = metrics['best-practices'].auditRefs
        .filter(ref => data.lighthouseResult.audits[ref.id]?.score !== null)
        .map(ref => ({
          id: ref.id,
          title: data.lighthouseResult.audits[ref.id].title,
          score: data.lighthouseResult.audits[ref.id].score,
          description: data.lighthouseResult.audits[ref.id].description
        }))
    }

    results.value = scores
    detailedResults.value = details
  } catch (err) {
    error.value = 'Site analizi yapılırken bir hata oluştu. Lütfen geçerli bir URL girdiğinizden emin olun.'
    console.error('PageSpeed API Error:', err)
  } finally {
    isAnalyzing.value = false
  }
}

const getScoreColor = (score: number) => {
  if (score < 0.5) return 'bg-red-500'
  if (score < 0.75) return 'bg-yellow-500'
  return 'bg-green-500'
}

const getDetailScoreColor = (score: number) => {
  if (score < 0.5) return 'text-red-500'
  if (score < 0.75) return 'text-yellow-500'
  return 'text-green-500'
}
</script>

<template>
  <div class="max-w-4xl mx-auto mt-8 p-6 bg-white/5 backdrop-blur-lg rounded-xl">
    <h2 class="text-2xl font-bold text-white mb-6">Site Analizi</h2>
    
    <div class="flex gap-4 mb-8">
      <input
        v-model="url"
        type="url"
        placeholder="https://example.com"
        class="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-blue-500"
      />
      <button
        @click="analyzeSite"
        :disabled="isAnalyzing || !url"
        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ isAnalyzing ? 'Analiz Ediliyor...' : 'Analiz Et' }}
      </button>
    </div>

    <div v-if="results" class="space-y-8">
      <!-- Ana Skorlar -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="(score, metric) in results"
          :key="metric"
          class="p-4 rounded-lg"
          :class="getScoreColor(score/100)"
        >
          <h3 class="text-lg font-bold text-white text-center mb-2">
            {{ metric === 'performance' ? 'Performans' :
               metric === 'seo' ? 'SEO' :
               metric === 'accessibility' ? 'Erişilebilirlik' :
               metric === 'bestPractices' ? 'En İyi Uygulamalar' : metric }}
          </h3>
          <p class="text-2xl font-bold text-white text-center">{{ score }}</p>
        </div>
      </div>

      <!-- Önemli Metrikler -->
      <div v-if="detailedResults?.performance" class="bg-white/5 p-4 rounded-lg">
        <h3 class="text-xl font-bold text-white mb-4">Önemli Metrikler</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="metric in detailedResults.performance.slice(0, 6)" :key="metric.id" 
               class="p-3 bg-white/10 rounded-lg flex justify-between items-center">
            <span class="text-white">{{ translateDescription(metric.title) }}</span>
            <span :class="getDetailScoreColor(metric.score)" class="font-bold">
              {{ Math.round(metric.score * 100) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="isAnalyzing" class="text-center py-12">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
      <p class="text-white mt-4">Site analiz ediliyor...</p>
    </div>

    <div v-else class="text-center py-12 text-gray-400">
      <p>Analiz etmek istediğiniz sitenin URL'sini girin</p>
    </div>
  </div>
</template>

<style scoped>
.capitalize {
  text-transform: capitalize;
}
</style> 