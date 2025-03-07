<script setup lang="ts">
import { ref, computed } from 'vue'

const questions = [
  {
    id: 1,
    question: 'SEO\'nun açılımı nedir?',
    options: [
      'Search Engine Optimization',
      'Search Engine Organization',
      'Search Engine Order',
      'Search Engine Output'
    ],
    correctAnswer: 0
  },
  {
    id: 2,
    question: 'Hangisi bir on-page SEO faktörü değildir?',
    options: [
      'Title etiketi',
      'Meta açıklaması',
      'Backlink sayısı',
      'URL yapısı'
    ],
    correctAnswer: 2
  },
  {
    id: 3,
    question: 'Google\'ın en önemli sıralama faktörlerinden biri nedir?',
    options: [
      'Site hızı',
      'Sosyal medya paylaşımları',
      'Site yaşı',
      'Backlink kalitesi'
    ],
    correctAnswer: 3
  },
  {
    id: 4,
    question: 'Hangisi bir black-hat SEO tekniğidir?',
    options: [
      'İçerik optimizasyonu',
      'Gizli metin kullanımı',
      'İç linkleme',
      'Alt etiketleri optimizasyonu'
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    question: 'robots.txt dosyası ne işe yarar?',
    options: [
      'Site haritası oluşturur',
      'Sitenin hızını artırır',
      'Arama motorlarına hangi sayfaların taranacağını söyler',
      'Ziyaretçi istatistiklerini tutar'
    ],
    correctAnswer: 2
  }
]

const currentQuestionIndex = ref(0)
const userAnswers = ref<number[]>([])
const quizStarted = ref(false)
const quizFinished = ref(false)

const currentQuestion = computed(() => questions[currentQuestionIndex.value])

const score = computed(() => {
  return userAnswers.value.reduce((acc, answer, index) => {
    return acc + (answer === questions[index].correctAnswer ? 1 : 0)
  }, 0)
})

const startQuiz = () => {
  quizStarted.value = true
  userAnswers.value = []
  currentQuestionIndex.value = 0
  quizFinished.value = false
}

const submitAnswer = (answerIndex: number) => {
  userAnswers.value.push(answerIndex)
  
  if (currentQuestionIndex.value < questions.length - 1) {
    currentQuestionIndex.value++
  } else {
    quizFinished.value = true
  }
}

const getScoreMessage = computed(() => {
  const percentage = (score.value / questions.length) * 100
  if (percentage === 100) return 'Mükemmel! SEO konusunda uzmansınız!'
  if (percentage >= 80) return 'Çok iyi! SEO bilginiz oldukça yüksek.'
  if (percentage >= 60) return 'İyi! Temel SEO bilginiz var.'
  return 'SEO bilginizi geliştirmeye devam edin.'
})
</script>

<template>
  <div class="max-w-4xl mx-auto mt-8 p-6 bg-white/5 backdrop-blur-lg rounded-xl">
    <h2 class="text-2xl font-bold text-white mb-6">SEO Quiz</h2>

    <!-- Quiz Başlangıç -->
    <div v-if="!quizStarted && !quizFinished" class="text-center space-y-6">
      <p class="text-gray-300">
        SEO bilginizi test etmeye hazır mısınız?
        <br />
        5 soru ile SEO konusundaki bilgi seviyenizi ölçün.
      </p>

      <button
        @click="startQuiz"
        class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Quize Başla
      </button>
    </div>

    <!-- Sorular -->
    <div v-else-if="quizStarted && !quizFinished" class="space-y-8">
      <div class="flex items-center justify-between text-white mb-4">
        <span>Soru {{ currentQuestionIndex + 1 }}/{{ questions.length }}</span>
        <span>Kalan: {{ questions.length - currentQuestionIndex }}</span>
      </div>

      <div class="bg-white/10 p-6 rounded-xl">
        <h3 class="text-xl text-white mb-6">{{ currentQuestion.question }}</h3>
        
        <div class="space-y-4">
          <button
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            @click="submitAnswer(index)"
            class="w-full p-4 text-left rounded-lg transition-all duration-300"
            :class="{
              'bg-white/5 hover:bg-white/10 text-white': true,
              'transform hover:scale-[1.02]': true
            }"
          >
            {{ option }}
          </button>
        </div>
      </div>
    </div>

    <!-- Sonuçlar -->
    <div v-else class="text-center space-y-8">
      <div class="bg-white/10 p-8 rounded-xl">
        <h3 class="text-2xl font-bold text-white mb-4">
          Quiz Tamamlandı!
        </h3>
        <p class="text-4xl font-bold text-blue-400 mb-4">
          {{ score }}/{{ questions.length }}
        </p>
        <p class="text-gray-300">
          {{ getScoreMessage }}
        </p>
      </div>

      <button
        @click="startQuiz"
        class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Tekrar Dene
      </button>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 