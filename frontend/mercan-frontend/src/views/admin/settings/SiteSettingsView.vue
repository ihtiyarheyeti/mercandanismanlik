<template>
  <div class="p-6">
    <!-- Loading Spinner -->
    <div v-if="loading" class="flex items-center justify-center min-h-[200px]">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
    </div>

    <div v-else>
      <h2 class="text-2xl font-semibold mb-6">Site Ayarları</h2>

      <!-- Logo ve Favicon -->
      <div class="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 class="text-lg font-semibold mb-4">Logo ve Favicon</h3>
        <div class="grid grid-cols-2 gap-4">
          <!-- Logo -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Site Logo
            </label>
            <div class="flex items-center space-x-4">
              <img
                v-if="settings.logo"
                :src="settings.logo"
                alt="Site Logo"
                class="h-12 w-auto"
              />
              <div class="flex flex-col space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  class="hidden"
                  ref="logoInput"
                  @change="handleLogoChange"
                />
                <div class="flex space-x-2">
                  <button
                    @click="handleLogoClick"
                    :disabled="savingLogo"
                    class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50"
                  >
                    <span v-if="savingLogo">Yükleniyor...</span>
                    <span v-else>Logo Seç</span>
                  </button>
                  <button
                    v-if="selectedLogo"
                    @click="saveLogo"
                    :disabled="savingLogo"
                    class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    <span v-if="savingLogo">Kaydediliyor...</span>
                    <span v-else>Logo Kaydet</span>
                  </button>
                </div>
              </div>
            </div>
            <p v-if="savingLogo" class="mt-2 text-sm text-gray-500">Logo yükleniyor, lütfen bekleyin...</p>
          </div>

          <!-- Favicon -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Favicon
            </label>
            <div class="flex items-center space-x-4">
              <img
                v-if="settings.favicon"
                :src="settings.favicon"
                alt="Favicon"
                class="h-8 w-8"
              />
              <div class="flex flex-col space-y-2">
                <input
                  type="file"
                  accept="image/x-icon,image/png"
                  class="hidden"
                  ref="faviconInput"
                  @change="handleFaviconChange"
                />
                <div class="flex space-x-2">
                  <button
                    @click="handleFaviconClick"
                    :disabled="savingFavicon"
                    class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50"
                  >
                    <span v-if="savingFavicon">Yükleniyor...</span>
                    <span v-else>Favicon Seç</span>
                  </button>
                  <button
                    v-if="selectedFavicon"
                    @click="saveFavicon"
                    :disabled="savingFavicon"
                    class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    <span v-if="savingFavicon">Kaydediliyor...</span>
                    <span v-else>Favicon Kaydet</span>
                  </button>
                </div>
              </div>
            </div>
            <p v-if="savingFavicon" class="mt-2 text-sm text-gray-500">Favicon yükleniyor, lütfen bekleyin...</p>
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
            v-model="settings.siteTitle"
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
            v-model="settings.siteDescription"
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
            v-model="settings.contactEmail"
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
            v-model="settings.phoneNumber"
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
            v-model="settings.address"
            rows="3"
            class="input w-full"
            placeholder="Adres bilgisini girin"
          ></textarea>
        </div>
      </div>

      <!-- Çalışma Saatleri -->
      <div class="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 class="text-lg font-semibold mb-4">Çalışma Saatleri</h3>
        
        <!-- Hafta içi -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Hafta İçi Çalışma Saatleri
          </label>
          <input
            v-model="settings.workingHoursWeekday"
            type="text"
            class="input w-full"
            placeholder="Örn: 09:00 - 18:00"
          />
        </div>

        <!-- Cumartesi -->
        <div class="mb-4">
          <div class="flex items-center mb-2">
            <label class="text-sm font-medium text-gray-700 flex-grow">
              Cumartesi Çalışma Saatleri
            </label>
            <div class="flex items-center">
              <input
                v-model="settings.isOpenSaturday"
                type="checkbox"
                class="mr-2"
              />
              <span class="text-sm text-gray-600">Açık</span>
            </div>
          </div>
          <input
            v-model="settings.workingHoursSaturday"
            type="text"
            class="input w-full"
            placeholder="Örn: 09:00 - 14:00"
            :disabled="!settings.isOpenSaturday"
          />
        </div>

        <!-- Pazar -->
        <div class="mb-4">
          <div class="flex items-center mb-2">
            <label class="text-sm font-medium text-gray-700 flex-grow">
              Pazar Çalışma Saatleri
            </label>
            <div class="flex items-center">
              <input
                v-model="settings.isOpenSunday"
                type="checkbox"
                class="mr-2"
              />
              <span class="text-sm text-gray-600">Açık</span>
            </div>
          </div>
          <input
            v-model="settings.workingHoursSunday"
            type="text"
            class="input w-full"
            placeholder="Örn: Kapalı"
            :disabled="!settings.isOpenSunday"
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from 'vue-toastification'

const toast = useToast()

interface Settings {
  logo: string | null
  favicon: string | null
  siteTitle: string
  siteDescription: string
  contactEmail: string
  phoneNumber: string
  address: string
  workingHoursWeekday: string
  workingHoursSaturday: string
  workingHoursSunday: string
  isOpenSaturday: boolean
  isOpenSunday: boolean
}

