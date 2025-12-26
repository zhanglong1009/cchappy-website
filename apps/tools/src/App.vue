<script setup lang="ts">
// Tools 应用主组件
import { useTheme } from '@cchappy/ui';

// 使用组合式函数
useTheme();
</script>

<template>
  <div class="app">
    <!-- 主内容区域 - 路由视图 -->
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<style>
/* 引用公共样式 */
@import '@cchappy/ui/src/styles/global.css';

/* 工具特定样式 */
.main {
  width: 100%;
  padding: 1rem;
  min-height: calc(100vh - 60px); /* 减去footer的高度 */
  display: flex;
  flex-direction: column;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}
</style>
