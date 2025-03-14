<!-- Düzenlenebilir İçerik Bileşeni -->
<template>
  <div class="editable-content relative group">
    <!-- Normal Görünüm -->
    <component
      :is="tag"
      v-if="!isEditing"
      :class="[
        contentClass,
        { 'cursor-pointer hover:bg-gray-100': editModeStore.isEditMode }
      ]"
      @click="startEditing"
      v-html="modelValue"
    />

    <!-- Düzenleme Modu -->
    <div v-if="isEditing" class="flex flex-col gap-2">
      <textarea
        v-if="type === 'text' || type === 'html'"
        v-model="editedContent"
        :class="[
          contentClass,
          'w-full p-2 border rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
        ]"
        :rows="type === 'html' ? 5 : 1"
      />
      
      <div v-else-if="type === 'image'" class="flex items-center gap-2">
        <input
          type="file"
          accept="image/*"
          @change="handleImageUpload"
          class="hidden"
          ref="fileInput"
        />
        <button
          @click="$refs.fileInput.click()"
          class="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
        >
          Resim Seç
        </button>
        <span class="text-sm text-gray-500">veya</span>
        <input
          v-model="editedContent"
          type="text"
          placeholder="Resim URL'si"
          class="flex-1 p-2 border rounded"
        />
      </div>

      <!-- Düzenleme Butonları -->
      <div class="flex justify-end gap-2 mt-2">
        <button
          @click="cancelEditing"
          class="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
        >
          İptal
        </button>
        <button
          @click="saveChanges"
          class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Kaydet
        </button>
      </div>
    </div>

    <!-- Düzenleme İkonu -->
    <button
      v-if="editModeStore.isEditMode && !isEditing"
      class="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 p-1 bg-blue-500 text-white rounded-full shadow-lg transition-opacity"
      @click="startEditing"
    >
      <i class="fas fa-pencil-alt text-xs"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useEditModeStore } from '@/stores/editMode'

const props = defineProps<{
  modelValue: string
  contentId: string
  type?: 'text' | 'html' | 'image'
  tag?: string
  contentClass?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const editModeStore = useEditModeStore()
const isEditing = ref(false)
const editedContent = ref(props.modelValue)

const startEditing = () => {
  if (editModeStore.isEditMode) {
    isEditing.value = true
    editedContent.value = props.modelValue
  }
}

const cancelEditing = () => {
  isEditing.value = false
  editedContent.value = props.modelValue
}

const saveChanges = async () => {
  emit('update:modelValue', editedContent.value)
  editModeStore.updateContent(props.contentId, editedContent.value)
  const success = await editModeStore.saveChanges()
  if (success) {
    isEditing.value = false
  }
}

const handleImageUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      editedContent.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}
</script> 