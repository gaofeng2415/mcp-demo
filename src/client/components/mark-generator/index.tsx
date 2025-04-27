import { defineComponent, ref } from 'vue';
import StreamMarkdownTypeWriter from './stream-markdown-type-writer';
import './index.scss';

export enum ContentType {
  Question = 'question',
  Answer = 'answer'
}

export default defineComponent({
  name: 'MarkGenerator',
  setup(props, { expose }) {
    const contentList = ref<{ type: ContentType, content: string }[]>([])
    const updateContent = (type: ContentType.Question | ContentType.Answer, content: string) => {
      contentList.value.push({ type, content })
    }
    expose({ updateContent })
    return () => (
        contentList.value.map((item, index) => (
            item.type === ContentType.Question
              ? <div class="question-container" key={index}>{ item.content }</div>
              : <StreamMarkdownTypeWriter content={item.content} speed={20} key={index} />
        ))
    );
  }
});
