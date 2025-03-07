import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HizmetlerView from '../views/HizmetlerView.vue'
import AnalizView from '../views/AnalizView.vue'
import BlogView from '../views/BlogView.vue'
import IletisimView from '../views/IletisimView.vue'
import HakkimizdaView from '../views/HakkimizdaView.vue'
import ReferanslarView from '../views/ReferanslarView.vue'
import SSSView from '../views/SSSView.vue'
import HazirSiteView from '../views/HazirSiteView.vue'
import CerezPolitikasiView from '../views/CerezPolitikasiView.vue'
import LoginView from '../views/LoginView.vue'

// Araçlar
import AraclarView from '../views/AraclarView.vue'
import SiteAnaliziView from '../views/araclar/SiteAnaliziView.vue'
import HizTestiView from '../views/araclar/HizTestiView.vue'
import SeoQuizView from '../views/araclar/SeoQuizView.vue'
import RenkPaletiView from '../views/araclar/RenkPaletiView.vue'
import LogoOlusturucuView from '../views/araclar/LogoOlusturucuView.vue'
import SosyalMedyaPlanlamaView from '../views/araclar/SosyalMedyaPlanlamaView.vue'

// Admin paneli importları
import AdminLayout from '@/views/admin/AdminLayout.vue'
import DashboardView from '@/views/admin/DashboardView.vue'
import DesignView from '@/views/admin/design/DesignView.vue'
import HomeDesignView from '@/views/admin/design/pages/HomeDesignView.vue'
import ServicesDesignView from '@/views/admin/design/pages/ServicesDesignView.vue'
import ToolsDesignView from '@/views/admin/design/pages/ToolsDesignView.vue'
import BlogDesignView from '@/views/admin/design/pages/BlogDesignView.vue'
import AboutDesignView from '@/views/admin/design/pages/AboutDesignView.vue'
import ContactDesignView from '@/views/admin/design/pages/ContactDesignView.vue'
import ReferencesDesignView from '@/views/admin/design/pages/ReferencesDesignView.vue'
import FAQDesignView from '@/views/admin/design/pages/FAQDesignView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        guest: true
      }
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/hizmetler',
      name: 'hizmetler',
      component: () => import(/* webpackChunkName: "hizmetler" */ '../views/HizmetlerView.vue')
    },
    {
      path: '/araclar',
      name: 'araclar',
      component: () => import(/* webpackChunkName: "araclar" */ '../views/AraclarView.vue'),
      children: [
        {
          path: 'site-analizi',
          name: 'site-analizi',
          component: () => import(/* webpackChunkName: "site-analizi" */ '../views/araclar/SiteAnaliziView.vue')
        },
        {
          path: 'hiz-testi',
          name: 'hiz-testi',
          component: () => import(/* webpackChunkName: "hiz-testi" */ '../views/araclar/HizTestiView.vue')
        },
        {
          path: 'seo-quiz',
          name: 'seo-quiz',
          component: () => import(/* webpackChunkName: "seo-quiz" */ '../views/araclar/SeoQuizView.vue')
        },
        {
          path: 'renk-paleti',
          name: 'renk-paleti',
          component: () => import(/* webpackChunkName: "renk-paleti" */ '../views/araclar/RenkPaletiView.vue')
        },
        {
          path: 'logo-olusturucu',
          name: 'logo-olusturucu',
          component: () => import(/* webpackChunkName: "logo-olusturucu" */ '../views/araclar/LogoOlusturucuView.vue')
        },
        {
          path: 'sosyal-medya-planlama',
          name: 'sosyal-medya-planlama',
          component: () => import(/* webpackChunkName: "sosyal-medya" */ '../views/araclar/SosyalMedyaPlanlamaView.vue')
        }
      ]
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import(/* webpackChunkName: "blog" */ '../views/BlogView.vue')
    },
    {
      path: '/blog/:id',
      name: 'blog-detay',
      component: () => import(/* webpackChunkName: "blog-detay" */ '../views/BlogDetayView.vue')
    },
    {
      path: '/iletisim',
      name: 'iletisim',
      component: () => import(/* webpackChunkName: "iletisim" */ '../views/IletisimView.vue')
    },
    {
      path: '/hakkimizda',
      name: 'hakkimizda',
      component: () => import(/* webpackChunkName: "hakkimizda" */ '../views/HakkimizdaView.vue')
    },
    {
      path: '/referanslar',
      name: 'referanslar',
      component: () => import(/* webpackChunkName: "referanslar" */ '../views/ReferanslarView.vue')
    },
    {
      path: '/sss',
      name: 'sss',
      component: () => import(/* webpackChunkName: "sss" */ '../views/SSSView.vue')
    },
    {
      path: '/hazir-site',
      name: 'hazir-site',
      component: () => import(/* webpackChunkName: "hazir-site" */ '../views/HazirSiteView.vue')
    },
    {
      path: '/cerez-politikasi',
      name: 'cerez-politikasi',
      component: () => import(/* webpackChunkName: "cerez" */ '../views/CerezPolitikasiView.vue')
    },
    {
      path: '/kvkk',
      name: 'kvkk',
      component: () => import(/* webpackChunkName: "kvkk" */ '../views/KVKKView.vue')
    },
    {
      path: '/gizlilik-politikasi',
      name: 'gizlilik-politikasi',
      component: () => import(/* webpackChunkName: "gizlilik" */ '../views/GizlilikPolitikasiView.vue')
    },
    {
      path: '/kullanim-kosullari',
      name: 'kullanim-kosullari',
      component: () => import(/* webpackChunkName: "kullanim" */ '../views/KullanimKosullariView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminLayout,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: DashboardView
        },
        // Site Yönetimi
        {
          path: 'site-ayarlari',
          name: 'site-settings',
          component: () => import('@/views/admin/settings/SiteSettingsView.vue')
        },
        {
          path: 'seo',
          name: 'admin-seo-settings',
          component: () => import('@/views/admin/settings/SeoManagementView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'sayfalar',
          name: 'pages',
          component: () => import('@/views/admin/settings/PagesView.vue')
        },
        // İçerik Yönetimi
        {
          path: 'blog',
          name: 'blog-management',
          component: () => import('@/views/admin/content/BlogManagementView.vue')
        },
        {
          path: 'hizmetler',
          name: 'services',
          component: () => import('@/views/admin/content/ServicesView.vue')
        },
        {
          path: 'referanslar',
          name: 'references',
          component: () => import('@/views/admin/content/ReferencesView.vue')
        },
        // Web Tasarım Satış
        {
          path: 'hazir-siteler',
          name: 'admin-hazir-siteler',
          component: () => import('@/views/admin/sales/ReadySitesView.vue')
        },
        {
          path: 'siparisler',
          name: 'orders',
          component: () => import('@/views/admin/sales/OrdersView.vue')
        },
        {
          path: 'odemeler',
          name: 'payments',
          component: () => import('@/views/admin/sales/PaymentsView.vue')
        },
        // Reklam Yönetimi
        {
          path: 'kampanyalar',
          name: 'campaigns',
          component: () => import('@/views/admin/ads/CampaignsView.vue')
        },
        {
          path: 'performans',
          name: 'performance',
          component: () => import('@/views/admin/ads/PerformanceView.vue')
        },
        {
          path: 'butce',
          name: 'budget',
          component: () => import('@/views/admin/ads/BudgetView.vue')
        },
        // Kullanıcı & Güvenlik
        {
          path: 'kullanicilar',
          name: 'users',
          component: () => import('@/views/admin/users/UsersView.vue')
        },
        {
          path: 'loglar',
          name: 'logs',
          component: () => import('@/views/admin/users/LogsView.vue')
        }
      ],
      meta: {
        requiresAuth: true,
        isAdmin: true
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import(/* webpackChunkName: "not-found" */ '../views/NotFoundView.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Global navigation guard ekleyelim
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  // Admin sayfaları için yetki kontrolü
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next('/login')
    } else {
      next()
    }
  } 
  // Login sayfası için kontrol
  else if (to.matched.some(record => record.meta.guest)) {
    if (token) {
      next('/admin')
    } else {
      next()
    }
  }
  else {
    next()
  }
})

export default router
