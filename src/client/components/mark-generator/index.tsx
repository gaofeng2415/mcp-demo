import { defineComponent, ref } from 'vue';
import StreamMarkdownTypewriter from './stream-markdown-type-writer';


export default defineComponent({
  name: 'MarkGenerator',
  setup(props, { expose }) {
    const markContent = ref('')
    const updateMdContent = (content: string) => {
      markContent.value = content
    }
    expose({ updateMdContent })
    return () => (
      <div class="markdown-typewriter-container">
        <StreamMarkdownTypewriter content={markContent.value} speed={20} />
      </div>
    );
  }
});
