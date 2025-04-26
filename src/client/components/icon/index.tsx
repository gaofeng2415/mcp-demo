import { defineComponent, computed } from 'vue';
import type { DefineComponent, ExtractPropTypes } from 'vue';
import { NIcon } from 'naive-ui';
import * as Vicons from '@vicons/ionicons5';
import { withInstall } from '@/client/utils/component.ts';

type ViconName = keyof typeof Vicons;

let _Icon: DefineComponent<ExtractPropTypes<{ name: ViconName }>> = defineComponent({
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true,
      validator(value: string) {
        return Object.keys(Vicons).includes(value);
      },
    },
  },
  setup(props) {
    const viconComp = computed(() => props.name && Vicons[props.name])
    return () => (
      <NIcon component={viconComp.value} />
    )
  }
})

_Icon = withInstall(_Icon);
export default _Icon;
