<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold mb-8 text-gray-800">Kullanım Koşulları</h1>
    
    <div class="prose max-w-none">
      <p class="mb-6">
        Bu web sitesini kullanarak aşağıdaki kullanım koşullarını kabul etmiş sayılırsınız. Lütfen bu koşulları dikkatlice okuyunuz.
      </p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">1. Hizmet Kullanımı</h2>
      <p class="mb-6">
        Web sitemizi ve hizmetlerimizi kullanırken:
      </p>
      <ul class="list-disc pl-6 mb-6">
        <li>Tüm yerel, ulusal ve uluslararası yasalara uymalısınız</li>
        <li>Başkalarının haklarını ihlal etmemelisiniz</li>
        <li>Sistemlerimize zarar verecek faaliyetlerde bulunmamalısınız</li>
        <li>Hizmetlerimizi kötüye kullanmamalısınız</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-8 mb-4">2. Fikri Mülkiyet Hakları</h2>
      <p class="mb-6">
        Web sitemizdeki tüm içerik (metin, grafikler, logolar, düğme simgeleri, görseller, ses klipleri, dijital indirmeler, veri derlemeleri ve yazılım dahil) Mercan Danışmanlık'ın mülkiyetindedir ve telif hakkı yasaları ile korunmaktadır.
      </p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">3. Hesap Güvenliği</h2>
      <p class="mb-6">
        Eğer bir hesap oluşturursanız:
      </p>
      <ul class="list-disc pl-6 mb-6">
        <li>Doğru ve güncel bilgiler sağlamalısınız</li>
        <li>Hesap bilgilerinizi güvende tutmalısınız</li>
        <li>Hesabınızla yapılan tüm işlemlerden sorumlusunuz</li>
        <li>Yetkisiz erişimi fark ettiğinizde bizi bilgilendirmelisiniz</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-8 mb-4">4. Sorumluluk Sınırlaması</h2>
      <p class="mb-6">
        Mercan Danışmanlık ve çalışanları, web sitesinin kullanımından kaynaklanan doğrudan veya dolaylı zararlardan sorumlu tutulamaz.
      </p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">5. İletişim</h2>
      <p class="mb-6">
        Kullanım koşullarıyla ilgili sorularınız için aşağıdaki iletişim bilgilerinden bize ulaşabilirsiniz:
      </p>
      <div class="bg-gray-100 p-6 rounded-lg">
        <p class="font-semibold">Mercan Danışmanlık</p>
        <p>Adres: İstanbul, Türkiye</p>
        <p>E-posta: info@mercandanismanlik.com</p>
        <p>Telefon: +90 (555) 123 45 67</p>
      </div>

      <p class="mt-8 text-sm text-gray-600">
        Son güncelleme: {{ new Date().toLocaleDateString('tr-TR') }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.prose {
  color: #374151;
  line-height: 1.75;
}

.prose h1 {
  color: #1F2937;
}

.prose h2 {
  color: #1F2937;
}

.prose ul {
  margin-bottom: 1.5em;
}

.prose ul li {
  margin-bottom: 0.5em;
}
</style> 