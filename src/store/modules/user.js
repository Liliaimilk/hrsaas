import { getToken, setToken, removeToken, getTimeStamp } from '@/utils/auth'
import { login, getInfo, getallUser } from '@/api/user'
import { resetRouter } from '@/router'
// import store from '@/store'
const state = {
  token: getToken(),
  // 为什么声明对象，不声明null
  userInfo: {}
}

const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = null // 删除vuex的token
    removeToken() // 先清除 vuex  再清除缓存 vuex和 缓存数据的同步
  },
  removeUserInfo(state) {
    state.userInfo = {}
  },
  getInfo(state, results) {
    state.userInfo = results
  }

}

const actions = {
  // 获取token
  async login(context, data) {
    const results = await login(data)
    // console.log(results, '22')
    context.commit('setToken', results)
  },
  // 获取用户信息
  async getInfo(context) {
    // context.commit('removeToken')
    const results = await getInfo()
    // 因为要传入id所以要在获取id之后调用
    console.log(results, '40')
    const msg = await getallUser(results.userId)
    // 合并对象
    // const obj = { ...msg, ...results }
    context.commit('getInfo', { ...msg, ...results })
    // 返回数据
    return results
  },
  // 退出登录
  logout(context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
    // 跨模块调用方法需加上{ root: true }
    context.commit('permission/setRoutes', [], { root: true })
    // 重置路由
    resetRouter()
    // 重新注入时间戳
    getTimeStamp()
  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions

}
