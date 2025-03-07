<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold mb-8 text-gray-800">Gizlilik Politikası</h1>
    
    <div class="prose max-w-none">
      <p class="mb-6">
        Mercan Danışmanlık olarak, gizliliğinize ve kişisel verilerinizin korunmasına önem veriyoruz. 
        Bu gizlilik politikası, web sitemizi kullanırken toplanan bilgilerin nasıl kullanıldığını ve korunduğunu açıklamaktadır.
      </p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">1. Toplanan Bilgiler</h2>
      <p class="mb-4">
        Web sitemizi ziyaret ettiğinizde aşağıdaki bilgileri toplayabiliriz:
      </p>
      <ul class="list-disc pl-6 mb-6">
        <li>İsim ve iletişim bilgileri</li>
        <li>E-posta adresi</li>
        <li>IP adresi ve tarayıcı bilgileri</li>
        <li>Site kullanım istatistikleri</li>
        <li>Çerezler aracılığıyla toplanan bilgiler</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-8 mb-4">2. Bilgilerin Kullanımı</h2>
      <p class="mb-6">
        Topladığımız bilgileri aşağıdaki amaçlar için kullanıyoruz:
      </p>
      <ul class="list-disc pl-6 mb-6">
        <li>Hizmetlerimizi sunmak ve geliştirmek</li>
        <li>İletişim taleplerini yanıtlamak</li>
        <li>Kullanıcı deneyimini iyileştirmek</li>
        <li>Güvenliği sağlamak</li>
        <li>Yasal yükümlülükleri yerine getirmek</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-8 mb-4">3. Bilgilerin Paylaşımı</h2>
      <p class="mb-6">
        Kişisel bilgilerinizi üçüncü taraflarla yalnızca aşağıdaki durumlarda paylaşırız:
      </p>
      <ul class="list-disc pl-6 mb-6">
        <li>Yasal zorunluluk durumunda</li>
        <li>Sizin açık rızanız olduğunda</li>
        <li>Hizmet sağlayıcılarımızla işbirliği kapsamında</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-8 mb-4">4. Güvenlik</h2>
      <p class="mb-6">
        Kişisel verilerinizin güvenliğini sağlamak için aşağıdaki önlemleri alıyoruz:
      </p>
      <ul class="list-disc pl-6 mb-6">
        <li>SSL şifreleme</li>
        <li>Güvenli veri depolama</li>
        <li>Düzenli güvenlik güncellemeleri</li>
        <li>Erişim kontrolü</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-8 mb-4">5. Çerezler</h2>
      <p class="mb-6">
        Web sitemiz çerezleri kullanmaktadır. Çerezler hakkında detaylı bilgi için 
        <router-link to="/cerez-politikasi" class="text-blue-600 hover:text-blue-800">Çerez Politikamızı</router-link> 
        inceleyebilirsiniz.
      </p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">6. Haklarınız</h2>
      <p class="mb-6">
        Kişisel verilerinizle ilgili aşağıdaki haklara sahipsiniz:
      </p>
      <ul class="list-disc pl-6 mb-6">
        <li>Bilgi talep etme</li>
        <li>Düzeltme talep etme</li>
        <li>Silme talep etme</li>
        <li>İşlemeyi sınırlama</li>
        <li>Veri taşınabilirliği</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-8 mb-4">7. İletişim</h2>
      <p class="mb-6">
        Gizlilik politikamız hakkında sorularınız için aşağıdaki iletişim bilgilerini kullanabilirsiniz:
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

const title = ref('Gizlilik Politikası')

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
</style> 