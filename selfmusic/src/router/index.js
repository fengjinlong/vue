import Vue from 'vue'
import Router from 'vue-router'
const Recommend = r => require.ensure([], () => r(require('components/Recommend')))
const Singer = r => require.ensure([], () => r(require('components/Singer')))
const Rank = r => require.ensure([], () => r(require('components/Rank')))
const Search = r => require.ensure([], () => r(require('components/Search')))
const SingerDetail = r => require.ensure([], () => r(require('components/singerdetail')))

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
