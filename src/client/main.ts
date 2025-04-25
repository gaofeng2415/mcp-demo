import { createApp } from 'vue'
import App from './App.tsx'
import '@/client/styles/tailwind.css'
import Icon from '@/client/components/icon/index.tsx'

createApp(App)
  .component(Icon.name as string, Icon)
  .mount('#app')
