<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Blog Yönetimi</h2>

    <!-- Blog Listesi -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Blog Yazıları</h3>
        <button @click="yeniBlogEkle" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          <i class="fas fa-plus mr-2"></i>Yeni Blog Yazısı
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Başlık</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Kategori</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Yazar</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Durum</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Yayın Tarihi</th>
              <th class="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="blog in bloglar" :key="blog.id" class="border-b border-gray-200 dark:border-gray-700">
              <td class="px-4 py-3 text-sm text-gray-900 dark:text-white">{{ blog.title }}</td>
              <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{{ blog.category_name }}</td>
              <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{{ blog.author_name }}</td>
              <td class="px-4 py-3">
                <span :class="{
                  'px-2 py-1 text-xs rounded-full': true,
                  'bg-green-100 text-green-800': blog.status === 'published',
                  'bg-yellow-100 text-yellow-800': blog.status === 'draft'
                }">
                  {{ blog.status === 'published' ? 'Yayında' : 'Taslak' }}
                </span>
              </td>
              <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                {{ new Date(blog.published_at).toLocaleDateString('tr-TR') }}
              </td>
              <td class="px-4 py-3 text-right space-x-2">
                <button @click="blogDuzenle(blog)" class="text-blue-500 hover:text-blue-600">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="blogSil(blog.id)" class="text-red-500 hover:text-red-600">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Blog Düzenleme/Ekleme Modalı -->
    <div v-if="modalAcik" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {{ duzenlemeModu ? 'Blog Yazısı Düzenle' : 'Yeni Blog Yazısı' }}
        </h3>

        <form @submit.prevent="blogKaydet" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Başlık
            </label>
            <input
              v-model="aktifBlog.title"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Kategori
              </label>
              <select
                v-model="aktifBlog.category_id"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option v-for="kategori in kategoriler" :key="kategori.id" :value="kategori.id">
                  {{ kategori.name }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Durum
              </label>
              <select
                v-model="aktifBlog.status"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="draft">Taslak</option>
                <option value="published">Yayında</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Özet
            </label>
            <textarea
              v-model="aktifBlog.excerpt"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              İçerik
            </label>
            <textarea
              v-model="aktifBlog.content"
              rows="10"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Öne Çıkan Görsel URL
            </label>
            <input
              v-model="aktifBlog.featured_image"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Etiketler (virgülle ayırın)
            </label>
            <input
              v-model="aktifBlog.tags"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="örnek, etiket, blog"
            />
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
import { useBlogStore } from '@/stores/blog'
import type { Blog } from '@/types/blog'

const blogStore = useBlogStore()

interface BlogForm extends Blog {
  status: 'draft' | 'published'
}

const bloglar = ref<BlogForm[]>([])
const kategoriler = ref([
  { id: 1, name: 'Dijital Pazarlama' },
  { id: 2, name: 'Web Tasarım' },
  { id: 3, name: 'SEO' },
  { id: 4, name: 'Sosyal Medya' },
  { id: 5, name: 'Yapay Zeka' }
])

const modalAcik = ref(false)
const duzenlemeModu = ref(false)
const aktifBlog = ref<BlogForm>({
  id: 0,
  title: '',
  content: '',
  excerpt: '',
  featured_image: '',
  author_name: '',
  category_id: 1,
  category_name: '',
  published_at: new Date().toISOString(),
  tags: [],
  status: 'draft'
})

onMounted(async () => {
  try {
    await blogStore.fetchBlogs()
    bloglar.value = blogStore.getBlogs
  } catch (error) {
    console.error('Bloglar yüklenirken hata:', error)
  }
})

const yeniBlogEkle = () => {
  duzenlemeModu.value = false
  aktifBlog.value = {
    id: Math.max(0, ...bloglar.value.map(b => b.id)) + 1,
    title: '',
    content: '',
    excerpt: '',
    featured_image: '',
    author_name: 'Admin',
    category_id: 1,
    category_name: '',
    published_at: new Date().toISOString(),
    tags: [],
    status: 'draft'
  }
  modalAcik.value = true
}

const blogDuzenle = (blog: BlogForm) => {
  duzenlemeModu.value = true
  aktifBlog.value = { ...blog }
  modalAcik.value = true
}

const blogSil = async (id: number) => {
  if (confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) {
    try {
      // API çağrısı yapılacak
      bloglar.value = bloglar.value.filter(b => b.id !== id)
    } catch (error) {
      console.error('Blog silinirken hata:', error)
    }
  }
}

const blogKaydet = async () => {
  try {
    if (duzenlemeModu.value) {
      // Güncelleme API çağrısı yapılacak
      const index = bloglar.value.findIndex(b => b.id === aktifBlog.value.id)
      if (index !== -1) {
        bloglar.value[index] = { ...aktifBlog.value }
      }
    } else {
      // Yeni blog ekleme API çağrısı yapılacak
      bloglar.value.push({ ...aktifBlog.value })
    }
    modalKapat()
  } catch (error) {
    console.error('Blog kaydedilirken hata:', error)
  }
}

const modalKapat = () => {
  modalAcik.value = false
  aktifBlog.value = {
    id: 0,
    title: '',
    content: '',
    excerpt: '',
    featured_image: '',
    author_name: '',
    category_id: 1,
    category_name: '',
    published_at: new Date().toISOString(),
    tags: [],
    status: 'draft'
  }
}
</script> 