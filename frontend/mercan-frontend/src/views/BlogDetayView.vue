<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogStore } from '@/stores/blog'
import type { Blog } from '@/types'

// Window nesnesini global olarak tanımla
declare const window: Window & typeof globalThis

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()
const blog = ref<Blog | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

// Dinamik içerik için ref'ler
const importantPoints = ref<string[]>([])
const implementationSteps = ref<Array<{title: string, description: string}>>([])
const usefulResources = ref<Array<{title: string, description: string, url: string}>>([])
const faqs = ref<Array<{question: string, answer: string}>>([])

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }
  return new Date(dateString).toLocaleDateString('tr-TR', options)
}

const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement
  if (target) {
    target.src = 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg'
  }
}

onMounted(async () => {
  try {
    loading.value = true
    error.value = null
    const blogId = parseInt(route.params.id as string)
    
    if (isNaN(blogId)) {
      throw new Error('Geçersiz blog ID')
    }
    
    const result = await blogStore.getBlogById(blogId)
    if (!result) {
      throw new Error('Blog yazısı bulunamadı')
    }
    
    blog.value = result
  } catch (err) {
    console.error('Blog yüklenirken hata:', err)
    error.value = err instanceof Error ? err.message : 'Blog yüklenirken bir hata oluştu'
    router.push('/blog')
  } finally {
    loading.value = false
  }
})

const yorumlar = ref([
  {
    id: 1,
    yazar: 'Selin Yılmaz',
    tarih: '2024-02-24',
    yorum: 'Reels içeriklerimizde müzik seçimi konusunda zorlanıyorduk. Önerdiğiniz trend analizi yöntemleri ve müzik önerileri sayesinde etkileşimlerimiz %40 arttı. Özellikle sektöre özel müzik önerileri listesi çok işimize yaradı.',
  },
  {
    id: 2,
    yazar: 'Burak Kaya',
    tarih: '2024-02-24',
    yorum: 'Video editing ipuçları gerçekten değerliydi. CapCut ile geçişleri ve efektleri nasıl profesyonelce kullanacağımızı öğrendik. Artık çok daha kaliteli Reels içerikleri üretebiliyoruz.',
  },
  {
    id: 3,
    yazar: 'Ayşe Demir',
    tarih: '2024-02-25',
    yorum: 'Reels\'te ürün tanıtımı yaparken sürekli satış odaklı gidiyorduk. Önerdiğiniz hikaye anlatımı teknikleri ve 3-1 kuralı yaklaşımı markamızın etkileşimini inanılmaz artırdı.',
  },
  {
    id: 4,
    yazar: 'Mert Yıldırım',
    tarih: '2024-02-25',
    yorum: 'Reels Analytics verilerini nasıl okuyacağımızı ve içerik stratejimizi buna göre nasıl şekillendireceğimizi çok iyi açıklamışsınız. Artık hangi saatlerde paylaşım yapacağımızı ve hangi içerik türlerinin daha çok etkileşim aldığını daha iyi analiz edebiliyoruz.',
  },
  {
    id: 5,
    yazar: 'Zeynep Aydın',
    tarih: '2024-02-26',
    yorum: 'Özellikle "behind the scenes" içeriklerinin nasıl kurgulanması gerektiği konusundaki öneriler çok değerliydi. Ekip olarak denedik ve takipçilerimizden çok olumlu geri dönüşler aldık.',
  }
])

const yeniYorum = ref({
  yorum: '',
  ad: '',
  email: ''
})

const yorumGonder = () => {
  // Yorum gönderme işlemi burada yapılacak
  yorumlar.value.push({
    id: yorumlar.value.length + 1,
    yazar: yeniYorum.value.ad,
    tarih: new Date().toISOString().split('T')[0],
    yorum: yeniYorum.value.yorum,
    avatar: '/avatars/default.jpg'
  })

  // Formu temizle
  yeniYorum.value = {
    yorum: '',
    ad: '',
    email: ''
  }
}

const paylasUrl = window.location.href

