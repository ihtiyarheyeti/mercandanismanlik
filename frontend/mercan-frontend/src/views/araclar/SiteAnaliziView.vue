<script setup lang="ts">
import { ref } from 'vue'

const url = ref('')
const isAnalyzing = ref(false)
const results = ref(null)

const analyzeSite = async () => {
  if (!url.value) return
  
  isAnalyzing.value = true
  // API entegrasyonu burada yapılacak
  setTimeout(() => {
    isAnalyzing.value = false
    results.value = {
      performance: 85,
      seo: 90,
      accessibility: 95,
      bestPractices: 88
    }
  }, 2000)
}
</script>

<template>
  <div class="max-w-4xl mx-auto mt-8 p-6 bg-white/5 backdrop-blur-lg rounded-xl">
    <h2 class="text-2xl font-bold text-white mb-6">Site Analizi</h2>
    
    <!-- URL Girişi -->
    <div class="flex gap-4 mb-8">
      <input
        v-model="url"
        type="url"
        placeholder="https://example.com"
        class="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-blue-500"
      />
      <button
        @click="analyzeSite"
        :disabled="isAnalyzing || !url"
        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ isAnalyzing ? 'Analiz Ediliyor...' : 'Analiz Et' }}
      </button>
    </div>

    <!-- Sonuçlar -->
    <div v-if="results" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="(score, metric) in results"
        :key="metric"
        class="p-6 bg-white/10 rounded-xl"
      >
        <h3 class="text-lg font-semibold text-white capitalize mb-2">
          {{ metric }}
        </h3>
        <div class="flex items-center">
          <div class="w-full bg-gray-700 rounded-full h-4 mr-4">
            <div
              class="h-full rounded-full bg-blue-500"
              :style="{ width: `${score}%` }"
            ></div>
          </div>
          <span class="text-white font-medium">{{ score }}</span>
        </div>
      </div>
    </div>

    <!-- Yükleniyor -->
    <div v-else-if="isAnalyzing" class="text-center py-12">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
      <p class="text-white mt-4">Site analiz ediliyor...</p>
    </div>

    <!-- Başlangıç Durumu -->
    <div v-else class="text-center py-12 text-gray-400">
      <i class="fas fa-search text-6xl mb-4"></i>
      <p>Analiz etmek istediğiniz sitenin URL'sini girin</p>
    </div>
  </div>
</template>

<style scoped>
.capitalize {
  text-transform: capitalize;
}
</style> 