import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/home.vue';
import Deliveries from './components/Deliveries/deliveries.vue';
import Profile from './components/User/profile.vue';
import Login from './components/User/login.vue';
import Register from './components/User/register.vue';
import Warehouse from './components/Deliveries/warehouse.vue';
import authGuard from './auth-guard';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/deliveries',
      name: 'deliveries',
      component: Deliveries,
      beforeEnter: authGuard,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: authGuard,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/warehousedetails',
      name: 'warehousedetails',
      component: Warehouse,
    },
    {
      path: '/facebook',
      beforeEnter() {
        window.location = 'https://www.facebook.com/';
      },
    },
    {
      path: '/twitter',
      beforeEnter() {
        window.location = 'https://twitter.com/';
      },
    },
    {
      path: '/linkedin',
      beforeEnter() {
        window.location = 'https://www.linkedin.com/';
      },
    },
    {
      path: '/instagram',
      beforeEnter() {
        window.location = 'https://www.instagram.com/';
      },
    },
  ],
  mode: 'history',
});
