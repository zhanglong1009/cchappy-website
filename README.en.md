# CC Happy Website

[中文版本](./README.md)

## Project Introduction

CC Happy Website is a modern website project built with Vue 3 + TypeScript + Vite, using a Monorepo architecture to manage multiple sub-applications. This project aims to showcase and share various technical demos, blog articles, and practical tools.

**Project Preview URL:** [https://www.cchappy.top/](https://www.cchappy.top/)

## Tech Stack

- **Frontend Framework**: Vue 3
- **Development Language**: TypeScript
- **Build Tool**: Vite
- **Package Management**: pnpm
- **Monorepo Management**: Turborepo
- **Routing**: Vue Router (in some apps)
- **Internationalization**: i18n

## Project Structure

```
cchappy-website/
├── apps/                  # Sub-applications directory
│   ├── blog/             # Blog application
│   ├── home/             # Main website application
│   ├── three-demo/       # Three.js demo application
│   └── tools/            # Collection of practical tools
├── packages/             # Shared packages
│   ├── ui/               # UI component library
│   └── utils/            # Utility functions library
├── package.json          # Root project configuration
├── pnpm-workspace.yaml   # pnpm workspace configuration
├── turbo.json            # Turborepo configuration
└── tsconfig.json         # TypeScript configuration
```

## Installation and Startup

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 9.0.0

### Install Dependencies

```bash
pnpm install
```

### Development Mode

Start the development server for all applications:

```bash
pnpm dev
```

Start the development server for a single application using shortcut commands:

```bash
# Develop main website application
pnpm dev:home

# Develop blog application
pnpm dev:blog

# Develop Three.js demo application
pnpm dev:three-demo

# Develop tools collection application
pnpm dev:tools
```

### Build Production Version

Build all applications:

```bash
pnpm build
```

Build a single application or package using shortcut commands:

```bash
# Build main website application
pnpm build:home

# Build blog application
pnpm build:blog

# Build Three.js demo application
pnpm build:three-demo

# Build tools collection application
pnpm build:tools
```

### Code Linting

Lint all applications and packages:

```bash
pnpm lint
```
### Type Checking

Check types for all applications and packages:

```bash
pnpm typecheck
```
### Supported Shortcut Commands

| Command Type | Supported Commands | Description |
| --- | --- | --- |
| Development Commands | `dev:home`, `dev:blog`, `dev:three-demo`, `dev:tools` | Start development server for a single application |
| Build Commands | `build:home`, `build:blog`, `build:three-demo`, `build:tools` | Build a single application or package |

## Sub-application Description

### home

Main website application, including project introduction, navigation, and main content display. Supports Chinese and English internationalization.

### blog

Blog application for publishing and displaying technical articles.

### three-demo

Three.js demo application showcasing 3D graphics technology.

### tools

Collection of practical tools, including various online tools.

## Contribution Guidelines

Welcome to submit Issues and Pull Requests!
