import HttpClient from './fetch-meta/index.js';
import { getConfig } from './yaml.js';

const uiConfig = await getConfig('ui') // 获取指定yaml类型的配置

// 状态码
const CodeStatus = {
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  RATE_LIMITED: 429,
  INTER_SERVER_ERROR: 500,
}
// 处理错误状态码
const ErrorCodes = [
  CodeStatus.BAD_REQUEST,
  CodeStatus.FORBIDDEN,
  CodeStatus.NOT_FOUND,
  CodeStatus.RATE_LIMITED,
  CodeStatus.INTER_SERVER_ERROR,
]

const uiHttp = new HttpClient(uiConfig.url, { headers: { ...(uiConfig.requestHeaders || {}) }})

// 请求拦截器
uiHttp.useRequestInterceptor(async (config, data) => {
  return config
})

// 响应拦截器
uiHttp.useResponseInterceptor(async (data) => {
  if (ErrorCodes.includes(data.status)) {
    throw new Error(data)
  }
  return data
})

export default uiHttp
