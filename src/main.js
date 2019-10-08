// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import axios from 'axios'
Vue.prototype.axios = axios;

Vue.filter('setWH',(url,arg) => {
  return url.replace('/w\.h/',arg)
});

import Scroller from '@/components/Scroller'

Vue.component('Scroller',Scroller)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
