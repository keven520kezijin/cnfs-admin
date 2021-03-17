import request from '@/utils/request'

// export function login(data) {
//   return request({
//     url: '/vue-element-admin/user/login',
//     method: 'post',
//     data
//   })
// }

// 47.104.20.233:8089/cnfs-platform/login  http://192.168.3.66:8088/
export function login(data) {
  return request({
    url: `/cnfs-platform/userin/login`,
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'http://localhost:9527/dev-api/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

// export function logout() {
//   return request({
//     url: '/vue-element-admin/user/logout',
//     method: 'post'
//   })
// }

// http://47.104.20.233:8089/cnfs-platform/userin/loginout
export function logout() {
  return request({
    url: '/cnfs-platform/userin/loginout',
    method: 'get'
  })
}
