<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getBlogs, Blog } from '../utils/blogs'

const blogs = ref<Blog[]>([])
const isLoading = ref(true)

onMounted(() => {
  try {
    blogs.value = getBlogs()
  } catch (error) {
    console.error('Failed to load blogs:', error)
  } finally {
    isLoading.value = false
  }
})

// 根据索引计算博客应该显示在时间线的哪一侧
const getTimelineSide = (index: number) => {
  return index % 2 === 0 ? 'left' : 'right'
}
</script>

<template>
  <section class="blog-timeline">
    <div class="container">
      <div v-if="isLoading" class="loading">
        <p>加载中...</p>
      </div>
      
      <div v-else-if="blogs.length === 0" class="no-blogs">
        <p>暂无博客文章</p>
      </div>
      
      <div v-else class="timeline">
        <!-- 时间线主体 -->
        <div class="timeline-line"></div>
        
        <!-- 博客项 -->
        <div 
          v-for="(blog, index) in blogs" 
          :key="blog.id" 
          class="timeline-item"
          :class="`timeline-item--${getTimelineSide(index)}`"
        >
          <!-- 时间线节点 -->
          <div class="timeline-node"></div>
          
          <!-- 博客卡片 -->
          <div class="blog-card">
            <div class="blog-card-inner">
              <!-- 博客日期 -->
              <div class="blog-date-badge">
                {{ new Date(blog.meta.date).toLocaleDateString() }}
              </div>
              
              <!-- 博客标题 -->
              <h2 class="blog-title">{{ blog.meta.title }}</h2>
              
              <!-- 博客标签 -->
              <div class="blog-tags" v-if="blog.meta.tags">
                <span 
                  v-for="tag in blog.meta.tags" 
                  :key="tag" 
                  class="blog-tag"
                >
                  {{ tag }}
                </span>
              </div>
              
              <!-- 博客摘要 -->
              <div class="blog-excerpt">
                <p>{{ blog.excerpt }}...</p>
              </div>
              
              <!-- 阅读全文按钮 -->
              <div class="blog-footer">
                <router-link :to="`/detail/${blog.id}`" class="read-more">
                  阅读全文 →
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

.loading,
.no-blogs {
  text-align: center;
  padding: 60px 0;
  color: var(--text-color);
}

/* 时间线容器 */
.timeline {
  position: relative;
  padding: 40px 0;
}

/* 时间线主体 */
.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, var(--accent-color), rgba(255, 107, 107, 0.1));
  transform: translateX(-50%);
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(255, 107, 107, 0.3);
}

/* 时间线项 */
.timeline-item {
  position: relative;
  margin-bottom: 60px;
  display: flex;
  align-items: center;
  animation: fadeInUp 0.8s ease forwards;
  opacity: 0;
}

/* 时间线项动画延迟 */
.timeline-item:nth-child(1) { animation-delay: 0.1s; }
.timeline-item:nth-child(2) { animation-delay: 0.2s; }
.timeline-item:nth-child(3) { animation-delay: 0.3s; }
.timeline-item:nth-child(4) { animation-delay: 0.4s; }
.timeline-item:nth-child(5) { animation-delay: 0.5s; }
.timeline-item:nth-child(6) { animation-delay: 0.6s; }

/* 左侧时间线项 */
.timeline-item--left {
  flex-direction: row;
}

/* 右侧时间线项 */
.timeline-item--right {
  flex-direction: row-reverse;
}

/* 时间线节点 */
.timeline-node {
  position: absolute;
  left: 50%;
  width: 20px;
  height: 20px;
  background: var(--accent-color);
  border: 4px solid var(--card-color);
  border-radius: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 0 4px rgba(255, 107, 107, 0.2);
  transition: all 0.3s ease;
  z-index: 2;
  margin-left: 0; /* 桌面端时间线居中 */
}

/* 悬停效果 */
.timeline-item:hover .timeline-node {
  transform: translateX(-50%) scale(1.3);
  box-shadow: 0 0 0 6px rgba(255, 107, 107, 0.3);
  background: var(--accent-color);
}

/* 博客卡片链接 */
.blog-card {
  text-decoration: none;
  color: inherit;
  flex: 0 0 calc(50% - 40px);
}

/* 博客卡片 */
.blog-card-inner {
  background: var(--card-color);
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

/* 卡片悬停效果 */
.blog-card:hover .blog-card-inner {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  border-color: var(--primary-color);
  cursor: pointer;
}

/* 卡片背景光效 */
.blog-card-inner::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 107, 107, 0.05), transparent);
  transition: left 0.5s ease;
}

.blog-card:hover .blog-card-inner::before {
  left: 100%;
}

/* 博客日期徽章 */
.blog-date-badge {
  display: inline-block;
  color: #121212;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 16px;
  transition: all 0.3s ease;
}

.blog-card:hover .blog-date-badge {
  transform: translateY(-2px);
}

/* 博客标题 */
.blog-title {
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: #121212;
  line-height: 1.3;
  transition: color 0.3s ease;
  position: relative;
  z-index: 1;
}

.blog-card:hover .blog-title {
  color: var(--accent-color);
}

/* 博客标签容器 */
.blog-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

/* 博客标签样式 */
.blog-tag {
  background: linear-gradient(135deg, var(--tag-gradient-start), var(--tag-gradient-end));
  color: #121212;
  padding: 6px 14px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 标签悬停效果 */
.blog-tag:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  filter: brightness(1.1);
}

/* 标签内部光效 */
.blog-tag::before {
  content: '';
  position: absolute;
  top: 0;
  left: -50%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transform: skewX(-20deg);
  transition: left 0.5s ease;
}

.blog-tag:hover::before {
  left: 150%;
}

/* 博客摘要 */
.blog-excerpt {
  margin-bottom: 20px;
  line-height: 1.6;
  color: var(--secondary-text);
  font-size: 15px;
  position: relative;
  z-index: 1;
}

/* 博客底部 */
.blog-footer {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  z-index: 1;
}

/* 阅读全文按钮 */
.read-more {
  color: var(--accent-color);
  font-size: 14px;
  font-weight: 600;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 10px;
  text-decoration: none;
}

.read-more:hover {
  transform: translateX(10px);
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .timeline-line {
    left: 30px;
  }
  
  /* 移动端：所有博客统一靠右，时间线靠左 */
  .timeline-item {
    flex-direction: row !important;
    margin-left: 50px;
  }
  
  /* 确保移动端所有卡片都靠右显示 */
  .blog-card {
    flex: 0 0 calc(100% - 6px);
  }
  
  /* 移动端：调整节点位置，确保对齐时间线 */
  .timeline-node {
    left: -20px;
    margin-left: 0px;
    transform: translateX(-50%);
  }
  
  .blog-card-inner {
    padding: 20px;
  }
  
  .blog-title {
    font-size: 18px;
  }
}


</style>
