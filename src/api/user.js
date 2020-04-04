import request from '@/utils/request'

export function logup(data) {
  return request({
    url: '/index/do_register',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/index/do_login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/get_userinfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function modifyPwd(data) {
  return request({
    url: '/user/change_password',
    method: 'post',
    data
  })
}
