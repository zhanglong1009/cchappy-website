import { ref, onMounted, watch } from 'vue';
import type { Theme } from '../types';

// 主题管理组合式函数
export function useTheme() {
  // 主题状态
  const theme = ref<Theme>(localStorage.getItem('theme') as Theme || 'light');

  // 应用主题
  const applyTheme = () => {
    document.documentElement.setAttribute('data-theme', theme.value);
    localStorage.setItem('theme', theme.value);
  };

  // 切换主题
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
  };

  // 监听主题变化
  watch(theme, applyTheme);

  // 组件挂载时应用主题
  onMounted(applyTheme);

  return {
    theme,
    toggleTheme,
    applyTheme
  };
}
