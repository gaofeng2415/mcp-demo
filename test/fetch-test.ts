// 验证 agent-fetch 请求流程是否成功
// import http from './agent-fetch.js';

// const res = await http.post('', { messages: 'hello' });
// console.log(res);

// 验证 ui 请求流程是否成功
// import uiHttp from "../src/utils/ui-fetch.js";
// import fs from 'fs/promises';
// const fileId = 'GYGDEukMSmeZcWnKzxx2m8'
// const nodeIds = '3319-2'
// const res = await uiHttp.get(`/v1/files/${fileId}/nodes?ids=${nodeIds}`);
// fs.writeFile('./fetch-result.json', JSON.stringify(res, null, 2), 'utf-8')
// console.log(res);

// 验证 agent-fetch 是否能正确返回工具调用结果
import http from '../src/utils/agent-fetch.js';
import ServerTools from '../src/server/utils/server-tools.js';
const res = await http.post('', {
  messages:
    '我有这么一个任务：通过figma文件数据生成html，文件id为GYGDEukMSmeZcWnKzxx2m8，节点id为3319-4667。'
    + '现在我提供mcp server tools给你，具体可见tools。'
    + '请给我一个tools的调用结果，注意：你只需要返回工具调用的结果，不要返回任何其他内容。',
  tools: Object.values(ServerTools).filter(tool => tool.enable).map(tool => ({
    type: 'function',
    function: {
      name: tool.name,
      description: tool.description,
      parameters: tool.parameters,
    },
  })),
});
console.log(res);
