import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VuelazyLoad from 'vue-lazyload'
import './common/stylus/index.styl'
Vue.config.productionTip = false

fastclick.attach(document.body)
/* eslint-disable no-new */
Vue.use(VuelazyLoad, {
  loading: require('common/image/default.png')
})
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
