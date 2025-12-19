<script setup lang="ts">
// 顶部导航组件
import { onMounted } from 'vue';
import { useTheme } from '../composables/useTheme';

// 使用主题组合式函数
const { theme, applyTheme } = useTheme();

// 从URL参数中获取主题
const getUrlParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    theme: params.get('theme') as 'light' | 'dark'
  };
};

// 生成带参数的链接
const getLinkUrl = (path: string) => {
  const params = new URLSearchParams();
  params.set('theme', theme.value);
  return `${path}?${params.toString()}`;
};

// 组件挂载时处理URL参数
onMounted(() => {
  const params = getUrlParams();
  if (params.theme) {
    theme.value = params.theme;
    applyTheme();
  }
});
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <h1 class="logo"><a :href="getLinkUrl('http://localhost:5172')">cchappy</a></h1>
    </div>
  </header>
</template>

<style scoped>
/* Header 组件样式已在 global.css 中定义 */
</style>