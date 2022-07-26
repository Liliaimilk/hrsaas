import request from '@/utils/request'

// 获取部门信息
export function getDepartInfo() {
  return request({
    url: '/company/department'
  })
}
