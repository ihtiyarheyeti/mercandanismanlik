<script setup lang="ts">
import { ref, computed } from 'vue'

const words = [
  'SEO',
  'Backlink',
  'Meta Açıklama',
  'İçerik Pazarlama',
  'Anahtar Kelime',
  'Sosyal Medya',
  'Google Analytics',
  'Dönüşüm Oranı',
  'Hedef Kitle',
  'Organik Trafik'
]

const currentWordIndex = ref(0)
const userInput = ref('')
const startTime = ref<number | null>(null)
const endTime = ref<number | null>(null)
const mistakes = ref(0)
const gameStarted = ref(false)

const currentWord = computed(() => words[currentWordIndex.value])

const startGame = () => {
  gameStarted.value = true
  startTime.value = Date.now()
  currentWordIndex.value = 0
  mistakes.value = 0
  userInput.value = ''
}

const checkWord = () => {
  if (userInput.value.trim() === currentWord.value) {
    if (currentWordIndex.value === words.length - 1) {
      endTime.value = Date.now()
      gameStarted.value = false
    } else {
      currentWordIndex.value++
    }
  } else {
    mistakes.value++
  }
  userInput.value = ''
}

const wpm = computed(() => {
  if (!startTime.value || !endTime.value) return 0
  const timeInMinutes = (endTime.value - startTime.value) / 60000
  return Math.round(words.length / timeInMinutes)
})

const accuracy = computed(() => {
  if (!endTime.value) return 100
  return Math.round(((words.length - mistakes.value) / words.length) * 100)
})
</script>

<template>
  <div class="max-w-4xl mx-auto mt-8 p-6 bg-white/5 backdrop-blur-lg rounded-xl">
    <h2 class="text-2xl font-bold text-white mb-6">Hız Testi</h2>

    <!-- Oyun Alanı -->
    <div v-if="gameStarted" class="space-y-8">
      <div class="text-center">
        <p class="text-3xl font-bold text-white mb-4">{{ currentWord }}</p>
        <input
          v-model="userInput"
          @keyup.enter="checkWord"
          type="text"
          class="w-full max-w-md px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-blue-500"
          placeholder="Kelimeyi yazın ve Enter'a basın"
          autocomplete="off"
        />
      </div>

      <div class="grid grid-cols-2 gap-4 text-center">
        <div class="p-4 bg-white/10 rounded-lg">
          <p class="text-gray-400 mb-1">Kalan Kelime</p>
          <p class="text-2xl font-bold text-white">
            {{ words.length - currentWordIndex }}
          </p>
        </div>
        <div class="p-4 bg-white/10 rounded-lg">
          <p class="text-gray-400 mb-1">Hata</p>
          <p class="text-2xl font-bold text-white">{{ mistakes }}</p>
        </div>
      </div>
    </div>

    <!-- Sonuçlar -->
    <div v-else-if="endTime" class="text-center space-y-8">
      <div class="grid grid-cols-2 gap-4">
        <div class="p-6 bg-white/10 rounded-lg">
          <p class="text-gray-400 mb-2">Dakikada Kelime</p>
          <p class="text-4xl font-bold text-white">{{ wpm }}</p>
        </div>
        <div class="p-6 bg-white/10 rounded-lg">
          <p class="text-gray-400 mb-2">Doğruluk</p>
          <p class="text-4xl font-bold text-white">%{{ accuracy }}</p>
        </div>
      </div>

      <button
        @click="startGame"
        class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Tekrar Dene
      </button>
    </div>

    <!-- Başlangıç Ekranı -->
    <div v-else class="text-center space-y-6">
      <p class="text-gray-300">
        Dijital pazarlama terimlerini ne kadar hızlı yazabiliyorsunuz?
        <br />
        Başlamak için butona tıklayın.
      </p>

      <button
        @click="startGame"
        class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Başla
      </button>
    </div>
  </div>
</template> 