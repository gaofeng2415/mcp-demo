// App.tsx
import { defineComponent } from 'vue';
import StreamMarkdownTypewriter from './stream-markdown-type-writer';

// 模拟一个流式API获取函数
async function* mockStreamFetch() {
  const chunks = [
    '# 欢迎使用流式Markdown渲染\n\n',
    '这是一个**演示**流式传输和打字机效果的示例。\n\n',
    '```javascript\n// 代码示例\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n```\n\n',
    '## 特性\n\n',
    '- 实时流式渲染\n',
    '- Markdown支持\n',
    '- 代码高亮\n',
    '- 可自定义速度\n\n',
    '> 提示: 你可以点击"跳过动画"按钮立即显示所有内容'
  ];

  for (const chunk of chunks) {
    yield chunk;
    await new Promise(resolve => setTimeout(resolve, 300));
  }
}

export default defineComponent({
  name: 'MarkGenerator',
  setup() {
    return () => (
      <div class="app">
        <h1>流式Markdown演示</h1>
        <StreamMarkdownTypewriter
          fetchStream={mockStreamFetch}
          speed={20}
        />
      </div>
    );
  }
});
