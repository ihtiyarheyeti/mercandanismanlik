import { defineStore } from 'pinia'
import axios from 'axios'
import type { Blog } from '@/types'

// Pexels API yapılandırması
const pexelsApi = axios.create({
  baseURL: 'https://api.pexels.com/v1',
  headers: {
    Authorization: 'pdfnTk6Mp5wRvSn9YQFUGg3noqNV746CAkm898rmMeJMoRkksZIKc5T4'
  }
})

interface Category {
  id: number
  name: string
  slug: string
}

// Örnek veriler
const sampleBlogs: Blog[] = [
  {
    id: 1,
    title: 'SEO Optimizasyonu İpuçları 2024',
    content: `
      <h2>SEO Optimizasyonu Nedir?</h2>
      <p>SEO (Search Engine Optimization), web sitenizin arama motorlarında daha iyi sıralamalarda yer alması için yapılan çalışmaların bütünüdür. 2024 yılında SEO stratejileri, yapay zeka ve kullanıcı deneyimi odaklı bir yaklaşımla şekilleniyor.</p>

      <h2>Teknik SEO Optimizasyonu</h2>
      <p>Web sitenizin teknik açıdan optimize edilmesi, SEO başarısı için temel bir gerekliliktir:</p>
      <ul>
        <li>Sayfa yükleme hızı optimizasyonu</li>
        <li>Mobil uyumluluk</li>
        <li>SSL sertifikası kullanımı</li>
        <li>XML site haritası oluşturma</li>
      </ul>

      <h2>İçerik Optimizasyonu</h2>
      <p>Kaliteli ve özgün içerik üretimi, SEO stratejinizin merkezinde yer almalıdır:</p>
      <ul>
        <li>Anahtar kelime araştırması ve kullanımı</li>
        <li>Özgün ve değerli içerik üretimi</li>
        <li>İçerik güncelliği</li>
        <li>Kullanıcı odaklı içerik stratejisi</li>
      </ul>
    `,
    excerpt: 'Web sitenizin arama motorlarında üst sıralarda yer alması için güncel SEO teknikleri ve öneriler.',
    featured_image: '/images/blog/seo-optimization.webp',
    author_name: 'Mercan Danışmanlık',
    category_id: 1,
    category_name: 'SEO',
    published_at: '2024-02-27',
    tags: ['SEO', 'Dijital Pazarlama', 'Google']
  },
  {
    id: 2,
    title: 'Instagram Reels ile Etkileşimi Artırma',
    content: `
      <h2>Instagram Reels Nedir?</h2>
      <p>Instagram Reels, kısa formatlı video içerikler oluşturmanıza olanak sağlayan bir özelliktir. Doğru kullanıldığında, markanızın etkileşimini önemli ölçüde artırabilir.</p>

      <h2>Başarılı Reels İçerikleri Nasıl Oluşturulur?</h2>
      <p>Etkili bir Reels stratejisi için dikkat edilmesi gereken noktalar:</p>
      <ul>
        <li>Trend müzikleri ve efektleri kullanın</li>
        <li>İlk 3 saniyeyi dikkat çekici yapın</li>
        <li>Markanızın kimliğine uygun içerikler üretin</li>
        <li>Düzenli içerik paylaşın</li>
      </ul>

      <h2>İçerik Fikirleri</h2>
      <p>Reels'de paylaşabileceğiniz içerik türleri:</p>
      <ul>
        <li>Ürün tanıtımları ve demo videoları</li>
        <li>Kulisler ve süreç videoları</li>
        <li>Eğitici içerikler</li>
        <li>Müşteri hikayeleri</li>
      </ul>
    `,
    excerpt: 'Instagram Reels özelliğini etkili kullanarak takipçi ve etkileşim artırma stratejileri.',
    featured_image: '/images/blog/instagram-reels.webp',
    author_name: 'Mercan Danışmanlık',
    category_id: 2,
    category_name: 'Sosyal Medya',
    published_at: '2024-02-26',
    tags: ['Instagram', 'Sosyal Medya', 'Reels', 'İçerik']
  },
  {
    id: 3,
    title: 'E-ticaret Siteleri İçin Dönüşüm Optimizasyonu',
    content: `
      <h2>Dönüşüm Optimizasyonu Nedir?</h2>
      <p>Dönüşüm optimizasyonu (CRO), web sitenizi ziyaret eden kullanıcıların satın alma, üyelik gibi hedef aksiyonları gerçekleştirme oranını artırmaya yönelik çalışmalardır.</p>

      <h2>Temel CRO Stratejileri</h2>
      <p>E-ticaret sitenizin dönüşüm oranını artırmak için uygulayabileceğiniz stratejiler:</p>
      <ul>
        <li>A/B testleri yapın</li>
        <li>Sayfa yükleme hızını optimize edin</li>
        <li>Mobil deneyimi iyileştirin</li>
        <li>Güven unsurlarını öne çıkarın</li>
      </ul>

      <h2>Ödeme Sürecini Optimize Etme</h2>
      <p>Satın alma sürecinde sepet terk oranını azaltmak için:</p>
      <ul>
        <li>Misafir alışveriş seçeneği sunun</li>
        <li>Çoklu ödeme seçenekleri ekleyin</li>
        <li>Form alanlarını minimize edin</li>
        <li>İlerleme çubuğu kullanın</li>
      </ul>
    `,
    excerpt: 'E-ticaret sitenizin dönüşüm oranını artırmak için uygulamanız gereken optimizasyon teknikleri.',
    featured_image: '/images/blog/ecommerce-optimization.webp',
    author_name: 'Mercan Danışmanlık',
    category_id: 3,
    category_name: 'E-ticaret',
    published_at: '2024-02-25',
    tags: ['E-ticaret', 'CRO', 'Optimizasyon']
  },
  {
    id: 4,
    title: 'Google Analytics 4 Rehberi',
    content: `
      <h2>Google Analytics 4'e Geçiş</h2>
      <p>Google Analytics 4 (GA4), Universal Analytics'in yerini alan yeni nesil analitik platformudur. Yapay zeka destekli özellikleri ve gelişmiş olay takibi ile daha detaylı veri analizi sunar.</p>

      <h2>GA4'ün Yeni Özellikleri</h2>
      <p>GA4 ile gelen önemli yenilikler:</p>
      <ul>
        <li>Gelişmiş makine öğrenimi özellikleri</li>
        <li>Platformlar arası kullanıcı takibi</li>
        <li>Gelişmiş olay tabanlı raporlama</li>
        <li>Daha iyi gizlilik kontrolü</li>
      </ul>

      <h2>Önemli Raporlar ve Metrikler</h2>
      <p>GA4'te takip edilmesi gereken temel metrikler:</p>
      <ul>
        <li>Kullanıcı yaşam döngüsü raporları</li>
        <li>Etkileşim metrikleri</li>
        <li>Dönüşüm olayları</li>
        <li>Gelir takibi</li>
      </ul>
    `,
    excerpt: 'Google Analytics 4 platformunun detaylı kullanım rehberi ve yeni özellikleri.',
    featured_image: '/images/blog/google-analytics.webp',
    author_name: 'Mercan Danışmanlık',
    category_id: 4,
    category_name: 'Analitik',
    published_at: '2024-02-24',
    tags: ['Google Analytics', 'Veri Analizi', 'Dijital Pazarlama']
  },
  {
    id: 5,
    title: 'Sosyal Medya Trendleri 2024',
    content: `
      <h2>2024'ün Öne Çıkan Sosyal Medya Trendleri</h2>
      <p>Sosyal medya pazarlaması sürekli evrim geçiriyor. 2024 yılında öne çıkan trendler ve stratejiler markaların dijital varlığını şekillendiriyor.</p>

      <h2>Video İçerik Dominasyonu</h2>
      <p>Video içeriklerin öne çıktığı alanlar:</p>
      <ul>
        <li>Kısa form videolar (Reels, TikTok)</li>
        <li>Canlı yayınlar ve webinarlar</li>
        <li>Dikey video formatları</li>
        <li>Eğitici video içerikler</li>
      </ul>

      <h2>Yapay Zeka Entegrasyonu</h2>
      <p>Sosyal medyada AI kullanım alanları:</p>
      <ul>
        <li>İçerik üretimi ve optimizasyonu</li>
        <li>Chatbot müşteri hizmetleri</li>
        <li>Kişiselleştirilmiş reklamlar</li>
        <li>Performans analizi</li>
      </ul>
    `,
    excerpt: '2024 yılının öne çıkan sosyal medya trendleri ve başarılı stratejiler.',
    featured_image: '/images/blog/social-media-trends.webp',
    author_name: 'Mercan Danışmanlık',
    category_id: 2,
    category_name: 'Sosyal Medya',
    published_at: '2024-02-23',
    tags: ['Sosyal Medya', 'Dijital Pazarlama', 'Trendler']
  },
  {
    id: 6,
    title: 'E-posta Pazarlama Stratejileri',
    content: `
      <h2>Etkili E-posta Pazarlama Kampanyaları</h2>
      <p>E-posta pazarlaması, doğru stratejilerle uygulandığında en yüksek ROI sağlayan dijital pazarlama kanallarından biridir.</p>

      <h2>Liste Segmentasyonu</h2>
      <p>Hedef kitlenizi segmentlere ayırmanın faydaları:</p>
      <ul>
        <li>Kişiselleştirilmiş içerik gönderimi</li>
        <li>Yüksek açılma oranları</li>
        <li>Daha iyi dönüşüm oranları</li>
        <li>Düşük spam şikayetleri</li>
      </ul>

      <h2>Otomatik E-posta Akışları</h2>
      <p>Kurmanız gereken temel e-posta akışları:</p>
      <ul>
        <li>Hoş geldin serisi</li>
        <li>Terk edilmiş sepet hatırlatmaları</li>
        <li>Yeniden aktivasyon kampanyaları</li>
        <li>Doğum günü ve özel gün kutlamaları</li>
      </ul>
    `,
    excerpt: 'E-posta pazarlamasında başarıya ulaşmak için uygulamanız gereken stratejiler.',
    featured_image: '/images/blog/email-marketing.webp',
    author_name: 'Mercan Danışmanlık',
    category_id: 5,
    category_name: 'E-posta Pazarlama',
    published_at: '2024-02-22',
    tags: ['E-posta Pazarlama', 'Dijital Pazarlama', 'Otomatizasyon']
  },
  {
    id: 7,
    title: 'Facebook Ads Hedef Kitle Optimizasyonu',
    content: `
      <h2>Facebook Reklamlarında Hedef Kitle Seçimi</h2>
      <p>Facebook Ads kampanyalarınızın başarısı, doğru hedef kitle seçimi ve optimizasyonuna bağlıdır. Etkili hedefleme stratejileri ile reklam bütçenizi daha verimli kullanabilirsiniz.</p>

      <h2>Benzer Hedef Kitle Oluşturma</h2>
      <p>Lookalike (benzer) hedef kitle oluşturmanın avantajları:</p>
      <ul>
        <li>Mevcut müşterilerinize benzer potansiyel müşteriler bulma</li>
        <li>Dönüşüm oranlarını artırma</li>
        <li>Reklam maliyetlerini düşürme</li>
        <li>Ölçeklenebilir hedefleme</li>
      </ul>

      <h2>Özel Hedef Kitle Stratejileri</h2>
      <p>Facebook Ads'de özel hedef kitle oluşturma yöntemleri:</p>
      <ul>
        <li>Website ziyaretçileri retargeting</li>
        <li>Müşteri listesi yükleme</li>
        <li>Uygulama kullanıcıları hedefleme</li>
        <li>Engagement bazlı hedefleme</li>
      </ul>
    `,
    excerpt: 'Facebook Ads kampanyalarınızda hedef kitle optimizasyonu yaparak reklam performansınızı artırın.',
    featured_image: '/images/blog/facebook-ads.webp',
    author_name: 'Mercan Danışmanlık',
    category_id: 6,
    category_name: 'Sosyal Medya Reklamları',
    published_at: '2024-02-21',
    tags: ['Facebook Ads', 'Reklam', 'Hedefleme']
  },
  {
    id: 8,
    title: 'WordPress SEO Optimizasyonu',
    content: `
      <h2>WordPress SEO Temel Ayarlar</h2>
      <p>WordPress sitenizin arama motorlarında daha iyi performans göstermesi için yapmanız gereken temel optimizasyonlar ve ayarlar.</p>

      <h2>SEO Eklentileri</h2>
      <p>WordPress'te kullanabileceğiniz en etkili SEO eklentileri:</p>
      <ul>
        <li>Yoast SEO</li>
        <li>RankMath</li>
        <li>All in One SEO Pack</li>
        <li>SEOPress</li>
      </ul>

      <h2>Performans Optimizasyonu</h2>
      <p>Site hızını artırmak için yapılması gerekenler:</p>
      <ul>
        <li>Cache eklentisi kullanımı</li>
        <li>Görsel optimizasyonu</li>
        <li>Database temizliği</li>
        <li>CDN kullanımı</li>
      </ul>
    `,
    excerpt: 'WordPress sitenizin SEO performansını artırmak için kapsamlı optimizasyon rehberi.',
    featured_image: '/images/blog/wordpress-seo.webp',
    author_name: 'Mercan Danışmanlık',
    category_id: 1,
    category_name: 'SEO',
    published_at: '2024-02-20',
    tags: ['WordPress', 'SEO', 'Web']
  },
  {
    id: 9,
    title: 'TikTok Marketing Stratejileri',
    content: 'TikTok platformunda etkili pazarlama stratejileri...',
    excerpt: 'TikTok üzerinden markanızı büyütmenin etkili yolları.',
    featured_image: '/images/blog/tiktok-marketing.webp',
    author_name: 'Mercan Danışmanlık',
    category_id: 2,
    category_name: 'Sosyal Medya',
    published_at: '2024-02-20',
    tags: ['TikTok', 'Sosyal Medya', 'Video Marketing']
  },
  {
    id: 10,
    title: 'Mobil SEO Optimizasyonu',
    content: 'Mobil cihazlar için SEO optimizasyonu rehberi...',
    excerpt: 'Mobil kullanıcılar için sitenizi optimize etmenin yolları.',
    featured_image: '/images/blog/mobile-seo.webp',
    author_name: 'Mercan Danışmanlık',
    category_id: 1,
    category_name: 'SEO',
    published_at: '2024-02-18',
    tags: ['Mobil SEO', 'Optimizasyon', 'Mobile-First']
  },
  {
    id: 11,
    title: 'Web Sitesi Hız Optimizasyonu',
    content: 'Web sitenizin performansını artırmanın yolları...',
    excerpt: 'Site hızını artırarak kullanıcı deneyimini iyileştirme teknikleri.',
    featured_image: '/images/blog/website-speed.webp',
    author_name: 'Mercan Danışmanlık',
    category_id: 4,
    category_name: 'Web Tasarım',
    published_at: '2024-02-17',
    tags: ['Web Performans', 'Hız', 'Optimizasyon']
  },
  {
    id: 12,
    title: 'Midjourney ile Görsel Tasarım',
    content: 'Midjourney AI kullanarak profesyonel görseller oluşturma...',
    excerpt: 'Yapay zeka ile etkileyici görseller oluşturmanın yolları.',
    featured_image: '/images/blog/midjourney-design.webp',
    author_name: 'Mercan Danışmanlık',
    category_id: 5,
    category_name: 'Yapay Zeka',
    published_at: '2024-02-16',
    tags: ['Midjourney', 'AI', 'Görsel Tasarım']
  },
  {
    id: 13,
    title: 'Dijital Pazarlamada Veri Analitiği',
    content: 'Veri analitiği kullanarak dijital pazarlama stratejilerinizi nasıl geliştirebilirsiniz...',
    excerpt: 'Dijital pazarlama kampanyalarınızı veri odaklı kararlarla optimize edin.',
    featured_image: '/images/blog/data-analytics.webp',
    author_name: 'Mercan Danışmanlık',
    category_id: 3,
    category_name: 'Dijital Pazarlama',
    published_at: '2024-02-15',
    tags: ['Veri Analitiği', 'Dijital Pazarlama', 'Optimizasyon']
  },
  {
    id: 14,
    title: 'Sosyal Medya İçerik Stratejisi',
    content: 'Etkili bir sosyal medya içerik stratejisi oluşturmanın adımları...',
    excerpt: 'Markanız için güçlü bir sosyal medya içerik stratejisi geliştirin.',
    featured_image: '/images/blog/social-content.webp',
    author_name: 'Mercan Danışmanlık',
    category_id: 2,
    category_name: 'Sosyal Medya',
    published_at: '2024-02-14',
    tags: ['Sosyal Medya', 'İçerik', 'Strateji']
  },
  {
    id: 15,
    title: 'E-ticaret SEO Rehberi',
    content: 'E-ticaret siteleri için kapsamlı SEO optimizasyon rehberi...',
    excerpt: 'E-ticaret sitenizin arama motorlarında üst sıralarda yer alması için SEO teknikleri.',
    featured_image: '/images/blog/ecommerce-seo.webp',
    author_name: 'Mercan Danışmanlık',
    category_id: 1,
    category_name: 'SEO',
    published_at: '2024-02-13',
    tags: ['E-ticaret', 'SEO', 'Optimizasyon']
  },
  {
    id: 16,
    title: 'Yapay Zeka ve Müşteri Hizmetleri',
    content: 'Yapay zeka teknolojilerinin müşteri hizmetlerinde kullanımı...',
    excerpt: 'Müşteri hizmetlerinizi yapay zeka ile nasıl geliştirebilirsiniz?',
    featured_image: '/images/blog/ai-customer-service.webp',
    author_name: 'Mercan Danışmanlık',
    category_id: 5,
    category_name: 'Yapay Zeka',
    published_at: '2024-02-12',
    tags: ['Yapay Zeka', 'Müşteri Hizmetleri', 'Chatbot']
  },
  {
    id: 17,
    title: 'Web Tasarımında UX Prensipleri',
    content: 'Kullanıcı deneyimi odaklı web tasarımı için temel prensipler...',
    excerpt: 'Web sitenizin kullanıcı deneyimini iyileştirmek için UX prensipleri.',
    featured_image: '/images/blog/ux-principles.webp',
    author_name: 'Mercan Danışmanlık',
    category_id: 4,
    category_name: 'Web Tasarım',
    published_at: '2024-02-11',
    tags: ['UX', 'Web Tasarım', 'Kullanıcı Deneyimi']
  },
  {
    id: 18,
    title: 'Google Analytics 4 Rehberi',
    content: 'GA4 ile web sitenizin performansını nasıl analiz edebilirsiniz...',
    excerpt: 'Google Analytics 4\'ün yeni özellikleri ve kullanım rehberi.',
    featured_image: '/images/blog/ga4-guide.webp',
    author_name: 'Mercan Danışmanlık',
    category_id: 3,
    category_name: 'Dijital Pazarlama',
    published_at: '2024-02-10',
    tags: ['Analytics', 'Veri Analizi', 'GA4']
  },
  {
    id: 19,
    title: 'Pinterest Marketing Stratejileri',
    content: 'Pinterest\'te markanızı büyütmek için etkili stratejiler...',
    excerpt: 'Pinterest pazarlama stratejileri ile hedef kitlenize ulaşın.',
    featured_image: '/images/blog/pinterest-marketing.webp',
    author_name: 'Mercan Danışmanlık',
    category_id: 2,
    category_name: 'Sosyal Medya',
    published_at: '2024-02-09',
    tags: ['Pinterest', 'Sosyal Medya', 'Marketing']
  },
  {
    id: 20,
    title: 'Core Web Vitals Optimizasyonu',
    content: 'Web sitenizin Core Web Vitals metriklerini nasıl iyileştirebilirsiniz...',
    excerpt: 'Core Web Vitals optimizasyonu ile SEO performansınızı artırın.',
    featured_image: '/images/blog/core-web-vitals.webp',
    author_name: 'Mercan Danışmanlık',
    category_id: 1,
    category_name: 'SEO',
    published_at: '2024-02-08',
    tags: ['SEO', 'Web Performans', 'Core Web Vitals']
  },
  {
    id: 21,
    title: 'Stable Diffusion ile Görsel Üretimi',
    content: 'Stable Diffusion kullanarak profesyonel görseller oluşturma...',
    excerpt: 'Yapay zeka ile yaratıcı görseller üretmenin yolları.',
    featured_image: '/images/blog/stable-diffusion.webp',
    author_name: 'Mercan Danışmanlık',
    category_id: 5,
    category_name: 'Yapay Zeka',
    published_at: '2024-02-07',
    tags: ['Stable Diffusion', 'AI', 'Görsel Üretimi']
  },
  {
    id: 22,
    title: 'Mobil Web Tasarım Trendleri',
    content: 'Mobil web tasarımında öne çıkan trendler ve en iyi uygulamalar...',
    excerpt: 'Mobil kullanıcılar için modern web tasarım trendleri.',
    featured_image: '/images/blog/mobile-design.webp',
    author_name: 'Mercan Danışmanlık',
    category_id: 4,
    category_name: 'Web Tasarım',
    published_at: '2024-02-06',
    tags: ['Mobil Tasarım', 'Web Tasarım', 'Trendler']
  },
  {
    id: 23,
    title: 'E-posta Pazarlama Otomasyonu',
    content: 'E-posta pazarlama süreçlerinizi otomatikleştirmenin yolları...',
    excerpt: 'E-posta pazarlama otomasyonu ile müşteri ilişkilerinizi güçlendirin.',
    featured_image: '/images/blog/email-automation.webp',
    author_name: 'Mercan Danışmanlık',
    category_id: 3,
    category_name: 'Dijital Pazarlama',
    published_at: '2024-02-05',
    tags: ['E-posta', 'Otomasyon', 'Marketing']
  },
  {
    id: 24,
    title: 'YouTube Shorts Stratejileri',
    content: 'YouTube Shorts ile viral içerik üretme taktikleri...',
    excerpt: 'YouTube Shorts kullanarak markanızın bilinirliğini artırın.',
    featured_image: '/images/blog/youtube-shorts.webp',
    author_name: 'Mercan Danışmanlık',
    category_id: 2,
    category_name: 'Sosyal Medya',
    published_at: '2024-02-04',
    tags: ['YouTube', 'Shorts', 'Video Marketing']
  },
  {
    id: 25,
    title: 'SEO için İçerik Kümeleme',
    content: 'İçerik kümeleme stratejisi ile SEO performansınızı artırın...',
    excerpt: 'SEO odaklı içerik kümeleme stratejisi nasıl uygulanır?',
    featured_image: '/images/blog/content-clustering.webp',
    author_name: 'Mercan Danışmanlık',
    category_id: 1,
    category_name: 'SEO',
    published_at: '2024-02-03',
    tags: ['SEO', 'İçerik', 'Kümeleme']
  },
  {
    id: 26,
    title: 'Claude AI ile İçerik Üretimi',
    content: 'Claude AI kullanarak kaliteli içerik üretme teknikleri...',
    excerpt: 'Yapay zeka destekli içerik üretimi için Claude AI rehberi.',
    featured_image: '/images/blog/claude-ai.webp',
    author_name: 'Mercan Danışmanlık',
    category_id: 5,
    category_name: 'Yapay Zeka',
    published_at: '2024-02-02',
    tags: ['Claude', 'AI', 'İçerik Üretimi']
  },
  {
    id: 27,
    title: 'Web Accessibility Rehberi',
    content: 'Web sitenizi herkes için erişilebilir hale getirme kılavuzu...',
    excerpt: 'Web erişilebilirliği için en iyi uygulamalar ve standartlar.',
    featured_image: '/images/blog/web-accessibility.webp',
    author_name: 'Mercan Danışmanlık',
    category_id: 4,
    category_name: 'Web Tasarım',
    published_at: '2024-02-01',
    tags: ['Accessibility', 'Web Tasarım', 'UX']
  },
  {
    id: 28,
    title: 'Conversion Rate Optimization',
    content: 'Dönüşüm oranı optimizasyonu için test ve analiz yöntemleri...',
    excerpt: 'Web sitenizin dönüşüm oranlarını artırmanın yolları.',
    featured_image: '/images/blog/cro.jpg',
    author_name: 'Mercan Danışmanlık',
    category_id: 3,
    category_name: 'Dijital Pazarlama',
    published_at: '2024-01-31',
    tags: ['CRO', 'Optimizasyon', 'Dönüşüm']
  },
  {
    id: 29,
    title: 'LinkedIn Şirket Sayfası Optimizasyonu',
    content: 'LinkedIn şirket sayfanızı optimize etmenin yolları...',
    excerpt: 'LinkedIn şirket sayfanızdan maksimum verim almak için ipuçları.',
    featured_image: '/images/blog/linkedin-company.jpg',
    author_name: 'Mercan Danışmanlık',
    category_id: 2,
    category_name: 'Sosyal Medya',
    published_at: '2024-01-30',
    tags: ['LinkedIn', 'B2B', 'Sosyal Medya']
  },
  {
    id: 30,
    title: 'JavaScript SEO Rehberi',
    content: 'JavaScript tabanlı web siteleri için SEO optimizasyonu...',
    excerpt: 'JavaScript kullanan web sitelerinde SEO nasıl yapılır?',
    featured_image: '/images/blog/javascript-seo.jpg',
    author_name: 'Mercan Danışmanlık',
    category_id: 1,
    category_name: 'SEO',
    published_at: '2024-01-29',
    tags: ['JavaScript', 'SEO', 'Teknik SEO']
  },
  {
    id: 31,
    title: 'GPT-4 ile İçerik Optimizasyonu',
    content: 'GPT-4 kullanarak içeriklerinizi optimize etme teknikleri...',
    excerpt: 'Yapay zeka ile içerik optimizasyonu nasıl yapılır?',
    featured_image: '/images/blog/gpt4-content.jpg',
    author_name: 'Mercan Danışmanlık',
    category_id: 5,
    category_name: 'Yapay Zeka',
    published_at: '2024-01-28',
    tags: ['GPT-4', 'AI', 'İçerik']
  },
  {
    id: 32,
    title: 'CSS Grid ve Flexbox Kullanımı',
    content: 'Modern web tasarımında CSS Grid ve Flexbox kullanımı...',
    excerpt: 'Responsive tasarım için CSS Grid ve Flexbox rehberi.',
    featured_image: '/images/blog/css-layout.jpg',
    author_name: 'Mercan Danışmanlık',
    category_id: 4,
    category_name: 'Web Tasarım',
    published_at: '2024-01-27',
    tags: ['CSS', 'Grid', 'Flexbox']
  },
  {
    id: 33,
    title: 'Google Ads Remarketing Stratejileri',
    content: 'Google Ads remarketing kampanyalarını optimize etme...',
    excerpt: 'Remarketing ile dönüşüm oranlarınızı nasıl artırabilirsiniz?',
    featured_image: '/images/blog/remarketing.jpg',
    author_name: 'Mercan Danışmanlık',
    category_id: 3,
    category_name: 'Dijital Pazarlama',
    published_at: '2024-01-26',
    tags: ['Google Ads', 'Remarketing', 'PPC']
  },
  {
    id: 34,
    title: 'Instagram Reels Optimizasyonu',
    content: 'Instagram Reels içeriklerinizi optimize etmenin yolları...',
    excerpt: 'Reels içeriklerinizden maksimum verim almak için ipuçları.',
    featured_image: '/images/blog/reels-optimization.jpg',
    author_name: 'Mercan Danışmanlık',
    category_id: 2,
    category_name: 'Sosyal Medya',
    published_at: '2024-01-25',
    tags: ['Instagram', 'Reels', 'Video']
  },
  {
    id: 35,
    title: 'Schema Markup ve Zengin Sonuçlar',
    content: 'Schema markup kullanarak zengin sonuçlar elde etme...',
    excerpt: 'Schema markup ile arama sonuçlarında öne çıkın.',
    featured_image: '/images/blog/schema-markup.jpg',
    author_name: 'Mercan Danışmanlık',
    category_id: 1,
    category_name: 'SEO',
    published_at: '2024-01-24',
    tags: ['Schema', 'SEO', 'Zengin Sonuçlar']
  },
  {
    id: 36,
    title: 'DALL-E 3 ile Görsel Tasarım',
    content: 'DALL-E 3 kullanarak profesyonel görseller oluşturma...',
    excerpt: 'Yapay zeka ile yaratıcı görsel tasarım rehberi.',
    featured_image: '/images/blog/dalle3-design.jpg',
    author_name: 'Mercan Danışmanlık',
    category_id: 5,
    category_name: 'Yapay Zeka',
    published_at: '2024-01-23',
    tags: ['DALL-E', 'AI', 'Görsel Tasarım']
  },
  {
    id: 37,
    title: 'Web Animasyon Trendleri',
    content: 'Modern web sitelerinde animasyon kullanım trendleri...',
    excerpt: 'Web sitenizi canlandıracak animasyon teknikleri.',
    featured_image: '/images/blog/web-animation.jpg',
    author_name: 'Mercan Danışmanlık',
    category_id: 4,
    category_name: 'Web Tasarım',
    published_at: '2024-01-22',
    tags: ['Animasyon', 'Web Tasarım', 'UX']
  },
  {
    id: 38,
    title: 'Meta Ads Hedefleme Optimizasyonu',
    content: 'Meta Ads hedefleme seçeneklerini optimize etme...',
    excerpt: 'Facebook ve Instagram reklamlarında hedefleme stratejileri.',
    featured_image: '/images/blog/meta-targeting.jpg',
    author_name: 'Mercan Danışmanlık',
    category_id: 3,
    category_name: 'Dijital Pazarlama',
    published_at: '2024-01-21',
    tags: ['Meta Ads', 'Hedefleme', 'Reklam']
  },
  {
    id: 39,
    title: 'TikTok Trend Analizi',
    content: 'TikTok trendlerini analiz etme ve içerik planlama...',
    excerpt: 'TikTok\'ta viral olmak için trend analizi.',
    featured_image: '/images/blog/tiktok-trends.jpg',
    author_name: 'Mercan Danışmanlık',
    category_id: 2,
    category_name: 'Sosyal Medya',
    published_at: '2024-01-20',
    tags: ['TikTok', 'Trendler', 'İçerik']
  },
  {
    id: 40,
    title: 'Local SEO Stratejileri',
    content: 'Yerel işletmeler için SEO optimizasyon teknikleri...',
    excerpt: 'Yerel aramalarda üst sıralara çıkmanın yolları.',
    featured_image: '/images/blog/local-seo.jpg',
    author_name: 'Mercan Danışmanlık',
    category_id: 1,
    category_name: 'SEO',
    published_at: '2024-01-19',
    tags: ['Local SEO', 'Google Business', 'Yerel']
  },
  {
    id: 41,
    title: 'AI ile Kişiselleştirilmiş Pazarlama',
    content: 'Yapay zeka ile pazarlama stratejilerini kişiselleştirme...',
    excerpt: 'AI destekli kişiselleştirilmiş pazarlama taktikleri.',
    featured_image: '/images/blog/ai-personalization.jpg',
    author_name: 'Mercan Danışmanlık',
    category_id: 5,
    category_name: 'Yapay Zeka',
    published_at: '2024-01-18',
    tags: ['AI', 'Kişiselleştirme', 'Pazarlama']
  },
  {
    id: 42,
    title: 'Web Tipografi Rehberi',
    content: 'Web tasarımında etkili tipografi kullanımı...',
    excerpt: 'Web siteniz için doğru yazı tiplerini seçme rehberi.',
    featured_image: '/images/blog/web-typography.jpg',
    author_name: 'Mercan Danışmanlık',
    category_id: 4,
    category_name: 'Web Tasarım',
    published_at: '2024-01-17',
    tags: ['Tipografi', 'Web Tasarım', 'Font']
  },
  {
    id: 43,
    title: 'Performance Marketing Stratejileri',
    content: 'Performans odaklı dijital pazarlama stratejileri...',
    excerpt: 'Performance marketing ile ROI\'nizi maksimize edin.',
    featured_image: '/images/blog/performance-marketing.jpg',
    author_name: 'Mercan Danışmanlık',
    category_id: 3,
    category_name: 'Dijital Pazarlama',
    published_at: '2024-01-16',
    tags: ['Performance', 'Marketing', 'ROI']
  },
  {
    id: 44,
    title: 'Twitter Spaces Kullanım Rehberi',
    content: 'Twitter Spaces ile etkili canlı yayınlar yapma...',
    excerpt: 'Twitter Spaces\'i markanız için nasıl kullanabilirsiniz?',
    featured_image: '/images/blog/twitter-spaces.jpg',
    author_name: 'Mercan Danışmanlık',
    category_id: 2,
    category_name: 'Sosyal Medya',
    published_at: '2024-01-15',
    tags: ['Twitter', 'Spaces', 'Canlı Yayın']
  },
  {
    id: 45,
    title: 'E-ticaret SEO Stratejileri',
    content: 'E-ticaret siteleri için kapsamlı SEO stratejileri...',
    excerpt: 'E-ticaret sitenizin SEO performansını artırın.',
    featured_image: '/images/blog/ecommerce-seo-strategy.jpg',
    author_name: 'Mercan Danışmanlık',
    category_id: 1,
    category_name: 'SEO',
    published_at: '2024-01-14',
    tags: ['E-ticaret', 'SEO', 'Strateji']
  },
  {
    id: 46,
    title: 'AI Chatbot Entegrasyonu',
    content: 'Web sitenize AI chatbot entegre etme rehberi...',
    excerpt: 'Yapay zeka destekli chatbot çözümleri.',
    featured_image: '/images/blog/ai-chatbot.jpg',
    author_name: 'Mercan Danışmanlık',
    category_id: 5,
    category_name: 'Yapay Zeka',
    published_at: '2024-01-13',
    tags: ['Chatbot', 'AI', 'Müşteri Hizmetleri']
  },
  {
    id: 47,
    title: 'Web Tasarımında Renk Psikolojisi',
    content: 'Renk psikolojisinin web tasarımındaki önemi...',
    excerpt: 'Doğru renk seçimleri ile kullanıcı deneyimini iyileştirin.',
    featured_image: '/images/blog/color-psychology.jpg',
    author_name: 'Mercan Danışmanlık',
    category_id: 4,
    category_name: 'Web Tasarım',
    published_at: '2024-01-12',
    tags: ['Renk', 'Psikoloji', 'Tasarım']
  },
  {
    id: 48,
    title: 'Influencer Marketing Metrikleri',
    content: 'Influencer marketing kampanyalarını ölçümleme...',
    excerpt: 'Influencer marketing başarısını nasıl ölçebilirsiniz?',
    featured_image: '/images/blog/influencer-metrics.jpg',
    author_name: 'Mercan Danışmanlık',
    category_id: 3,
    category_name: 'Dijital Pazarlama',
    published_at: '2024-01-11',
    tags: ['Influencer', 'Metrikler', 'Marketing']
  },
  {
    id: 49,
    title: 'Instagram Analytics Rehberi',
    content: 'Instagram analitiklerini anlama ve yorumlama...',
    excerpt: 'Instagram performansınızı analitiklerle optimize edin.',
    featured_image: '/images/blog/instagram-analytics.jpg',
    author_name: 'Mercan Danışmanlık',
    category_id: 2,
    category_name: 'Sosyal Medya',
    published_at: '2024-01-10',
    tags: ['Instagram', 'Analytics', 'Veri']
  },
  {
    id: 50,
    title: 'International SEO Stratejileri',
    content: 'Uluslararası SEO için optimizasyon teknikleri...',
    excerpt: 'Global pazarda SEO stratejilerinizi geliştirin.',
    featured_image: '/images/blog/international-seo.jpg',
    author_name: 'Mercan Danışmanlık',
    category_id: 1,
    category_name: 'SEO',
    published_at: '2024-01-09',
    tags: ['International SEO', 'Global', 'Strateji']
  }
]

