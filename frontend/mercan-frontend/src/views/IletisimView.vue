<script setup lang="ts">
import { ref } from 'vue'
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()

interface IletisimFormu {
  ad: string
  email: string
  telefon: string
  konu: string
  mesaj: string
}

const form = ref<IletisimFormu>({
  ad: '',
  email: '',
  telefon: '',
  konu: '',
  mesaj: ''
})

const gonderiliyor = ref(false)
const gonderildi = ref(false)
const hata = ref('')

const formGonder = async () => {
  if (!form.value.ad || !form.value.email || !form.value.konu || !form.value.mesaj) {
    hata.value = 'Lütfen zorunlu alanları doldurun.'
    return
  }

  gonderiliyor.value = true
  hata.value = ''

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })

    const data = await response.json()

    if (data.success) {
      gonderildi.value = true
      form.value = {
        ad: '',
        email: '',
        telefon: '',
        konu: '',
        mesaj: ''
      }
    } else {
      hata.value = data.message || 'Bir hata oluştu. Lütfen tekrar deneyin.'
    }
  } catch (error) {
    hata.value = 'Bir hata oluştu. Lütfen tekrar deneyin.'
  } finally {
    gonderiliyor.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 py-16">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold text-white mb-8 text-center">İletişim</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- İletişim Formu -->
          <div class="bg-white/10 backdrop-blur-lg rounded-xl p-8">
            <h2 class="text-2xl font-semibold text-white mb-6">Bize Ulaşın</h2>
            
            <form @submit.prevent="formGonder" class="space-y-6">
              <div>
                <label class="block text-white mb-2">Ad Soyad *</label>
                <input
                  v-model="form.ad"
                  type="text"
                  required
                  class="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label class="block text-white mb-2">E-posta *</label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label class="block text-white mb-2">Telefon</label>
                <input
                  v-model="form.telefon"
                  type="tel"
                  class="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label class="block text-white mb-2">Konu *</label>
                <input
                  v-model="form.konu"
                  type="text"
                  required
                  class="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label class="block text-white mb-2">Mesaj *</label>
                <textarea
                  v-model="form.mesaj"
                  required
                  rows="4"
                  class="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-blue-500"
                ></textarea>
              </div>

              <!-- Hata Mesajı -->
              <div v-if="hata" class="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                {{ hata }}
              </div>

              <!-- Başarı Mesajı -->
              <div v-if="gonderildi" class="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400">
                Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.
              </div>

              <button
                type="submit"
                :disabled="gonderiliyor"
                class="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ gonderiliyor ? 'Gönderiliyor...' : 'Gönder' }}
              </button>
            </form>
          </div>

          <!-- İletişim Bilgileri -->
          <div class="space-y-8">
            <div class="bg-white/10 backdrop-blur-lg rounded-xl p-8">
              <h2 class="text-2xl font-semibold text-white mb-6">İletişim Bilgileri</h2>
              
              <div class="space-y-4">
                <div v-if="settingsStore.address" class="flex items-start space-x-4">
                  <div class="text-blue-400">
                    <i class="fas fa-map-marker-alt text-xl"></i>
                  </div>
                  <div>
                    <h3 class="text-white font-medium">Adres</h3>
                    <p class="text-gray-300">{{ settingsStore.address }}</p>
                  </div>
                </div>

                <div v-if="settingsStore.phoneNumber" class="flex items-start space-x-4">
                  <div class="text-blue-400">
                    <i class="fas fa-phone text-xl"></i>
                  </div>
                  <div>
                    <h3 class="text-white font-medium">Telefon</h3>
                    <p class="text-gray-300">{{ settingsStore.phoneNumber }}</p>
                  </div>
                </div>

                <div v-if="settingsStore.contactEmail" class="flex items-start space-x-4">
                  <div class="text-blue-400">
                    <i class="fas fa-envelope text-xl"></i>
                  </div>
                  <div>
                    <h3 class="text-white font-medium">E-posta</h3>
                    <p class="text-gray-300">{{ settingsStore.contactEmail }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white/10 backdrop-blur-lg rounded-xl p-8">
              <h2 class="text-2xl font-semibold text-white mb-6">Çalışma Saatleri</h2>
              
              <div class="space-y-2 text-gray-300">
                <p><span class="text-white font-medium">Pazartesi - Cuma:</span> 09:00 - 18:00</p>
                <p><span class="text-white font-medium">Cumartesi:</span> 10:00 - 14:00</p>
                <p><span class="text-white font-medium">Pazar:</span> Kapalı</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 