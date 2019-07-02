import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins/css/row.css'
// import '@/plugins/css/col.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import ElTestUI from '@/plugins/index.js'
import '@/plugins/css/scss/col.scss'
import '@/plugins/css/layout.css'

// 导入组件
Vue.use(ElTestUI);
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
