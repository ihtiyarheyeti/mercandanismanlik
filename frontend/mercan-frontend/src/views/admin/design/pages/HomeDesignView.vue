<template>
  <div class="space-y-6">
    <!-- Üst Başlık -->
    <div class="flex items-center justify-between bg-white p-6 rounded-lg shadow-sm">
      <div>
        <h2 class="text-xl font-semibold text-gray-800">Ana Sayfa Tasarımı</h2>
        <p class="text-gray-600">Ana sayfanın tasarımını ve içeriğini buradan yönetebilirsiniz.</p>
      </div>
      <div class="space-x-3">
        <button
          @click="saveChanges"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <i class="fas fa-save mr-2"></i>
          Değişiklikleri Kaydet
        </button>
        <button
          @click="previewChanges"
          class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <i class="fas fa-eye mr-2"></i>
          Önizleme
        </button>
      </div>
    </div>

    <!-- Bölümler -->
    <div class="space-y-6">
      <!-- Üst Menü Tasarımı -->
      <div class="bg-white rounded-lg shadow-sm">
        <div class="p-6 border-b">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-800">Üst Menü Tasarımı</h3>
            <div class="flex items-center space-x-2">
              <button
                @click="toggleSection('header')"
                class="text-gray-500 hover:text-gray-700"
              >
                <i :class="['fas', isExpanded.header ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
              </button>
            </div>
          </div>
        </div>
        <div v-show="isExpanded.header" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Logo</label>
            <div class="flex items-center space-x-4">
              <img :src="design.header.logo" alt="Logo" class="h-8" />
              <button
                @click="uploadLogo"
                class="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                Logo Yükle
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Menü Öğeleri</label>
            <div class="space-y-2">
              <div v-for="(item, index) in design.header.menuItems" :key="index" class="flex items-center space-x-4">
                <input v-model="item.text" type="text" class="flex-1 border rounded-lg px-3 py-2" placeholder="Menü başlığı">
                <input v-model="item.link" type="text" class="flex-1 border rounded-lg px-3 py-2" placeholder="Bağlantı">
                <button
                  @click="removeMenuItem(index)"
                  class="text-red-600 hover:text-red-700"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
            <button
              @click="addMenuItem"
              class="mt-2 text-blue-600 hover:text-blue-700"
            >
              <i class="fas fa-plus mr-1"></i> Menü Öğesi Ekle
            </button>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Menü Renkleri</label>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs text-gray-500 mb-1">Arkaplan Rengi</label>
                <input v-model="design.header.colors.background" type="color" class="w-full h-10 rounded-lg">
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Yazı Rengi</label>
                <input v-model="design.header.colors.text" type="color" class="w-full h-10 rounded-lg">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Hero Bölümü -->
      <div class="bg-white rounded-lg shadow-sm">
        <div class="p-6 border-b">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-800">Hero Bölümü</h3>
            <div class="flex items-center space-x-2">
              <button
                @click="toggleSection('hero')"
                class="text-gray-500 hover:text-gray-700"
              >
                <i :class="['fas', isExpanded.hero ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
              </button>
            </div>
          </div>
        </div>
        <div v-show="isExpanded.hero" class="p-6 space-y-4">
          <div class="grid grid-cols-2 gap-6">
            <!-- Sol Kolon -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
                <input
                  v-model="design.hero.title"
                  type="text"
                  class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ana başlık"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Alt Başlık</label>
                <input
                  v-model="design.hero.subtitle"
                  type="text"
                  class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Alt başlık"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                <textarea
                  v-model="design.hero.description"
                  rows="4"
                  class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Bölüm açıklaması"
                ></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Butonlar</label>
                <div class="space-y-2">
                  <div v-for="(button, index) in design.hero.buttons" :key="index" class="grid grid-cols-3 gap-2">
                    <input
                      v-model="button.text"
                      type="text"
                      class="px-3 py-2 border rounded-lg"
                      placeholder="Buton metni"
                    />
                    <input
                      v-model="button.link"
                      type="text"
                      class="px-3 py-2 border rounded-lg"
                      placeholder="Buton linki"
                    />
                    <input
                      v-model="button.color"
                      type="color"
                      class="w-full h-10 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- Sağ Kolon -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Arka Plan Görseli</label>
                <div class="border-2 border-dashed rounded-lg p-4">
                  <div v-if="design.hero.background.image" class="mb-4">
                    <img :src="design.hero.background.image" alt="Hero görsel" class="max-h-48 mx-auto" />
                  </div>
                  <div class="text-center">
                    <button
                      @click="openImagePicker('hero')"
                      class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <i class="fas fa-upload mr-2"></i>
                      Görsel Yükle
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Arka Plan Örtüsü</label>
                <input
                  v-model="design.hero.background.overlay"
                  type="text"
                  class="w-full px-3 py-2 border rounded-lg"
                  placeholder="rgba(0,0,0,0.5)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Özellikler Bölümü -->
      <div class="bg-white rounded-lg shadow-sm">
        <div class="p-6 border-b">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-800">Özellikler Bölümü</h3>
            <div class="flex items-center space-x-2">
              <button
                @click="toggleSection('features')"
                class="text-gray-500 hover:text-gray-700"
              >
                <i class="fas" :class="isExpanded.features ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
              </button>
            </div>
          </div>
        </div>
        <div v-show="isExpanded.features" class="p-6 space-y-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Bölüm Başlığı</label>
              <input
                v-model="design.features.title"
                type="text"
                class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Bölüm Açıklaması</label>
              <textarea
                v-model="design.features.description"
                rows="3"
                class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
          </div>

          <!-- Özellik Kartları -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h4 class="text-md font-medium text-gray-700">Özellik Kartları</h4>
              <button
                @click="addFeatureCard"
                class="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
              >
                <i class="fas fa-plus mr-1"></i>
                Kart Ekle
              </button>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div
                v-for="(card, index) in design.features.cards"
                :key="index"
                class="border rounded-lg p-4"
              >
                <div class="flex justify-end mb-2">
                  <button
                    @click="removeFeatureCard(index)"
                    class="text-red-500 hover:text-red-700"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </div>
                <div class="space-y-3">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">İkon</label>
                    <div class="flex items-center space-x-2">
                      <button
                        @click="openIconPicker(index)"
                        class="px-3 py-2 border rounded-lg hover:bg-gray-50"
                      >
                        <i :class="['fas', card.icon]"></i>
                      </button>
                      <input
                        v-model="card.icon"
                        type="text"
                        class="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="fa-icon-name"
                      />
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
                    <input
                      v-model="card.title"
                      type="text"
                      class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                    <textarea
                      v-model="card.description"
                      rows="3"
                      class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- İstatistikler Bölümü -->
      <div class="bg-white rounded-lg shadow-sm">
        <div class="p-6 border-b">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-800">İstatistikler Bölümü</h3>
            <div class="flex items-center space-x-2">
              <button
                @click="toggleSection('stats')"
                class="text-gray-500 hover:text-gray-700"
              >
                <i class="fas" :class="isExpanded.stats ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
              </button>
            </div>
          </div>
        </div>
        <div v-show="isExpanded.stats" class="p-6 space-y-6">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h4 class="text-md font-medium text-gray-700">İstatistik Kartları</h4>
              <button
                @click="addStatCard"
                class="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
              >
                <i class="fas fa-plus mr-1"></i>
                İstatistik Ekle
              </button>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div
                v-for="(stat, index) in design.stats.items"
                :key="index"
                class="border rounded-lg p-4"
              >
                <div class="flex justify-end mb-2">
                  <button
                    @click="removeStatCard(index)"
                    class="text-red-500 hover:text-red-700"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </div>
                <div class="space-y-3">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Değer</label>
                    <input
                      v-model="stat.value"
                      type="text"
                      class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
                    <input
                      v-model="stat.label"
                      type="text"
                      class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">İkon</label>
                    <div class="flex items-center space-x-2">
                      <button
                        @click="openIconPicker(index, 'stats')"
                        class="px-3 py-2 border rounded-lg hover:bg-gray-50"
                      >
                        <i :class="['fas', stat.icon]"></i>
                      </button>
                      <input
                        v-model="stat.icon"
                        type="text"
                        class="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="fa-icon-name"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDesignStore } from '@/stores/design'
