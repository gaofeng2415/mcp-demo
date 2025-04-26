import { defineComponent, ref } from 'vue';
import { NButton, NInput } from 'naive-ui';
import request from '@/client/utils/request';

const tipWords = [
  '返回数据格式用markdown语法'
]

/**
 * @description 调用openai接口
 * @param messages 消息数组
 * @param tools 工具包
 * @returns ajax 请求体
 */
function fetchToAgent(messages: any, tools: any = []) {
  return request({
    url: '/maas/v1/chat/completions',
    method: 'post',
    data: { messages, model: import.meta.env.VITE_OPENAI_AGENT_NAME, tools },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
    }
  })
}

const content = ref('你好，能帮忙用ts写一个hello world嘛?');
const btnLoading = ref(false);



export default defineComponent({
  emits: ['mdUpdate'],
  name: 'AgentInput',
  setup(props, { emit }) {
    const openSubmit = async () => {
      // const messages =
      //   tipWords
      //     .map((text) => ({ role: "system", content: text }))
      //     .concat([{ role: "user", content: content.value }])
      // const res = await fetchToAgent(messages)
      // emit('mdUpdate', res.data.choices.pop()?.message?.content);
      const result = '当然可以！下面是一个简单的 TypeScript 版本的 "Hello, World!" 程序：\n\n```typescript\n// hello.ts\n\nfunction greet(name: string): string {\n    return `Hello, ${name}!`;\n}\n\nconst message = greet(\'World\');\nconsole.log(message);\n```\n\n### 运行步骤\n\n1. **安装 TypeScript**（如果还没有安装的话）：\n   ```bash\n   npm install -g typescript\n   ```\n\n2. **创建并编辑 `hello.ts` 文件**：\n   将上面的代码保存到一个名为 `hello.ts` 的文件中。\n\n3. **编译 TypeScript 文件**：\n   ```bash\n   tsc hello.ts\n   ```\n   这会生成一个 `hello.js` 文件。\n\n4. **运行生成的 JavaScript 文件**：\n   ```bash\n   node hello.js\n   ```\n\n你应该会在控制台看到输出：\n```\nHello, World!\n```\n\n希望这对你有帮助！如果有任何问题，请随时问我。'
      emit('mdUpdate', result);
    }
    return () => (
      <>
        <NInput type="textarea" v-model:value={content.value} placeholder="请输入内容" />
        <NButton loading={btnLoading.value} onClick={openSubmit}>提交</NButton>
      </>
    );
  },
});
