// 项目信息类型
export interface Project {
  id: string;
  name: string;
  description: string;
  href: string;
  baseUrl?: string;
  color: string;
  accent: string;
  backgroundImage?: string;
  icon: string;
}

// 翻译内容类型
export interface Translation {
  title: string;
  subtitle: string;
  projects: {
    [key: string]: {
      name: string;
      description: string;
    };
  };
}

// 语言类型
export type Language = 'zh' | 'en';

// 主题类型
export type Theme = 'light' | 'dark';

// 翻译资源类型
export interface TranslationResources {
  [key: string]: Translation;
}
