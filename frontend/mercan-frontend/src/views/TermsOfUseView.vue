<template>
  <div class="terms">
    <div class="content">
      <h1>Kullanım Koşulları</h1>
      
      <section>
        <h2>1. Kabul Edilen Şartlar</h2>
        <p>
          Bu web sitesini kullanarak, aşağıda belirtilen kullanım koşullarını kabul etmiş olursunuz. 
          Bu koşulları kabul etmiyorsanız, lütfen sitemizi kullanmayınız.
        </p>
      </section>

      <section>
        <h2>2. Hizmetlerin Kullanımı</h2>
        <p>
          Mercan Danışmanlık tarafından sunulan hizmetleri kullanırken:
        </p>
        <ul>
          <li>Tüm yerel, ulusal ve uluslararası yasalara uymalısınız</li>
          <li>Başkalarının haklarını ihlal etmemelisiniz</li>
          <li>Hizmetlerimizi kötüye kullanmamalısınız</li>
          <li>Güvenlik önlemlerini atlatmaya çalışmamalısınız</li>
          <li>Sistemlerimize zarar verecek faaliyetlerde bulunmamalısınız</li>
        </ul>
      </section>

      <section>
        <h2>3. Hesap Güvenliği</h2>
        <p>
          Hesabınızın güvenliğinden siz sorumlusunuz. Bu kapsamda:
        </p>
        <ul>
          <li>Güçlü bir şifre kullanmalısınız</li>
          <li>Şifrenizi kimseyle paylaşmamalısınız</li>
          <li>Hesabınızda şüpheli bir aktivite fark ederseniz bizi bilgilendirmelisiniz</li>
          <li>Hesap bilgilerinizi güncel tutmalısınız</li>
        </ul>
      </section>

      <section>
        <h2>4. Fikri Mülkiyet Hakları</h2>
        <p>
          Web sitemizdeki tüm içerik (metin, görsel, logo, tasarım vb.) Mercan Danışmanlık'ın fikri mülkiyetidir.
          Bu içeriklerin izinsiz kullanımı, kopyalanması veya dağıtılması yasaktır.
        </p>
      </section>

      <section>
        <h2>5. Sorumluluk Reddi</h2>
        <p>
          Hizmetlerimizi "olduğu gibi" sunuyoruz. Aşağıdaki konularda garanti vermiyoruz:
        </p>
        <ul>
          <li>Hizmetlerin kesintisiz çalışacağı</li>
          <li>Hataların düzeltileceği</li>
          <li>Zararlı yazılımlardan arındırılmış olduğu</li>
          <li>Belirli bir amaca uygunluk</li>
        </ul>
      </section>

      <section>
        <h2>6. Ödeme ve İade Koşulları</h2>
        <p>
          Hizmetlerimize ilişkin ödeme ve iade koşulları:
        </p>
        <ul>
          <li>Ödemeler peşin olarak alınır</li>
          <li>İadeler, hizmet başlamadan önce talep edilmelidir</li>
          <li>Hizmet başladıktan sonra yapılan iade talepleri değerlendirilmez</li>
          <li>Özel durumlarda iade koşulları ayrıca belirlenir</li>
        </ul>
      </section>

      <section>
        <h2>7. Değişiklikler</h2>
        <p>
          Bu kullanım koşullarını herhangi bir zamanda değiştirme hakkını saklı tutuyoruz. 
          Değişiklikler web sitemizde yayınlandığı anda yürürlüğe girer.
        </p>
      </section>

      <section>
        <h2>8. Fesih</h2>
        <p>
          Aşağıdaki durumlarda hizmetlerimizi kullanmanızı sonlandırabiliriz:
        </p>
        <ul>
          <li>Kullanım koşullarının ihlali</li>
          <li>Yasadışı faaliyetler</li>
          <li>Etik olmayan davranışlar</li>
          <li>Sistemin kötüye kullanımı</li>
        </ul>
      </section>

      <section>
        <h2>9. İletişim</h2>
        <p>
          Kullanım koşulları hakkında sorularınız için aşağıdaki iletişim bilgilerini kullanabilirsiniz:
        </p>
        <div class="contact-info">
          <p><strong>E-posta:</strong> legal@mercan.com</p>
          <p><strong>Telefon:</strong> 0216 123 45 67</p>
          <p><strong>Adres:</strong> Örnek Mahallesi, Örnek Sokak No:123 Kadıköy/İstanbul</p>
        </div>
      </section>

      <section class="last-update">
        <p>Son güncelleme tarihi: 1 Mart 2025</p>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const title = ref('Kullanım Koşulları')

onMounted(() => {
  document.title = `${title.value} - Mercan Danışmanlık`
})
</script>

<style scoped>
.terms {
  padding: 2rem;
}

.content {
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
}

section {
  margin-bottom: 2rem;
}

h2 {
  color: #3498db;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

ul {
  list-style-type: disc;
  margin-left: 1.5rem;
  margin-bottom: 1rem;
  color: #666;
}

li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.contact-info {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 4px;
  margin-top: 1rem;
}

.contact-info p {
  margin-bottom: 0.5rem;
}

strong {
  color: #2c3e50;
}

.last-update {
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  font-style: italic;
  color: #999;
}
</style> 