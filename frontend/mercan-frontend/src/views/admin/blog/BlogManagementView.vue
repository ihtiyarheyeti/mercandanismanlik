<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Blog Yönetimi</h1>
      <button
        @click="openNewBlogModal"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Yeni Blog Ekle
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="blog in blogs"
        :key="blog.id"
        class="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <img
          :src="blog.featured_image"
          :alt="blog.title"
          class="w-full h-48 object-cover"
          @error="handleImageError"
        />
        <div class="p-4">
          <h2 class="text-xl font-semibold mb-2">{{ blog.title }}</h2>
          <p class="text-gray-600 mb-4">{{ blog.excerpt }}</p>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-500">
              {{ formatDate(blog.published_at) }}
            </span>
            <div class="space-x-2">
              <button
                @click="editBlog(blog)"
                class="text-blue-500 hover:text-blue-700"
              >
                Düzenle
              </button>
              <button
                @click="deleteBlog(blog.id)"
                class="text-red-500 hover:text-red-700"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Blog Ekleme/Düzenleme Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 class="text-xl font-bold mb-4">
          {{ editingBlog ? 'Blog Düzenle' : 'Yeni Blog Ekle' }}
        </h2>
        <form @submit.prevent="saveBlog">
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Başlık</label>
            <input
              v-model="blogForm.title"
              type="text"
              class="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Özet</label>
            <textarea
              v-model="blogForm.excerpt"
              class="w-full border rounded px-3 py-2"
              rows="3"
              required
            ></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">İçerik</label>
            <textarea
              v-model="blogForm.content"
              class="w-full border rounded px-3 py-2"
              rows="6"
              required
            ></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Kategori</label>
            <select
              v-model="blogForm.category_id"
              class="w-full border rounded px-3 py-2"
              required
            >
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Etiketler</label>
            <input
              v-model="blogForm.tags"
              type="text"
              class="w-full border rounded px-3 py-2"
              placeholder="Etiketleri virgülle ayırın"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Kapak Görseli</label>
            <input
              type="file"
              @change="handleImageUpload"
              accept="image/*"
              class="w-full"
            />
          </div>
          <div class="flex justify-end space-x-2">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 border rounded hover:bg-gray-100"
            >
              İptal
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {{ editingBlog ? 'Güncelle' : 'Kaydet' }}
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
const blogs = ref<Blog[]>([])
const categories = ref([])
const showModal = ref(false)
const editingBlog = ref<Blog | null>(null)

const blogForm = ref({
  title: '',
  excerpt: '',
  content: '',
  category_id: '',
  tags: '',
  featured_image: null as File | null
})

onMounted(async () => {
  await fetchBlogs()
  await fetchCategories()
})

const fetchBlogs = async () => {
  try {
    await blogStore.fetchBlogs()
    blogs.value = blogStore.getBlogs
  } catch (error) {
    console.error('Bloglar yüklenirken hata:', error)
  }
}

const fetchCategories = async () => {
  try {
    await blogStore.fetchCategories()
    categories.value = blogStore.categories
  } catch (error) {
    console.error('Kategoriler yüklenirken hata:', error)
  }
}

const openNewBlogModal = () => {
  editingBlog.value = null
  resetForm()
  showModal.value = true
}

const editBlog = (blog: Blog) => {
  editingBlog.value = blog
  blogForm.value = {
    ...blog,
    tags: blog.tags.join(', '),
    featured_image: null
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  resetForm()
}

const resetForm = () => {
  blogForm.value = {
    title: '',
    excerpt: '',
    content: '',
    category_id: '',
    tags: '',
    featured_image: null
  }
}

const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    blogForm.value.featured_image = input.files[0]
  }
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = '/images/default-blog.jpg'
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('tr-TR')
}

const saveBlog = async () => {
  try {
    const formData = new FormData()
    Object.entries(blogForm.value).forEach(([key, value]) => {
      if (key === 'tags') {
        formData.append(key, value.split(',').map(tag => tag.trim()).join(','))
      } else if (value !== null) {
        formData.append(key, value)
      }
    })

    if (editingBlog.value) {
      await blogStore.updateBlog(editingBlog.value.id, formData)
    } else {
      await blogStore.createBlog(formData)
    }

    await fetchBlogs()
    closeModal()
  } catch (error) {
    console.error('Blog kaydedilirken hata:', error)
  }
}

const deleteBlog = async (id: number) => {
  if (confirm('Bu blogu silmek istediğinizden emin misiniz?')) {
    try {
      await blogStore.deleteBlog(id)
      await fetchBlogs()
    } catch (error) {
      console.error('Blog silinirken hata:', error)
    }
  }
}
</script> 