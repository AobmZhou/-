import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './plugins/echarts.js'
import * as echarts from "echarts"
import ElementUI from 'element-ui';
Vue.prototype.echarts = echarts
Vue.use(ElementUI);
Vue.use(echarts)

Vue.config.productionTip = false




// // The Vue build version to load with the `import` command
// // (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App.vue'
// import router from './router'
import store from './vuex/store.js';

import axios from 'axios'; 
import 'echarts-gl';
import 'babel-polyfill'

// Vue.prototype.echarts = Echarts

// //接口入口设置
Vue.prototype.$http = axios
// if (process.env.NODE_ENV == 'development'){
//   Axios.defaults.baseURL = '/UnitOverviewMap/bsapi'
// } else if (process.env.NODE_ENV == 'production') {
//   Axios.defaults.baseURL = config.IPgroup.requestIP + '/UnitOverviewMap/bsapi'
//  //Axios.defaults.baseURL = 'http://127.0.0.1/api'
// }

axios.defaults.headers.post['Content-Type'] = 'application/json';

// Vue.config.productionTip = false
// /* eslint-disable no-new */
new Vue({
	store,
	router,
	el:'#app',
	render: h => h(App)
}).$mount('#app')
// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: { App },
//   template: '<App/>'
// })
