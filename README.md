# NUWA AI UI

> 为 ReyMao 打造的高端 AI 个人品牌官网首屏 UI。  
> 以“AI 先行者、系统化管理、跨文化协同、复杂项目交付”为核心叙事，呈现一个轻量、高级、可部署的未来感 Web 界面。

![React](https://img.shields.io/badge/React-19-20232a?style=flat-square&logo=react&logoColor=61dafb)
![Vite](https://img.shields.io/badge/Vite-8-646cff?style=flat-square&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178c6?style=flat-square&logo=typescript&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Animation-black?style=flat-square&logo=framer&logoColor=white)

---

## 项目定位

**NUWA AI UI** 是一个面向 AI 时代个人品牌与商业展示的高端官网界面原型。  
它不是普通 Landing Page，而是一个强调 **品牌叙事、视觉秩序、轻量性能、可快速上线** 的前端展示系统。

当前版本围绕 ReyMao 的个人标签展开：

- AI 先行者
- UI / Website Designer & Developer
- 某头部德企多年管理经验
- 十亿级项目视角
- 跨文化管理与供应链系统化经验
- AI 工具链驱动的个人品牌表达

---

## 在线预览

服务器 IP 访问：

```txt
http://<YOUR-DEPLOY-HOST>/nuwa-ai-ui/
```

域名路径：

```txt
http://reymao.com/nuwa-ai-ui/
```

> 注意：如域名访问出现 `Non-compliance ICP Filing` 或 `403 Beaver`，说明当前被阿里云备案合规层拦截，网站文件本身已部署成功。IP 地址可直接访问。

---

## 视觉方向

项目采用高端极简 + 未来科技感的视觉语言：

- 大字号中文主视觉标题
- 低饱和米白背景与深灰框架
- 金色粒子与光晕系统
- 抽象 AI 视觉图形：线束、虹膜、球体、网格
- A / B / C / D 四屏轮播叙事
- 克制的 Framer Motion 过渡动画
- CSS 粒子替代重 Canvas，保证性能

---

## 核心页面内容

当前首屏包含四个叙事状态：

| 编号 | 主题 | 内容方向 |
|---|---|---|
| A | AI 先行者 | 让 AI 融合你的商业远见 |
| B | 系统化增长 | 从经验到系统，再到规模化 |
| C | 未来界面 | 高级感不是装饰，是秩序 |
| D | ReyMao × AI | AI 先行者 ReyMao 的个人品牌表达 |

---

## 技术栈

- **Vite** — 极快的前端构建工具
- **React** — 组件化界面开发
- **TypeScript** — 类型安全与可维护性
- **Framer Motion** — 高质量页面动效
- **Plain CSS** — 无重型 UI 框架，便于性能控制与视觉定制

---

## 项目结构

```txt
nuwa-ai-ui/
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
├── README.md
└── src/
    ├── main.tsx
    ├── styles.css
    └── vite-env.d.ts
```

---

## 本地开发

```bash
cd /d/AI/nuwa-ai-ui
npm install
npm run dev
```

默认本地访问：

```txt
http://localhost:5173
```

---

## 构建生产版本

```bash
npm run build
```

构建输出目录：

```txt
dist/
```

生产预览：

```bash
npm run preview
```

默认访问：

```txt
http://localhost:4173
```

---

## 部署说明

当前项目按子路径部署配置：

```ts
base: '/nuwa-ai-ui/'
```

服务器部署目录：

```txt
/var/www/reymao.com/nuwa-ai-ui/
```

因此线上访问路径为：

```txt
http://<YOUR-DEPLOY-HOST>/nuwa-ai-ui/
```

如未来要部署到根路径，需要把 `vite.config.ts` 中的 `base` 改为：

```ts
base: '/'
```

然后重新构建并上传 `dist/`。

---

## 性能策略

本项目刻意避免过重的视觉实现：

- 不使用全屏 Canvas 高频刷新
- 粒子效果使用 CSS 动画
- 页面只保留必要的 Framer Motion 过渡
- 无大型 UI 框架
- 构建后静态文件可直接由 nginx 托管

目标是：**高级感 + 快速响应 + 易部署**。

---

## 品牌信息

**ReyMao — AI 先行者**

- Email: [rey.mao@mmu.top](mailto:rey.mao@mmu.top)
- Phone: `+86 177 1707 0994`
- GitHub: [reymondmeking-dot](https://github.com/reymondmeking-dot)
- Website: [reymao.com](http://reymao.com)

---

## 后续可扩展方向

- 增加完整多页面官网结构
- 增加作品集 / 案例展示模块
- 增加个人经历时间线
- 接入博客或知识库
- 配置 HTTPS 证书
- 配置 GitHub Actions 自动部署
- 增加 SEO 与 Open Graph 分享卡片

---

## License

This project is currently maintained as a personal brand UI prototype for ReyMao.
