import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'common/stylus/index.styl'
import fastclick from 'fastclick'
import vueLazyload from 'vue-lazyload'
import $ from 'jquery'

Vue.config.productionTip = false

fastclick.attach(document.body)

Vue.use(vueLazyload, {
  loading: require('common/image/default.png')
})
Vue.directive('ff', (el) => {
  $(document).ready(function () {
    $(el).focus()
  })
})
// Vue.directive('focus', {
//   // 当被绑定的元素插入到 DOM 中时……
//   inserted: function (el) {
//     // 聚焦元素
//     el.focus()
//   }
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
