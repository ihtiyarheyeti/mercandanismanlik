import AdminLayout from '@/views/admin/AdminLayout.vue'
import DashboardView from '@/views/admin/DashboardView.vue'
import SiteSettingsView from '@/views/admin/settings/SiteSettingsView.vue'
import SeoManagementView from '@/views/admin/settings/SeoManagementView.vue'
import PagesView from '@/views/admin/settings/PagesView.vue'
import BlogManagementView from '@/views/admin/content/BlogManagementView.vue'
import ServicesView from '@/views/admin/content/ServicesView.vue'
import ReferencesView from '@/views/admin/content/ReferencesView.vue'
import ReadySitesView from '@/views/admin/sales/ReadySitesView.vue'
import OrdersView from '@/views/admin/sales/OrdersView.vue'
import PaymentsView from '@/views/admin/sales/PaymentsView.vue'
import CampaignsView from '@/views/admin/ads/CampaignsView.vue'
import PerformanceView from '@/views/admin/ads/PerformanceView.vue'
import BudgetView from '@/views/admin/ads/BudgetView.vue'
import UsersView from '@/views/admin/users/UsersView.vue'
import LogsView from '@/views/admin/users/LogsView.vue'

export const adminRoutes = {
  path: '/admin',
  name: 'admin',
  component: AdminLayout,
  meta: { requiresAuth: true },
  children: [
    {
      path: 'dashboard',
      name: 'admin-dashboard',
      component: DashboardView
    },
    {
      path: 'settings',
      name: 'admin-settings',
      component: SiteSettingsView
    },
    {
      path: 'seo',
      name: 'seo-management',
      component: SeoManagementView
    },
    {
      path: 'sayfalar',
      name: 'pages',
      component: PagesView
    },
    {
      path: 'blog',
      name: 'blog-management',
      component: BlogManagementView
    },
    {
      path: 'hizmetler',
      name: 'services',
      component: ServicesView
    },
    {
      path: 'referanslar',
      name: 'references',
      component: ReferencesView
    },
    {
      path: 'hazir-siteler',
      name: 'admin-hazir-siteler',
      component: ReadySitesView
    },
    {
      path: 'siparisler',
      name: 'orders',
      component: OrdersView
    },
    {
      path: 'odemeler',
      name: 'payments',
      component: PaymentsView
    },
    {
      path: 'kampanyalar',
      name: 'campaigns',
      component: CampaignsView
    },
    {
      path: 'performans',
      name: 'performance',
      component: PerformanceView
    },
    {
      path: 'butce',
      name: 'budget',
      component: BudgetView
    },
    {
      path: 'kullanicilar',
      name: 'users',
      component: UsersView
    },
    {
      path: 'loglar',
      name: 'logs',
      component: LogsView
    }
  ]
} 