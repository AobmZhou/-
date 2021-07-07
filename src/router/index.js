import Vue from 'vue'
import VueRouter from 'vue-router'
import homepage from '../components/homepage.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
	  {path:'/',redirect:'/home'},
	  {path:'/home',component:homepage}
	  
	  
  ]
})

export default router
