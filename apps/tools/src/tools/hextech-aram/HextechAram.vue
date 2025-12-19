<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { championAliases, Champion } from './constants';

// 数据状态
const currentVersion = ref('');
const champions = ref<Champion[]>([]);
const isLoading = ref(true);
const errorMessage = ref('');
const searchQuery = ref('');
const selectedChampion = ref<Champion | null>(null);
const showBuildTip = ref(false);
const buildTipMessage = ref('');

// 过滤后的英雄列表
const filteredChampions = computed(() => {
  if (!searchQuery.value.trim()) {
    return champions.value;
  }

  const query = searchQuery.value.toLowerCase();
  return champions.value.filter(champion => {
    // 检查英雄名称
    if (champion.name.toLowerCase().includes(query)) {
      return true;
    }

    // 检查英雄别名
    const aliases = championAliases[champion.id] || [];
    return aliases.some(alias => alias.toLowerCase().includes(query));
  });
});

// 显示构建提示
const showBuildMessage = (message: string) => {
  buildTipMessage.value = message;
  showBuildTip.value = true;
  // 3秒后自动隐藏
  setTimeout(() => {
    showBuildTip.value = false;
  }, 3000);
};

// 点击英雄卡片
const handleChampionClick = (champion: Champion) => {
  selectedChampion.value = champion;
  // 点击卡片时不再显示开发中提示，改为只有图片加载失败时才显示提示
};


// 获取版本号
const getVersion = async () => {
  try {
    const response = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json');
    currentVersion.value = response.data[0];
    return response.data[0];
  } catch (error) {
    console.error('获取版本号失败:', error);
    errorMessage.value = '获取版本号失败，请稍后重试';
    throw error;
  }
};

// 获取英雄数据
const getChampions = async (version: string) => {
  try {
    const response = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${version}/data/zh_CN/champion.json`);
    // 将英雄对象转换为数组
    const championData = response.data.data;
    champions.value = Object.values(championData).map((champion: any) => ({
      id: champion.id,
      name: champion.name,
      title: champion.title,
      image: champion.image
    }));
  } catch (error) {
    console.error('获取英雄数据失败:', error);
    errorMessage.value = '获取英雄数据失败，请稍后重试';
    throw error;
  }
};

// 获取英雄头像URL
const getChampionImageUrl = (champion: Champion) => {
  return `https://ddragon.leagueoflegends.com/cdn/${currentVersion.value}/img/champion/${champion.image.full}`;
};

// 获取出装图片URL
const getBuildImageUrl = (championId: string) => {
  // 使用OSS图片路径
  return `https://www.cchappy.top/hks/${championId}.webp?imageView2/2/w/750/q/20`;
};

// 初始化加载数据
onMounted(async () => {
  try {
    isLoading.value = true;
    const version = await getVersion();
    await getChampions(version);
  } catch (error) {
    console.error('初始化失败:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="hextech-aram">
    <h1 class="page-title">海克斯大乱斗出装</h1>
    <p class="page-subtitle">选择英雄查看海克斯大乱斗出装攻略</p>

    <!-- 错误信息 -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <!-- 搜索输入框 -->
    <div v-else class="search-container">
      <input type="text" v-model="searchQuery" placeholder="输入英雄名称或别名（如：亚索、剑豪、yasuo）" class="search-input">
      <div class="search-info" v-if="searchQuery.trim()">
        搜索结果：{{ filteredChampions.length }} 个英雄
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>正在加载英雄数据...</p>
    </div>

    <!-- 英雄列表 -->
    <div v-else class="champions-container">
      <div class="champions-grid">
        <div v-for="champion in filteredChampions" :key="champion.id" class="champion-card"
          @click="handleChampionClick(champion)">
          <img :src="getChampionImageUrl(champion)" :alt="champion.name" class="champion-avatar">
          <div class="champion-info">
            <h3 class="champion-name">{{ champion.name }}</h3>
            <p class="champion-title">{{ champion.title }}</p>
          </div>
        </div>
      </div>

      <!-- 无结果提示 -->
      <div v-if="filteredChampions.length === 0 && !isLoading" class="no-results">
        <p>没有找到匹配的英雄，请尝试其他搜索词</p>
      </div>
    </div>

    <!-- 模态框 -->
    <div v-if="selectedChampion" class="modal-overlay" @click="selectedChampion = null">
      <div class="modal-image-container">
        <button class="close-btn" @click="selectedChampion = null">×</button>
        <img :src="getBuildImageUrl(selectedChampion.id)" :alt="selectedChampion.name + ' 出装推荐'"
          class="modal-build-image"
          @error="() => { selectedChampion && showBuildMessage(`${selectedChampion.name} 暂无出装推荐`); selectedChampion = null; }">
      </div>
    </div>

    <!-- 轻提示 -->
    <div v-if="showBuildTip" class="build-tip">
      {{ buildTipMessage }}
    </div>
  </div>
</template>

<style scoped>
.hextech-aram {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
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
  margin: 0 0 2rem 0;
  text-align: left;
}

.error-message {
  background-color: rgba(255, 0, 0, 0.1);
  color: #ff4444;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
  border: 1px solid rgba(255, 0, 0, 0.2);
  margin-bottom: 1rem;
  text-align: center;
}

/* 加载状态 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  color: var(--text-secondary);
}

.loading-spinner {
  border: 4px solid var(--border-color);
  border-top: 4px solid var(--accent-color);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* 英雄列表 */
.champions-container {
  flex: 1;
  width: 100%;
}

.champions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, max-content));
  gap: 1rem;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}

.champion-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem;
  background-color: var(--card-color);
  border-radius: 8px;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
  cursor: pointer;
  min-width: 120px;
}

.champion-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.champion-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--border-color);
  margin-bottom: 0.5rem;
}

.champion-info {
  text-align: center;
  width: 100%;
}

.champion-name {
  font-size: 0.9rem;
  margin: 0 0 0.125rem 0;
  color: #121212;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.champion-title {
  font-size: 0.75rem;
  color: var(--secondary-text);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 搜索容器 */
.search-container {
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 600px;
}

/* 搜索输入框 */
.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background-color: var(--card-color);
  color: var(--text-color);
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.2);
  background-color: var(--bg-color);
}

.search-input::placeholder {
  color: var(--secondary-text);
}

/* 搜索信息 */
.search-info {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: var(--secondary-text);
}

/* 无结果提示 */
.no-results {
  text-align: center;
  padding: 3rem;
  color: var(--secondary-text);
  font-size: 1rem;
}

/* 轻提示 */
.build-tip {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-size: 0.9rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 2000;
  animation: fadeInOut 3s ease;
  backdrop-filter: blur(5px);
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }

  10% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  90% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1500;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  z-index: 10;
  background: rgba(0, 0, 0, 0.7);
}

.close-btn:hover {
  background-color: rgba(0, 0, 0, 0.7);
  transform: scale(1.1);
}

html[data-theme="dark"] .close-btn {
  background: rgba(255, 255, 255, 0.2);
}

html[data-theme="dark"] .close-btn:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.modal-content {
  width: 98%;
  margin: 0;
  max-height: 95%;
  padding: 0.5rem;
  background-color: transparent;
  border: none;
  box-shadow: none;
  padding: 1rem;
  text-align: center;
}

.modal-image-container {
  height: 90vh;
  max-width: 96%;
  background-color: transparent;
  position: relative;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.modal-build-image {
  height: 100%;
  width: 100%;
  object-fit: contain;
  background-color: transparent;
  border: none;
  border-radius: 8px;

}
</style>