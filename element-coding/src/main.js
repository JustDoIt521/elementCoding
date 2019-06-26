import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins/css/row.css'
import '@/plugins/css/col.css'
import install from '@/plugins/index.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

// 导入组件
install(Vue)

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
