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
        await store.dispatch('user/getInfo', store.getters.userId)
      }
      next()
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
