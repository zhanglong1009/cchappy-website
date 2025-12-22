# CC Happy Website

[English Version](./README.en.md)

## 项目简介

CC Happy Website 是一个基于 Vue 3 + TypeScript + Vite 构建的现代化网站项目，采用 Monorepo 架构管理多个子应用。该项目旨在展示和分享各种技术 demo、博客文章以及实用工具。

**项目预览地址：** [https://www.cchappy.top/](https://www.cchappy.top/)

## 技术栈

- **前端框架**: Vue 3
- **开发语言**: TypeScript
- **构建工具**: Vite
- **包管理**: pnpm
- **Monorepo 管理**: Turborepo
- **路由**: Vue Router (部分应用)
- **国际化**: i18n
- **CI/CD**: GitHub Actions
- **部署**: OSS (对象存储服务)

## 项目结构

```
cchappy-website/
├── apps/                  # 子应用目录
│   ├── blog/             # 博客应用
│   ├── home/             # 主站应用
│   ├── anim/       # Three.js 演示应用
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

使用快捷命令启动单个应用的开发服务器：

```bash
# 开发主站应用
pnpm dev:home

# 开发博客应用
pnpm dev:blog

# 开发Three.js演示应用
pnpm dev:anim

# 开发工具集合应用
pnpm dev:tools
```

### 构建生产版本

构建所有应用：

```bash
pnpm build
```

使用快捷命令构建单个应用或包：

```bash
# 构建主站应用
pnpm build:home

# 构建博客应用
pnpm build:blog

# 构建Three.js演示应用
pnpm build:anim

# 构建工具集合应用
pnpm build:tools
```

### 代码检查

检查所有应用和包的代码：

```bash
pnpm lint
```



### 类型检查

检查所有应用和包的类型：

```bash
pnpm typecheck
```

### 支持的快捷命令列表

| 命令类型 | 支持的命令 | 描述 |
| --- | --- | --- |
| 开发命令 | `dev:home`, `dev:blog`, `dev:anim`, `dev:tools` | 启动单个应用的开发服务器 |
| 构建命令 | `build:home`, `build:blog`, `build:anim`, `build:tools` | 构建单个应用或包 |

## 自动化部署

### CI/CD 工作流

本项目配置了完整的 CI/CD 工作流，基于 GitHub Actions 实现自动化构建和部署：

1. **触发条件**：当代码推送到 `main` 分支时，自动触发 CI/CD 流程
2. **构建过程**：使用 Turborepo 并行构建所有应用
3. **部署目标**：构建产物自动部署到 OSS（对象存储服务）
4. **部署结果**：部署完成后，网站会自动更新，无需手动操作

### 部署优势

- **自动化**：无需手动执行构建和部署命令，节省开发时间
- **高效性**：利用 Turborepo 实现并行构建，提高构建速度
- **可靠性**：每次推送代码都会触发完整的测试和构建流程，确保代码质量
- **实时更新**：部署完成后，网站立即更新，用户可以访问最新版本

## 子应用说明

### home

主站应用，包含项目介绍、导航和主要内容展示。支持中英文国际化。

### blog

博客应用，用于发布和展示技术文章。

### anim

Three.js 演示应用，展示 3D 图形技术。

### tools

实用工具集合，包含各种在线工具。

## 贡献指南

欢迎提交 Issue 和 Pull Request！
