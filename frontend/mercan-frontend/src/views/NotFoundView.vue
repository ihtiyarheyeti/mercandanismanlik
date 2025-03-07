<template>
  <div class="min-h-[60vh] flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p class="text-xl text-gray-600 mb-8">Aradığınız sayfa bulunamadı.</p>
      <RouterLink 
        to="/" 
        class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Ana Sayfaya Dön
      </RouterLink>
    </div>
  </div>
</template> 