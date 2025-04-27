import { defineComponent, ref } from 'vue';
import { NButton, NInput } from 'naive-ui';
import request from '@/client/utils/request';

const tipWords = [
  '以下所有返回数据格式请用markdown语法'
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

type RoleType = 'assistant' | 'user' | 'system'
type MessageType = { role: RoleType, content: string }
const questionList = ref<MessageType[]>([])
const content = ref('你好，能帮忙用ts写一个hello world嘛?');
const btnLoading = ref(false);
// 设置按钮loading
function setBtnLoading(value: boolean) {
  btnLoading.value = value
}



export default defineComponent({
  emits: ['mdUpdate', 'questionUpdate'],
  name: 'AgentInput',
  setup(props, { emit, expose }) {
    expose({ btnLoading })
    const openSubmit = async () => {
      setBtnLoading(true)
      emit('questionUpdate', content.value)
      questionList.value.push({ role: 'user', content: content.value })
      content.value = ''
      const messages =
        tipWords
          .map((text) => ({ role: "system", content: text }))
          .concat(questionList.value)
      const res = await fetchToAgent(messages)
      const resultMessage = res.data.choices.pop().message
      questionList.value.push(resultMessage as MessageType)
      emit('mdUpdate', resultMessage?.content);
      setBtnLoading(false)
    }
    return () => (
      <>
        <NInput type="textarea" v-model:value={content.value} disabled={btnLoading.value} placeholder="请输入内容" />
        <NButton loading={btnLoading.value} onClick={openSubmit}>提交</NButton>
      </>
    );
  },
});
