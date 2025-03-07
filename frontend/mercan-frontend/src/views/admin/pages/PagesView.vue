<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Sayfa Yönetimi</h1>
      <router-link
        to="/admin/sayfalar/yeni"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Yeni Sayfa Ekle
      </router-link>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
      <div class="mb-4 flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Sayfa ara..."
            class="border rounded px-3 py-2"
          />
          <select
            v-model="statusFilter"
            class="border rounded px-3 py-2"
          >
            <option value="">Tüm Durumlar</option>
            <option value="active">Aktif</option>
            <option value="inactive">Pasif</option>
            <option value="deleted">Çöp Kutusu</option>
          </select>
        </div>
      </div>

      <div v-if="loading" class="text-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      </div>

      <draggable
        v-else
        v-model="pages"
        item-key="id"
        handle=".drag-handle"
        @end="handleDragEnd"
        class="space-y-2"
      >
        <template #item="{ element }">
          <div
            class="flex items-center justify-between p-4 bg-gray-50 rounded hover:bg-gray-100"
            :class="{ 'opacity-50': element.deleted_at }"
          >
            <div class="flex items-center space-x-4">
              <i class="fas fa-grip-vertical drag-handle cursor-move text-gray-400"></i>
              <div>
                <h3 class="font-medium">{{ element.title }}</h3>
                <p class="text-sm text-gray-500">{{ element.slug }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <button
                v-if="!element.deleted_at"
                @click="toggleStatus(element)"
                :class="element.is_active ? 'bg-green-500' : 'bg-gray-500'"
                class="text-white px-3 py-1 rounded text-sm"
              >
                {{ element.is_active ? 'Aktif' : 'Pasif' }}
              </button>
              <router-link
                v-if="!element.deleted_at"
                :to="'/admin/sayfalar/' + element.id + '/duzenle'"
                class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                Düzenle
              </router-link>
              <button
                v-if="!element.deleted_at"
                @click="deletePage(element)"
                class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Sil
              </button>
              <button
                v-else
                @click="restorePage(element)"
                class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
              >
                Geri Yükle
              </button>
            </div>
          </div>
        </template>
      </draggable>

      <div v-if="!loading && pages.length === 0" class="text-center py-8 text-gray-500">
        Henüz sayfa bulunmuyor.
      </div>

      <div class="mt-4 flex justify-between items-center">
        <div class="text-sm text-gray-500">
          Toplam {{ totalPages }} sayfa
        </div>
        <div class="flex space-x-2">
          <button
            v-for="page in totalPageCount"
            :key="page"
            @click="currentPage = page"
            class="px-3 py-1 rounded"
            :class="currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'"
          >
            {{ page }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useToast } from 'vue-toastification'
import draggable from 'vuedraggable'
import { usePagesStore } from '@/stores/pages'
import type { Page } from '@/stores/pages'

const toast = useToast()
const pagesStore = usePagesStore()

const loading = ref(false)
const searchQuery = ref('')
const statusFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = 10

const pages = ref<Page[]>([])
const totalPages = ref(0)

const totalPageCount = computed(() => Math.ceil(totalPages.value / itemsPerPage))

const loadPages = async () => {
  loading.value = true
  try {
    const response = await pagesStore.getPages({
      page: currentPage.value,
      search: searchQuery.value,
      status: statusFilter.value
    })
    pages.value = response.data
    totalPages.value = response.total
  } catch (error) {
    toast.error('Sayfalar yüklenirken bir hata oluştu')
  }
  loading.value = false
}

const toggleStatus = async (page: Page) => {
  try {
    await pagesStore.togglePageStatus(page.id)
    toast.success('Sayfa durumu güncellendi')
    await loadPages()
  } catch (error) {
    toast.error('Sayfa durumu güncellenirken bir hata oluştu')
  }
}

const deletePage = async (page: Page) => {
  if (!confirm('Bu sayfayı silmek istediğinizden emin misiniz?')) return
  
  try {
    await pagesStore.deletePage(page.id)
    toast.success('Sayfa çöp kutusuna taşındı')
    await loadPages()
  } catch (error) {
    toast.error('Sayfa silinirken bir hata oluştu')
  }
}

const restorePage = async (page: Page) => {
  try {
    await pagesStore.restorePage(page.id)
    toast.success('Sayfa geri yüklendi')
    await loadPages()
  } catch (error) {
    toast.error('Sayfa geri yüklenirken bir hata oluştu')
  }
}

const handleDragEnd = async () => {
  try {
    await pagesStore.updatePageOrder(pages.value.map(page => page.id))
    toast.success('Sayfa sıralaması güncellendi')
  } catch (error) {
    toast.error('Sayfa sıralaması güncellenirken bir hata oluştu')
    await loadPages()
  }
}

watch([searchQuery, statusFilter, currentPage], () => {
  loadPages()
})

onMounted(() => {
  loadPages()
})
</script> 