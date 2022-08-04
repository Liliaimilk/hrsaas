import router from '@/router'
import store from '@/store'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css/'

// 路由前置守卫
const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  nprogress.start()
  //   白名单
  if (store.getters.token) {
    console.log('1')
    if (to.path === '/login') {
      next('/')
    } else {
      // 调用获取信息接口
    //  当前状态为具有token时获取个人基本信息
      if (!store.getters.userId) {
        const { roles } = await store.dispatch('user/getInfo', store.getters.userId)
        // 获取信息的同时调用方法，将当前id身份显示的路由页面传入
        const route = await store.dispatch('permission/filterRoutes', roles.menus)
        // 添加动态路由到路由表,页面name属性需与route名字一致
        // 404 page must be placed at the end !!!
        router.addRoutes([...route, { path: '*', redirect: '/404', hidden: true }])
        // 添加完动态路由之后 必须用to.path(地址)
        next(to.path) // 相当于跳到对应的地址  相当于多做一次跳转 为什么要多做一次跳转
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  nprogress.done()// 手动退出
})
router.afterEach(() => {
  nprogress.done()
})
