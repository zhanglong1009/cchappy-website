// 首页项目翻译资源
import { createI18n } from 'vue-i18n';
import zhTranslations from './zh';
import enTranslations from './en';

// 创建 i18n 实例
const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('language') || 'en-US',
  fallbackLocale: 'en-US',
  messages: {
    'zh-CN': zhTranslations,
    'en-US': enTranslations
  },
  globalInjection: true
});

export default i18n;