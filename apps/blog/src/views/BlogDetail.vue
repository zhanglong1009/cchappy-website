<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getBlogById, Blog } from '../utils/blogs'
import { renderMarkdown } from '../utils/blogs'

const route = useRoute()
const router = useRouter()
const blog = ref<Blog | null>(null)
const isLoading = ref(true)
const htmlContent = ref('')

const loadBlog = () => {
  const id = route.params.id as string
  if (!id) return
  
  isLoading.value = true
  try {
    blog.value = getBlogById(id)
    if (blog.value) {
      htmlContent.value = renderMarkdown(blog.value.content)
    }
  } catch (error) {
    console.error('Failed to load blog:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadBlog()
})

watch(() => route.params.id, () => {
  loadBlog()
})
</script>

<template>
  <section class="blog-detail">
    <div class="container">
      <div v-if="isLoading" class="loading">
        <p>加载中...</p>
      </div>
      
      <div v-else-if="blog" class="blog-content">
        <button class="back-btn" @click="router.push('/')">
          ← 返回列表
        </button>
        
        <article class="blog-post">
          <header class="blog-post-header">
            <h1 class="blog-post-title">{{ blog.meta.title }}</h1>
            <div class="blog-post-meta">
              <span class="blog-post-date">{{ new Date(blog.meta.date).toLocaleDateString() }}</span>
              <div class="blog-post-tags" v-if="blog.meta.tags">
                <span 
                  v-for="tag in blog.meta.tags" 
                  :key="tag" 
                  class="blog-post-tag"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </header>
          
          <div 
            class="blog-post-body"
            v-html="htmlContent"
          ></div>
        </article>
      </div>
      
      <div v-else class="not-found">
        <h2>博客不存在</h2>
        <p>抱歉，您请求的博客不存在或已被删除。</p>
        <button class="back-btn" @click="router.push('/')">
          返回列表
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.loading {
  text-align: center;
  padding: 60px 0;
  color: var(--text-color);
}

.not-found {
  text-align: center;
  padding: 60px 0;
}

.not-found h2 {
  font-size: 24px;
  margin-bottom: 16px;
  color: var(--text-color);
}

.not-found p {
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.back-btn {
  background: var(--card-bg);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 32px;
  display: inline-block;
}

.blog-content {
  animation: fadeIn 0.6s ease forwards;
}

.blog-post {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 32px;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.blog-post-header {
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border-color);
}

.blog-post-title {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: var(--text-color);
  line-height: 1.3;
}

.blog-post-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  font-size: 14px;
  color: var(--text-secondary);
}

.blog-post-date {
  display: inline-block;
}

.blog-post-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.blog-post-tag {
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

.blog-post-body {
  color: var(--text-color);
  line-height: 1.8;
  font-size: 16px;
}

/* Markdown 内容样式 */
.blog-post-body :deep(h1),
.blog-post-body :deep(h2),
.blog-post-body :deep(h3),
.blog-post-body :deep(h4),
.blog-post-body :deep(h5),
.blog-post-body :deep(h6) {
  color: var(--text-color);
  margin: 24px 0 16px 0;
  font-weight: 600;
}

.blog-post-body :deep(h1) {
  font-size: 28px;
}

.blog-post-body :deep(h2) {
  font-size: 24px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border-color);
}

.blog-post-body :deep(h3) {
  font-size: 20px;
}

.blog-post-body :deep(p) {
  margin: 0 0 16px 0;
}

.blog-post-body :deep(a) {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

.blog-post-body :deep(a:hover) {
  color: var(--primary-hover);
  text-decoration: underline;
}

.blog-post-body :deep(ul),
.blog-post-body :deep(ol) {
  margin: 0 0 16px 24px;
  padding: 0;
}

.blog-post-body :deep(li) {
  margin: 8px 0;
}

.blog-post-body :deep(blockquote) {
  margin: 0 0 16px 0;
  padding: 16px 20px;
  background: var(--blockquote-bg);
  border-left: 4px solid var(--primary-color);
  border-radius: 8px;
  color: var(--text-secondary);
}

.blog-post-body :deep(code) {
  background: var(--code-bg);
  color: var(--code-color);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9em;
}

.blog-post-body :deep(pre) {
  background: var(--code-bg);
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 0 0 16px 0;
}

.blog-post-body :deep(pre code) {
  background: transparent;
  padding: 0;
  border-radius: 0;
}

.blog-post-body :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 16px 0;
}

.blog-post-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 0 0 16px 0;
}

.blog-post-body :deep(th),
.blog-post-body :deep(td) {
  border: 1px solid var(--border-color);
  padding: 12px 16px;
  text-align: left;
}

.blog-post-body :deep(th) {
  background: var(--table-header-bg);
  font-weight: 600;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .blog-post {
    padding: 24px;
  }
  
  .blog-post-title {
    font-size: 24px;
  }
  
  .blog-post-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .blog-post-body {
    font-size: 15px;
  }
}
</style>
