import request from '../request'

// 登录
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getUserInfo(params) {
  return request({
    url: '/user/info',
    method: 'get',
    params
  })
}

// 获取菜单信息
export function getMenuInfo() {
  return request({
    url: '/tob/user/getMenuList',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/tob/user/logOut',
    method: 'get'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    method: 'get'
  })
}
