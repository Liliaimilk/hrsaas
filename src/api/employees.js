import request from '@/utils/request'

export function getemployInfo() {
  return request({
    url: '/sys/user/simple'
  })
}

// 获取员工列表
export function getemployeesInfo(params) {
  return request({
    url: '/sys/user',
    params
  })
}

// 删除员工
export function delUser(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

// 增加员工
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}