import { useNotification } from '@/composables/useNotification'

interface MenuItem {
  text: string
  link: string
}

interface Button {
  text: string
  link: string
  color: string
}

interface HeaderDesign {
  logo: string
  menuItems: MenuItem[]
  colors: {
    background: string
    text: string
  }
}

interface HeroDesign {
  title: string
  subtitle: string
  description: string
  background: {
    image: string
    overlay: string
  }
  buttons: Button[]
}

interface FeatureCard {
  icon: string
  title: string
  description: string
}

interface StatItem {
  value: string
  label: string
  icon: string
}

interface HomeDesign {
  header: HeaderDesign
  hero: HeroDesign
  features: {
    title: string
    description: string
    cards: FeatureCard[]
  }
  stats: {
    items: StatItem[]
  }
}

const designStore = useDesignStore()
const { showNotification } = useNotification()

const design = ref<HomeDesign>({
  header: {
    logo: '',
    menuItems: [],
    colors: {
      background: '#ffffff',
      text: '#000000'
    }
  },
  hero: {
    title: '',
    subtitle: '',
    description: '',
    background: {
      image: '',
      overlay: 'rgba(0,0,0,0.5)'
    },
    buttons: []
  },
  features: {
    title: 'Neden Biz?',
    description: 'Size özel çözümler sunan profesyonel ekibimizle yanınızdayız.',
    cards: [
      {
        icon: 'fa-chart-line',
        title: 'Stratejik Planlama',
        description: 'İşletmeniz için en uygun stratejileri belirleyerek büyümenizi hızlandırıyoruz.'
      },
      {
        icon: 'fa-users',
        title: 'Uzman Ekip',
        description: 'Alanında uzman danışmanlarımızla size en iyi hizmeti sunuyoruz.'
      },
      {
        icon: 'fa-lightbulb',
        title: 'Yenilikçi Çözümler',
        description: 'Modern iş dünyasının gereksinimlerine uygun yenilikçi çözümler üretiyoruz.'
      }
    ]
  },
  stats: {
    items: [
      {
        value: '500+',
        label: 'Mutlu Müşteri',
        icon: 'fa-smile'
      },
      {
        value: '10+',
        label: 'Yıllık Tecrübe',
        icon: 'fa-clock'
      },
      {
        value: '50+',
        label: 'Uzman Danışman',
        icon: 'fa-user-tie'
      },
      {
        value: '1000+',
        label: 'Tamamlanan Proje',
        icon: 'fa-check-circle'
      }
    ]
  }
})

