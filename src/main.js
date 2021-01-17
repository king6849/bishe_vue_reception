import Vue from 'vue'
import App from './App.vue'

import router from "@/router/router";

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI)

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')


