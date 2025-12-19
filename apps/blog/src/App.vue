<script setup lang="ts">
// Blog 应用主组件
import { Header, Footer, ComingSoon, useTheme } from '@cchappy/ui';

// 定义项目数据（当前未使用，保留供后续扩展）
// const projects = [
//   { id: 'blog', name: '博客', description: '思考与记录', href: '/', port: 5173, color: '#fafafa', accent: '#FF6B6B' }
// ];

// 使用组合式函数
useTheme();
</script>

<template>
  <div class="app">
    <!-- 顶部导航组件 -->
    <Header />

    <!-- 主内容区域 -->
    <main class="main">
      <section class="hero">
        <div class="hero-inner">
          <h2 class="hero-title">博客</h2>
          <p class="hero-subtitle">我的思考与记录</p>
        </div>
      </section>

      <!-- 敬请期待组件 -->
      <ComingSoon />
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
