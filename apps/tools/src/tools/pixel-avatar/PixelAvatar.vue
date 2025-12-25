<template>
  <div class="pixel-avatar-generator">
    <h1 class="title">随机头像生成器</h1>
    <p class="subtitle">提供 {{ dicebearStyles.length }} 种风格的随机头像</p>
    <div class="main-content">
      <!-- 头像显示区域 -->
      <div class="avatar-section">
        <div class="avatar-container">
          <img 
            :src="previewUrl" 
            :alt="`${isRandom ? '随机' : currentStyle}风格头像`" 
            class="avatar-image"
          />
        </div>
        
        <!-- 风格选择下拉框 -->
        <div class="style-selector">
          <div class="selector-header" @click="toggleDropdown">
            <div class="selected-style">
              <div v-if="isRandom" class="random-icon-large">🎲</div>
              <img 
                v-else
                :src="`https://api.dicebear.com/7.x/${currentStyle}/svg?seed=preview`" 
                :alt="`${currentStyle}风格预览`"
                class="selected-thumbnail"
              />
              <span class="selected-name">{{ isRandom ? '全随机' : currentStyle }}</span>
            </div>
            <span class="dropdown-arrow">{{ isDropdownOpen ? '▲' : '▼' }}</span>
          </div>
          
          <div class="dropdown-menu" v-if="isDropdownOpen">
            <!-- 全随机选项 -->
            <div 
              class="dropdown-item"
              :class="{ 'active': isRandom }"
              @click="selectRandom"
            >
              <div class="item-content">
                <div class="random-icon">🎲</div>
                <span class="item-name">全随机</span>
              </div>
            </div>
            
            <!-- 分隔线 -->
            <div class="dropdown-divider"></div>
            
            <!-- 风格列表 -->
            <div 
              v-for="style in dicebearStyles" 
              :key="style"
              class="dropdown-item"
              :class="{ 'active': !isRandom && currentStyle === style }"
              @click="selectStyle(style)"
            >
              <div class="item-content">
                <img 
                  :src="`https://api.dicebear.com/9.x/${style}/svg?seed=preview`" 
                  :alt="`${style}风格预览`"
                  class="item-thumbnail"
                />
                <span class="item-name">{{ style }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="controls">
          <button @click="generateAvatar" class="generate-btn">重新生成</button>
          <button @click="downloadAvatar" class="download-btn">下载头像</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { dicebearStyles } from './constants' 

// 生成随机种子
const generateSeed = () => {
  return Math.random().toString(36).substring(2, 10)
}

// 随机选择风格
const getRandomStyle = () => {
  return dicebearStyles[Math.floor(Math.random() * dicebearStyles.length)]
}

// 状态管理
const seed = ref(generateSeed())
const currentStyle = ref(dicebearStyles[0]) // 默认选择第一种风格
const isRandom = ref(true) // 默认开启全随机模式
const isDropdownOpen = ref(false) // 下拉框是否打开
const actualStyle = ref(dicebearStyles[0]) // 当前实际使用的风格

// 初始化实际风格
const updateActualStyle = () => {
  actualStyle.value = isRandom.value ? getRandomStyle() : currentStyle.value
}

// 初始化
updateActualStyle()

// 预览用URL - 使用SVG格式（轻量，渲染快）
const previewUrl = computed(() => {
  return `https://api.dicebear.com/9.x/${actualStyle.value}/svg?seed=${seed.value}`
})

// 下载用URL - 使用PNG格式（兼容性好）
const downloadUrl = computed(() => {
  return `https://api.dicebear.com/9.x/${actualStyle.value}/png?seed=${seed.value}`
})

// 切换下拉框
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

// 选择全随机模式
const selectRandom = () => {
  isRandom.value = true
  updateActualStyle()
  seed.value = generateSeed() // 切换模式时生成新头像
  isDropdownOpen.value = false // 关闭下拉框
}

// 选择指定风格
const selectStyle = (style: string) => {
  isRandom.value = false
  currentStyle.value = style
  updateActualStyle()
  seed.value = generateSeed() // 切换风格时生成新头像
  isDropdownOpen.value = false // 关闭下拉框
}

// 生成新头像
const generateAvatar = () => {
  updateActualStyle()
  seed.value = generateSeed() // 生成新种子
}

// 下载头像
const downloadAvatar = async () => {
  try {
    const response = await fetch(downloadUrl.value)
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${actualStyle.value}-avatar-${seed.value}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('下载头像失败:', error)
  }
}

// 点击外部关闭下拉框
const handleClickOutside = (event: MouseEvent) => {
  const selector = document.querySelector('.style-selector')
  if (selector && !selector.contains(event.target as Node)) {
    isDropdownOpen.value = false
  }
}

// 添加点击外部事件监听
window.addEventListener('click', handleClickOutside)
</script>

<style scoped>
.pixel-avatar-generator {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
}

.title {
  font-size: 2rem;
  margin-bottom: 10px;
  color: var(--text-primary);
  text-align: center;
}

.subtitle {
  font-size: 1rem;
  margin-bottom: 30px;
  color: var(--text-secondary);
  text-align: center;
}

/* 主内容区域 */
.main-content {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  max-width: 1200px;
  width: 100%;
  justify-content: center;
}

/* 头像显示区域 */
.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar-container {
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--card-background);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.avatar-image {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
}

/* 风格选择器 */
.style-selector {
  width: 100%;
  max-width: 300px;
  margin-bottom: 30px;
  position: relative;
}

/* 选择器头部 */
.selector-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.selector-header:hover {
  background-color: var(--bg-secondary);
  border-color: var(--primary-color);
}

/* 选中的风格 */
.selected-style {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* 选中的缩略图 */
.selected-thumbnail {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: white;
  object-fit: cover;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 大随机图标 */
.random-icon-large {
  font-size: 24px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-secondary);
  border-radius: 50%;
}

/* 选中的名称 */
.selected-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

/* 下拉箭头 */
.dropdown-arrow {
  font-size: 12px;
  color: var(--text-secondary);
  transition: transform 0.3s ease;
}

/* 下拉菜单 */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 8px;
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-height: 300px;
  overflow-y: auto;
  z-index: 100;
}

/* 下拉项 */
.dropdown-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
}

