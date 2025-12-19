// 主题类型
export type Theme = 'light' | 'dark';

// 项目信息类型
export interface Project {
  id: string;
  name: string;
  description: string;
  href: string;
  port: number;
  baseUrl?: string;
  color: string;
  accent: string;
}