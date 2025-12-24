<script setup lang="ts">
// Blog 应用主组件
import { Header, Footer, useTheme } from '@cchappy/ui';

// 使用组合式函数
useTheme();
</script>

<template>
  <div class="app">
    <!-- 顶部导航组件 -->
    <Header />

    <!-- 主内容区域 -->
    <main class="main">
      <!-- 路由视图 -->
      <router-view />
    </main>

    <!-- 底部组件 -->
    <Footer />
  </div>
</template>

<style>
/* 引用公共样式 */
@import '@cchappy/ui/src/styles/global.css';

/* 博客特定样式 */
</style>
