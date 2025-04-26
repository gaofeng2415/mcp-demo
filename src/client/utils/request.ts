import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

enum HttpStatus {
  OK = 200,
  UN_AUTH = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

// 创建自定义实例
const service: AxiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_OPENAI_BASE_URL, // 从环境变量获取基础URL
  timeout: 60 * 1000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    // 在发送请求之前做些什么
    // const token = localStorage.getItem('token')
    // if (token && config.headers) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === HttpStatus.OK) {
      return response
    }
    return Promise.reject(response)
  },
  (error) => {
    // 对响应错误做点什么
    if (error.response) {
      switch (error.response.status) {
        case HttpStatus.UN_AUTH:
          // 处理未授权
          break
        case HttpStatus.FORBIDDEN:
          // 处理禁止访问
          break
        case HttpStatus.NOT_FOUND:
          // 处理未找到
          break
        case HttpStatus.SERVER_ERROR:
          // 处理服务器错误
          break
        default:
          // 处理其他错误
      }
    }
    return Promise.reject(error)
  }
)

export default service
