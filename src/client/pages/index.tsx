import { defineComponent, ref } from 'vue';
import MarkGenerator, { ContentType } from '@/client/components/mark-generator';
import AgentInput from '@/client/components/agent-input';

export default defineComponent({
  name: 'index',
  setup() {
    const markGenerator = ref()
    const updateMdContent = (content: string) => {
      markGenerator.value?.updateContent(ContentType.Answer, content)
    }
    const updateQuestionContent = (content: string) => {
      markGenerator.value?.updateContent(ContentType.Question, content)
    }
    return () => (
      <>
        <MarkGenerator ref={markGenerator} />
        <AgentInput onMdUpdate={updateMdContent} onQuestionUpdate={updateQuestionContent} />
      </>
    )
  }
});
