<script setup lang="ts">
import { ref } from 'vue'

interface Color {
  hex: string
  name: string
}

const baseColors = ref<Color[]>([
  { hex: '#FF6B6B', name: 'Mercan' },
  { hex: '#4ECDC4', name: 'Turkuaz' },
  { hex: '#45B7D1', name: 'Okyanus' },
  { hex: '#96CEB4', name: 'Nane' },
  { hex: '#FFEEAD', name: 'Kum' }
])

const selectedColors = ref<Color[]>([])
const customColor = ref('#000000')

const addColor = (color: Color) => {
  if (selectedColors.value.length < 5) {
    selectedColors.value.push({ ...color })
  }
}

const removeColor = (index: number) => {
  selectedColors.value.splice(index, 1)
}

const addCustomColor = () => {
  if (selectedColors.value.length < 5) {
    selectedColors.value.push({
      hex: customColor.value,
      name: 'Özel Renk'
    })
  }
}

const generateRandomPalette = () => {
  selectedColors.value = []
  const shuffled = [...baseColors.value].sort(() => 0.5 - Math.random())
  selectedColors.value = shuffled.slice(0, 3)
}

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
}
</script>

<template>
  <div class="max-w-4xl mx-auto mt-8 p-6 bg-white/5 backdrop-blur-lg rounded-xl">
    <h2 class="text-2xl font-bold text-white mb-6">Renk Paleti Oluşturucu</h2>

    <!-- Renk Seçimi -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <!-- Hazır Renkler -->
      <div>
        <h3 class="text-lg font-semibold text-white mb-4">Hazır Renkler</h3>
        <div class="grid grid-cols-2 gap-4">
          <button
            v-for="color in baseColors"
            :key="color.hex"
            @click="addColor(color)"
            class="p-4 rounded-lg text-center transition-transform hover:scale-105"
            :style="{ backgroundColor: color.hex }"
          >
            <span class="font-medium" :class="{'text-white': true}">
              {{ color.name }}
            </span>
          </button>
        </div>
      </div>

      <!-- Özel Renk -->
      <div>
        <h3 class="text-lg font-semibold text-white mb-4">Özel Renk Ekle</h3>
        <div class="flex gap-4 mb-4">
          <input
            v-model="customColor"
            type="color"
            class="w-16 h-16 rounded cursor-pointer"
          />
          <button
            @click="addCustomColor"
            class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            :disabled="selectedColors.length >= 5"
          >
            Ekle
          </button>
        </div>
        <button
          @click="generateRandomPalette"
          class="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Rastgele Palet Oluştur
        </button>
      </div>
    </div>

    <!-- Seçilen Renkler -->
    <div v-if="selectedColors.length > 0" class="space-y-6">
      <h3 class="text-lg font-semibold text-white">Seçilen Renkler</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div
          v-for="(color, index) in selectedColors"
          :key="index"
          class="relative group"
        >
          <div
            class="h-32 rounded-lg transition-transform group-hover:scale-105"
            :style="{ backgroundColor: color.hex }"
          >
            <div class="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-lg">
              <button
                @click="() => copyToClipboard(color.hex)"
                class="px-3 py-1 bg-white text-gray-900 rounded mb-2 text-sm hover:bg-gray-100"
              >
                {{ color.hex }}
              </button>
              <button
                @click="() => removeColor(index)"
                class="text-white hover:text-red-400"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Boş Durum -->
    <div
      v-else
      class="text-center py-12 text-gray-400"
    >
      <i class="fas fa-palette text-6xl mb-4"></i>
      <p>Renk seçimi yapın veya rastgele palet oluşturun</p>
    </div>
  </div>
</template>

<style scoped>
input[type="color"] {
  -webkit-appearance: none;
  border: none;
  padding: 0;
}

input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}

input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: 0.5rem;
}
</style> 