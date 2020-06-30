// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入rem
import rem from "./assets/rem"
// 引入axios实例对象
import axios from "@/utils/request"
Vue.prototype.$axios=axios
// 引入store
import store from "@/store/index"
// 引入vant
import Vant from 'vant';
import 'vant/lib/index.css';
// 全局路由守卫
router.beforeEach((to,from,next)=>{
  if(to.hasOwnProperty("meta")){
    document.title=to.meta.title
  }
  next()
})
Vue.use(Vant);
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
