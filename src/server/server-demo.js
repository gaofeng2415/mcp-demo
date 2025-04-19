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
  { a: z.number(), b: z.number() }, // 输入参数
  async ({ a, b }) => {
    console.log(`Server: Received add request with${a}, ${b}`);
    return {
      content: [{
        type: 'text',
        text: `The sum of ${a} and ${b} is ${a + b}.`,
      }],
    };
  }
);

// 创建一个资源 问候语
server.resource(
  'greeting',
  new ResourceTemplate('greeting://{name}', { list: undefined }),
  async (uri, { name }) => {
    console.log('Server: Received greeting request for', name);
    return {
      contents: [{
        uri: uri.href,
        text: `Hello, ${name}!`,
      }],
    };
  }
);

// 创建一个标准输入输出传输
const transport = new StdioServerTransport();

try {
  console.log('Server: Starting...');
  await server.connect(transport);
  // transport.onmessage = (message) => {
  //   console.log('Server: Received message:', message);
  // };
  // transport.onclose = () => {
  //   console.log('Server: Connection closed');
  //   process.exit(0);
  // };
  // transport.onerror = (error) => {
  //   console.error('Server: Connection error:', error);
  //   process.exit(1);
  // };


  console.log('Server: Connected and ready');
} catch (error) {
  console.error('Server: Failed to start:', error);
  process.exit(1);
}

