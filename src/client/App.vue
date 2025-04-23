<script setup lang="ts">
import { ref } from 'vue';
import { NButton, NCode, NConfigProvider } from 'naive-ui';
import hljs from 'highlight.js';

const test = ref('123')
const codeText = ref(`int main () {
  std::cout << "Hello Naive UI";
  return 0;
}`)
const codeLanguage = ref('cpp')
</script>

<template>
  <NConfigProvider :hljs="hljs">
    <div class="page-container p-[20px]">
      <NButton type="primary">123</NButton>
      <div>下面是代码块演示</div>
      <NCode :code="codeText" :language="codeLanguage" />
    </div>
  </NConfigProvider>
</template>

<style scoped></style>