const sampleCategories: Category[] = [
  { id: 1, name: 'SEO', slug: 'seo' },
  { id: 2, name: 'Sosyal Medya', slug: 'sosyal-medya' },
  { id: 3, name: 'Google Ads', slug: 'google-ads' },
  { id: 4, name: 'Web Tasarım', slug: 'web-tasarim' },
  { id: 5, name: 'Yapay Zeka', slug: 'yapay-zeka' }
]

export const useBlogStore = defineStore('blog', {
  state: () => ({
    blogs: [] as Blog[],
    categories: [] as Category[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    getBlogs: (state) => state.blogs,
    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null
  },

  actions: {
    async fetchBlogImage(query: string) {
      try {
        const response = await pexelsApi.get('/search', {
          params: {
            query,
            per_page: 1,
            locale: 'tr-TR'
          }
        })

        if (response.data.photos && response.data.photos.length > 0) {
          // Direkt olarak large2x formatındaki resmi kullan
          return response.data.photos[0].src.large2x
        }
        return 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      } catch (error) {
        console.error('Pexels API hatası:', error)
        return 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      }
    },

    async fetchBlogs() {
      this.loading = true
      this.error = null
      
      try {
        // Simüle edilmiş API çağrısı
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        this.blogs = sampleBlogs
      } catch (error) {
        this.error = 'Blog yazıları yüklenirken bir hata oluştu'
        console.error('Blog yükleme hatası:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchCategories() {
      try {
        // Backend hazır olmadığı için örnek verileri kullan
        this.categories = sampleCategories
      } catch (error) {
        console.error('Kategori yükleme hatası:', error)
      }
    },

    async getBlogById(id: number): Promise<Blog | null> {
      try {
        if (this.blogs.length === 0) {
          await this.fetchBlogs()
        }
        return this.blogs.find(blog => blog.id === Number(id)) || null
      } catch (error) {
        console.error('Blog getirme hatası:', error)
        return null
      }
    }
  },
}) 