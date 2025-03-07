<script setup lang="ts">
import { ref, computed } from 'vue'
import html2canvas from 'html2canvas'

const logoText = ref('')
const fontSize = ref(48)
const fontFamily = ref('Inter')
const fontWeight = ref(700)
const textColor = ref('#ffffff')
const backgroundColor = ref('#3b82f6')
const padding = ref(40)
const borderRadius = ref(16)
const rotation = ref(0)
const selectedIcon = ref('')
const iconSize = ref(48)
const iconPosition = ref('left') // left, top, right, bottom
const iconColor = ref('#ffffff')
const shadowColor = ref('rgba(0,0,0,0.25)')
const shadowBlur = ref(10)
const shadowOffsetX = ref(0)
const shadowOffsetY = ref(4)
const gradientStart = ref('#3b82f6')
const gradientEnd = ref('#1d4ed8')
const useGradient = ref(false)
const shape = ref('rectangle') // rectangle, circle, shield, hexagon

const fontFamilies = [
  'Inter',
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Georgia',
  'Verdana',
  'Roboto',
  'Montserrat'
]

const icons = [
  { name: 'Yok', value: '' },
  { name: 'Dünya', value: 'fas fa-globe' },
  { name: 'Yıldız', value: 'fas fa-star' },
  { name: 'Kalp', value: 'fas fa-heart' },
  { name: 'Elmas', value: 'fas fa-gem' },
  { name: 'Ağaç', value: 'fas fa-tree' },
  { name: 'Güneş', value: 'fas fa-sun' },
  { name: 'Ay', value: 'fas fa-moon' },
  { name: 'Bulut', value: 'fas fa-cloud' },
  { name: 'Şimşek', value: 'fas fa-bolt' },
  { name: 'Dağ', value: 'fas fa-mountain' },
  { name: 'Bina', value: 'fas fa-building' }
]

const shapes = [
  { name: 'Dikdörtgen', value: 'rectangle' },
  { name: 'Daire', value: 'circle' },
  { name: 'Kalkan', value: 'shield' },
  { name: 'Altıgen', value: 'hexagon' }
]

