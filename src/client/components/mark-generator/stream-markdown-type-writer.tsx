import { defineComponent, ref, onMounted, onBeforeUnmount, type PropType } from 'vue';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import './stream-markdown-type-writer.scss';
import 'highlight.js/styles/atom-one-dark.css';

marked.setOptions({
  breaks: true,
  gfm: true,
  // highlight: (code, lang) => {
  //   const language = hljs.getLanguage(lang) ? lang : 'plaintext';
  //   return hljs.highlight(code, { language }).value;
  // }
});

export default defineComponent({
  props: {
    fetchStream: {
      type: Function as PropType<() => AsyncIterable<string>>,
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

      try {
        for await (const chunk of props.fetchStream()) {
          typingQueue.value.push(chunk);
          if (!currentTypingTimeout.value) {
            processTypingQueue();
          }
        }
      } finally {
        isTyping.value = false;
      }
    };

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
      startStreamProcessing();
    });

    onBeforeUnmount(() => {
      if (currentTypingTimeout.value) {
        clearTimeout(currentTypingTimeout.value);
      }
    });

    return () => (
      <div ref={outputRef} class="markdown-content"></div>
    );
  }
});