const sosyalMedyadaPaylas = (platform: string) => {
  const url = encodeURIComponent(window.location.href)
  const title = encodeURIComponent(blog.value?.title || '')
  const text = encodeURIComponent(blog.value?.excerpt || '')

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    twitter: `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`,
    instagram: `https://www.instagram.com/create/story?url=${url}`,
    whatsapp: `https://wa.me/?text=${title} ${url}`,
    email: `mailto:?subject=${title}&body=${text}\n\nDetaylı bilgi için: ${url}`
  }

  window.open(shareUrls[platform as keyof typeof shareUrls], '_blank')
}

// Blog kategorisine göre içeriği güncelle
watch(() => blog.value?.category_name, (category) => {
  if (category) {
    updateDynamicContent(category)
  }
})

const updateDynamicContent = (category: string) => {
  switch (category) {
    case 'SEO':
      importantPoints.value = [
        'Teknik SEO optimizasyonu ve site performansı',
        'İçerik stratejisi ve anahtar kelime araştırması',
        'Backlink yapısı ve site otoritesi',
        'Mobil uyumluluk ve kullanıcı deneyimi',
        'Yerel SEO ve işletme optimizasyonu'
      ]
      implementationSteps.value = [
        {
          title: 'Teknik SEO Analizi',
          description: 'Site hızı, mobil uyumluluk, sayfa yapısı ve teknik SEO sorunlarının detaylı analizi'
        },
        {
          title: 'Anahtar Kelime Araştırması',
          description: 'Hedef kitle analizi, arama hacmi ve rekabet analizi ile anahtar kelime stratejisi oluşturma'
        },
        {
          title: 'İçerik Optimizasyonu',
          description: 'Mevcut içeriklerin SEO kriterlerine göre optimize edilmesi ve yeni içerik planı oluşturulması'
        },
        {
          title: 'Teknik İyileştirmeler',
          description: 'Site hızı, sayfa yapısı ve teknik SEO sorunlarının giderilmesi'
        }
      ]
      usefulResources.value = [
        {
          title: 'Google Search Console',
          description: 'Site performansını ve sorunları analiz etmek için resmi Google aracı',
          url: 'https://search.google.com/search-console'
        },
        {
          title: 'SEMrush',
          description: 'Kapsamlı SEO analizi ve rakip analizi aracı',
          url: 'https://www.semrush.com'
        }
      ]
      faqs.value = [
        {
          question: 'SEO çalışmalarının sonuçları ne zaman görülür?',
          answer: 'SEO çalışmalarının sonuçları genellikle 3-6 ay içinde görülmeye başlar, ancak bu süre sitenin yaşı, rekabet durumu ve yapılan optimizasyonların kapsamına göre değişebilir.'
        },
        {
          question: 'Hangi SEO araçlarını kullanmalıyım?',
          answer: 'Google Search Console ve Google Analytics temel araçlardır. Bunların yanında SEMrush, Ahrefs veya Moz gibi profesyonel SEO araçları da kullanılabilir.'
        }
      ]
      break

    case 'Sosyal Medya':
      importantPoints.value = [
        'Platform bazlı içerik stratejisi',
        'Etkileşim ve takipçi artırma taktikleri',
        'Reklam optimizasyonu ve hedefleme',
        'Analitik ve performans takibi',
        'Topluluk yönetimi ve kriz yönetimi'
      ]
      implementationSteps.value = [
        {
          title: 'Hedef Kitle Analizi',
          description: 'Demografik veriler ve kullanıcı davranışlarının analizi ile hedef kitle belirleme'
        },
        {
          title: 'İçerik Stratejisi',
          description: 'Her platform için özelleştirilmiş içerik planı ve yayın takvimi oluşturma'
        },
        {
          title: 'Reklam Kampanyaları',
          description: 'Hedef kitleye özel reklam kampanyaları oluşturma ve optimizasyon'
        },
        {
          title: 'Performans Analizi',
          description: 'Metrikler üzerinden performans analizi ve strateji güncellemesi'
        }
      ]
      usefulResources.value = [
        {
          title: 'Meta Business Suite',
          description: 'Facebook ve Instagram yönetimi için kapsamlı araç',
          url: 'https://business.facebook.com'
        },
        {
          title: 'Canva',
          description: 'Sosyal medya görselleri oluşturmak için kullanıcı dostu tasarım aracı',
          url: 'https://www.canva.com'
        }
      ]
      faqs.value = [
        {
          question: 'Hangi sosyal medya platformlarında bulunmalıyım?',
          answer: 'Bu, hedef kitlenizin hangi platformları aktif olarak kullandığına bağlıdır. Genel olarak Instagram ve LinkedIn B2B için, Instagram ve TikTok B2C için etkilidir.'
        },
        {
          question: 'Ne sıklıkta paylaşım yapmalıyım?',
          answer: 'Platform bazında değişmekle birlikte, Instagram\'da günde 1-2, LinkedIn\'de haftada 3-4, Twitter\'da günde 3-5 paylaşım idealdir.'
        }
      ]
      break

    case 'Web Tasarım':
      importantPoints.value = [
        'Kullanıcı deneyimi (UX) tasarımı',
        'Responsive ve mobil uyumlu tasarım',
        'Performans optimizasyonu',
        'Görsel tasarım ve marka kimliği',
        'Erişilebilirlik standartları'
      ]
      implementationSteps.value = [
        {
          title: 'Kullanıcı Araştırması',
          description: 'Hedef kitle analizi ve kullanıcı ihtiyaçlarının belirlenmesi'
        },
        {
          title: 'Wireframe ve Prototip',
          description: 'Sayfa yapısı ve kullanıcı akışlarının tasarlanması'
        },
        {
          title: 'Görsel Tasarım',
          description: 'Marka kimliğine uygun arayüz tasarımı ve görsel öğelerin hazırlanması'
        },
        {
          title: 'Geliştirme ve Test',
          description: 'Responsive geliştirme ve farklı cihazlarda test'
        }
      ]
      usefulResources.value = [
        {
          title: 'Figma',
          description: 'UI/UX tasarımı için profesyonel tasarım aracı',
          url: 'https://www.figma.com'
        },
        {
          title: 'Google Web Vitals',
          description: 'Web sitesi performans metrikleri analiz aracı',
          url: 'https://web.dev/vitals/'
        }
      ]
      faqs.value = [
        {
          question: 'Responsive tasarım neden önemli?',
          answer: 'Günümüzde internet trafiğinin yarısından fazlası mobil cihazlardan geliyor. Responsive tasarım, sitenizin tüm cihazlarda düzgün görüntülenmesini sağlar.'
        },
        {
          question: 'Web sitemi ne sıklıkla güncellemeliyim?',
          answer: 'Tasarım trendleri ve teknolojiler sürekli değişiyor. En az 2-3 yılda bir major tasarım güncellemesi yapılması önerilir.'
        }
      ]
      break

    case 'Dijital Pazarlama':
      importantPoints.value = [
        'Çok kanallı pazarlama stratejisi',
        'Veri analizi ve optimizasyon',
        'İçerik pazarlaması',
        'Dönüşüm optimizasyonu',
        'Müşteri yolculuğu analizi'
      ]
      implementationSteps.value = [
        {
          title: 'Strateji Geliştirme',
          description: 'Hedefler, KPI\'lar ve pazarlama kanallarının belirlenmesi'
        },
        {
          title: 'İçerik Planı',
          description: 'Hedef kitleye özel içerik stratejisi ve üretim planı'
        },
        {
          title: 'Kampanya Yönetimi',
          description: 'Reklam kampanyalarının oluşturulması ve optimizasyonu'
        },
        {
          title: 'Performans Analizi',
          description: 'Kampanya sonuçlarının analizi ve raporlama'
        }
      ]
      usefulResources.value = [
        {
          title: 'Google Analytics',
          description: 'Web sitesi trafik ve kullanıcı davranışı analiz aracı',
          url: 'https://analytics.google.com'
        },
        {
          title: 'HubSpot',
          description: 'Pazarlama otomasyonu ve CRM platformu',
          url: 'https://www.hubspot.com'
        }
      ]
      faqs.value = [
        {
          question: 'Dijital pazarlama bütçemi nasıl belirlemeliyim?',
          answer: 'Bütçe, hedeflerinize, pazarınıza ve rekabet durumuna göre değişir. Genellikle gelirin %5-15\'i arasında bir pazarlama bütçesi önerilir.'
        },
        {
          question: 'Hangi dijital pazarlama kanallarına odaklanmalıyım?',
          answer: 'Hedef kitlenizin online davranışlarına göre kanallar seçilmelidir. SEO, SEM, sosyal medya ve e-posta pazarlaması en temel kanallardır.'
        }
      ]
      break

    case 'Yapay Zeka':
      importantPoints.value = [
        'AI teknolojilerinin iş süreçlerine entegrasyonu',
        'Veri analizi ve makine öğrenimi',
        'Chatbot ve müşteri hizmetleri otomasyonu',
        'Kişiselleştirme ve öneri sistemleri',
        'AI destekli içerik üretimi'
      ]
      implementationSteps.value = [
        {
          title: 'İhtiyaç Analizi',
          description: 'AI teknolojilerinin kullanılabileceği alanların belirlenmesi'
        },
        {
          title: 'Veri Hazırlığı',
          description: 'Veri toplama, temizleme ve modelleme çalışmaları'
        },
        {
          title: 'AI Entegrasyonu',
          description: 'Seçilen AI çözümlerinin mevcut sistemlere entegrasyonu'
        },
        {
          title: 'Test ve Optimizasyon',
          description: 'AI sistemlerinin performans testleri ve iyileştirmeler'
        }
      ]
      usefulResources.value = [
        {
          title: 'OpenAI Platform',
          description: 'GPT ve DALL-E gibi AI modellerinin API servisleri',
          url: 'https://platform.openai.com'
        },
        {
          title: 'TensorFlow',
          description: 'Google\'ın açık kaynak makine öğrenimi kütüphanesi',
          url: 'https://www.tensorflow.org'
        }
      ]
      faqs.value = [
        {
          question: 'Yapay zeka işimi nasıl geliştirebilir?',
          answer: 'AI, müşteri hizmetleri otomasyonu, veri analizi, içerik üretimi, kişiselleştirme gibi birçok alanda iş süreçlerini iyileştirebilir.'
        },
        {
          question: 'AI projeleri için ne kadar bütçe ayırmalıyım?',
          answer: 'Bütçe, projenin kapsamına ve kullanılacak teknolojilere göre değişir. Pilot projelerle başlayıp, ROI\'ye göre bütçeyi artırmak önerilir.'
        }
      ]
      break
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900">
    <div class="container mx-auto px-4 py-8">
      <!-- Yükleme ve Hata Durumları -->
      <div v-if="loading" class="flex justify-center items-center min-h-[60vh]">
        <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      </div>

      <div v-else-if="error" class="text-center py-12">
        <h2 class="text-2xl font-bold text-red-400 mb-4">{{ error }}</h2>
        <button @click="router.push('/blog')" class="text-white hover:text-blue-400 transition">
          Blog Listesine Dön
        </button>
      </div>

      <template v-else-if="blog">
        <!-- Geri Dönüş Butonu -->
        <div class="mb-8">
          <router-link 
            to="/blog" 
            class="text-gray-300 hover:text-white transition flex items-center gap-2"
          >
            <i class="fas fa-arrow-left"></i>
            Blog'a Dön
          </router-link>
        </div>

        <!-- Blog Başlığı ve Meta Bilgileri -->
        <div class="mb-12">
          <div class="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm mb-4">
            {{ blog.category_name }}
          </div>
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">{{ blog.title }}</h1>
          <div class="flex items-center gap-4 text-gray-300">
            <span>{{ formatDate(blog.published_at) }}</span>
            <span>•</span>
            <span>{{ blog.author_name }}</span>
          </div>
        </div>

        <!-- Blog İçeriği -->
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 mb-12">
          <!-- Featured Image -->
          <div class="mb-8 rounded-xl overflow-hidden">
            <img 
              :src="blog.featured_image" 
              :alt="blog.title"
              class="w-full h-[400px] object-cover"
              @error="handleImageError"
            />
          </div>

          <!-- Özet -->
          <div class="text-xl text-gray-300 mb-8 font-medium border-l-4 border-blue-500 pl-4">
            {{ blog.excerpt }}
          </div>

          <!-- İçerik -->
          <div class="prose prose-invert max-w-none">
            <div v-html="blog.content"></div>
          </div>

          <!-- Önemli Noktalar -->
          <div class="mt-12 bg-white/5 rounded-xl p-6">
            <h3 class="text-xl font-bold text-white mb-4">Önemli Noktalar</h3>
            <ul class="space-y-4">
              <li v-for="(point, index) in importantPoints" :key="index" 
                  class="flex items-start gap-2 text-gray-300">
                <i class="fas fa-check-circle text-blue-400 mt-1"></i>
                <span>{{ point }}</span>
              </li>
            </ul>
          </div>

          <!-- Uygulama Adımları -->
          <div class="mt-8 bg-white/5 rounded-xl p-6">
            <h3 class="text-xl font-bold text-white mb-4">Uygulama Adımları</h3>
            <div class="space-y-6">
              <div v-for="(step, index) in implementationSteps" :key="index" 
                   class="flex items-start gap-4">
                <div class="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {{ index + 1 }}
                </div>
                <div>
                  <h4 class="text-white font-semibold mb-2">{{ step.title }}</h4>
                  <p class="text-gray-300">{{ step.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Faydalı Kaynaklar -->
          <div class="mt-8 bg-white/5 rounded-xl p-6">
            <h3 class="text-xl font-bold text-white mb-4">Faydalı Kaynaklar</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a v-for="(resource, index) in usefulResources" :key="index"
                 :href="resource.url" 
                 target="_blank"
                 class="block p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <h4 class="font-semibold text-white mb-2">{{ resource.title }}</h4>
                <p class="text-gray-300">{{ resource.description }}</p>
              </a>
            </div>
          </div>

          <!-- Sıkça Sorulan Sorular -->
          <div class="mt-8 bg-white/5 rounded-xl p-6">
            <h3 class="text-xl font-bold text-white mb-4">Sıkça Sorulan Sorular</h3>
            <div class="space-y-4">
              <div v-for="(faq, index) in faqs" :key="index" 
                   class="border-b border-gray-700 last:border-0 pb-4">
                <h4 class="text-white font-semibold mb-2">{{ faq.question }}</h4>
                <p class="text-gray-300">{{ faq.answer }}</p>
              </div>
            </div>
          </div>

          <!-- Etiketler -->
          <div class="mt-8 flex flex-wrap gap-2">
            <span v-for="tag in blog.tags" :key="tag" 
                  class="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
              #{{ tag }}
            </span>
          </div>

          <!-- Paylaşım Butonları -->
          <div class="mt-8 pt-8 border-t border-gray-700">
            <h3 class="text-xl font-bold text-white mb-4">Bu Yazıyı Paylaş</h3>
            <div class="flex items-center gap-4 mt-8">
              <span class="text-gray-400">Paylaş:</span>
              
              <!-- Facebook -->
              <button
                @click="sosyalMedyadaPaylas('facebook')"
                class="text-white bg-[#1877F2] hover:bg-[#0C63D4] p-2 rounded-full transition-colors duration-300">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>

              <!-- Twitter -->
              <button
                @click="sosyalMedyadaPaylas('twitter')"
                class="text-white bg-[#1DA1F2] hover:bg-[#1a8cd8] p-2 rounded-full transition-colors duration-300">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </button>

              <!-- LinkedIn -->
              <button
                @click="sosyalMedyadaPaylas('linkedin')"
                class="text-white bg-[#0A66C2] hover:bg-[#004182] p-2 rounded-full transition-colors duration-300">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>

              <!-- Instagram -->
              <button
                @click="sosyalMedyadaPaylas('instagram')"
                class="text-white bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 p-2 rounded-full transition-colors duration-300">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
              </button>

              <!-- WhatsApp -->
              <button
                @click="sosyalMedyadaPaylas('whatsapp')"
                class="text-white bg-[#25D366] hover:bg-[#128C7E] p-2 rounded-full transition-colors duration-300">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.463 3.488C18.217 1.24 15.231 0 12.05 0 5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413zm-8.413 18.297A9.878 9.878 0 017 20.407l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm5.422-7.403c-.297-.149-.729-.359-1.697-.875-.967-.516-1.632-.571-2.05-.177-.419.394-1.019 1.236-1.419 1.473-.4.237-.8.266-1.486.089-.686-.177-2.304-.85-4.389-2.71-1.623-1.454-2.716-3.249-3.03-3.799-.315-.55-.033-.847.236-1.122.242-.243.539-.635.808-.953.27-.317.36-.545.539-.908.18-.363.09-.681-.045-.953-.135-.272-.944-2.456-1.315-3.334-.408-.972-.815-.807-1.103-.807-.286 0-.614-.032-.941-.032-.327 0-.858.123-1.306.615-.448.493-1.712 1.676-1.712 4.085 0 2.41 1.754 4.736 1.997 5.063.242.327 3.425 5.234 8.294 7.342 4.87 2.109 4.87 1.405 5.747 1.317.878-.089 2.827-1.157 3.225-2.274.399-1.118.399-2.073.28-2.274-.12-.201-.44-.321-.935-.514z"/>
                </svg>
              </button>

              <!-- E-posta -->
              <button
                @click="sosyalMedyadaPaylas('email')"
                class="text-white bg-gray-600 hover:bg-gray-700 p-2 rounded-full transition-colors duration-300">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Yorumlar Bölümü -->
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8">
          <h3 class="text-2xl font-bold text-white mb-8">Yorumlar</h3>
          
          <div class="space-y-6">
            <div v-for="yorum in yorumlar" :key="yorum.id" class="border-b border-gray-700 pb-6 last:border-0">
              <div class="flex items-center gap-3 mb-2">
                <h4 class="font-semibold text-white">{{ yorum.yazar }}</h4>
                <span class="text-sm text-gray-400">{{ formatDate(yorum.tarih) }}</span>
              </div>
              <p class="text-gray-300">{{ yorum.yorum }}</p>
            </div>
          </div>

          <!-- Yorum Formu -->
          <form @submit.prevent="yorumGonder" class="mt-12">
            <h4 class="text-xl font-semibold text-white mb-6">Yorum Yap</h4>
            <div class="space-y-4">
              <div>
                <label class="block text-gray-300 mb-2">İsim</label>
                <input 
                  v-model="yeniYorum.ad"
                  type="text" 
                  required
                  class="w-full bg-white/20 border border-gray-600 rounded-lg px-4 py-2 text-white"
                >
              </div>
              <div>
                <label class="block text-gray-300 mb-2">E-posta</label>
                <input 
                  v-model="yeniYorum.email"
                  type="email" 
                  required
                  class="w-full bg-white/20 border border-gray-600 rounded-lg px-4 py-2 text-white"
                >
              </div>
              <div>
                <label class="block text-gray-300 mb-2">Yorum</label>
                <textarea 
                  v-model="yeniYorum.yorum"
                  rows="4" 
                  required
                  class="w-full bg-white/20 border border-gray-600 rounded-lg px-4 py-2 text-white"
                ></textarea>
              </div>
              <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
                Gönder
              </button>
            </div>
          </form>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.prose {
  @apply text-gray-300;
}
.prose h2 {
  @apply text-white text-2xl font-bold mt-12 mb-6;
}
.prose h3 {
  @apply text-white text-xl font-semibold mt-8 mb-4;
}
.prose p {
  @apply mb-6 leading-relaxed;
}
.prose ul {
  @apply list-disc list-inside mb-6 space-y-2;
}
.prose li {
  @apply text-gray-300;
}
.prose a {
  @apply text-blue-400 hover:text-blue-300 underline;
}
.prose strong {
  @apply text-white font-semibold;
}
.prose blockquote {
  @apply border-l-4 border-blue-500 pl-4 italic text-gray-400 my-6;
}
.prose code {
  @apply bg-blue-900/50 text-blue-300 px-2 py-1 rounded;
}
.prose pre {
  @apply bg-gray-900 p-4 rounded-lg overflow-x-auto my-6;
}
</style> 