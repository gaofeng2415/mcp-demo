import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import tools from './utils/server-tools.js';

// 创建一个服务
const server = new McpServer({
    name: 'mcp-example',
    version: '0.0.1',
});

Object.values(tools).forEach((tool) => {
  if (!tool.enable) return; // 如果工具未启用，则跳过注册

  // 确保 callback 返回值符合类型要求
  const normalizedCallback = async (args: any, extra: any): Promise<any> => {
    const result = await tool.callback(args, extra);
    // 检查 content 是否符合要求
    if (result.content) {
      // result.content = result.content.map((item: any) => {
        // if (item.type === 'resource' && !item.resource) {
        //   throw new Error('Missing "resource" property for type "resource"');
        // }
      //   return item;
      // });
    }
    return result;
  };

  server.tool(
    tool.name,
    tool.description,
    tool.paramsSchema,
    normalizedCallback
  );
});

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

