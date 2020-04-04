import request from '@/utils/request'

// 获取漏洞列表
export function getBugList(params) {
  return request({
    url: '/bug/get_list',
    method: 'get',
    params
  })
}
