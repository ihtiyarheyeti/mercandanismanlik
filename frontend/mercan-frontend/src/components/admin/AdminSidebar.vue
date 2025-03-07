<template>
  <aside class="bg-gray-800 text-white w-64 min-h-screen">
    <div class="p-4">
      <h2 class="text-xl font-semibold">Admin Panel</h2>
    </div>
    <nav class="mt-4">
      <router-link
        to="/admin/dashboard"
        class="block px-4 py-2 hover:bg-gray-700"
        active-class="bg-gray-700"
      >
        Dashboard
      </router-link>
      <router-link
        to="/admin/pages"
        class="block px-4 py-2 hover:bg-gray-700"
        active-class="bg-gray-700"
      >
        Sayfa Yönetimi
      </router-link>
      <router-link
        to="/admin/settings"
        class="block px-4 py-2 hover:bg-gray-700"
        active-class="bg-gray-700"
      >
        Site Ayarları
      </router-link>
      <router-link
        to="/admin/seo"
        class="block px-4 py-2 hover:bg-gray-700"
        active-class="bg-gray-700"
      >
        SEO Yönetimi
      </router-link>
    </nav>
  </aside>
</template> 