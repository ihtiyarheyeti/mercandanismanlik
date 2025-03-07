<template>
  <div class="services">
    <h1>Hizmetlerimiz</h1>
    <div class="services-grid">
      <div class="service-card" v-for="service in services" :key="service.id">
        <h3>{{ service.title }}</h3>
        <p>{{ service.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const title = ref('Hizmetlerimiz')
const services = ref([
  {
    id: 1,
    title: 'Web Tasarım',
    description: 'Modern ve kullanıcı dostu web siteleri tasarlıyoruz.'
  },
  {
    id: 2,
    title: 'SEO Optimizasyonu',
    description: 'Sitenizin arama motorlarında üst sıralarda yer almasını sağlıyoruz.'
  },
  {
    id: 3,
    title: 'Sosyal Medya Yönetimi',
    description: 'Sosyal medya hesaplarınızı profesyonel olarak yönetiyoruz.'
  }
])

onMounted(() => {
  document.title = `${title.value} - Mercan Danışmanlık`
})
</script>

<style scoped>
.services {
  padding: 2rem;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.service-card {
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.service-card h3 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.service-card p {
  color: #666;
  line-height: 1.6;
}
</style> 