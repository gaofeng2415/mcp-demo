import { createApp } from 'vue'
import naive from 'naive-ui'
import App from './App.tsx'
import '@/client/styles/tailwind.css'
import Icon from '@/client/components/icon/index.tsx'

createApp(App)
  .use(naive)
  .component(Icon.name as string, Icon)
  .mount('#app')
