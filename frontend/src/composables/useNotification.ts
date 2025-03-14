import { ref } from 'vue'

interface NotificationOptions {
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
}

export const useNotification = () => {
  const notifications = ref<NotificationOptions[]>([])

  const showNotification = (options: NotificationOptions) => {
    const notification = {
      ...options,
      duration: options.duration || 3000
    }

    notifications.value.push(notification)

    setTimeout(() => {
      const index = notifications.value.indexOf(notification)
      if (index > -1) {
        notifications.value.splice(index, 1)
      }
    }, notification.duration)
  }

  return {
    notifications,
    showNotification
  }
} 