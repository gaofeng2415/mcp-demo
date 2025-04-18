import { readFileToYaml } from './yaml.js';
import HttpClient from './fetch-meta/index.js';

const ymal = await readFileToYaml('./local.yaml')
const http = new HttpClient(ymal.url, { headers: ymal.requestHeaders })

http.useRequestInterceptor(async (config, data) => {
  if (data.messages) {
    const arr = Array.isArray(data.messages) ? data.messages : [data.messages]
    const messages = arr.map((text) => ({ role: 'user', content: text }))
    data.messages = messages
  }
  data.model = ymal.model.name; // 声明模型名称
  return config
})

http.useResponseInterceptor(async (data) => {
  if (data.id) {
    return data
  } else {
    throw new Error(data)
  }
})

export default http
