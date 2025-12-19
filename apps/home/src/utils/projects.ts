import type { Project } from '../types';

// 项目数据
export const projects: Project[] = [
  { 
    id: 'blog', 
    name: 'Blog', 
    description: '思考与记录', 
    href: 'https://www.cchappy.top/blog/', 
    port: 5173,
    color: '#fafafa', 
    accent: '#FF6B6B',
    backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 107, 107, 0.2) 0%, transparent 50%), linear-gradient(135deg, rgba(255, 150, 150, 0.15) 0%, rgba(255, 220, 220, 0.18) 100%), repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 107, 107, 0.06) 10px, rgba(255, 107, 107, 0.06) 20px)',
    icon: '📝' 
  },
  { 
    id: 'tools', 
    name: 'Tools', 
    description: '实用工具集', 
    href: 'https://www.cchappy.top/tools/', 
    port: 5174,
    color: '#f5f5f7', 
    accent: '#4ECDC4',
    backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(78, 205, 196, 0.2) 0%, transparent 50%), linear-gradient(135deg, rgba(100, 220, 210, 0.15) 0%, rgba(220, 255, 250, 0.18) 100%), repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(78, 205, 196, 0.06) 10px, rgba(78, 205, 196, 0.06) 20px)',
    icon: '🛠️' 
  },
  { 
    id: 'threeD', 
    name: 'threeD', 
    description: '三维创作', 
    href: 'https://www.cchappy.top/3d/', 
    port: 5175,
    color: '#f0f0f3', 
    accent: '#9B59B6',
    backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(155, 89, 182, 0.2) 0%, transparent 50%), linear-gradient(135deg, rgba(180, 120, 200, 0.15) 0%, rgba(240, 220, 255, 0.18) 100%), repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(155, 89, 182, 0.06) 15px, rgba(155, 89, 182, 0.06) 30px)',
    icon: '🎨' 
  }
];
