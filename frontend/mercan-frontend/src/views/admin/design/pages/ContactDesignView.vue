<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <div class="mb-8">
      <h2 class="text-xl font-semibold text-gray-800">İletişim Sayfası Tasarımı</h2>
      <p class="text-gray-600">İletişim sayfasının tasarımını ve içeriğini buradan yönetebilirsiniz.</p>
    </div>

    <!-- İletişim Bilgileri -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">İletişim Bilgileri</h3>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
          <input
            v-model="contact.title"
            type="text"
            class="w-full border rounded-lg px-3 py-2"
            placeholder="İletişim başlığı"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
          <textarea
            v-model="contact.description"
            rows="3"
            class="w-full border rounded-lg px-3 py-2"
            placeholder="İletişim açıklaması"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Adres</label>
          <textarea
            v-model="contact.address"
            rows="2"
            class="w-full border rounded-lg px-3 py-2"
            placeholder="Şirket adresi"
          ></textarea>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
            <input
              v-model="contact.phone"
              type="text"
              class="w-full border rounded-lg px-3 py-2"
              placeholder="+90 (555) 123 45 67"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
            <input
              v-model="contact.email"
              type="email"
              class="w-full border rounded-lg px-3 py-2"
              placeholder="info@mercandanismanlik.com"
            >
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Çalışma Saatleri</label>
          <input
            v-model="contact.workingHours"
            type="text"
            class="w-full border rounded-lg px-3 py-2"
            placeholder="Pazartesi - Cuma: 09:00 - 18:00"
          >
        </div>
      </div>
    </div>

    <!-- İletişim Formu -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">İletişim Formu</h3>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Form Başlığı</label>
          <input
            v-model="form.title"
            type="text"
            class="w-full border rounded-lg px-3 py-2"
            placeholder="Bize Ulaşın"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Form Açıklaması</label>
          <textarea
            v-model="form.description"
            rows="2"
            class="w-full border rounded-lg px-3 py-2"
            placeholder="Form açıklaması"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Form Alanları</label>
          <div class="space-y-2">
            <div v-for="(field, index) in form.fields" :key="index" class="flex items-center space-x-4">
              <input
                v-model="field.label"
                type="text"
                class="flex-1 border rounded-lg px-3 py-2"
                placeholder="Alan etiketi"
              >
              <select
                v-model="field.type"
                class="border rounded-lg px-3 py-2"
              >
                <option value="text">Metin</option>
                <option value="email">E-posta</option>
                <option value="tel">Telefon</option>
                <option value="textarea">Uzun Metin</option>
              </select>
              <button @click="removeField(index)" class="text-red-600 hover:text-red-700">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
          <button
            @click="addField"
            class="mt-2 text-blue-600 hover:text-blue-700"
          >
            <i class="fas fa-plus mr-1"></i> Alan Ekle
          </button>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Gönder Butonu Metni</label>
          <input
            v-model="form.submitButton"
            type="text"
            class="w-full border rounded-lg px-3 py-2"
            placeholder="Gönder"
          >
        </div>
      </div>
    </div>

    <!-- Harita -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Harita Ayarları</h3>
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Enlem</label>
            <input
              v-model="map.latitude"
              type="text"
              class="w-full border rounded-lg px-3 py-2"
              placeholder="41.0082"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Boylam</label>
            <input
              v-model="map.longitude"
              type="text"
              class="w-full border rounded-lg px-3 py-2"
              placeholder="28.9784"
            >
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Zoom Seviyesi</label>
          <input
            v-model="map.zoom"
            type="number"
            min="1"
            max="20"
            class="w-32 border rounded-lg px-3 py-2"
          >
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

// İletişim bilgileri
const contact = ref({
  title: 'Bize Ulaşın',
  description: 'Sorularınız için bize ulaşabilirsiniz.',
  address: 'İstanbul, Türkiye',
  phone: '+90 (555) 123 45 67',
  email: 'info@mercandanismanlik.com',
  workingHours: 'Pazartesi - Cuma: 09:00 - 18:00'
})

// Form ayarları
const form = ref({
  title: 'İletişim Formu',
  description: 'Size nasıl yardımcı olabiliriz?',
  submitButton: 'Gönder',
  fields: [
    { label: 'Ad Soyad', type: 'text' },
    { label: 'E-posta', type: 'email' },
    { label: 'Telefon', type: 'tel' },
    { label: 'Mesaj', type: 'textarea' }
  ]
})

// Harita ayarları
const map = ref({
  latitude: '41.0082',
  longitude: '28.9784',
  zoom: 15
})

// Form alanı ekle/çıkar
const addField = () => {
  form.value.fields.push({ label: '', type: 'text' })
}

const removeField = (index: number) => {
  form.value.fields.splice(index, 1)
}

// Değişiklikleri kaydet
const saveChanges = async () => {
  try {
    await designStore.saveContactDesign({
      contact: contact.value,
      form: form.value,
      map: map.value
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