import { ref, defineComponent } from 'vue';
import { NConfigProvider, NMessageProvider, NLoadingBarProvider, NNotificationProvider, NModalProvider, NDialogProvider } from 'naive-ui';
import hljs from 'highlight.js';
import Register from './components/register';
import Index from './pages/index';

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <NConfigProvider hljs={hljs}>
        <NMessageProvider>
          <NLoadingBarProvider>
            <NNotificationProvider>
              <NModalProvider>
                <NDialogProvider>
                  <Register />
                  <div class="page-container p-[20px]">
                    <Index />
                  </div>
                </NDialogProvider>
              </NModalProvider>
            </NNotificationProvider>
          </NLoadingBarProvider>
        </NMessageProvider>
      </NConfigProvider>
    )
  }
})
