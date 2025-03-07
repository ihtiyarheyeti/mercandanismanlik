<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold mb-8 text-gray-800">Çerez Politikası</h1>
    
    <div class="prose max-w-none">
      <p class="mb-6">
        Mercan Danışmanlık olarak web sitemizde çerezler kullanmaktayız. Bu politika, çerezlerin ne olduğunu ve nasıl kullanıldığını açıklamaktadır.
      </p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">1. Çerez Nedir?</h2>
      <p class="mb-6">
        Çerezler, web sitemizi ziyaret ettiğinizde tarayıcınız tarafından bilgisayarınıza veya mobil cihazınıza 
        kaydedilen küçük metin dosyalarıdır. Bu dosyalar sizin web sitemizde daha iyi bir deneyim yaşamanızı 
        sağlamak için kullanılır.
      </p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">2. Çerez Türleri</h2>
      <p class="mb-4">Web sitemizde kullanılan çerez türleri:</p>
      <ul class="list-disc pl-6 mb-6">
        <li>
          <strong>Zorunlu Çerezler:</strong> 
          Web sitesinin temel işlevleri için gerekli olan çerezlerdir.
        </li>
        <li>
          <strong>Performans Çerezleri:</strong> 
          Sitemizin performansını ölçmek ve iyileştirmek için kullanılır.
        </li>
        <li>
          <strong>İşlevsellik Çerezleri:</strong> 
          Tercihlerinizi hatırlamak ve size özelleştirilmiş bir deneyim sunmak için kullanılır.
        </li>
        <li>
          <strong>Hedefleme/Reklam Çerezleri:</strong> 
          Size ilgi alanlarınıza göre reklamlar göstermek için kullanılır.
        </li>
      </ul>

      <h2 class="text-2xl font-semibold mt-8 mb-4">3. Çerezlerin Kullanım Amaçları</h2>
      <p class="mb-6">Çerezleri aşağıdaki amaçlar için kullanıyoruz:</p>
      <ul class="list-disc pl-6 mb-6">
        <li>Oturum yönetimi ve güvenlik</li>
        <li>Kullanıcı tercihlerinin hatırlanması</li>
        <li>Site trafiğinin analizi</li>
        <li>Kullanıcı deneyiminin iyileştirilmesi</li>
        <li>Hedefli reklamların gösterilmesi</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-8 mb-4">4. Çerez Yönetimi</h2>
      <p class="mb-6">
        Tarayıcınızın ayarlarını değiştirerek çerezleri yönetebilirsiniz. Çerezleri tamamen devre dışı 
        bırakabilir veya belirli türdeki çerezleri engelleyebilirsiniz. Ancak bu durumda web sitemizin 
        bazı özellikleri düzgün çalışmayabilir.
      </p>
      <div class="browser-settings">
        <h3 class="text-xl font-semibold mb-4">Popüler tarayıcılarda çerez ayarları:</h3>
        <ul class="list-none pl-0 mb-6">
          <li class="mb-2">
            <strong>Google Chrome:</strong>
            Ayarlar > Gelişmiş > Gizlilik ve Güvenlik > Site Ayarları > Çerezler
          </li>
          <li class="mb-2">
            <strong>Mozilla Firefox:</strong>
            Seçenekler > Gizlilik ve Güvenlik > Çerezler ve Site Verileri
          </li>
          <li class="mb-2">
            <strong>Safari:</strong>
            Tercihler > Gizlilik > Çerezler ve Web Sitesi Verileri
          </li>
          <li class="mb-2">
            <strong>Microsoft Edge:</strong>
            Ayarlar > Gizlilik ve Güvenlik > Çerezler
          </li>
        </ul>
      </div>

      <h2 class="text-2xl font-semibold mt-8 mb-4">5. Üçüncü Taraf Çerezleri</h2>
      <p class="mb-6">
        Web sitemizde üçüncü taraf hizmet sağlayıcılarının (örneğin, Google Analytics) çerezleri de 
        kullanılmaktadır. Bu çerezler, hizmet sağlayıcıların gizlilik politikalarına tabidir.
      </p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">6. Veri Koruma</h2>
      <p class="mb-6">
        Çerezler aracılığıyla toplanan verileriniz, gizlilik politikamıza uygun olarak işlenir ve korunur. 
        Detaylı bilgi için <router-link to="/gizlilik-politikasi" class="text-blue-600 hover:text-blue-800">
        Gizlilik Politikamızı</router-link> inceleyebilirsiniz.
      </p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">7. Güncellemeler</h2>
      <p class="mb-6">
        Bu çerez politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler olması durumunda 
        sizi bilgilendireceğiz.
      </p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">8. İletişim</h2>
      <p class="mb-6">
        Çerez politikamız hakkında sorularınız için aşağıdaki iletişim bilgilerini kullanabilirsiniz:
      </p>
      <div class="bg-gray-100 p-6 rounded-lg">
        <p class="font-semibold">Mercan Danışmanlık</p>
        <p>Adres: İstanbul, Türkiye</p>
        <p>E-posta: privacy@mercan.com</p>
        <p>Telefon: 0216 123 45 67</p>
      </div>

      <div class="mt-8 text-sm text-gray-600">
        <p>Son güncelleme tarihi: 1 Mart 2025</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const title = ref('Çerez Politikası')

onMounted(() => {
  document.title = `${title.value} - Mercan Danışmanlık`
})
</script>

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

.browser-settings {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin: 1.5rem 0;
}
</style> 