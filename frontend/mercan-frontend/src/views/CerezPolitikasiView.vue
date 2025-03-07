<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold mb-8 text-gray-800">Çerez Politikası</h1>
    
    <div class="prose max-w-none">
      <p class="mb-6">
        Bu çerez politikası, web sitemizde kullanılan çerezler hakkında size bilgi vermek amacıyla hazırlanmıştır.
      </p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">1. Çerez Nedir?</h2>
      <p class="mb-6">
        Çerezler, web sitemizi ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza yerleştirilen küçük metin dosyalarıdır. Bu dosyalar, web sitemizi daha etkili kullanmanızı sağlamak amacıyla kullanılmaktadır.
      </p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">2. Kullandığımız Çerez Türleri</h2>
      <ul class="list-disc pl-6 mb-6">
        <li>
          <strong>Zorunlu Çerezler:</strong> Web sitemizin düzgün çalışması için gerekli olan çerezlerdir.
        </li>
        <li>
          <strong>Performans Çerezleri:</strong> Ziyaretçilerin web sitemizi nasıl kullandığını anlamamızı sağlayan çerezlerdir.
        </li>
        <li>
          <strong>İşlevsellik Çerezleri:</strong> Size daha gelişmiş ve kişiselleştirilmiş bir deneyim sunmamızı sağlayan çerezlerdir.
        </li>
        <li>
          <strong>Hedefleme/Reklam Çerezleri:</strong> Size ilgi alanlarınıza göre reklamlar göstermek için kullanılan çerezlerdir.
        </li>
      </ul>

      <h2 class="text-2xl font-semibold mt-8 mb-4">3. Çerezlerin Kullanım Amaçları</h2>
      <p class="mb-6">
        Çerezleri aşağıdaki amaçlarla kullanıyoruz:
      </p>
      <ul class="list-disc pl-6 mb-6">
        <li>Web sitemizin temel işlevlerini yerine getirmek</li>
        <li>Site performansını ve kullanıcı deneyimini iyileştirmek</li>
        <li>Güvenliği artırmak</li>
        <li>Kişiselleştirilmiş bir deneyim sunmak</li>
        <li>Reklam ve pazarlama faaliyetlerini optimize etmek</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-8 mb-4">4. Çerezleri Nasıl Kontrol Edebilirsiniz?</h2>
      <p class="mb-6">
        Tarayıcınızın ayarlarını değiştirerek çerezleri kabul etme veya reddetme hakkına sahipsiniz. Ancak çerezleri devre dışı bırakmanız durumunda web sitemizin bazı özelliklerinin düzgün çalışmayabileceğini unutmayın.
      </p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">5. İletişim</h2>
      <p class="mb-6">
        Çerez politikamızla ilgili sorularınız için aşağıdaki iletişim bilgilerinden bize ulaşabilirsiniz:
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