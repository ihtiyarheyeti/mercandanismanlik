import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/giris',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/BlogView.vue')
    },
    {
      path: '/blog/:slug',
      name: 'blog-detay',
      component: () => import('../views/BlogDetayView.vue')
    },
    {
      path: '/hakkimizda',
      name: 'hakkimizda',
      component: () => import('../views/HakkimizdaView.vue')
    },
    {
      path: '/iletisim',
      name: 'iletisim', 
      component: () => import('../views/IletisimView.vue')
    },
    {
      path: '/hizmetler',
      name: 'hizmetler',
      component: () => import('../views/HizmetlerView.vue')
    },
    {
      path: '/referanslar',
      name: 'referanslar',
      component: () => import('../views/ReferanslarView.vue')
    },
    {
      path: '/araclar',
      name: 'araclar',
      component: () => import('../views/AraclarView.vue')
    },
    {
      path: '/hazir-site',
      name: 'hazir-site',
      component: () => import('../views/HazirSiteView.vue')
    },
    {
      path: '/sss',
      name: 'sss',
      component: () => import('../views/SSSView.vue')
    },
    {
      path: '/cerez-politikasi',
      name: 'cerez-politikasi',
      component: () => import('../views/CerezPolitikasiView.vue')
    },
    {
      path: '/gizlilik-politikasi',
      name: 'gizlilik-politikasi',
      component: () => import('../views/GizlilikPolitikasiView.vue')
    },
    {
      path: '/kullanim-kosullari',
      name: 'kullanim-kosullari',
      component: () => import('../views/KullanimKosullariView.vue')
    },
    {
      path: '/kvkk',
      name: 'kvkk',
      component: () => import('../views/KVKKView.vue')
    },
    // Araçlar Routes
    {
      path: '/araclar/logo-olusturucu',
      name: 'logo-olusturucu',
      component: () => import('../views/araclar/LogoOlusturucuView.vue')
    },
    {
      path: '/araclar/seo-quiz',
      name: 'seo-quiz',
      component: () => import('../views/araclar/SeoQuizView.vue')
    },
    {
      path: '/araclar/sosyal-medya-planlama',
      name: 'sosyal-medya-planlama',
      component: () => import('../views/araclar/SosyalMedyaPlanlamaView.vue')
    },
    {
      path: '/araclar/renk-paleti',
      name: 'renk-paleti',
      component: () => import('../views/araclar/RenkPaletiView.vue')
    },
    {
      path: '/araclar/hiz-testi',
      name: 'hiz-testi',
      component: () => import('../views/araclar/HizTestiView.vue')
    },
    {
      path: '/araclar/site-analizi',
      name: 'site-analizi',
      component: () => import('../views/araclar/SiteAnaliziView.vue')
    },
    // Admin Routes
    {
      path: '/admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../views/admin/DashboardView.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

export default router 