const types = {
  0: 'admin',
  1: '普通用户'
}

const statuss = {
  0: '无效',
  1: '正常',
  2: '锁定'
}

const userTableKeys = [
  {
    prop: 'uid',
    label: 'UID',
    type: 'text',
    width: '80'
  },
  {
    prop: 'username',
    label: '用户名',
    type: 'text'
  },
  {
    prop: 'email',
    label: '邮箱',
    type: 'text'
  },
  {
    prop: 'name',
    label: '姓名',
    type: 'text'
  },
  {
    prop: 'type',
    label: '用户类别',
    type: 'map'
  },
  {
    prop: 'status',
    label: '用户状态',
    type: 'map'
  },
  {
    prop: 'reg_time',
    label: '注册时间',
    type: 'date'
  },
  {
    prop: 'reg_ip',
    label: '注册IP',
    type: 'text'
  },
  {
    prop: 'last_login_time',
    label: '最后登录时间',
    type: 'date'
  },
  {
    prop: 'last_login_ip',
    label: '最后登录IP',
    type: 'text'
  }
]

export {
  types,
  statuss,
  userTableKeys
}
