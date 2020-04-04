import request from '@/utils/request'

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

// 管理员锁定用户
export function lockUser(data) {
  return request({
    url: '/admin/lock_user',
    method: 'post',
    data
  })
}

// 管理员解锁用户
export function unlockUser(data) {
  return request({
    url: '/admin/unlock_user',
    method: 'post',
    data
  })
}
