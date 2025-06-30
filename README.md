# 🧩 @xbghc/vue-ui

> 基于Vue 3 + TypeScript的现代化组件库

[![开发中](https://img.shields.io/badge/状态-开发中-yellow.svg)](https://github.com/xbghc/vue-ui)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vue.js](https://img.shields.io/badge/Vue.js-35495E?logo=vuedotjs&logoColor=4FC08D)](https://vuejs.org/)
[![Storybook](https://img.shields.io/badge/Storybook-FF4785?logo=storybook&logoColor=white)](https://storybook.js.org/)

## ✨ 特性

- 🎯 **专业品质** - 生产就绪的组件实现
- 📦 **Tree Shaking** - 完整的按需导入支持
- 🔒 **类型安全** - 100% TypeScript覆盖
- 🎨 **现代设计** - 精美的UI和流畅的动画
- 📱 **响应式** - 移动端友好的设计
- ♿ **可访问性** - 遵循WAI-ARIA标准
- 📖 **完整文档** - 详细的API文档和示例

## 🚀 快速开始

### 获取源码

> **注意**: 项目目前处于开发阶段，尚未发布到npm

```bash
git clone https://github.com/xbghc/vue-ui.git
cd vue-ui
npm install
npm run build
```

### 使用

```vue
<template>
  <ToolTip content="Hello World!">
    <template #trigger>
      <button>Hover me</button>
    </template>
  </ToolTip>
</template>

<script setup lang="ts">
import { ToolTip } from '@xbghc/vue-ui';
</script>
```

## 📚 文档

### 📖 用户指南

- [🔧 安装指南](./docs/guide/installation.md) - 安装和配置
- [🚀 快速开始](./docs/guide/getting-started.md) - 第一个示例
- [📦 导入方式](./docs/guide/import-methods.md) - 各种导入方法

### 📋 API参考

- [📖 完整API文档](./docs/api/index.md) - 所有组件的API参考

### 🛠️ 开发文档

- [⚙️ 开发环境](./docs/development/setup.md) - 本地开发配置
- [📖 Storybook](./docs/development/storybook.md) - 组件开发和测试
- [🤝 贡献指南](./docs/development/contributing.md) - 参与项目开发

### 🔗 在线资源

- [📖 完整文档](./docs/README.md) - 文档导航中心
- [🎨 Storybook演示](https://xbghc.github.io/vue-ui/) - 组件预览
- [📝 更新日志](./CHANGELOG.md) - 版本历史

## 🧩 组件列表

### ToolTip 工具提示

功能完整的工具提示组件，支持多种位置和自定义样式。

```vue
<ToolTip content="提示内容" placement="top" :show-arrow="true">
  <template #trigger>
    <button>触发器</button>
  </template>
</ToolTip>
```

**特性：**

- ✅ 12种位置布局
- ✅ 自定义延迟和偏移
- ✅ 富文本内容支持
- ✅ 编程式控制
- ✅ 响应式设计

## 📦 安装方式

### 完整导入

```typescript
import { createApp } from 'vue';
import XbghcVueUI from '@xbghc/vue-ui';
import '@xbghc/vue-ui/dist/vue-ui.css';

const app = createApp();
app.use(XbghcVueUI);
```

### 按需导入

```typescript
import { ToolTip } from '@xbghc/vue-ui';
// 样式自动导入
```

### CDN导入

```html
<script src="https://unpkg.com/@xbghc/vue-ui/dist/index.umd.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@xbghc/vue-ui/dist/vue-ui.css" />
```

## 🔧 开发

### 环境要求

- Node.js >= 16.0.0
- pnpm >= 7.0.0 (推荐)

### 本地开发

```bash
# 克隆项目
git clone https://github.com/xbghc/vue-ui.git
cd vue-ui

# 安装依赖
pnpm install

# 启动开发服务器
npm run dev

# 启动Storybook
npm run storybook
```

### 构建项目

```bash
# 构建组件库
npm run build

# 构建Storybook
npm run build-storybook

# 类型检查
npm run lint
```

## 🤝 贡献

我们欢迎所有形式的贡献！请查看 [贡献指南](./docs/development/contributing.md) 了解详情。

## 📄 开源协议

[ISC License](./LICENSE) © 2025-present xbghc

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式JavaScript框架
- [TypeScript](https://www.typescriptlang.org/) - JavaScript类型超集
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Storybook](https://storybook.js.org/) - 组件开发环境
- [@floating-ui/dom](https://floating-ui.com/) - 浮动元素定位库

---

⭐ **如果这个项目对您有帮助，请给个Star支持一下！**
