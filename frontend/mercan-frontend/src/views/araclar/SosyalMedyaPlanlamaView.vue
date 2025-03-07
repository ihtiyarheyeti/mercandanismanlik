<script setup lang="ts">
import { ref, computed } from 'vue'

interface Post {
  id: number
  platform: string
  content: string
  date: string
  time: string
  status: 'draft' | 'scheduled'
}

const platforms = ['Instagram', 'Twitter', 'Facebook', 'LinkedIn']

const posts = ref<Post[]>([
  {
    id: 1,
    platform: 'Instagram',
    content: 'Dijital pazarlama stratejilerinizi geliştirmek için ipuçları #digitalmarketing #seo',
    date: '2024-03-20',
    time: '10:00',
    status: 'scheduled'
  },
  {
    id: 2,
    platform: 'Twitter',
    content: 'SEO optimizasyonu hakkında yeni blog yazımız yayında! Link bio\'da 🔍',
    date: '2024-03-21',
    time: '14:30',
    status: 'draft'
  }
])

const newPost = ref<Partial<Post>>({
  platform: platforms[0],
  content: '',
  date: '',
  time: '',
  status: 'draft'
})

const sortedPosts = computed(() => {
  return [...posts.value].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`)
    const dateB = new Date(`${b.date} ${b.time}`)
    return dateA.getTime() - dateB.getTime()
  })
})

const addPost = () => {
  if (!newPost.value.content || !newPost.value.date || !newPost.value.time) return

  posts.value.push({
    id: Date.now(),
    platform: newPost.value.platform || platforms[0],
    content: newPost.value.content || '',
    date: newPost.value.date || '',
    time: newPost.value.time || '',
    status: newPost.value.status || 'draft'
  })

  // Reset form
  newPost.value = {
    platform: platforms[0],
    content: '',
    date: '',
    time: '',
    status: 'draft'
  }
}

const deletePost = (id: number) => {
  const index = posts.value.findIndex(post => post.id === id)
  if (index !== -1) {
    posts.value.splice(index, 1)
  }
}

const toggleStatus = (post: Post) => {
  post.status = post.status === 'draft' ? 'scheduled' : 'draft'
}

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case 'Instagram':
      return 'fa-instagram'
    case 'Twitter':
      return 'fa-twitter'
    case 'Facebook':
      return 'fa-facebook'
    case 'LinkedIn':
      return 'fa-linkedin'
    default:
      return 'fa-share-alt'
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto mt-8 p-6 bg-white/5 backdrop-blur-lg rounded-xl">
    <h2 class="text-2xl font-bold text-white mb-6">Sosyal Medya Planlama</h2>

    <!-- Yeni Gönderi Formu -->
    <div class="bg-white/10 p-6 rounded-xl mb-8">
      <h3 class="text-lg font-semibold text-white mb-4">Yeni Gönderi</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-white mb-2">Platform</label>
          <select
            v-model="newPost.platform"
            class="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:border-blue-500"
          >
            <option v-for="platform in platforms" :key="platform" :value="platform">
              {{ platform }}
            </option>
          </select>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-white mb-2">Tarih</label>
            <input
              v-model="newPost.date"
              type="date"
              class="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-white mb-2">Saat</label>
            <input
              v-model="newPost.time"
              type="time"
              class="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div class="mb-4">
        <label class="block text-white mb-2">İçerik</label>
        <textarea
          v-model="newPost.content"
          rows="4"
          class="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-blue-500"
          placeholder="Gönderi içeriğini yazın..."
        ></textarea>
      </div>

      <button
        @click="addPost"
        class="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!newPost.content || !newPost.date || !newPost.time"
      >
        Gönderi Ekle
      </button>
    </div>

    <!-- Gönderiler Listesi -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-white mb-4">Planlanan Gönderiler</h3>
      
      <div v-if="sortedPosts.length === 0" class="text-center py-12 text-gray-400">
        <i class="fas fa-calendar-alt text-6xl mb-4"></i>
        <p>Henüz planlanmış gönderi yok</p>
      </div>

      <div
        v-for="post in sortedPosts"
        :key="post.id"
        class="bg-white/10 p-4 rounded-xl"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-2">
              <i :class="['fab', getPlatformIcon(post.platform), 'text-xl']"></i>
              <span class="text-white font-medium">{{ post.platform }}</span>
              <span
                :class="[
                  'px-2 py-1 text-xs rounded-full',
                  post.status === 'scheduled'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                ]"
              >
                {{ post.status === 'scheduled' ? 'Planlandı' : 'Taslak' }}
              </span>
            </div>
            
            <p class="text-gray-300 mb-2">{{ post.content }}</p>
            
            <div class="flex items-center gap-4 text-sm text-gray-400">
              <span>
                <i class="far fa-calendar mr-1"></i>
                {{ post.date }}
              </span>
              <span>
                <i class="far fa-clock mr-1"></i>
                {{ post.time }}
              </span>
            </div>
          </div>

          <div class="flex gap-2">
            <button
              @click="() => toggleStatus(post)"
              class="p-2 text-gray-400 hover:text-white"
            >
              <i :class="[
                'fas',
                post.status === 'scheduled' ? 'fa-times' : 'fa-check'
              ]"></i>
            </button>
            <button
              @click="() => deletePost(post.id)"
              class="p-2 text-gray-400 hover:text-red-400"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 