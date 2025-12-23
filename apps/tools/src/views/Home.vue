<script setup lang="ts">
import ToolCard from '../components/ToolCard.vue';

// 工具列表数据
const tools = [
  {
    title: 'Base64转换器',
    description: '支持Base64编码与解码，轻松实现字符串和Base64格式的相互转换',
    icon: '🔢',
    path: '/base64'
  },
  {
    title: '海克斯大乱斗出装',
    description: '英雄联盟海克斯大乱斗出装攻略，选择英雄查看详细出装推荐',
    icon: '🤖',
    path: '/hextech-aram'
  }
];
</script>

<template>
  <div class="home">
    <!-- 页面标题 -->
    <header class="page-header">
      <h1 class="page-title">工具集</h1>
      <p class="page-subtitle">精心挑选的实用工具，帮助您提高工作效率</p>
    </header>

    <!-- 工具列表 -->
    <main class="tools-container">
      <div class="tools-grid">
        <ToolCard
          v-for="tool in tools"
          :key="tool.path"
          :title="tool.title"
          :description="tool.description"
          :icon="tool.icon"
          :path="tool.path"
        />
      </div>
    </main>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
}

/* 页面标题区域 */
.page-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
  width: 100%;
}

.page-title {
  font-size: 2.5rem;
  margin: 0 0 0.25rem 0;
  color: var(--text-primary);
  text-align: left;
}

.page-subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
  margin: 0;
  text-align: left;
}

/* 工具容器 */
.tools-container {
  flex: 1;
  width: 100%;
}

/* 工具网格 */
.tools-section {
  margin-top: 1.5rem;
}

.tools-grid {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  flex-wrap: wrap;
}
</style>