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

// bug详情页
export function bugDetail(params) {
  return request({
    url: '/bug/get_detail',
    method: 'get',
    params
  })
}

// 获取漏洞信息变更日志
export function bugLogs(params) {
  return request({
    url: '/bug/get_edit_log',
    method: 'get',
    params
  })
}

// 获取漏洞信息变更详情
export function bugLogDetails(params) {
  return request({
    url: '/bug/get_edit_log_detail',
    method: 'get',
    params
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

// 获取用户文件列表
export function getUserFileList(params) {
  return request({
    url: '/user_file/get_list',
    method: 'get',
    params
  })
}