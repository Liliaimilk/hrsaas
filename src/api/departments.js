import request from '@/utils/request'

// 获取部门信息
export function getDepartInfo() {
  return request({
    url: '/company/department'
  })
}

// 删除部门信息
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}

// 新增部门
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

// 部门详情
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}

/**
 * 编辑部门
 *
 * ***/
export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
