<script setup lang="ts">
import { ref } from 'vue'

const url = ref('')
const isAnalyzing = ref(false)
const results = ref<any>(null)

const analyzeSite = async () => {
  if (!url.value) return
  
  isAnalyzing.value = true
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: url.value })
    })
    
    const data = await response.json()
    results.value = data
  } catch (error) {
    console.error('Analiz hatası:', error)
  } finally {
    isAnalyzing.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 py-16">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold text-white mb-8 text-center">Site Analizi</h1>
        
        <div class="bg-white/10 backdrop-blur-lg rounded-xl p-8">
          <div class="mb-8">
            <label class="block text-white mb-2">Web Sitesi URL'si</label>
            <div class="flex gap-4">
              <input
                v-model="url"
                type="url"
                placeholder="https://example.com"
                class="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-blue-500"
              >
              <button
                @click="analyzeSite"
                :disabled="isAnalyzing || !url"
                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isAnalyzing ? 'Analiz Ediliyor...' : 'Analiz Et' }}
              </button>
            </div>
          </div>

          <!-- Sonuçlar -->
          <div v-if="results" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-white/5 rounded-lg p-6">
                <h3 class="text-xl font-semibold text-white mb-4">Performans</h3>
                <div class="flex items-center">
                  <div class="w-full bg-gray-700 rounded-full h-4 mr-4">
                    <div
                      class="h-full rounded-full bg-green-500"
                      :style="{ width: `${results.scores.performance}%` }"
                    ></div>
                  </div>
                  <span class="text-white font-medium">{{ results.scores.performance }}%</span>
                </div>
              </div>

              <div class="bg-white/5 rounded-lg p-6">
                <h3 class="text-xl font-semibold text-white mb-4">SEO</h3>
                <div class="flex items-center">
                  <div class="w-full bg-gray-700 rounded-full h-4 mr-4">
                    <div
                      class="h-full rounded-full bg-blue-500"
                      :style="{ width: `${results.scores.seo}%` }"
                    ></div>
                  </div>
                  <span class="text-white font-medium">{{ results.scores.seo }}%</span>
                </div>
              </div>

              <div class="bg-white/5 rounded-lg p-6">
                <h3 class="text-xl font-semibold text-white mb-4">Erişilebilirlik</h3>
                <div class="flex items-center">
                  <div class="w-full bg-gray-700 rounded-full h-4 mr-4">
                    <div
                      class="h-full rounded-full bg-purple-500"
                      :style="{ width: `${results.scores.accessibility}%` }"
                    ></div>
                  </div>
                  <span class="text-white font-medium">{{ results.scores.accessibility }}%</span>
                </div>
              </div>

              <div class="bg-white/5 rounded-lg p-6">
                <h3 class="text-xl font-semibold text-white mb-4">En İyi Uygulamalar</h3>
                <div class="flex items-center">
                  <div class="w-full bg-gray-700 rounded-full h-4 mr-4">
                    <div
                      class="h-full rounded-full bg-yellow-500"
                      :style="{ width: `${results.scores.best_practices}%` }"
                    ></div>
                  </div>
                  <span class="text-white font-medium">{{ results.scores.best_practices }}%</span>
                </div>
              </div>
            </div>

            <div class="mt-8">
              <h3 class="text-xl font-semibold text-white mb-4">Öneriler</h3>
              <div class="space-y-4">
                <div
                  v-for="(suggestion, index) in results.suggestions"
                  :key="index"
                  class="bg-white/5 rounded-lg p-6"
                >
                  <h4 class="text-lg font-medium text-white mb-2">{{ suggestion.title }}</h4>
                  <p class="text-gray-300">{{ suggestion.description }}</p>
                </div>
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
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  @apply bg-white rounded-xl shadow-lg p-8;
}

button {
  @apply transition-all duration-300;
}

button:hover {
  @apply transform scale-[1.02];
}
</style> 