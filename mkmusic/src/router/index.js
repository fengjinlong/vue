import Vue from 'vue'
import Router from 'vue-router'
const Recommend = (resolve) => {
  import('components/Recommend').then((module) => {
    resolve(module)
  })
}
const Singer = (resolve) => {
  import('components/Singer').then((module) => {
    resolve(module)
  })
}
const Rank = (resolve) => {
  import('components/rank/rank.vue').then((module) => {
    resolve(module)
  })
}
const Search = (resolve) => {
  import('components/Search').then((module) => {
    resolve(module)
  })
}
const SingerDetail = (resolve) => {
  import('components/singer-detail').then((module) => {
    resolve(module)
  })
}
const Disc = (resolve) => {
  import('components/disc/disc').then((module) => {
    resolve(module)
  })
}
const TopList = (resolve) => {
  import('components/top-list/topList').then((module) => {
    resolve(module)
  })
}
const UserCenter = (resolve) => {
  import('components/user-center/user-center').then((module) => {
    resolve(module)
  })
}
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
