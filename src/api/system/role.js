import request from '@/utils/request'

// 查询角色列表
export function listRole(query) {
  return request({
    url: '/tob/role/getRoleList',
    method: 'get',
    params: query
  })
}

// 新增角色
export function addRole(data) {
  return request({
    url: '/tob/role/addRole',
    method: 'post',
    data: data
  })
}

// 修改角色
export function updateRole(data) {
  return request({
    url: '/tob/role/updateRole',
    method: 'post',
    data: data
  })
}

// 删除角色
export function delRole(userId) {
  return request({
    url: '/tob/role/delRole',
    method: 'get',
    params: {id:userId}
  })
}

// 查询角色权限tree
export function listRolePower(query) {
  return request({
    url: '/tob/role/getRolePower',
    method: 'get',
    params: query
  })
}

// 角色授权
export function saveRolePower(data) {
  return request({
    url: '/tob/role/saveRolePower',
    method: 'post',
    data: data
  })
}