import { defineComponent, ref, onMounted, onBeforeUnmount, watch, createApp } from 'vue';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import Code from '@/client/components/code';
import { downloadTextAsFile, getExtensionByLanguage, copyToClipboard } from '@/client/utils/download';
import './stream-markdown-type-writer.scss';

const renderer = new marked.Renderer();
let dataId = 0
const codeDict: Record<string, string> = {}
const languageToExtension: Record<string, string> = {}

renderer.code = ({ lang, raw, text, type }) => {
  if (hljs.getLanguage(lang ?? '')) {
    const node = createApp(Code, { code: text, language: lang, dataId });
    codeDict[dataId] = text
    languageToExtension[dataId] = lang ?? ''
    dataId += 1
    const container = document.createElement('div');
    node.mount(container);
    const innerHTML = container.innerHTML;
    node.unmount();
    return innerHTML
  } else {
    return ''
  }
}
// 下载代码
const downloadCode = (dataId: number|string) => {
  const code = codeDict[dataId]
  const filename = `code.${getExtensionByLanguage(languageToExtension[dataId])}`
  downloadTextAsFile(code, filename);
}
const copyCode = async (dataId: number|string) => {
  const code = codeDict[dataId]
  await copyToClipboard(code);
  window.$message?.success('复制成功');
}

marked.setOptions({
  breaks: true,
  gfm: true,
  renderer: renderer,
});

/**
 * @description 监听元素点击
 * @param e 点击事件
 */
function openClick(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (target.dataset.action || target.parentElement?.dataset.action) {
    const action = target.dataset.action || target.parentElement?.dataset.action;
    const dataId = target.dataset.id || target.parentElement?.dataset.id;
    if (action === 'download') {
      downloadCode(dataId ?? '');
    } else if (action === 'copy') {
      copyCode(dataId ?? '');
    }
  }
}

export default defineComponent({
  props: {
    content: {
      type: String,
      required: true
    },
    speed: {
      type: Number,
      default: 30
    }
  },

  setup(props) {
    const outputRef = ref<HTMLElement>();
    const displayedContentRaw = ref(''); // 保存原始文本
    const isTyping = ref(false);
    const typingQueue = ref<string[]>([]);
    const currentTypingTimeout = ref<number>();

    // 处理流数据
    const startStreamProcessing = async () => {
      isTyping.value = true;
      displayedContentRaw.value = '';
      typingQueue.value = [];

      typingQueue.value.push(props.content);
      if (!currentTypingTimeout.value) {
        processTypingQueue();
      }
      isTyping.value = false;
    };
    watch(() => props.content, startStreamProcessing)


    // 改进的打字效果处理
    const processTypingQueue = () => {
      if (typingQueue.value.length === 0) {
        currentTypingTimeout.value = undefined;
        return;
      }

      const chunk = typingQueue.value.shift()!;
      let i = 0;

      const typeChunk = async () => {
        if (i < chunk.length) {
          // 仅追加新字符
          displayedContentRaw.value += chunk.charAt(i);

          // 渲染完整Markdown
          if (outputRef.value) {
            outputRef.value.innerHTML = DOMPurify.sanitize(await marked.parse(displayedContentRaw.value));
            outputRef.value.scrollTop = outputRef.value.scrollHeight;
          }

          i++;
          currentTypingTimeout.value = window.setTimeout(typeChunk, props.speed);
        } else {
          processTypingQueue();
        }
      };

      typeChunk();
    };

    onMounted(() => {
      props.content && startStreamProcessing();
    });

    onBeforeUnmount(() => {
      if (currentTypingTimeout.value) {
        clearTimeout(currentTypingTimeout.value);
      }
    });

    return () => (
      <div ref={outputRef} class="markdown-content" onClick={openClick}></div>
    );
  }
});
