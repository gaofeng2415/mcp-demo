import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'

console.log('Client: Starting...')

const transport = new StdioClientTransport({
  command: 'node',
  args: ['src/server/server-demo.js'],
});

const client = new Client({
  name: 'example-client',
  version: '1.0.0',
});

try {
  console.log('Client: Connecting to server...')
  await client.connect(transport);
  console.log('Client: Connected to server');

  // 获取所有工具
  console.log('Client: Listing tools...');
  const tools = await client.listTools();
  console.log('Client: Available tools:', tools);

  // 使用工具
  console.log('Client: Calling add tool...');
  const result = await client.callTool({ name: 'add', arguments: { a: 5, b: 3 }});
  console.log('Client: Tool result:', result);

  // 获取所有资源
  console.log('Client: Listing resources...');
  const resources = await client.listResources();
  console.log('Client: Available resources:', resources);

  // 使用资源
  console.log('Client: Reading greeting resource...');
  const resource = await client.readResource({
    uri: 'greeting://John',
  });
  console.log('Client: Resource result:', resource);
} catch (error) {
  console.error('Client: Error:', error);
  process.exit(1);
}
