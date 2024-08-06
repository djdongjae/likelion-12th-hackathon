import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MainView from '../views/Main.vue'
// import FoodCheckView from '../views/FoodCheckView.vue'
import FoodView from '../views/Food.vue'
import FoodAddView from '../views/FoodAddView.vue'
import WeightView from '../views/WeightView.vue'
import FitnessView from '../views/FitnessView.vue'
import SignupView from '../views/SignupView.vue'

const routes = [
  {
    path: '/',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'SignupView',
    component: SignupView
  },
  {
    path: '/main',
    name: 'MainView',
    component: MainView
  },
  {
    path: '/food',
    name: 'FoodView',
    component: FoodView
  },
  {
    path: '/food-add',
    name: 'FoodAddView',
    component: FoodAddView
  },
  {
    path: '/weight',
    name: 'WeightView',
    component: WeightView
  },
  {
    path: '/fitness',
    name: 'FitnessView',
    component: FitnessView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
