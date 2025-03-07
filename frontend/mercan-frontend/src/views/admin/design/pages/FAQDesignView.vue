<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <div class="mb-8">
      <h2 class="text-xl font-semibold text-gray-800">SSS Sayfası Tasarımı</h2>
      <p class="text-gray-600">Sıkça Sorulan Sorular sayfasının tasarımını ve içeriğini buradan yönetebilirsiniz.</p>
    </div>

    <!-- Sayfa Başlığı -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Sayfa Başlığı</h3>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Ana Başlık</label>
          <input
            v-model="header.title"
            type="text"
            class="w-full border rounded-lg px-3 py-2"
            placeholder="Sıkça Sorulan Sorular"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Alt Başlık</label>
          <textarea
            v-model="header.subtitle"
            rows="2"
            class="w-full border rounded-lg px-3 py-2"
            placeholder="SSS sayfası hakkında kısa açıklama"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Kategoriler -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium">Kategoriler</h3>
        <button
          @click="addCategory"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <i class="fas fa-plus mr-2"></i>
          Kategori Ekle
        </button>
      </div>

      <div class="space-y-6">
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="border rounded-lg p-4"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="flex-1 mr-4">
              <input
                v-model="category.name"
                type="text"
                class="w-full border rounded-lg px-3 py-2"
                placeholder="Kategori adı"
              >
            </div>
            <button
              @click="removeCategory(index)"
              class="text-red-600 hover:text-red-700"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>

          <!-- Sorular -->
          <div class="space-y-4">
            <div
              v-for="(question, questionIndex) in category.questions"
              :key="questionIndex"
              class="border rounded-lg p-4"
            >
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-sm font-medium">Soru #{{ questionIndex + 1 }}</h4>
                <button
                  @click="removeQuestion(category, questionIndex)"
                  class="text-red-600 hover:text-red-700"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Soru</label>
                  <input
                    v-model="question.question"
                    type="text"
                    class="w-full border rounded-lg px-3 py-2"
                    placeholder="Soru metni"
                  >
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Cevap</label>
                  <textarea
                    v-model="question.answer"
                    rows="3"
                    class="w-full border rounded-lg px-3 py-2"
                    placeholder="Cevap metni"
                  ></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Sıralama</label>
                  <input
                    v-model.number="question.order"
                    type="number"
                    min="1"
                    class="w-24 border rounded-lg px-3 py-2"
                  >
                </div>
              </div>
            </div>

            <button
              @click="addQuestion(category)"
              class="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors"
            >
              <i class="fas fa-plus mr-2"></i>
              Yeni Soru Ekle
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Kaydet Butonu -->
    <div class="flex justify-end">
      <button
        @click="saveChanges"
        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <i class="fas fa-save mr-2"></i>
        Değişiklikleri Kaydet
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDesignStore } from '@/stores/design'
import { useNotification } from '@/composables/useNotification'

const designStore = useDesignStore()
const { showNotification } = useNotification()

// Sayfa başlığı
const header = ref({
  title: 'Sıkça Sorulan Sorular',
  subtitle: 'Sık sorulan sorular ve cevapları burada bulabilirsiniz.'
})

// Kategoriler ve sorular
const categories = ref([
  {
    name: 'Genel Sorular',
    questions: [
      {
        question: 'Hizmetleriniz hakkında nasıl bilgi alabilirim?',
        answer: 'İletişim sayfamızdan bize ulaşabilir veya doğrudan arayabilirsiniz.',
        order: 1
      }
    ]
  }
])

// Kategori ekle/çıkar
const addCategory = () => {
  categories.value.push({
    name: '',
    questions: []
  })
}

const removeCategory = (index: number) => {
  categories.value.splice(index, 1)
}

// Soru ekle/çıkar
const addQuestion = (category: any) => {
  const maxOrder = Math.max(0, ...category.questions.map((q: any) => q.order))
  category.questions.push({
    question: '',
    answer: '',
    order: maxOrder + 1
  })
}

const removeQuestion = (category: any, index: number) => {
  category.questions.splice(index, 1)
}

// Değişiklikleri kaydet
const saveChanges = async () => {
  try {
    await designStore.saveFAQDesign({
      header: header.value,
      categories: categories.value
    })
    
    showNotification({
      type: 'success',
      message: 'Değişiklikler başarıyla kaydedildi.'
    })
  } catch (error) {
    showNotification({
      type: 'error',
      message: 'Değişiklikler kaydedilirken bir hata oluştu.'
    })
  }
}
</script> 