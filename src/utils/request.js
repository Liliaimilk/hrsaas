import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({
  // / 如果执行 npm run dev  值为 /api 正确  /api 这个代理只是给开发环境配置的代理
  // 如果执行 npm run build 值为 /prod-api  没关系  运维应该在上线的时候 给你配置上 /prod-api的代理
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
service.interceptors.request.use()
// 响应拦截器
service.interceptors.response.use(response => {
  // 成功
  console.log(response, '13')
  const { data, success, message } = response.data
  if (success) {
    // console.log(this.success)
    console.log(data, 'token')
    return data
  } else {
    Message.error(message)// 提示错误信息
    console.log('21')
    return Promise.reject(new Error(message))
  }
}, error => { // 失败
  Message.error(error.message)// 提示错误信息
  return Promise.reject(error) // 抛出错误，从promise链中跳出，进入catch
})
export default service

