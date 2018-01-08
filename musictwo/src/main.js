import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'common/stylus/index.styl'
import fastclick from 'fastclick'
import vueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

fastclick.attach(document.body)

Vue.use(vueLazyload, {
  loading: require('common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
