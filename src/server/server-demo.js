import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import tools from './utils/server-tools.js';

// 创建一个服务
const server = new McpServer({
    name: 'mcp-example',
    version: '0.0.1',
});

// 注册 server tools
Object.values(tools).forEach((tool) => {
  if (!tool.enable) return; // 如果工具未启用，则跳过注册
  server.tool(
    tool.name,
    tool.description,
    tool.paramsSchema,
    tool.callback
  )
})

// 创建一个资源
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
  console.log('Server: Connected and ready');
} catch (error) {
  console.error('Server: Failed to start:', error);
  process.exit(1);
}

