import request from '@/utils/request'

export function getemployInfo() {
  return request({
    url: '/sys/user/simple'
  })
}
