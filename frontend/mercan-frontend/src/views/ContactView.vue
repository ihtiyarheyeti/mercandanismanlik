<template>
  <div class="contact">
    <h1>İletişim</h1>
    
    <div class="contact-container">
      <div class="contact-info">
        <h2>Bize Ulaşın</h2>
        <div class="info-item">
          <i class="fas fa-map-marker-alt"></i>
          <div>
            <h3>Adres</h3>
            <p>Örnek Mahallesi, Örnek Sokak No:123<br>Kadıköy/İstanbul</p>
          </div>
        </div>
        
        <div class="info-item">
          <i class="fas fa-phone"></i>
          <div>
            <h3>Telefon</h3>
            <p><a href="tel:+902161234567">0216 123 45 67</a></p>
          </div>
        </div>
        
        <div class="info-item">
          <i class="fas fa-envelope"></i>
          <div>
            <h3>E-posta</h3>
            <p><a href="mailto:info@mercan.com">info@mercan.com</a></p>
          </div>
        </div>
        
        <div class="social-media">
          <h3>Sosyal Medya</h3>
          <div class="social-links">
            <a href="#" target="_blank" class="social-link">
              <i class="fab fa-facebook"></i>
            </a>
            <a href="#" target="_blank" class="social-link">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" target="_blank" class="social-link">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#" target="_blank" class="social-link">
              <i class="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
      
      <div class="contact-form">
        <h2>İletişim Formu</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Ad Soyad</label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              required
              placeholder="Adınız ve soyadınız"
            >
          </div>
          
          <div class="form-group">
            <label for="email">E-posta</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              required
              placeholder="E-posta adresiniz"
            >
          </div>
          
          <div class="form-group">
            <label for="phone">Telefon</label>
            <input
              type="tel"
              id="phone"
              v-model="form.phone"
              placeholder="Telefon numaranız"
            >
          </div>
          
          <div class="form-group">
            <label for="subject">Konu</label>
            <select id="subject" v-model="form.subject" required>
              <option value="">Seçiniz</option>
              <option value="general">Genel Bilgi</option>
              <option value="support">Teknik Destek</option>
              <option value="sales">Satış</option>
              <option value="other">Diğer</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="message">Mesaj</label>
            <textarea
              id="message"
              v-model="form.message"
              required
              placeholder="Mesajınız"
              rows="5"
            ></textarea>
          </div>
          
          <button type="submit" class="submit-button" :disabled="isSubmitting">
            {{ isSubmitting ? 'Gönderiliyor...' : 'Gönder' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const title = ref('İletişim')
const isSubmitting = ref(false)
const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const submitForm = async () => {
  isSubmitting.value = true
  try {
    // Form gönderme işlemi burada implement edilecek
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simüle edilmiş API çağrısı
    console.log('Form gönderildi:', form.value)
    alert('Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.')
    form.value = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
  } catch (error) {
    console.error('Form gönderimi başarısız:', error)
    alert('Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyin.')
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  document.title = `${title.value} - Mercan Danışmanlık`
})
</script>

<style scoped>
.contact {
  padding: 2rem;
}

.contact-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 2rem auto;
}

.contact-info {
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.info-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.info-item i {
  font-size: 1.5rem;
  color: #3498db;
  margin-right: 1rem;
  width: 24px;
}

.info-item h3 {
  margin: 0 0 0.5rem;
  color: #2c3e50;
  font-size: 1.1rem;
}

.info-item p {
  margin: 0;
  color: #666;
  line-height: 1.6;
}

.info-item a {
  color: #3498db;
  text-decoration: none;
}

.info-item a:hover {
  text-decoration: underline;
}

.social-media {
  margin-top: 2rem;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.social-link {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: background-color 0.3s;
}

.social-link:hover {
  background-color: #2980b9;
}

.contact-form {
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3498db;
}

.submit-button {
  width: 100%;
  background-color: #3498db;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1rem;
}

.submit-button:hover:not(:disabled) {
  background-color: #2980b9;
}

.submit-button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}
</style> 