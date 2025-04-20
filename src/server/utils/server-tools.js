import { z } from 'zod'
import { getFigmaFileData as getFigmaReq } from './ui-net-util.js'
import parseUtils from './ui-parse.js'

const tools = {
  add: {
    enable: true, // 是否启用
    name: 'add',
    description: '计算两个数的和',
    paramsSchema: { a: z.number(), b: z.number(), }, // 输入参数
    callback: async ({ a, b }) => { // 回调
      console.log(`Server: Received add request with${a}, ${b}`);
      return {
        content: [{
          type: 'text',
          text: `The sum of ${a} and ${b} is ${a + b}.`,
        }],
      };
    }
  },
  getFigmaFileData: {
    enable: true,
    name: 'getFigmaFileData',
    description: '通过Figma API获取文件数据， 入参为文件ID',
    paramsSchema: { fileId: z.string(), nodeIds: z.string().optional() }, // 输入参数
    callback: async ({ fileId, nodeIds }) => { // 回调
      console.log(`Server: Received getFigmaFileData request with ${fileId}`);
      const res = await getFigmaReq(fileId, nodeIds)
      console.log('figma res', res);
      // callback 返回必须是array
      return { content: [{ type: 'text', text: JSON.stringify(res), }] }
    }
  },
  parseToDom: {
    enable: true,
    name: 'parseToDom',
    description: '将figma文件数据解析为DOM，并生成对应的html string',
    paramsSchema: { jsonString: z.string() }, // 输入参数
    callback: async ({ jsonString }) => { // 回调
      const json = JSON.parse(jsonString)
      const res = parseUtils.parse(json)
      console.log('parse 的结果：', res.join(''));
      // callback 返回必须是array
      return { content: [{ type: 'text', text: res.join(''), }] }
    }
  }
}

export default tools
