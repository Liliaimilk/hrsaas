import request from '@/utils/request'

export function login(data) {
  return request({
    method: 'post',
    url: '/sys/login',
    data
  })
}

export function getInfo() {
  return request({
    method: 'post',
    url: '/sys/profile'
  })
}

// 获取用户的基本信息，当前为了获取头像
export function getallUser(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

export function logout() {

}
