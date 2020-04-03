import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getAvatar() {
  return Cookies.get('avatar')
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setAvatar(avatar) {
  return Cookies.set('avatar', avatar)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
