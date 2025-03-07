<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useBlogStore } from '@/stores/blog'

const blogStore = useBlogStore()
const secilenKategori = ref('Tümü')

const kategoriler = [
  'Tümü',
  'Dijital Pazarlama',
  'Web Tasarım',
  'SEO',
  'Sosyal Medya',
  'Yapay Zeka'
]

onMounted(async () => {
  await blogStore.fetchBlogs()
})

const filtrelenmisGonderiler = computed(() => {
  const blogs = blogStore.getBlogs
  if (secilenKategori.value === 'Tümü') {
    return blogs
  }
  return blogs.filter(post => post.category_name === secilenKategori.value)
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 py-16">
    <div class="container mx-auto px-4">
      <!-- Hero Section -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">
          Blog
        </h1>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
          Dijital pazarlama, web tasarım ve teknoloji dünyasından en güncel içerikler.
        </p>
      </div>

      <!-- Kategori Filtreleme -->
      <div class="flex flex-wrap justify-center gap-4 mb-12">
        <button
          v-for="kategori in kategoriler"
          :key="kategori"
          class="px-6 py-2 rounded-full transition-all duration-300"
          :class="{
            'bg-blue-600 text-white': secilenKategori === kategori,
            'bg-white/10 text-gray-300 hover:bg-white/20': secilenKategori !== kategori
          }"
          @click="secilenKategori = kategori"
        >
          {{ kategori }}
        </button>
      </div>

      <!-- Blog Grid -->
      <div v-if="blogStore.loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p class="mt-4 text-gray-300">Blog yazıları yükleniyor...</p>
      </div>

      <div v-else-if="blogStore.error" class="text-center py-12">
        <p class="text-red-400">{{ blogStore.error }}</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="blog in filtrelenmisGonderiler" :key="blog.id" 
          class="blog-card bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
          <router-link :to="'/blog/' + blog.id">
            <div class="aspect-w-16 aspect-h-9 relative">
              <img 
                :src="blog.featured_image" 
                :alt="blog.title"
                loading="lazy"
                decoding="async"
                class="w-full h-full object-cover"
                @error="(e: Event) => ((e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 mb-4">
                <span class="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                  {{ blog.category_name }}
                </span>
                <span class="text-gray-400 text-sm">
                  {{ new Date(blog.published_at).toLocaleDateString('tr-TR') }}
                </span>
              </div>

              <h3 class="text-xl font-bold text-white mb-3 line-clamp-2">
                {{ blog.title }}
              </h3>

              <p class="text-gray-300 mb-4 line-clamp-3">
                {{ blog.excerpt }}
              </p>

              <div class="flex items-center justify-between">
                <span class="text-blue-400 font-medium">Devamını Oku</span>
                <div class="flex gap-2">
                  <span 
                    v-for="tag in (blog.tags || []).slice(0, 2)" 
                    :key="tag"
                    class="text-sm text-gray-400"
                  >
                    #{{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Newsletter Section -->
      <div class="mt-16 bg-white/5 backdrop-blur-lg rounded-xl p-8 text-center">
        <h2 class="text-2xl font-bold text-white mb-4">
          Yeni İçeriklerden Haberdar Olun
        </h2>
        <p class="text-gray-300 mb-6">
          Dijital pazarlama ve teknoloji dünyasındaki son gelişmeleri kaçırmayın.
        </p>
        <form class="max-w-md mx-auto flex gap-4">
          <input
            type="email"
            placeholder="E-posta adresiniz"
            class="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-blue-500"
          >
          <button
            type="submit"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Abone Ol
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

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

.blog-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> 