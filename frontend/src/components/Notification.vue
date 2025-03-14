<template>
  <div class="fixed top-4 right-4 z-50">
    <TransitionGroup name="notification" tag="div" class="space-y-2">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="p-4 rounded-lg shadow-lg max-w-md"
        :class="{
          'bg-green-500 text-white': notification.type === 'success',
          'bg-red-500 text-white': notification.type === 'error',
          'bg-yellow-500 text-white': notification.type === 'warning',
          'bg-blue-500 text-white': notification.type === 'info'
        }"
      >
        <div class="flex items-center">
          <i
            class="fas mr-2"
            :class="{
              'fa-check-circle': notification.type === 'success',
              'fa-exclamation-circle': notification.type === 'error',
              'fa-exclamation-triangle': notification.type === 'warning',
              'fa-info-circle': notification.type === 'info'
            }"
          ></i>
          <p>{{ notification.message }}</p>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useNotification } from '@/composables/useNotification'

const { notifications } = useNotification()
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style> 