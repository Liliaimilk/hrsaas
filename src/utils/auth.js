import Cookies from 'js-cookie'

const TokenKey = 'hr-saas-111-token'
const timeKey = 'hrsaas-timestamp-key'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 主动客户端处理token超时
// 获取时间戳
export function getTimeStamp() {
  return Cookies.get(timeKey)
}

// 导入时间戳
export function setTimeStamp() {
  return Cookies.set(timeKey, Date.now())
}
