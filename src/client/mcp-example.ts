import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const transport = new StdioClientTransport({
  command: 'node',
  args: ['src/server/mcp-example.ts'],
});

const client = new Client({
  name: 'example-client',
  version: '1.0.0',
});

await client.connect(transport);

// 获取所有提示
const prompts = await client.listPrompts();
console.log(prompts);

const prompt = await client.getPrompt({
  name: 'example-prompt',
  arguments: { arg1: 'value1', arg2: 'value2' },
});

// 获取所有工具
const tools = await client.listTools();
console.log(tools);
// 获取所有资源
const resources = await client.listResources();
console.log(resources);
const resource = await client.readResource({
  uri: 'file:///example.txt',
});
console.log(resource);
