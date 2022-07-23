import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
const state = {
  token: getToken()
}

const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = null // 删除vuex的token
    removeToken() // 先清除 vuex  再清除缓存 vuex和 缓存数据的同步
  }
}

const actions = {
  async login(context, data) {
    const results = await login(data)
    console.log(results, '22')
    context.commit('setToken', results)
  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions

}
