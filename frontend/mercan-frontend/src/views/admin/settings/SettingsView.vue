<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold mb-6">Site Ayarları</h2>

    <!-- Logo ve Favicon -->
    <div class="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 class="text-lg font-semibold mb-4">Logo ve Favicon</h3>
      
      <!-- Logo -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Site Logo
        </label>
        <div class="flex items-center space-x-4">
          <img
            v-if="logo"
            :src="logo"
            alt="Site Logo"
            class="h-12 w-auto"
          />
          <input
            type="file"
            @change="handleLogoUpload"
            accept="image/*"
            class="hidden"
            ref="logoInput"
          />
          <button
            @click="$refs.logoInput.click()"
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Logo Seç
          </button>
        </div>
      </div>

      <!-- Favicon -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Favicon
        </label>
        <div class="flex items-center space-x-4">
          <img
            v-if="favicon"
            :src="favicon"
            alt="Favicon"
            class="h-8 w-8"
          />
          <input
            type="file"
            @change="handleFaviconUpload"
            accept="image/x-icon,image/png"
            class="hidden"
            ref="faviconInput"
          />
          <button
            @click="$refs.faviconInput.click()"
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Favicon Seç
          </button>
        </div>
      </div>
    </div>

    <!-- Genel Bilgiler -->
    <div class="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 class="text-lg font-semibold mb-4">Genel Bilgiler</h3>
      
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Site Başlığı
        </label>
        <input
          v-model="siteTitle"
          type="text"
          class="input w-full"
          placeholder="Site başlığını girin"
        />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Site Açıklaması
        </label>
        <textarea
          v-model="siteDescription"
          rows="3"
          class="input w-full"
          placeholder="Site açıklamasını girin"
        ></textarea>
      </div>
    </div>

    <!-- İletişim Bilgileri -->
    <div class="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 class="text-lg font-semibold mb-4">İletişim Bilgileri</h3>
      
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          E-posta Adresi
        </label>
        <input
          v-model="contactEmail"
          type="email"
          class="input w-full"
          placeholder="E-posta adresini girin"
        />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Telefon Numarası
        </label>
        <input
          v-model="phoneNumber"
          type="text"
          class="input w-full"
          placeholder="Telefon numarasını girin"
        />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Adres
        </label>
        <textarea
          v-model="address"
          rows="3"
          class="input w-full"
          placeholder="Adres bilgisini girin"
        ></textarea>
      </div>
    </div>

    <!-- Çalışma Saatleri -->
    <div class="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 class="text-lg font-semibold mb-4">Çalışma Saatleri</h3>
      
      <!-- Hafta İçi -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Hafta İçi Çalışma Saatleri
        </label>
        <input
          v-model="workingHoursWeekday"
          type="text"
          placeholder="Örn: 09:00 - 18:00"
          class="input w-full"
        />
      </div>

      <!-- Cumartesi -->
      <div class="mb-4">
        <div class="flex items-center justify-between">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Cumartesi Çalışma Saatleri
          </label>
          <div class="flex items-center">
            <input
              v-model="isOpenSaturday"
              type="checkbox"
              class="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            />
            <span class="ml-2 text-sm text-gray-600">Açık</span>
          </div>
        </div>
        <input
          v-model="workingHoursSaturday"
          type="text"
          placeholder="Örn: 09:00 - 14:00"
          class="input w-full"
          :disabled="!isOpenSaturday"
        />
      </div>

      <!-- Pazar -->
      <div class="mb-4">
        <div class="flex items-center justify-between">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Pazar Çalışma Saatleri
          </label>
          <div class="flex items-center">
            <input
              v-model="isOpenSunday"
              type="checkbox"
              class="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            />
            <span class="ml-2 text-sm text-gray-600">Açık</span>
          </div>
        </div>
        <input
          v-model="workingHoursSunday"
          type="text"
          placeholder="Örn: Kapalı"
          class="input w-full"
          :disabled="!isOpenSunday"
        />
      </div>
    </div>

    <!-- Kaydet Butonu -->
    <div class="flex justify-end">
      <button
        @click="saveSettings"
        :disabled="loading"
        class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
      >
        <span v-if="loading">Kaydediliyor...</span>
        <span v-else>Ayarları Kaydet</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import api from '@/services/api'

const logo = ref(null)
const favicon = ref(null)
const siteTitle = ref('')
const siteDescription = ref('')
const contactEmail = ref('')
const phoneNumber = ref('')
const address = ref('')
const workingHoursWeekday = ref('')
const workingHoursSaturday = ref('')
const workingHoursSunday = ref('')
const isOpenSaturday = ref(true)
const isOpenSunday = ref(false)
const loading = ref(false)

const toast = useToast()

const fetchSettings = async () => {
  loading.value = true
  try {
    const response = await api.get('/settings')
    if (response.data) {
      logo.value = response.data.logo
      favicon.value = response.data.favicon
      siteTitle.value = response.data.site_title || ''
      siteDescription.value = response.data.site_description || ''
      contactEmail.value = response.data.contact_email || ''
      phoneNumber.value = response.data.phone_number || ''
      address.value = response.data.address || ''
      workingHoursWeekday.value = response.data.working_hours_weekday || ''
      workingHoursSaturday.value = response.data.working_hours_saturday || ''
      workingHoursSunday.value = response.data.working_hours_sunday || ''
      isOpenSaturday.value = response.data.is_open_saturday ?? true
      isOpenSunday.value = response.data.is_open_sunday ?? false
    }
  } catch (error) {
    console.error('Ayarlar yüklenirken hata:', error)
    toast.error('Ayarlar yüklenirken bir hata oluştu')
  } finally {
    loading.value = false
  }
}

const handleLogoUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const formData = new FormData()
  formData.append('logo', file)

  try {
    loading.value = true
    const response = await api.post('/settings/logo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    logo.value = response.data.logo
    toast.success('Logo başarıyla güncellendi')
  } catch (error) {
    console.error('Logo yüklenirken hata:', error)
    toast.error('Logo yüklenirken bir hata oluştu')
  } finally {
    loading.value = false
  }
}

const handleFaviconUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const formData = new FormData()
  formData.append('favicon', file)

  try {
    loading.value = true
    const response = await api.post('/settings/favicon', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    favicon.value = response.data.favicon
    toast.success('Favicon başarıyla güncellendi')
  } catch (error) {
    console.error('Favicon yüklenirken hata:', error)
    toast.error('Favicon yüklenirken bir hata oluştu')
  } finally {
    loading.value = false
  }
}

const saveSettings = async () => {
  loading.value = true
  try {
    await api.post('/settings', {
      site_title: siteTitle.value,
      site_description: siteDescription.value,
      contact_email: contactEmail.value,
      phone_number: phoneNumber.value,
      address: address.value,
      working_hours_weekday: workingHoursWeekday.value,
      working_hours_saturday: workingHoursSaturday.value,
      working_hours_sunday: workingHoursSunday.value,
      is_open_saturday: isOpenSaturday.value,
      is_open_sunday: isOpenSunday.value
    })
    toast.success('Ayarlar başarıyla kaydedildi')
  } catch (error) {
    console.error('Ayarlar kaydedilirken hata:', error)
    toast.error('Ayarlar kaydedilirken bir hata oluştu')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchSettings()
})
</script>