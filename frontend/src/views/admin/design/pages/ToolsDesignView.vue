<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <div class="mb-8">
      <h2 class="text-xl font-semibold text-gray-800">Araçlar Sayfası Tasarımı</h2>
      <p class="text-gray-600">Araçlar sayfasının tasarımını ve içeriğini buradan yönetebilirsiniz.</p>
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
            placeholder="Araçlarımız"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Alt Başlık</label>
          <textarea
            v-model="header.subtitle"
            rows="2"
            class="w-full border rounded-lg px-3 py-2"
            placeholder="Araçlarımız hakkında kısa açıklama"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Araçlar Listesi -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium">Araçlar</h3>
        <button
          @click="addTool"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <i class="fas fa-plus mr-2"></i>
          Araç Ekle
        </button>
      </div>

      <div class="space-y-6">
        <div
          v-for="(tool, index) in tools"
          :key="index"
          class="border rounded-lg p-4"
        >
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-md font-medium">Araç #{{ index + 1 }}</h4>
            <button
              @click="removeTool(index)"
              class="text-red-600 hover:text-red-700"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Araç Adı</label>
              <input
                v-model="tool.name"
                type="text"
                class="w-full border rounded-lg px-3 py-2"
                placeholder="Araç adı"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
              <textarea
                v-model="tool.description"
                rows="3"
                class="w-full border rounded-lg px-3 py-2"
                placeholder="Araç açıklaması"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">İkon</label>
              <div class="flex items-center space-x-4">
                <input
                  v-model="tool.icon"
                  type="text"
                  class="flex-1 border rounded-lg px-3 py-2"
                  placeholder="fa-solid fa-calculator"
                >
                <i :class="tool.icon" class="text-xl"></i>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Bağlantı</label>
              <input
                v-model="tool.link"
                type="text"
                class="w-full border rounded-lg px-3 py-2"
                placeholder="/araclar/hesaplama"
              >
            </div>

            <!-- Özellikler -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Özellikler</label>
              <div class="space-y-2">
                <div
                  v-for="(feature, featureIndex) in tool.features"
                  :key="featureIndex"
                  class="flex items-center space-x-2"
                >
                  <input
                    v-model="tool.features[featureIndex]"
                    type="text"
                    class="flex-1 border rounded-lg px-3 py-2"
                    placeholder="Özellik"
                  >
                  <button
                    @click="removeFeature(tool, featureIndex)"
                    class="text-red-600 hover:text-red-700"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
              <button
                @click="addFeature(tool)"
                class="mt-2 text-blue-600 hover:text-blue-700 text-sm"
              >
                <i class="fas fa-plus mr-1"></i>
                Özellik Ekle
              </button>
            </div>

            <!-- Ekran Görüntüsü -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Ekran Görüntüsü</label>
              <div class="flex items-center space-x-4">
                <input
                  type="file"
                  @change="handleScreenshotUpload($event, tool)"
                  accept="image/*"
                  class="hidden"
                  :id="'screenshot-' + index"
                >
                <label
                  :for="'screenshot-' + index"
                  class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer"
                >
                  <i class="fas fa-upload mr-2"></i>
                  Görsel Yükle
                </label>
                <img
                  v-if="tool.screenshot"
                  :src="tool.screenshot"
                  alt="Ekran görüntüsü"
                  class="h-20 rounded-lg"
                >
              </div>
            </div>
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
  title: 'Araçlarımız',
  subtitle: 'İşinizi kolaylaştıracak hesaplama ve analiz araçları.'
})

// Araçlar
const tools = ref([
  {
    name: 'Maliyet Hesaplama',
    description: 'Detaylı maliyet analizi ve hesaplama aracı',
    icon: 'fa-solid fa-calculator',
    link: '/araclar/maliyet-hesaplama',
    features: [
      'Detaylı maliyet analizi',
      'Otomatik hesaplama',
      'Rapor oluşturma'
    ],
    screenshot: null
  }
])

// Araç ekle/çıkar
const addTool = () => {
  tools.value.push({
    name: '',
    description: '',
    icon: '',
    link: '',
    features: [],
    screenshot: null
  })
}

const removeTool = (index: number) => {
  tools.value.splice(index, 1)
}

// Özellik ekle/çıkar
const addFeature = (tool: any) => {
  tool.features.push('')
}

const removeFeature = (tool: any, index: number) => {
  tool.features.splice(index, 1)
}

// Ekran görüntüsü yükleme
const handleScreenshotUpload = async (event: Event, tool: any) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await designStore.uploadMedia(formData)
      tool.screenshot = response.url
      
      showNotification({
        type: 'success',
        message: 'Görsel başarıyla yüklendi.'
      })
    } catch (error) {
      showNotification({
        type: 'error',
        message: 'Görsel yüklenirken bir hata oluştu.'
      })
    }
  }
}

// Değişiklikleri kaydet
const saveChanges = async () => {
  try {
    await designStore.saveToolsDesign({
      header: header.value,
      tools: tools.value
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