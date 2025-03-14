<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <div class="mb-8">
      <h2 class="text-xl font-semibold text-gray-800">Hakkımızda Sayfası Tasarımı</h2>
      <p class="text-gray-600">Hakkımızda sayfasının tasarımını ve içeriğini buradan yönetebilirsiniz.</p>
    </div>

    <!-- Şirket Bilgileri -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Şirket Bilgileri</h3>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Şirket Adı</label>
          <input
            v-model="company.name"
            type="text"
            class="w-full border rounded-lg px-3 py-2"
            placeholder="Şirket adı"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
          <input
            v-model="company.title"
            type="text"
            class="w-full border rounded-lg px-3 py-2"
            placeholder="Sayfa başlığı"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
          <textarea
            v-model="company.description"
            rows="4"
            class="w-full border rounded-lg px-3 py-2"
            placeholder="Şirket hakkında detaylı açıklama"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Vizyon</label>
          <textarea
            v-model="company.vision"
            rows="3"
            class="w-full border rounded-lg px-3 py-2"
            placeholder="Şirket vizyonu"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Misyon</label>
          <textarea
            v-model="company.mission"
            rows="3"
            class="w-full border rounded-lg px-3 py-2"
            placeholder="Şirket misyonu"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Ekip Üyeleri -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium">Ekip Üyeleri</h3>
        <button
          @click="addTeamMember"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <i class="fas fa-plus mr-2"></i>
          Ekip Üyesi Ekle
        </button>
      </div>

      <div class="space-y-6">
        <div
          v-for="(member, index) in team"
          :key="index"
          class="border rounded-lg p-4"
        >
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-md font-medium">Ekip Üyesi #{{ index + 1 }}</h4>
            <button
              @click="removeTeamMember(index)"
              class="text-red-600 hover:text-red-700"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Ad Soyad</label>
              <input
                v-model="member.name"
                type="text"
                class="w-full border rounded-lg px-3 py-2"
                placeholder="Ad soyad"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Pozisyon</label>
              <input
                v-model="member.position"
                type="text"
                class="w-full border rounded-lg px-3 py-2"
                placeholder="Pozisyon"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Biyografi</label>
              <textarea
                v-model="member.bio"
                rows="3"
                class="w-full border rounded-lg px-3 py-2"
                placeholder="Kısa biyografi"
              ></textarea>
            </div>

            <!-- Fotoğraf -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Fotoğraf</label>
              <div class="flex items-center space-x-4">
                <img
                  v-if="member.photo"
                  :src="member.photo"
                  alt="Ekip üyesi"
                  class="h-20 w-20 object-cover rounded-full"
                >
                <button
                  @click="uploadPhoto(member)"
                  class="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Fotoğraf Yükle
                </button>
              </div>
            </div>

            <!-- Sosyal Medya -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Sosyal Medya</label>
              <div class="space-y-2">
                <div class="grid grid-cols-2 gap-4">
                  <input
                    v-model="member.social.linkedin"
                    type="text"
                    class="border rounded-lg px-3 py-2"
                    placeholder="LinkedIn profili"
                  >
                  <input
                    v-model="member.social.twitter"
                    type="text"
                    class="border rounded-lg px-3 py-2"
                    placeholder="Twitter profili"
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Kaydet Butonu -->
    <div class="flex justify-end">
      <button
        @click="saveChanges"
        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <i class="fas fa-save mr-2"></i>
        Değişiklikleri Kaydet
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDesignStore } from '@/stores/design'
import { useNotification } from '@/composables/useNotification'

const designStore = useDesignStore()
const { showNotification } = useNotification()

// Şirket bilgileri
const company = ref({
  name: 'Mercan Danışmanlık',
  title: 'Hakkımızda',
  description: 'İşletmelere özel danışmanlık hizmetleri sunuyoruz.',
  vision: 'Türkiye\'nin lider danışmanlık şirketi olmak.',
  mission: 'İşletmelerin büyümesine ve gelişmesine katkıda bulunmak.'
})

// Ekip üyeleri
const team = ref([
  {
    name: 'Ahmet Yılmaz',
    position: 'Genel Müdür',
    bio: 'Sektörde 15 yıllık deneyim.',
    photo: null,
    social: {
      linkedin: '',
      twitter: ''
    }
  }
])

// Ekip üyesi ekle/çıkar
const addTeamMember = () => {
  team.value.push({
    name: '',
    position: '',
    bio: '',
    photo: null,
    social: {
      linkedin: '',
      twitter: ''
    }
  })
}

const removeTeamMember = (index: number) => {
  team.value.splice(index, 1)
}

// Fotoğraf yükleme
const uploadPhoto = async (member: any) => {
  // Fotoğraf yükleme işlemi burada yapılacak
}

// Değişiklikleri kaydet
const saveChanges = async () => {
  try {
    await designStore.saveAboutDesign({
      company: company.value,
      team: team.value
    })
    
    showNotification({
      type: 'success',
      message: 'Değişiklikler başarıyla kaydedildi.'
    })
  } catch (error) {
    showNotification({
      type: 'error',
      message: 'Değişiklikler kaydedilirken bir hata oluştu.'
    })
  }
}
</script> 