const isExpanded = ref({
  header: true,
  hero: true,
  features: true,
  stats: true
})

const toggleSection = (section: keyof typeof isExpanded.value) => {
  isExpanded.value[section] = !isExpanded.value[section]
}

const addMenuItem = () => {
  design.value.header.menuItems.push({
    text: '',
    link: ''
  })
}

const removeMenuItem = (index: number) => {
  design.value.header.menuItems.splice(index, 1)
}

const addFeatureCard = () => {
  design.value.features.cards.push({
    icon: 'fa-star',
    title: 'Yeni Özellik',
    description: 'Özellik açıklaması'
  })
}

const removeFeatureCard = (index: number) => {
  design.value.features.cards.splice(index, 1)
}

const addStatCard = () => {
  design.value.stats.items.push({
    value: '0',
    label: 'Yeni İstatistik',
    icon: 'fa-star'
  })
}

const removeStatCard = (index: number) => {
  design.value.stats.items.splice(index, 1)
}

const uploadLogo = async () => {
  // Logo yükleme işlemi
}

const uploadHeroBackground = async () => {
  // Hero arkaplan görseli yükleme işlemi
}

const openImagePicker = async (section: string) => {
  // Görsel seçici açma işlemi
}

const openIconPicker = (index: number, type: string = 'features') => {
  // İkon seçici modalını aç
  console.log('İkon seçici açıldı:', { index, type })
}

const saveChanges = async () => {
  try {
    await designStore.saveHomeDesign(design.value)
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

const previewChanges = () => {
  window.open('/', '_blank')
}

onMounted(async () => {
  try {
    const savedDesign = await designStore.fetchHomeDesign()
    if (savedDesign) {
      design.value = savedDesign
    }
  } catch (error) {
    showNotification({
      type: 'error',
      message: 'Tasarım verileri yüklenirken bir hata oluştu.'
    })
  }
})
</script>

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