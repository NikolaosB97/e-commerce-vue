import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/pages/Home.vue';
import LoginForm from '@/components/auth/Login.vue';
import RegisterForm from '@/components/auth/Register.vue';
import UserDashboard from '@/components/pages/UserDashboard.vue';
import ProductFilters from '@/components/shop/ProductFilters.vue';
import Cart from '@/components/shop/Cart.vue';
import UserSettings from '@/components/user/UserSettings.vue';
import AdminUsers from '@/components/admin/AdminUsers.vue';
import AdminOrders from '@/components/admin/AdminOrders.vue';
import ShopHome from '@/components/pages/ShopHome.vue';
import AdminRequests from '@/components/admin/AdminRequests.vue';
import WorkWithUs from '@/components/pages/WorkWithUs.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginForm },
  { path: '/register', component: RegisterForm },
  { path: '/dashboard', component: UserDashboard },
  { path: '/products', component: ProductFilters },
  { path: '/cart', component: Cart },
  { path: '/settings', component: UserSettings },
  { path: '/shop', component: ShopHome },
  { path: '/admin/users', component: AdminUsers, meta: { requiresAdmin: true } },
  { path: '/admin/orders', component: AdminOrders, meta: { requiresAdmin: true } },
  { path: '/admin/requests', component: AdminRequests, meta: { requiresAdmin: true } },
  { path: '/work-with-us', component: WorkWithUs }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user')); 
  const isAdmin = user && user.IsAdmin === true; 

  if (to.matched.some(record => record.meta.requiresAdmin) && !isAdmin) {

    next('/login');
  } else {
    next();
  }
});

export default router;