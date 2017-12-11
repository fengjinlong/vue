import Vue from 'vue'
import Router from 'vue-router'
const Recommend = r => require.ensure([], () => r(require('components/Recommend')))
const Singer = r => require.ensure([], () => r(require('components/Singer')))
const Rank = r => require.ensure([], () => r(require('components/rank/rank.vue')))
const Search = r => require.ensure([], () => r(require('components/Search')))
const SingerDetail = r => require.ensure([], () => r(require('components/singer-detail')))
const Disc = r => require.ensure([], () => r(require('components/disc/disc')))
const TopList = r => require.ensure([], () => r(require('components/top-list/topList')))
const UserCenter = r => require.ensure([], () => r(require('components/user-center/user-center')))

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
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
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/user',
      component: UserCenter
    }
  ]
})
