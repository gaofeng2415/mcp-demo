import { defineComponent, computed } from 'vue';
import { NButton } from 'naive-ui';
import Icon from '@/client/components/icon';
import hljs from 'highlight.js';
import './index.scss';

// 复制按钮
const CopyBtn = (dataId: number) => {
  return <NButton quaternary data-action="copy" data-id={ dataId }><Icon name="Copy" class="mr-[4px]" />复制</NButton>
}
// 下载按钮
const DownloadBtn = (dataId: number) => {
  return <NButton quaternary data-action="download" data-id={ dataId }><Icon name="CodeDownload" class="mr-[4px]" />下载</NButton>
}

export default defineComponent({
  name: 'Code',
  props: {
    code: String,
    language: String,
    dataId: Number,
  },
  setup(props) {
    const text = computed(() => hljs.highlight(props.code ?? '', { language: props.language ?? '' }).value)
    return () => (
      <div class="code-container">
        <div class="code-header flex justify-between items-center bg-[#f5f5f5]">
          { props.language }
          <div class="btn-list">
            { CopyBtn(props.dataId ?? 0) }{ DownloadBtn(props.dataId ?? 0) }
          </div>
        </div>
        <div class="code-body">
          <pre><code v-html={ text.value } /></pre>
        </div>
      </div>
    )
  },
});
