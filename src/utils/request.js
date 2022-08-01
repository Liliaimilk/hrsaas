// import { config } from '@vue/test-utils'
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { setTimeStamp } from '@/utils/auth'
import { Message } from 'element-ui'
const timeStamp = 3600
const service = axios.create({
  // / 如果执行 npm run dev  值为 /api 正确  /api 这个代理只是给开发环境配置的代理
  // 如果执行 npm run build 值为 /prod-api  没关系  运维应该在上线的时候 给你配置上 /prod-api的代理
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    // 只有当页面存在token时才去验证token是否过期
    // 客户端主动验证token
    if (isCheckTimeStamp()) {
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('登录超时'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(response => {
  // 成功
  console.log(response, '13')
  const { data, success, message } = response.data
  if (success) {
    // console.log(this.success)
    // console.log(data, 'token')
    return data
  } else {
    Message.error(message)// 提示错误信息
    // console.log('21')
    return Promise.reject(new Error(message))
  }
}, error => { // 失败
  // 系统被动验证token过期
  if (error.response.data.code === 10002) {
    store.dispatch('user/logout')
    router.push('/login')
  } else {
    Message.error(error.message)// 提示错误信息
  }
  return Promise.reject(error) // 抛出错误，从promise链中跳出，进入catch
})
// 验证时间戳是否过期
function isCheckTimeStamp() {
  // var currrentTime = Date.now()
  // var srtTime = setTimeStamp()
  return (Date.now() - setTimeStamp()) / 1000 > timeStamp
}
export default service

