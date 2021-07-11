import Vue from 'vue'
import VueRouter from 'vue-router'
import homepage from '../components/homepage.vue'
import submenu1_1 from '../components/submenu1_1.vue'
import submenu1_2 from '../components/submenu1_2.vue'
import submenu1_3 from '../components/submenu1_3.vue'
import submenu1_4 from '../components/submenu1_4.vue'
import submenu1_5 from '../components/submenu1_5.vue'
import submenu1_6 from '../components/submenu1_6.vue'
import submenu1_7 from '../components/submenu1_7.vue'
import submenu1_8 from '../components/submenu1_8.vue'
import submenu1_9 from '../components/submenu1_9.vue'
import submenu1_10 from '../components/submenu1_10.vue'
import submenu1_11 from '../components/submenu1_11.vue'
import submenu1_12 from '../components/submenu1_12.vue'
import submenu1_13 from '../components/submenu1_13.vue'
import submenu1_14 from '../components/submenu1_14.vue'
import submenu1_15 from '../components/submenu1_15.vue'
import submenu1_16 from '../components/submenu1_16.vue'
import submenu1_17 from '../components/submenu1_17.vue'
import submenu4_1 from '../components/submenu4_1.vue'
import submenu3_2 from '../components/submenu3_2.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
	  {path:'/',redirect:'/home'},
	  {
		  path:'/home',component:homepage,
		  children:[
			  {path:'/1-1',component:submenu1_1,},
			  {path:'/1-2',component:submenu1_2,},
			  {path:'/1-3',component:submenu1_3,},
			  {path:'/1-4',component:submenu1_4,},
			  {path:'/1-5',component:submenu1_5,},
			  {path:'/1-6',component:submenu1_6,},
			  {path:'/1-7',component:submenu1_7,},
			  {path:'/1-8',component:submenu1_8,},
			  {path:'/1-9',component:submenu1_9,},
			  {path:'/1-10',component:submenu1_10,},
			  {path:'/1-11',component:submenu1_11,},
			  {path:'/1-12',component:submenu1_12,},
			  {path:'/1-13',component:submenu1_13,},
			  {path:'/1-14',component:submenu1_14,},
			  {path:'/1-15',component:submenu1_15,},
			  {path:'/1-16',component:submenu1_16,},
			  {path:'/1-17',component:submenu1_17,},
			  {path:'/4-1',component:submenu4_1,},
			  {path:'/3-2',component:submenu3_2,}
			  
			  ]
	  
	  
	  },
	  
	  
  ]
})

export default router
