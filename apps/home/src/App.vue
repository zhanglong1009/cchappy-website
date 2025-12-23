<script setup lang="ts">
// 导入模块化组件和 composables
import { useTheme, useMousePos } from '@cchappy/ui';
import { computed } from 'vue';
import { projects } from './utils/projects';
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();

// 使用 composables 管理状态和逻辑
const { theme, toggleTheme } = useTheme();
const { mousePos } = useMousePos();

// 自定义切换语言函数
const toggleLang = () => {
  locale.value = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN';
  localStorage.setItem('language', locale.value);
};

const isZh = computed(() => locale.value === 'zh-CN')
const isDark = computed(() => theme.value === 'dark')

// 翻译项目列表 - 使用计算属性，使其响应语言变化
const translatedProjects = computed(() => {
  const currentLocale = locale.value
  return projects.map(project => ({
    ...project,
    name: t(`projects.${project.id}.name`, currentLocale),
    description: t(`projects.${project.id}.description`, currentLocale)
  }));
});
</script>

<template>
  <div class="app">
    <!-- 背景特效 -->
    <div class="background-effects" :style="{
      '--mouse-x': mousePos.x,
      '--mouse-y': mousePos.y
    }">
      <div class="bg-circle bg-circle-1"></div>
      <div class="bg-circle bg-circle-2"></div>
      <div class="bg-circle bg-circle-3"></div>
    </div>

    <!-- 顶部导航 -->
    <header class="header">
      <div class="header-inner">
        <h1 class="logo">cchappy</h1>
        <nav class="nav">
          <!-- 语言切换 -->
          <button class="nav-button language-button" @click="toggleLang" aria-label="Toggle language">
            {{ isZh ? 'EN' : '中文' }}
          </button>
          <!-- 主题切换 -->
          <button class="nav-button theme-button" @click="toggleTheme" aria-label="Toggle theme">
            {{ isDark ? '☀️' : '🌙' }}
          </button>
          <a class="git-button" href="https://github.com/zhanglong1009/cchappy-website">
            <img v-if="isDark" class="git-icon" src="@/assets/github-dark.svg" alt="github" />
            <img v-else class="git-icon" src="@/assets/github-light.svg" alt="github" />
          </a>
        </nav>
      </div>
    </header>

    <!-- 主内容区域 - 一屏展示所有入口 -->
    <main class="main">
      <!-- 英雄区域 -->
      <section class="hero">
        <div class="hero-inner">
          <h2 class="hero-title">{{ t('title') }}</h2>
          <p class="hero-subtitle">{{ t('subtitle') }}</p>
        </div>
      </section>

      <!-- 项目入口网格 -->
      <section class="projects-grid">
        <a v-for="project in translatedProjects" :key="project.id" :href="project.href"
          :class="['project-card', `project-card-${project.id}`]" :style="{
            '--accent-color': project.accent,
            '--card-color': project.color,
            '--background-image': project.backgroundImage
          }">
          <!-- 项目卡片装饰 -->
          <div class="card-decoration">
            <div class="decoration-circle"></div>
          </div>

          <div class="card-content">
            <div class="card-accent"></div>
            <div class="card-header">
              <h3 class="card-name">{{ project.name }}</h3>
              <span class="card-icon">{{ project.icon }}</span>
            </div>
            <p class="card-description">{{ project.description }}</p>
            <span class="card-arrow">→</span>
          </div>
        </a>
      </section>
    </main>
    <!-- 底部区域 -->
    <footer class="footer">
      <div class="footer-inner">
        <p class="footer-text">© {{ new Date().getFullYear() }} cchappy</p>
      </div>
    </footer>
  </div>
</template>

<style>
/* 引用公共样式 */
@import '@cchappy/ui/src/styles/global.css';


.git-button {
  line-height: 0;
}

.git-icon {
  width: 32px;
  height: 32px;
}
</style>
