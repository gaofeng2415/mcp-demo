import { defineComponent } from 'vue';
import { useLoadingBar, useModal, useDialog, useNotification, useMessage } from 'naive-ui';

export default defineComponent({
  name: 'RegisterNaiveUIUtils',
  setup() {
    window.$bar = window.$bar || useLoadingBar()
    window.$modal = window.$modal || useModal()
    window.$dialog = window.$dialog || useDialog()
    window.$notify = window.$notify || useNotification()
    window.$message = window.$message || useMessage()
    return () => null
  }
})
