<script setup lang="ts">
interface Props {
  title: string;
  description: string;
  icon?: string;
  path: string;
}

const props = defineProps<Props>();
</script>

<template>
  <router-link :to="props.path" class="tool-card">
    <div class="tool-card__icon">
      {{ props.icon || '🔧' }}
    </div>
    <div class="tool-card__content">
      <h3 class="tool-card__title">{{ props.title }}</h3>
      <p class="tool-card__description">{{ props.description }}</p>
    </div>
  </router-link>
</template>

<style scoped>
.tool-card {
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
  background-color: var(--bg-secondary);
  border-radius: 8px;
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
  gap: 1rem;
  min-height: auto;
}

.tool-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

.tool-card__icon {
  font-size: 1.8rem;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-tertiary);
  border-radius: 6px;
}

.tool-card__content {
  flex: 1;
  min-width: 0;
}

.tool-card__title {
  font-size: 1rem;
  margin: 0 0 0.25rem 0;
  font-weight: 600;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tool-card__description {
  text-align: left;
  color: var(--text-secondary);
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.4;
  display: none;
}
</style>