.dropdown-item:hover {
  background-color: var(--bg-secondary);
}

.dropdown-item.active {
  background-color: var(--bg-secondary);
  color: var(--primary-color);
}

/* 下拉项内容 */
.item-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* 随机图标 */
.random-icon {
  font-size: 20px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-secondary);
  border-radius: 50%;
}

/* 项缩略图 */
.item-thumbnail {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: white;
  object-fit: cover;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 项名称 */
.item-name {
  font-size: 14px;
  color: var(--text-primary);
  font-weight: 400;
}

/* 分隔线 */
.dropdown-divider {
  height: 1px;
  background-color: var(--border-color);
  margin: 8px 0;
}

/* 控制按钮 */
.controls {
  display: flex;
  gap: 20px;
}

.generate-btn,
.download-btn {
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.generate-btn {
  background-color: var(--primary-color);
  color: white;
}

.generate-btn:hover {
  background-color: var(--primary-hover);
  transform: translateY(-2px);
}

.download-btn {
  background-color: var(--secondary-color);
  color: white;
}

.download-btn:hover {
  background-color: var(--secondary-hover);
  transform: translateY(-2px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .avatar-container {
    width: 250px;
    height: 250px;
  }
  
  .avatar-image {
    width: 200px;
    height: 200px;
  }
  
  .style-selector {
    max-width: 250px;
  }
  
  .selected-name {
    font-size: 12px;
  }
  
  .item-name {
    font-size: 12px;
  }
}
</style>