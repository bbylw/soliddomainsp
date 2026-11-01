# WebNav Hub

[English](#english) | [中文](#中文)

<div align="center">
  <img src="favicon.svg" alt="WebNav Hub" width="96">
</div>

<a name="english"></a>

## 🎨 Design Inspiration

This project's UI design and color scheme is directly inspired by Pornhub's iconic black and orange theme. The choice was deliberate, leveraging the instantly recognizable color palette that has become a cultural phenomenon and internet meme, often referenced in various UI design discussions and parodies.

- Primary Theme Color: `#ff9000` (Pornhub Orange)
- Background: `#0d0d0d` (Dark Black)
- Card Background: `#1a1a1a`
- Text: `#ffffff` (White)

## 🌟 Features

### Modern Design

- Responsive grid layout with beautiful cards
- Smooth animations and transitions
- Dark theme with modern color scheme
- Optimized for both desktop and mobile devices

### Content

- **160 link cards** across 6 categories on the home page
- **30 domain / DNS links** on a dedicated sub-page
- Every external link opens in a new tab with `rel="noopener noreferrer"`

### Technical Improvements

- Built with **SolidJS 1.9** (latest release), **Vite 8**, and **TypeScript**, compiled to static HTML/CSS/JS
- Fine-grained reactivity with Solid signals drives link rendering, active navigation state, and hash sync — no virtual DOM
- Data-driven architecture: categories, links, and the domain page all come from `public/links.json` at runtime, decoupled from markup
- Multi-page Vite build preserves the original `index.html` and `domains.html` URLs while sharing one component tree
- Semantic card markup (`<a class="link-card">`) with `:focus-visible` keyboard navigation support
- Smooth anchor navigation with `scroll-margin-top`, `IntersectionObserver` ScrollSpy, and `history.pushState` hash sync
- Complete SEO & Open Graph metadata and CDN `preconnect` optimization
- CSS custom properties for the color palette and four responsive breakpoints (1200px / 768px / 480px / 360px)
- Custom SVG favicon, no bitmap assets required

## 📂 Project Structure

```
├── .github/
│   └── workflows/deploy.yml  # CI: build and deploy to GitHub Pages
├── public/
│   ├── links.json            # Centralized link data (6 categories / 160 home cards + 30 domain cards)
│   └── favicon.svg           # Site icon
├── src/
│   ├── components/           # LinkCard, SiteHeader, TopNav, SiteFooter
│   ├── data/links.ts         # Runtime loader for links.json
│   ├── pages/                # Home and Domains page components
│   ├── home.tsx              # Home entry (mounts the Solid app)
│   ├── domains.tsx           # Domains entry (mounts the Solid app)
│   ├── nav.ts                # Top navigation items
│   └── types.ts              # Shared link/category types
├── index.html                # Vite entry — home page
├── domains.html              # Vite entry — free domain / DNS sub-page
├── style.css                 # Shared stylesheet for both pages
├── vite.config.ts            # Multi-page build configuration
├── tsconfig.json
├── package.json
└── README.md
```

## 🗂 Categories

| Category | ID | Cards |
| --- | --- | --- |
| Ai搜索 | `ai-search` | 54 |
| 托管社交 | `social` | 22 |
| 实用工具 | `tools` | 60 |
| 科技资讯 | `tech-news` | 9 |
| 云存储 | `cloud-storage` | 7 |
| 电子邮箱 | `email` | 8 |

The 实用工具 grid contains one internal card (`"internal": true`) that links to `domains.html`. The sub-page itself is rendered from the `domains` array in `public/links.json`.

## 🧑‍💻 Local Development

```bash
bun install      # install dependencies
bun run dev      # start the Vite dev server
bun run build    # type-check and build to dist/
bun run preview  # preview the production build
```

Bun is recommended; the build also works with Node.js 20.19+ / 22.12+ and npm.

## 🚀 Deployment Options

### GitHub Pages Deployment

This repository ships with `.github/workflows/deploy.yml`:

1. Push to `main` (or run the workflow manually)
2. GitHub Actions installs dependencies, type-checks, and builds with `bun run build`
3. The `dist/` artifact is published to GitHub Pages

For a fork, go to repository Settings > Pages and set the source to **GitHub Actions**.

### Cloudflare Pages Deployment

1. Connect your GitHub repository to Cloudflare Pages
2. Set build settings:
   - Build command: `bun run build`
   - Build output directory: `dist`
3. Deploy and access via Cloudflare's URL

### Custom Domain Setup

1. Register at [dynv6](https://dynv6.com)
2. Add a new domain and configure DNS settings
3. Point domain to your deployment URL
4. Update DNS settings in your deployment platform

## 🛠 Customization

### Adding a New Link

Append an entry to the target category's `links` array (or to the `domains` array) in `public/links.json`:

```json
{
  "title": "[TITLE]",
  "url": "[URL]",
  "icon": "[ICON-CLASS]"
}
```

For internal links that should open in the same tab, add `"internal": true`. At runtime, the Solid app renders each item as a semantic `<a class="link-card">` element.

### Adding a New Category

1. Add a new category object to the `categories` array in `public/links.json`:

```json
{
  "id": "[CATEGORY-ID]",
  "title": "[CATEGORY-NAME]",
  "links": [
    {
      "title": "[TITLE]",
      "url": "[URL]",
      "icon": "[ICON-CLASS]"
    }
  ]
}
```

2. Add a matching navigation item to `src/nav.ts`:

```ts
{ href: "#[CATEGORY-ID]", label: "[CATEGORY-NAME]" },
```

The Solid app automatically renders the new section and wires up smooth scrolling and ScrollSpy active-state highlighting.

### Changing Colors

All colors live in the `:root` block at the top of `style.css`:

```css
:root {
  --primary-color: #ff9000;
  --bg-color: #0d0d0d;
  --card-bg-color: #1a1a1a;
  --text-color: #fff;
}
```

## 📱 Browser Support

- Modern browsers with CSS Grid, native ES modules, `fetch`, and `IntersectionObserver` support
- Responsive down to 360px viewport width

## 🔒 Security

All external links include security attributes:

- `rel="noopener"`: Prevents `window.opener` exploitation
- `rel="noreferrer"`: Prevents referrer information leakage

## 📄 License

This project is open-source and available under the MIT License.

---

<a name="中文"></a>

## 🎨 设计灵感

本项目的界面设计和配色方案直接借鉴自 Pornhub 的标志性黑橙配色。这是一个刻意的设计选择，利用了这个已成为文化现象和网络模因的即时可识别配色方案，经常在各种 UI 设计讨论和模仿作品中被引用。

- 主题主色：`#ff9000`（Pornhub 橙）
- 背景色：`#0d0d0d`（深黑色）
- 卡片背景：`#1a1a1a`
- 文字颜色：`#ffffff`（白色）

## 🌟 功能特点

### 现代设计

- 响应式网格布局，精美卡片设计
- 流畅的动画和过渡效果
- 现代深色主题配色
- 同时优化桌面和移动设备体验

### 内容规模

- 首页 **6 个分类、160 张链接卡片**
- 独立子页收录 **30 个域名 / DNS 相关链接**
- 所有外部链接均在新标签页打开，并带 `rel="noopener noreferrer"`

### 技术改进

- 基于 **SolidJS 1.9**（当前最新发行版）、**Vite 8** 与 **TypeScript** 构建，编译为静态 HTML/CSS/JS
- 使用 Solid 细粒度响应式信号驱动卡片渲染、导航高亮与 hash 同步，无虚拟 DOM
- 数据与视图解耦：分类、链接与域名子页数据统一在 `public/links.json` 中维护，运行时加载
- Vite 多页构建保留原有 `index.html` 与 `domains.html` 路径，同时共用一套 Solid 组件
- 语义化卡片结构（`<a class="link-card">`），支持 `:focus-visible` 键盘无障碍导航
- 锚点导航平滑滚动（带 `scroll-margin-top` 防遮挡），配合 `IntersectionObserver` 滚动监听（ScrollSpy）与 `history.pushState` 自动同步高亮和地址栏
- 完善的 SEO 与 Open Graph 社交分享元数据，以及 CDN `preconnect` 预连接优化
- 使用 CSS 自定义属性管理配色，精简四档响应式断点（1200px / 768px / 480px / 360px）
- 自绘 SVG 图标，不依赖任何位图资源

## 📂 项目结构

```
├── .github/
│   └── workflows/deploy.yml  # CI：构建并部署到 GitHub Pages
├── public/
│   ├── links.json            # 集中式链接数据源（首页 6 个分类 160 张卡片 + 子页 30 张卡片）
│   └── favicon.svg           # 站点图标
├── src/
│   ├── components/           # LinkCard、SiteHeader、TopNav、SiteFooter 组件
│   ├── data/links.ts         # links.json 运行时加载器
│   ├── pages/                # 首页与域名子页组件
│   ├── home.tsx              # 首页入口（挂载 Solid 应用）
│   ├── domains.tsx           # 域名页入口（挂载 Solid 应用）
│   ├── nav.ts                # 顶部导航项
│   └── types.ts              # 链接与分类类型定义
├── index.html                # Vite 入口 — 首页
├── domains.html              # Vite 入口 — 免费域名 / DNS 子页
├── style.css                 # 两个页面共用的样式表
├── vite.config.ts            # 多页构建配置
├── tsconfig.json
├── package.json
└── README.md
```

## 🗂 分类一览

| 分类 | ID | 卡片数 |
| --- | --- | --- |
| Ai搜索 | `ai-search` | 54 |
| 托管社交 | `social` | 22 |
| 实用工具 | `tools` | 60 |
| 科技资讯 | `tech-news` | 9 |
| 云存储 | `cloud-storage` | 7 |
| 电子邮箱 | `email` | 8 |

实用工具网格中有一张内部卡片（`"internal": true`）指向 `domains.html`。该子页的数据存储在 `public/links.json` 的 `domains` 数组中。

## 🧑‍💻 本地开发

```bash
bun install      # 安装依赖
bun run dev      # 启动 Vite 开发服务器
bun run build    # 类型检查并构建到 dist/
bun run preview  # 预览生产构建
```

推荐使用 Bun；Node.js 20.19+ / 22.12+ 配合 npm 同样可以构建。

## 🚀 部署选项

### GitHub Pages 部署

本仓库自带 `.github/workflows/deploy.yml`：

1. 推送代码到 `main` 分支（或在 Actions 中手动触发）
2. GitHub Actions 安装依赖、执行类型检查，并通过 `bun run build` 构建
3. 将 `dist/` 产物发布到 GitHub Pages

如果 Fork 本仓库，请进入仓库设置 > Pages，将来源设为 **GitHub Actions**。

### Cloudflare Pages 部署

1. 将您的 GitHub 仓库连接到 Cloudflare Pages
2. 设置构建选项：
   - 构建命令：`bun run build`
   - 构建输出目录：`dist`
3. 部署并通过 Cloudflare 提供的 URL 访问

### 自定义域名设置

1. 在 [dynv6](https://dynv6.com) 注册
2. 添加新域名并配置 DNS 设置
3. 将域名指向您的部署 URL
4. 在部署平台更新 DNS 设置

## 🛠 自定义设置

### 添加新链接

只需在 `public/links.json` 对应分类的 `links` 数组（或子页的 `domains` 数组）中新增一项：

```json
{
  "title": "[标题]",
  "url": "[URL]",
  "icon": "[图标类名]"
}
```

如果是站内跳转链接（无需新标签页打开），可额外加上 `"internal": true`。Solid 应用会在运行时将其渲染为语义化的 `<a class="link-card">` 元素。

### 添加新分类

1. 在 `public/links.json` 的 `categories` 数组中新增一个分类对象：

```json
{
  "id": "[分类ID]",
  "title": "[分类名称]",
  "links": [
    {
      "title": "[标题]",
      "url": "[URL]",
      "icon": "[图标类名]"
    }
  ]
}
```

2. 在 `src/nav.ts` 中添加对应的导航项：

```ts
{ href: "#[分类ID]", label: "[分类名称]" },
```

Solid 应用会自动渲染该分类区块，并绑定平滑滚动与 ScrollSpy 滚动高亮状态。

### 修改配色

所有颜色集中在 `style.css` 顶部的 `:root` 中：

```css
:root {
  --primary-color: #ff9000;
  --bg-color: #0d0d0d;
  --card-bg-color: #1a1a1a;
  --text-color: #fff;
}
```

## 📱 浏览器支持

- 支持具有 CSS Grid、原生 ES modules、`fetch` 及 `IntersectionObserver` 功能的现代浏览器
- 响应式适配至 360px 视口宽度

## 🔒 安全性

所有外部链接都包含安全属性：

- `rel="noopener"`：防止 `window.opener` 漏洞利用
- `rel="noreferrer"`：防止泄露引用来源信息

## 📄 许可证

本项目采用 MIT 许可证开源。

---

Created with ❤️ by AI, enhanced by humans
由 AI 创建，人类优化
