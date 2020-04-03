import request from '@/utils/request'

// 获取漏洞列表
export function getBugList(params) {
  return request({
    url: '/bug/get_list',
    method: 'get',
    params
  })
}

// 获取用户列表
export function getUserList(params) {
  return request({
    url: '/admin/get_user_list',
    method: 'get',
    params
  })
}

// 管理员审核用户
export function validUser(data) {
  return request({
    url: '/admin/valid_user',
    method: 'post',
    data
  })
}
