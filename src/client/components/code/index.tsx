import { ref, defineComponent } from 'vue';
import { NButton, NCode, useMessage } from 'naive-ui';
import Icon from '@/client/components/icon';
import { downloadTextAsFile, getCodeExtension, copyToClipboard } from '@/client/utils/download';
import './index.scss';

// 复制按钮
const CopyBtn = (code: string) => {
  const handleClick = async () => {
    await copyToClipboard(code);
    window.$message?.success('复制成功');
  }
  return <NButton quaternary onClick={handleClick}><Icon name="Copy" class="mr-[4px]" />复制</NButton>
}
// 下载按钮
const DownloadBtn = (code: string) => {
  const handleClick = () => {
    const filename = `code.${getCodeExtension(code)}`
    downloadTextAsFile(code, filename);
  }
  return <NButton quaternary onClick={handleClick}><Icon name="CodeDownload" class="mr-[4px]" />下载</NButton>
}

export default defineComponent({
  name: 'Code',
  props: {
    code: String,
    language: String,
  },
  setup(props) {
    const code = ref(props.code);
    const language = ref(props.language);
    window.$message = useMessage() // 挂载全局消息

    // const message = useMessage();
    return () => (
      <div class="code-container">
        <div class="code-header flex justify-between items-center bg-[#f5f5f5]">
          { props.language }
          <div class="btn-list">
            { CopyBtn(code.value ?? '') }{ DownloadBtn(code.value ?? '') }
          </div>
        </div>
        <div class="code-body">
          <NCode code={code.value} language={language.value} />
        </div>
      </div>
    )
  },
});
