import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config'

const service = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
})

// 请求拦截
service.interceptors.request.use(
  (config) => {
    // 添加token等
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 响应拦截
service.interceptors.response.use(
  (response) => {
    const { data } = response
    return data
  },
  (err) => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          break
        case 401:
          err.message = '未授权的访问'
          break
        default:
          err.message = '其他错误信息'
      }
    }
    return Promise.reject(err)
  }
)

const request = (requestObj) => {
  const { url, method, data, timeout, params } = requestObj
  return service({
    url,
    method: method || 'post',
    data,
    timeout: timeout || 10000,
    params,
  })
}

export default request
