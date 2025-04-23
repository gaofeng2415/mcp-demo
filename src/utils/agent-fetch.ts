import HttpClient from './fetch-meta/index.ts';
import { getConfig } from './yaml.ts';

const agentConfig = await getConfig('agent') // 获取指定yaml类型的配置
const agentHttp = new HttpClient(agentConfig?.url, { headers: { ...(agentConfig?.requestHeaders || {}) }})

agentHttp.useRequestInterceptor(async (config, data) => {
  if (data.messages) {
    const arr = Array.isArray(data.messages) ? data.messages : [data.messages]
    const messages = arr.map((text: string) => ({ role: 'user', content: text }))
    data.messages = messages
  }
  data.model = agentConfig?.name; // 声明模型名称
  return config
})

// 响应拦截器
// 处理响应数据，返回数据中的id字段，如果没有id，代表请求失败，抛出错误
agentHttp.useResponseInterceptor(async (data: { id?: string|number, message?: string, msg?: string }) => {
  if (data.id) {
    return data
  } else {
    throw new Error(data?.message || data?.msg || '')
  }
})

export default agentHttp
