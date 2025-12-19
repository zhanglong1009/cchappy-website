<script setup lang="ts">
// 敬请期待组件

// 定义组件属性
const props = defineProps<{
  title?: string;
  subtitle?: string;
}>();
</script>

<template>
  <section class="coming-soon">
    <div class="coming-soon-inner">
      <h3 class="coming-soon-title">{{ props.title || '页面正在建设中...' }}</h3>
      <p class="coming-soon-subtitle">{{ props.subtitle || '敬请期待！' }}</p>
    </div>
  </section>
</template>

<style scoped>
.coming-soon {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  animation: fadeInUp 0.8s ease-out;
}

.coming-soon-inner {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.coming-soon-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-color);
  letter-spacing: -0.01em;
  margin: 0;
  opacity: 0.9;
}

.coming-soon-subtitle {
  font-size: 1rem;
  color: var(--secondary-text);
  font-weight: 400;
  margin: 0;
  opacity: 0.8;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>