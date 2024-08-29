// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ApplyLoginPage from '../views/ApplyLogin.vue'
import LoginPage from '../views/Login.vue'
import MemberPage from '../views/Member.vue'
import ERAPAGE from '../views/ERA.vue'
import recordPAGE from '../views/Record.vue'
import DividendPage from '../views/Dividend.vue'
import AnalysisPage from '../views/Analysis.vue'
import uploadPage from '../views/upload.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/ApplyLogin',
    name: 'ApplyLogin',
    component: ApplyLoginPage,
  },
  {
    path: '/Login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/member',
    name: 'member',
    component: MemberPage,
  },
  {
    path: '/ERA',
    name: 'ERA',
    component: ERAPAGE,
  },
  {
    path: '/record',
    name: 'record',
    component: recordPAGE,
  },
  {
    path: '/Dividend',
    name: 'Dividend',
    compent: DividendPage,
  },
  {
    path: '/Analysis',
    name:  'Analysis',
    compent: AnalysisPage,
  },
  {
    path: '/upload',
    name: 'upload',
    compent: uploadPage,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
