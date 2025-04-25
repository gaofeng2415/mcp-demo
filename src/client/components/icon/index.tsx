import { defineComponent, computed } from 'vue';
import { NIcon } from 'naive-ui';
import * as Vicons from '@vicons/ionicons5';
import { withInstall } from '@/client/utils/component.ts';

type ViconName = keyof typeof Vicons;

let _Icon = defineComponent({
  name: 'Icon',
  props: {
    name: {
      type: String as () => ViconName,
      required: true,
    },
  },
  setup(props) {
    const viconComp = computed(() => Vicons[props.name])
    return () => (
      <NIcon component={viconComp.value} />
    )
  }
})

_Icon = withInstall(_Icon);
export default _Icon;
