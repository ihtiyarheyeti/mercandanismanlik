<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Kullanıcı Yönetimi</h2>

    <!-- Kullanıcı Listesi -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center space-x-4">
          <input
            type="text"
            v-model="aramaMetni"
            placeholder="Kullanıcı ara..."
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <select
            v-model="secilenRol"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Tüm Roller</option>
            <option value="admin">Admin</option>
            <option value="editor">Editör</option>
            <option value="user">Kullanıcı</option>
          </select>
        </div>
        
        <button @click="yeniKullaniciEkle" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          <i class="fas fa-plus mr-2"></i>Yeni Kullanıcı
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Kullanıcı</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">E-posta</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Rol</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Durum</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Son Giriş</th>
              <th class="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="kullanici in filtrelenmisKullanicilar" :key="kullanici.id" class="border-b border-gray-200 dark:border-gray-700">
              <td class="px-4 py-3">
                <div class="flex items-center">
                  <img :src="kullanici.avatar" :alt="kullanici.ad" class="h-8 w-8 rounded-full mr-3" />
                  <div>
                    <div class="font-medium text-gray-900 dark:text-white">{{ kullanici.ad }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ kullanici.kullaniciAdi }}</div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{{ kullanici.eposta }}</td>
              <td class="px-4 py-3">
                <span :class="{
                  'px-2 py-1 text-xs rounded-full': true,
                  'bg-blue-100 text-blue-800': kullanici.rol === 'admin',
                  'bg-green-100 text-green-800': kullanici.rol === 'editor',
                  'bg-gray-100 text-gray-800': kullanici.rol === 'user'
                }">
                  {{ kullanici.rol }}
                </span>
              </td>
              <td class="px-4 py-3">
                <span :class="{
                  'px-2 py-1 text-xs rounded-full': true,
                  'bg-green-100 text-green-800': kullanici.durum === 'aktif',
                  'bg-red-100 text-red-800': kullanici.durum === 'pasif'
                }">
                  {{ kullanici.durum === 'aktif' ? 'Aktif' : 'Pasif' }}
                </span>
              </td>
              <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                {{ new Date(kullanici.sonGiris).toLocaleDateString('tr-TR') }}
              </td>
              <td class="px-4 py-3 text-right space-x-2">
                <button @click="kullaniciDuzenle(kullanici)" class="text-blue-500 hover:text-blue-600">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="kullaniciSil(kullanici.id)" class="text-red-500 hover:text-red-600">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Kullanıcı Ekleme/Düzenleme Modalı -->
    <div v-if="modalAcik" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {{ duzenlemeModu ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı Ekle' }}
        </h3>

        <form @submit.prevent="kullaniciKaydet" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ad Soyad
            </label>
            <input
              v-model="aktifKullanici.ad"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Kullanıcı Adı
            </label>
            <input
              v-model="aktifKullanici.kullaniciAdi"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              E-posta
            </label>
            <input
              v-model="aktifKullanici.eposta"
              type="email"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Rol
            </label>
            <select
              v-model="aktifKullanici.rol"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
              <option value="admin">Admin</option>
              <option value="editor">Editör</option>
              <option value="user">Kullanıcı</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Durum
            </label>
            <select
              v-model="aktifKullanici.durum"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
              <option value="aktif">Aktif</option>
              <option value="pasif">Pasif</option>
            </select>
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
import { ref, computed } from 'vue'

interface Kullanici {
  id: number
  ad: string
  kullaniciAdi: string
  eposta: string
  avatar: string
  rol: 'admin' | 'editor' | 'user'
  durum: 'aktif' | 'pasif'
  sonGiris: string
}

const kullanicilar = ref<Kullanici[]>([
  {
    id: 1,
    ad: 'Admin Kullanıcı',
    kullaniciAdi: 'admin',
    eposta: 'admin@mercandanismanlik.com',
    avatar: '/images/avatars/admin.jpg',
    rol: 'admin',
    durum: 'aktif',
    sonGiris: new Date().toISOString()
  },
  {
    id: 2,
    ad: 'Editör Kullanıcı',
    kullaniciAdi: 'editor',
    eposta: 'editor@mercandanismanlik.com',
    avatar: '/images/avatars/editor.jpg',
    rol: 'editor',
    durum: 'aktif',
    sonGiris: new Date().toISOString()
  }
])

const aramaMetni = ref('')
const secilenRol = ref('')
const modalAcik = ref(false)
const duzenlemeModu = ref(false)
const aktifKullanici = ref<Kullanici>({
  id: 0,
  ad: '',
  kullaniciAdi: '',
  eposta: '',
  avatar: '/images/avatars/default.jpg',
  rol: 'user',
  durum: 'aktif',
  sonGiris: new Date().toISOString()
})

const filtrelenmisKullanicilar = computed(() => {
  return kullanicilar.value.filter(kullanici => {
    const aramaUyumu = !aramaMetni.value || 
      kullanici.ad.toLowerCase().includes(aramaMetni.value.toLowerCase()) ||
      kullanici.kullaniciAdi.toLowerCase().includes(aramaMetni.value.toLowerCase()) ||
      kullanici.eposta.toLowerCase().includes(aramaMetni.value.toLowerCase())
    
    const rolUyumu = !secilenRol.value || kullanici.rol === secilenRol.value
    
    return aramaUyumu && rolUyumu
  })
})

const yeniKullaniciEkle = () => {
  duzenlemeModu.value = false
  aktifKullanici.value = {
    id: Math.max(0, ...kullanicilar.value.map(k => k.id)) + 1,
    ad: '',
    kullaniciAdi: '',
    eposta: '',
    avatar: '/images/avatars/default.jpg',
    rol: 'user',
    durum: 'aktif',
    sonGiris: new Date().toISOString()
  }
  modalAcik.value = true
}

const kullaniciDuzenle = (kullanici: Kullanici) => {
  duzenlemeModu.value = true
  aktifKullanici.value = { ...kullanici }
  modalAcik.value = true
}

const kullaniciSil = async (id: number) => {
  if (confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
    try {
      // API çağrısı yapılacak
      kullanicilar.value = kullanicilar.value.filter(k => k.id !== id)
    } catch (error) {
      console.error('Kullanıcı silinirken hata:', error)
    }
  }
}

const kullaniciKaydet = async () => {
  try {
    if (duzenlemeModu.value) {
      // Güncelleme API çağrısı yapılacak
      const index = kullanicilar.value.findIndex(k => k.id === aktifKullanici.value.id)
      if (index !== -1) {
        kullanicilar.value[index] = { ...aktifKullanici.value }
      }
    } else {
      // Yeni kullanıcı ekleme API çağrısı yapılacak
      kullanicilar.value.push({ ...aktifKullanici.value })
    }
    modalKapat()
  } catch (error) {
    console.error('Kullanıcı kaydedilirken hata:', error)
  }
}

const modalKapat = () => {
  modalAcik.value = false
  aktifKullanici.value = {
    id: 0,
    ad: '',
    kullaniciAdi: '',
    eposta: '',
    avatar: '/images/avatars/default.jpg',
    rol: 'user',
    durum: 'aktif',
    sonGiris: new Date().toISOString()
  }
}
</script> 