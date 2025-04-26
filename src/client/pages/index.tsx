import { defineComponent, ref } from 'vue';
import MarkGenerator from '@/client/components/mark-generator';
import AgentInput from '@/client/components/agent-input';

export default defineComponent({
  name: 'index',
  setup() {
    const markGenerator = ref()

    const updateMdContent = (content: string) => {
      markGenerator.value?.updateMdContent(content)
    }
    return () => (
      <>
        <MarkGenerator ref={markGenerator} />
        <AgentInput onMdUpdate={updateMdContent} />
      </>
    )
  }
});
