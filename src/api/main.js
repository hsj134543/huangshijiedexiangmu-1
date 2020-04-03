import request from '@/utils/request'

export function getBugList(params) {
  return request({
    url: '/bug/get_list',
    method: 'get',
    params
  })
}
