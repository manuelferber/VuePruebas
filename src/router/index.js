import Vue from 'vue'
import VueRouter from 'vue-router'
import Formulario from '../views/Formulario.vue'
import Listado from '../views/Listado.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Listado',
    component: Listado
  },
  {
    path: '/crear',
    name: 'Formulario',
    component: Formulario
  }
]

const router = new VueRouter({
  routes
})

export default router
