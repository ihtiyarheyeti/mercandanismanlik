<template>
  <div class="tools">
    <h1>Araçlarımız</h1>
    <div class="tools-grid">
      <div class="tool-card" v-for="tool in tools" :key="tool.id">
        <h3>{{ tool.title }}</h3>
        <p>{{ tool.description }}</p>
        <button class="try-button" @click="tryTool(tool)">Hemen Dene</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const title = ref('Araçlarımız')
const tools = ref([
  {
    id: 1,
    title: 'SEO Analizi',
    description: 'Sitenizin SEO performansını analiz edin ve öneriler alın.'
  },
  {
    id: 2,
    title: 'Site Hız Testi',
    description: 'Web sitenizin yüklenme hızını test edin ve optimize edin.'
  },
  {
    id: 3,
    title: 'Backlink Analizi',
    description: 'Sitenize gelen backlinkleri analiz edin ve raporlayın.'
  }
])

const tryTool = (tool) => {
  // Tool kullanım mantığı burada implement edilecek
  console.log(`${tool.title} aracı deneniyor...`)
}

onMounted(() => {
  document.title = `${title.value} - Mercan Danışmanlık`
})
</script>

<style scoped>
.tools {
  padding: 2rem;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.tool-card {
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  display: flex;
  flex-direction: column;
}

.tool-card h3 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.tool-card p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.try-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.try-button:hover {
  background-color: #2980b9;
}
</style> 