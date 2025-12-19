# CC Happy Website

[English Version](./README.en.md)

## 项目简介

CC Happy Website 是一个基于 Vue 3 + TypeScript + Vite 构建的现代化网站项目，采用 Monorepo 架构管理多个子应用。该项目旨在展示和分享各种技术 demo、博客文章以及实用工具。

## 技术栈

- **前端框架**: Vue 3
- **开发语言**: TypeScript
- **构建工具**: Vite
- **包管理**: pnpm
- **Monorepo 管理**: Turborepo
- **路由**: Vue Router (部分应用)
- **国际化**: i18n

## 项目结构

```
cchappy-website/
├── apps/                  # 子应用目录
│   ├── blog/             # 博客应用
│   ├── home/             # 主站应用
│   ├── three-demo/       # Three.js 演示应用
│   └── tools/            # 实用工具集合
├── packages/             # 共享包
│   ├── ui/               # UI 组件库
│   └── utils/            # 工具函数库
├── package.json          # 根项目配置
├── pnpm-workspace.yaml   # pnpm workspace 配置
├── turbo.json            # Turborepo 配置
└── tsconfig.json         # TypeScript 配置
```

## 安装和启动

### 前置要求

- Node.js >= 18.0.0
- pnpm >= 9.0.0

### 安装依赖

```bash
pnpm install
```

### 开发模式

启动所有应用的开发服务器：

```bash
pnpm dev
```

### 构建生产版本

构建所有应用：

```bash
pnpm build
```

### 代码检查

```bash
pnpm lint
```

### 类型检查

```bash
pnpm typecheck
```

## 子应用说明

### home

主站应用，包含项目介绍、导航和主要内容展示。支持中英文国际化。

### blog

博客应用，用于发布和展示技术文章。

### three-demo

Three.js 演示应用，展示 3D 图形技术。

### tools

实用工具集合，包含各种在线工具。

## 贡献指南

欢迎提交 Issue 和 Pull Request！
