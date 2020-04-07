import request from '@/utils/request'

// 获取漏洞列表
export function getBugList(params) {
  return request({
    url: '/bug/get_list',
    method: 'get',
    params
  })
}

// 删除漏洞
export function deleteBug(data) {
  return request({
    url: '/bug/del_bug',
    method: 'post',
    data
  })
}

// 添加bug
export function addBug(data) {
  return request({
    url: '/bug/add_bug',
    method: 'post',
    data
  })
}

// 修改bug
export function editBug(data) {
  return request({
    url: '/bug/edit_bug',
    method: 'post',
    data
  })
}

// 检查漏洞名称是否重复
export function checkName(params) {
  return request({
    url: '/bug/check_name',
    method: 'get',
    params
  })
}
