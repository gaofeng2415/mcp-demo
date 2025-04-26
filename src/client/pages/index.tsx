import { defineComponent } from 'vue';
import MarkGenerator from '@/client/components/mark-generator';

export default defineComponent({
  name: 'index',
  setup() {
    return () => (<MarkGenerator />)
  }
});
