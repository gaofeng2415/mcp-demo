import { ref, defineComponent } from 'vue';
import { NButton, NCode } from 'naive-ui';
import Icon from '@/client/components/icon';

export default defineComponent({
  name: 'Code',
  props: {
    code: String,
    language: String,
  },
  setup(props) {
    const code = ref(props.code);
    const language = ref(props.language);
    return () => (
      <div class="code-container">
        <div class="code-header flex justify-between items-center">
          { props.language }
          <div class="btn-list">
            <NButton text><Icon name="Copy" />复制</NButton>
            <NButton text>下载</NButton>
          </div>
        </div>
        <NCode code={code.value} language={language.value} />
      </div>
    )
  },
});