const loading = ref(false)
const logoInput = ref<HTMLInputElement | null>(null)
const faviconInput = ref<HTMLInputElement | null>(null)
const selectedLogo = ref<File | null>(null)
const selectedFavicon = ref<File | null>(null)
const currentLogo = ref<string | null>(null)
const currentFavicon = ref<string | null>(null)
const savingLogo = ref(false)
const savingFavicon = ref(false)
const savingSettings = ref(false)

const settings = ref<Settings>({
  logo: null,
  favicon: null,
  siteTitle: '',
  siteDescription: '',
  contactEmail: '',
  phoneNumber: '',
  address: '',
  workingHoursWeekday: '',
  workingHoursSaturday: '',
  workingHoursSunday: '',
  isOpenSaturday: false,
  isOpenSunday: false,
})

const settingsStore = useSettingsStore()

const handleLogoClick = () => {
  if (logoInput.value) {
    logoInput.value.click()
  }
}

const handleFaviconClick = () => {
  if (faviconInput.value) {
    faviconInput.value.click()
  }
}

const handleLogoChange = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    selectedLogo.value = input.files[0];
  }
};

const saveLogo = async () => {
  if (!selectedLogo.value) return;

  const formData = new FormData();
  formData.append('logo', selectedLogo.value);

  try {
    savingLogo.value = true;
    const response = await api.post('/admin/settings/logo', formData);
    settings.value.logo = response.data.logo;
    selectedLogo.value = null;
    await settingsStore.fetchSettings();
    toast.success('Logo başarıyla yüklendi');
  } catch (error: any) {
    console.error('Logo yükleme hatası:', error);
    toast.error(error.response?.data?.message || 'Logo yüklenirken bir hata oluştu');
  } finally {
    savingLogo.value = false;
  }
};

const handleFaviconChange = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    selectedFavicon.value = input.files[0];
  }
};

const saveFavicon = async () => {
  if (!selectedFavicon.value) return;

  const formData = new FormData();
  formData.append('favicon', selectedFavicon.value);

  try {
    savingFavicon.value = true;
    const response = await api.post('/admin/settings/favicon', formData);
    settings.value.favicon = response.data.favicon;
    selectedFavicon.value = null;
    await settingsStore.fetchSettings();
    toast.success('Favicon başarıyla yüklendi');
  } catch (error: any) {
    console.error('Favicon yükleme hatası:', error);
    toast.error(error.response?.data?.message || 'Favicon yüklenirken bir hata oluştu');
  } finally {
    savingFavicon.value = false;
  }
};

const saveGeneralSettings = async () => {
  try {
    loading.value = true
    const data = {
      siteTitle: settings.value.siteTitle,
      siteDescription: settings.value.siteDescription,
      contactEmail: settings.value.contactEmail,
      phoneNumber: settings.value.phoneNumber,
      address: settings.value.address,
      workingHoursWeekday: settings.value.workingHoursWeekday,
      workingHoursSaturday: settings.value.workingHoursSaturday,
      workingHoursSunday: settings.value.workingHoursSunday,
      isOpenSaturday: settings.value.isOpenSaturday,
      isOpenSunday: settings.value.isOpenSunday
    }

    await settingsStore.updateContactInfo(data)
    toast.success('İletişim bilgileri başarıyla güncellendi')
  } catch (error) {
    console.error('İletişim bilgileri güncellenirken hata:', error)
    toast.error('İletişim bilgileri güncellenirken bir hata oluştu')
  } finally {
    loading.value = false
  }
}

const saveSettings = async () => {
  savingSettings.value = true
  try {
    await saveGeneralSettings()
  } catch (error) {
    console.error('Ayarlar kaydedilirken hata:', error)
    toast.error('Ayarlar kaydedilirken bir hata oluştu')
  } finally {
    savingSettings.value = false
  }
}

// Store'dan ayarları yükle
onMounted(async () => {
  loading.value = true
  try {
    // Önbellekte ayarlar var mı kontrol et
    const cachedSettings = localStorage.getItem('siteSettings')
    if (cachedSettings) {
      const parsedSettings = JSON.parse(cachedSettings)
      settings.value = parsedSettings
    }

    // Backend'den ayarları yükle
    await settingsStore.fetchSettings()
    
    // Store'dan ayarları al ve önbelleğe kaydet
    const newSettings = {
      logo: settingsStore.logo,
      favicon: settingsStore.favicon,
      siteTitle: settingsStore.siteTitle,
      siteDescription: settingsStore.siteDescription,
      contactEmail: settingsStore.contactEmail,
      phoneNumber: settingsStore.phoneNumber,
      address: settingsStore.address,
      workingHoursWeekday: settingsStore.workingHoursWeekday,
      workingHoursSaturday: settingsStore.workingHoursSaturday,
      workingHoursSunday: settingsStore.workingHoursSunday,
      isOpenSaturday: settingsStore.isOpenSaturday,
      isOpenSunday: settingsStore.isOpenSunday,
    }
    
    settings.value = newSettings
    localStorage.setItem('siteSettings', JSON.stringify(newSettings))
  } catch (error) {
    console.error('Ayarlar yüklenirken hata:', error)
    toast.error('Ayarlar yüklenirken bir hata oluştu')
  } finally {
    loading.value = false
  }
})
</script> 