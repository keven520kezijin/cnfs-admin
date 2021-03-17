import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

switch (process.env.NODE_ENV) {
  case 'production_uat':
    window.__baseUrl = ''
    // window.__baseUrl = '//app-uat.baoinfo.cn'
    break
  case 'production':
    window.__baseUrl = ''
    // window.__baseUrl = '//pkufi-perftest.zhongan.io'
    break
  case 'development':
    // window.__baseUrl = ''
    window.__baseUrl = 'http://47.104.20.233:8089'
    break
  default:
    window.__baseUrl = ''
}

console.log('window.__baseUrl: ', window.__baseUrl)

axios.defaults.baseURL = window.__baseUrl

console.log('axios.defaults: ', axios.defaults)

// create an axios instance
const service = axios.create({
  baseURL: window.__baseUrl, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // console.log('request-response: ', response)
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code && res.code !== '200' && res.code !== 200 && res.code !== '600') {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // alert('kv')
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