const logoStyle = computed(() => {
  const style: any = {
    fontSize: `${fontSize.value}px`,
    fontFamily: fontFamily.value,
    fontWeight: fontWeight.value,
    color: textColor.value,
    padding: `${padding.value}px`,
    transform: `rotate(${rotation.value}deg)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    position: 'relative',
    boxShadow: `${shadowOffsetX.value}px ${shadowOffsetY.value}px ${shadowBlur.value}px ${shadowColor.value}`
  }

  if (useGradient.value) {
    style.background = `linear-gradient(135deg, ${gradientStart.value}, ${gradientEnd.value})`
  } else {
    style.backgroundColor = backgroundColor.value
  }

  switch (shape.value) {
    case 'circle':
      style.borderRadius = '50%'
      style.width = '300px'
      style.height = '300px'
      break
    case 'shield':
      style.clipPath = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
      break
    case 'hexagon':
      style.clipPath = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
      break
    default:
      style.borderRadius = `${borderRadius.value}px`
  }

  return style
})

const iconContainerStyle = computed(() => {
  const style: any = {
    fontSize: `${iconSize.value}px`,
    color: iconColor.value,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  return style
})

const downloadLogo = async () => {
  const logo = document.getElementById('logo')
  if (logo) {
    const canvas = await html2canvas(logo)
    const link = document.createElement('a')
    link.download = 'logo.png'
    link.href = canvas.toDataURL()
    link.click()
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 py-16">
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-white mb-8">Logo Oluşturucu</h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Önizleme -->
          <div class="bg-white/5 backdrop-blur-lg rounded-xl p-8">
            <h3 class="text-xl font-semibold text-white mb-6">Önizleme</h3>
            <div class="flex items-center justify-center min-h-[400px] bg-gray-800/50 rounded-lg">
              <div id="logo" :style="logoStyle">
                <i v-if="selectedIcon && iconPosition !== 'right'" :class="[selectedIcon, 'icon']" :style="iconContainerStyle"></i>
                <span>{{ logoText || 'Logo Metni' }}</span>
                <i v-if="selectedIcon && iconPosition === 'right'" :class="[selectedIcon, 'icon']" :style="iconContainerStyle"></i>
              </div>
            </div>
            <div class="mt-6 flex justify-center">
              <button
                @click="downloadLogo"
                class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                PNG Olarak İndir
              </button>
            </div>
          </div>

          <!-- Ayarlar -->
          <div class="bg-white/5 backdrop-blur-lg rounded-xl p-8">
            <h3 class="text-xl font-semibold text-white mb-6">Özelleştir</h3>
            
            <div class="space-y-6">
              <!-- Metin -->
              <div>
                <label class="block text-white mb-2">Logo Metni</label>
                <input
                  v-model="logoText"
                  type="text"
                  class="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:border-blue-500"
                  placeholder="Logo metninizi girin"
                />
              </div>

              <!-- Font Ailesi -->
              <div>
                <label class="block text-white mb-2">Font</label>
                <select
                  v-model="fontFamily"
                  class="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:border-blue-500"
                >
                  <option v-for="font in fontFamilies" :key="font" :value="font">{{ font }}</option>
                </select>
              </div>

              <!-- Font Boyutu -->
              <div>
                <label class="block text-white mb-2">Font Boyutu: {{ fontSize }}px</label>
                <input
                  v-model="fontSize"
                  type="range"
                  min="12"
                  max="120"
                  class="w-full"
                />
              </div>

              <!-- Şekil -->
              <div>
                <label class="block text-white mb-2">Şekil</label>
                <select
                  v-model="shape"
                  class="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:border-blue-500"
                >
                  <option v-for="s in shapes" :key="s.value" :value="s.value">{{ s.name }}</option>
                </select>
              </div>

              <!-- İkon -->
              <div>
                <label class="block text-white mb-2">İkon</label>
                <select
                  v-model="selectedIcon"
                  class="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:border-blue-500"
                >
                  <option v-for="icon in icons" :key="icon.value" :value="icon.value">{{ icon.name }}</option>
                </select>
              </div>

              <!-- İkon Pozisyonu -->
              <div v-if="selectedIcon">
                <label class="block text-white mb-2">İkon Pozisyonu</label>
                <select
                  v-model="iconPosition"
                  class="w-full px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:border-blue-500"
                >
                  <option value="left">Sol</option>
                  <option value="right">Sağ</option>
                </select>
              </div>

              <!-- Renkler -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-white mb-2">Metin Rengi</label>
                  <input
                    v-model="textColor"
                    type="color"
                    class="w-full h-10 rounded-lg cursor-pointer"
                  />
                </div>
                <div>
                  <label class="block text-white mb-2">Arka Plan</label>
                  <input
                    v-model="backgroundColor"
                    type="color"
                    class="w-full h-10 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              <!-- Gradient -->
              <div>
                <label class="flex items-center text-white mb-2">
                  <input
                    v-model="useGradient"
                    type="checkbox"
                    class="mr-2"
                  />
                  Gradient Kullan
                </label>
                
                <div v-if="useGradient" class="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <label class="block text-white mb-2">Başlangıç</label>
                    <input
                      v-model="gradientStart"
                      type="color"
                      class="w-full h-10 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div>
                    <label class="block text-white mb-2">Bitiş</label>
                    <input
                      v-model="gradientEnd"
                      type="color"
                      class="w-full h-10 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <!-- Gölge -->
              <div>
                <label class="block text-white mb-2">Gölge Bulanıklığı: {{ shadowBlur }}px</label>
                <input
                  v-model="shadowBlur"
                  type="range"
                  min="0"
                  max="50"
                  class="w-full"
                />
              </div>

              <!-- Döndürme -->
              <div>
                <label class="block text-white mb-2">Döndürme: {{ rotation }}°</label>
                <input
                  v-model="rotation"
                  type="range"
                  min="-180"
                  max="180"
                  class="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type="range"] {
  @apply bg-white/10 rounded-lg;
}

input[type="range"]::-webkit-slider-thumb {
  @apply bg-blue-500;
}

.icon {
  transition: all 0.3s ease;
}

#logo:hover .icon {
  transform: scale(1.1);
}
</style> 