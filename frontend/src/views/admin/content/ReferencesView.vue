<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Referans Yönetimi</h2>

    <!-- Referans Listesi -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Referanslar</h3>
        <button @click="yeniReferansEkle" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          <i class="fas fa-plus mr-2"></i>Yeni Referans
        </button>
      </div>

      <div v-if="loading" class="flex justify-center items-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>

      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {{ error }}
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="reference in references" :key="reference.id" class="bg-white rounded-lg shadow overflow-hidden">
          <img 
            :src="reference.logo" 
            :alt="reference.company_name"
            class="w-full h-48 object-contain p-4"
          />
          <div class="p-4 border-t">
            <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ reference.company_name }}</h2>
            <p class="text-gray-600 text-sm mb-4">{{ reference.description }}</p>
            <div class="flex items-center justify-between text-sm text-gray-500">
              <a 
                :href="reference.website" 
                target="_blank"
                class="text-blue-600 hover:text-blue-900"
              >
                Website
              </a>
              <span>{{ reference.year }}</span>
            </div>
            <div class="mt-4 flex justify-end space-x-2">
              <button 
                class="text-blue-600 hover:text-blue-900"
                @click="router.push(`/admin/content/references/${reference.id}/edit`)"
              >
                Düzenle
              </button>
              <button 
                class="text-red-600 hover:text-red-900"
                @click="deleteReference(reference.id)"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Referans Düzenleme/Ekleme Modalı -->
    <div v-if="modalAcik" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {{ duzenlemeModu ? 'Referans Düzenle' : 'Yeni Referans' }}
        </h3>

        <form @submit.prevent="referansKaydet" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Firma Adı
            </label>
            <input
              v-model="aktifReferans.firmaAdi"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Logo URL
            </label>
            <input
              v-model="aktifReferans.logo"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sektör
            </label>
            <input
              v-model="aktifReferans.sektor"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Website
            </label>
            <input
              v-model="aktifReferans.website"
              type="url"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Açıklama
            </label>
            <textarea
              v-model="aktifReferans.aciklama"
              rows="4"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Yapılan İşler
            </label>
            <textarea
              v-model="aktifReferans.yapilanIsler"
              rows="4"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Her satıra bir iş yazın"
            ></textarea>
          </div>

          <div class="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              @click="modalKapat"
              class="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              İptal
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {{ duzenlemeModu ? 'Güncelle' : 'Kaydet' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const references = ref([])
const loading = ref(false)
const error = ref('')

const fetchReferences = async () => {
  try {
    loading.value = true
    const response = await axios.get('/api/admin/references')
    references.value = response.data.data
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Referanslar alınamadı'
  } finally {
    loading.value = false
  }
}

const deleteReference = async (id: number) => {
  if (confirm('Bu referansı silmek istediğinizden emin misiniz?')) {
    try {
      await axios.delete(`/api/admin/references/${id}`)
      references.value = references.value.filter(ref => ref.id !== id)
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Referans silinemedi'
    }
  }
}

onMounted(() => {
  fetchReferences()
})

const modalAcik = ref(false)
const duzenlemeModu = ref(false)
const aktifReferans = ref({
  id: 0,
  firmaAdi: '',
  logo: '',
  sektor: '',
  website: '',
  aciklama: '',
  yapilanIsler: ''
})

const yeniReferansEkle = () => {
  duzenlemeModu.value = false
  aktifReferans.value = {
    id: Math.max(0, ...references.value.map(r => r.id)) + 1,
    firmaAdi: '',
    logo: '',
    sektor: '',
    website: '',
    aciklama: '',
    yapilanIsler: ''
  }
  modalAcik.value = true
}

const referansKaydet = async () => {
  try {
    if (duzenlemeModu.value) {
      // Güncelleme API çağrısı yapılacak
      const index = references.value.findIndex(r => r.id === aktifReferans.value.id)
      if (index !== -1) {
        references.value[index] = { ...aktifReferans.value }
      }
    } else {
      // Yeni referans ekleme API çağrısı yapılacak
      references.value.push({ ...aktifReferans.value })
    }
    modalKapat()
  } catch (error) {
    console.error('Referans kaydedilirken hata:', error)
  }
}

const modalKapat = () => {
  modalAcik.value = false
  aktifReferans.value = {
    id: 0,
    firmaAdi: '',
    logo: '',
    sektor: '',
    website: '',
    aciklama: '',
    yapilanIsler: ''
  }
}
</script>

<style scoped>
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
}

.aspect-w-16 img {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  object-fit: cover;
}
</style> 