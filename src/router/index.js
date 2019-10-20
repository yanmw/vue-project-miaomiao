import Vue from 'vue'
import Router from 'vue-router'
import movieRouter from './movie'
import mineRouter from './mine'
import cinemaRouter from './cinema'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  base: 'miaomiao',/*域名后加个喵喵进行访问*/
  routes: [
    movieRouter,
    mineRouter,
    cinemaRouter,
    {
      path: '/*',
      redirect: '/movie'
    }
  ]
})
