import { ref, defineComponent } from 'vue';
import { NButton, NConfigProvider } from 'naive-ui';
import hljs from 'highlight.js';
import Code from '@/client/components/code';

export default defineComponent({
  name: 'App',
  setup() {
    const test = ref('123')
    const codeText = ref(`int main () {\n  std::cout << "Hello Naive UI";\n  return 0;\n}`)
    const codeLanguage = ref('cpp')
    return () => (
      <NConfigProvider hljs={hljs}>
        <div class="page-container p-[20px]">
          <NButton type="primary">{ test.value }</NButton>
          <div>下面是代码块演示</div>
          <Code code={codeText.value} language={codeLanguage.value} />
        </div>
      </NConfigProvider>
    )
  }
})
