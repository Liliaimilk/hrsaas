import { asyncRoutes, constantRoutes } from '@/router'
const state = {
  routes: constantRoutes // 将静态路由赋值给routes
}
const mutations = {
  setRoutes(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes] // 把静态和传入的路由都放入routes
  }
}
const actions = {
  filterRoutes(context, menus) {
    const route = []
    // 用户存在id时，返回数据menus，menus为当前id能访问的路由页面,
    menus.forEach(key => {
      // 通过遍历过滤出当前id能显示的动态页面
    //   item为页面的整个路由规则,所以item.name需与key一值
      route.push(...asyncRoutes.filter(item => item.name === key))
    })
    console.log(route)
    context.commit('setRoutes', route)
    return route
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
