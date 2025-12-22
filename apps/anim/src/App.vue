<script setup lang="ts">
// 3D 应用主组件
</script>

<template>
  <div class="app">
    <!-- 路由视图 -->
    <router-view />
  </div>
</template>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  overflow: hidden;
}

/* 应用容器 */
.app {
  width: 100vw;
  height: 100vh;
  position: relative;
}
</style>
