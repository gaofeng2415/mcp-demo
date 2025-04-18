import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// 创建一个服务
const server = new McpServer({
    name: 'mcp-example',
    version: '0.0.1',
});

// 创建一个工具 计算两个数的和
server.tool(
  'add',
  { a: z.number(), b: z.number() },
  async ({ a, b }) => ({
    content: [{
      type: 'text',
      text: `The sum of ${a} and ${b} is ${a + b}.`,
    }],
  })
);

// 创建一个资源 问候语
server.resource(
  'greeting',
  new ResourceTemplate('greeting://{name}', { list: undefined }),
  async (uri, { name }) => ({
    contents: [{
      uri: uri.href,
      text: `Hello, ${name}!`,
    }],
  })
);

// 创建一个标准输入输出传输
const  transport = new StdioServerTransport();
await server.connect(transport);

