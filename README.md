# iaxixi-max 组件库

一个现代化的 React UI 组件库，基于 TypeScript、TailwindCSS、Rollup 和 Vite 构建。

## ✨ 特性
- 🚀 现代化技术栈：React 19 + TypeScript 5 + TailwindCSS 4 + daisyui
- 📦 支持 ESM/CJS 双格式输出
- 🎨 内置 TailwindCSS + daisyui，极致定制
- 🛠️ Storybook 文档与演示
- ⚡ Vite 极速开发体验

## 📦 安装
```bash
npm install iaxixi-max
# 或者
pnpm add iaxixi-max
```

## 🔨 使用方法
```tsx
import { SuButton } from 'iaxixi-max';

export default function Demo() {
  return <SuButton>按钮</SuButton>;
}
```

## 🧑‍💻 本地开发
```bash
# 启动本地开发环境
npm run dev

# 运行 Storybook 组件文档
npm run storybook
```

## 🏗️ 打包组件库
```bash
npm run build:rollup
```
打包产物会输出到 `dist/` 目录。

## 🚀 发布到 npm
1. 登录 npm 账号：
   ```bash
   npm login
   ```
2. 发布：
   ```bash
   npm publish --access public
   ```

## 📚 贡献
欢迎提 Issue 或 PR！

---

MIT License © iaxixi
