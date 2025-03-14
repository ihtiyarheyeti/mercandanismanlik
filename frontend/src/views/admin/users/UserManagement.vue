<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const loading = ref(false)
const error = ref('')
const users = ref([])
const showCreateModal = ref(false)
const showEditModal = ref(false)
const selectedUser = ref(null)

const newUser = ref({
  name: '',
  email: '',
  password: '',
  role: 'editor'
})

const fetchUsers = async () => {
  try {
    loading.value = true
    const response = await axios.get('/api/admin/users')
    users.value = response.data.data
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Kullanıcılar alınamadı'
  } finally {
    loading.value = false
  }
}

const createUser = async () => {
  try {
    loading.value = true
    await axios.post('/api/admin/users', newUser.value)
    showCreateModal.value = false
    newUser.value = {
      name: '',
      email: '',
      password: '',
      role: 'editor'
    }
    await fetchUsers()
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Kullanıcı oluşturulamadı'
  } finally {
    loading.value = false
  }
}

const editUser = (user: any) => {
  selectedUser.value = { ...user }
  showEditModal.value = true
}

const updateUser = async () => {
  try {
    loading.value = true
    await axios.put(`/api/admin/users/${selectedUser.value.id}`, selectedUser.value)
    showEditModal.value = false
    selectedUser.value = null
    await fetchUsers()
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Kullanıcı güncellenemedi'
  } finally {
    loading.value = false
  }
}

const deleteUser = async (id: number) => {
  if (!confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) return

  try {
    loading.value = true
    await axios.delete(`/api/admin/users/${id}`)
    await fetchUsers()
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Kullanıcı silinemedi'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Kullanıcı Yönetimi</h1>
      <button
        @click="showCreateModal = true"
        class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Yeni Kullanıcı
      </button>
    </div>

    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>

    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>

    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ad Soyad
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              E-posta
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rol
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              İşlemler
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in users" :key="user.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ user.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ user.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="{
                  'bg-green-100 text-green-800': user.role === 'admin',
                  'bg-blue-100 text-blue-800': user.role === 'editor'
                }"
              >
                {{ user.role === 'admin' ? 'Yönetici' : 'Editör' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <button
                @click="editUser(user)"
                class="text-blue-600 hover:text-blue-900 mr-4"
              >
                Düzenle
              </button>
              <button
                @click="deleteUser(user.id)"
                class="text-red-600 hover:text-red-900"
              >
                Sil
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Yeni Kullanıcı Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Yeni Kullanıcı</h2>
        <form @submit.prevent="createUser">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Ad Soyad
              </label>
              <input
                v-model="newUser.name"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                E-posta
              </label>
              <input
                v-model="newUser.email"
                type="email"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Şifre
              </label>
              <input
                v-model="newUser.password"
                type="password"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Rol
              </label>
              <select
                v-model="newUser.role"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="editor">Editör</option>
                <option value="admin">Yönetici</option>
              </select>
            </div>
          </div>

          <div class="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              @click="showCreateModal = false"
              class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              İptal
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              :disabled="loading"
            >
              <span v-if="loading">Kaydediliyor...</span>
              <span v-else>Kaydet</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Kullanıcı Düzenleme Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Kullanıcıyı Düzenle</h2>
        <form @submit.prevent="updateUser">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Ad Soyad
              </label>
              <input
                v-model="selectedUser.name"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                E-posta
              </label>
              <input
                v-model="selectedUser.email"
                type="email"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Rol
              </label>
              <select
                v-model="selectedUser.role"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="editor">Editör</option>
                <option value="admin">Yönetici</option>
              </select>
            </div>
          </div>

          <div class="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              @click="showEditModal = false"
              class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              İptal
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              :disabled="loading"
            >
              <span v-if="loading">Kaydediliyor...</span>
              <span v-else>Kaydet</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template> 