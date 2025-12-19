// 导出组件
export { default as Header } from './components/Header.vue';
export { default as Footer } from './components/Footer.vue';
export { default as ComingSoon } from './components/ComingSoon.vue';

// 导出composables
export { useTheme } from './composables/useTheme';
export { useMousePos } from './composables/useMousePos';

// 导出类型
export type * from './types';

// 导出样式通过 CSS 导入的方式使用
// import '@cchappy/ui/src/styles/global.css';
