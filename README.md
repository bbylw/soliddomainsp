# WebNav Hub

[English](#english) | [中文](#中文)

<div align="center">
  <img src="public/favicon.svg" alt="WebNav Hub" width="96">
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

## 🚀 Free Hosting Platforms

All platforms below publish the same static build. The project uses Bun and commits `bun.lock`, so every guide installs and builds with Bun:

| Setting | Value |
| --- | --- |
| Root directory | `/` |
| Install command | `bun install` |
| Build command | `bun run build` |
| Output directory | `dist` |
| Runtime | Bun 1.4+ (Node.js 20.19+ / 22.12+ only if you fall back to npm) |

### 1. GitHub Pages

This repository already ships with `.github/workflows/deploy.yml`:

1. Push to `main` (or run the workflow manually from the Actions tab).
2. GitHub Actions sets up Bun, installs dependencies with `bun install --frozen-lockfile`, and builds with `bun run build`.
3. The `dist/` artifact is published to GitHub Pages.

For a fork, open **Settings → Pages** and set the source to **GitHub Actions**. The site will be available at `https://<username>.github.io/<repo>/`.

### 2. Cloudflare Pages

1. Open the Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Authorize GitHub and select this repository.
3. Set the build options:
   - Root directory: `/`
   - Build command: `bun install && bun run build`
   - Build output directory: `dist`
   - Environment variables:
     - `SKIP_DEPENDENCY_INSTALL=true`
     - `BUN_VERSION=1.4.4` (optional; the v3 build image already ships Bun 1.4.4)
4. Click **Save and Deploy**. The site will be available at `https://<project>.pages.dev`.
5. Optional: bind a custom domain under the project's **Custom domains** tab.

Pages' automatic dependency install does not recognize the text `bun.lock`, hence the install step inside the build command and the skipped auto-install.

### 3. Netlify

1. Open [Netlify](https://app.netlify.com/) → **Add new site** → **Import an existing project**.
2. Connect GitHub and select this repository.
3. Set:
   - Build command: `bun install && bun run build`
   - Publish directory: `dist`
   - Optional environment variable: `BUN_VERSION=1.4.4`
4. Click **Deploy**. The site will be available at `https://<site>.netlify.app`.
5. Optional: add a custom domain under **Domain management**.

Netlify's automatic Bun detection looks for the older binary `bun.lockb`, so this repository's text lockfile is installed explicitly in the build command.

### 4. Vercel

1. Open [Vercel](https://vercel.com/new) and import this Git repository.
2. Keep the detected **Vite** preset and confirm:
   - Install command: `bun install`
   - Build command: `bun run build`
   - Output directory: `dist`
3. Click **Deploy**. The site will be available at `https://<project>.vercel.app`.
4. Optional: add a custom domain under **Settings → Domains**.

Vercel detects `bun.lock` and installs with Bun automatically.

### 5. EdgeOne Pages

1. Open the [EdgeOne Pages console](https://pages.edgeone.ai/) → **Create project** → import this Git repository.
2. Set the build options:
   - Root directory: `./`
   - Install command: `bun install`
   - Build command: `bun run build`
   - Output directory: `dist`
   - Node.js version: 22 (bundled with Bun)
3. Click **Deploy**. The site will be available at `https://<project>.edgeone.app`.
4. Optional: bind a custom domain in the project settings.

### Custom Domains

- Add the domain in the platform dashboard, then follow the DNS target it provides (CNAME for subdomains, ALIAS/ANAME or nameservers for apex domains). All five platforms issue HTTPS certificates automatically.
- `vite.config.ts` sets `base: "./"`, so the same build works at a domain root or under a sub-path such as GitHub Pages project sites.
- The canonical and Open Graph URLs currently point to `https://solidp.ndjp.net/`. If you switch to another domain, update them in `index.html` and `domains.html`.

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

## 🚀 免费托管平台

以下平台发布同一份静态构建产物。本项目使用 Bun，并以 `bun.lock` 作为唯一锁文件，因此所有教程都用 Bun 安装与构建：

| 配置项 | 值 |
| --- | --- |
| 根目录 | `/` |
| 安装命令 | `bun install` |
| 构建命令 | `bun run build` |
| 输出目录 | `dist` |
| 运行时 | Bun 1.4+（仅在改用 npm 时才需要 Node.js 20.19+ / 22.12+） |

### 1. GitHub Pages

本仓库自带 `.github/workflows/deploy.yml`：

1. 推送代码到 `main` 分支（或在 Actions 中手动触发）
2. GitHub Actions 安装 Bun，执行 `bun install --frozen-lockfile` 安装依赖，并通过 `bun run build` 构建
3. 将 `dist/` 产物发布到 GitHub Pages

如果 Fork 本仓库，请进入 **Settings → Pages**，将来源设为 **GitHub Actions**。站点地址为 `https://<用户名>.github.io/<仓库名>/`。

### 2. Cloudflare Pages

1. 打开 Cloudflare 控制台 → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. 授权 GitHub 并选择本仓库
3. 设置构建选项：
   - 根目录：`/`
   - 构建命令：`bun install && bun run build`
   - 构建输出目录：`dist`
   - 环境变量：
     - `SKIP_DEPENDENCY_INSTALL=true`
     - `BUN_VERSION=1.4.4`（可选，v3 构建镜像已内置 Bun 1.4.4）
4. 点击 **Save and Deploy**，站点地址为 `https://<项目名>.pages.dev`
5. 可选：在项目的 **Custom domains** 中绑定自定义域名

Pages 的自动依赖安装不识别文本格式的 `bun.lock`，因此在构建命令中显式安装，并关闭自动安装。

### 3. Netlify

1. 打开 [Netlify](https://app.netlify.com/) → **Add new site** → **Import an existing project**
2. 连接 GitHub 并选择本仓库
3. 设置：
   - 构建命令：`bun install && bun run build`
   - 发布目录：`dist`
   - 可选环境变量：`BUN_VERSION=1.4.4`
4. 点击 **Deploy**，站点地址为 `https://<站点名>.netlify.app`
5. 可选：在 **Domain management** 中绑定自定义域名

Netlify 的 Bun 自动检测只认旧版二进制锁文件 `bun.lockb`，因此这里在构建命令中显式安装文本格式的 `bun.lock`。

### 4. Vercel

1. 打开 [Vercel](https://vercel.com/new) 并导入本 Git 仓库
2. 保留自动识别的 **Vite** 预设，确认：
   - 安装命令：`bun install`
   - 构建命令：`bun run build`
   - 输出目录：`dist`
3. 点击 **Deploy**，站点地址为 `https://<项目名>.vercel.app`
4. 可选：在 **Settings → Domains** 中绑定自定义域名

Vercel 能识别 `bun.lock`，会自动使用 Bun 安装依赖。

### 5. EdgeOne Pages

1. 打开 [EdgeOne Pages 控制台](https://pages.edgeone.ai/) → **创建项目**，导入本 Git 仓库
2. 设置构建选项：
   - 根目录：`./`
   - 安装命令：`bun install`
   - 构建命令：`bun run build`
   - 输出目录：`dist`
   - Node.js 版本：22（已随附 Bun）
3. 点击 **部署**，站点地址为 `https://<项目名>.edgeone.app`
4. 可选：在项目设置中绑定自定义域名

### 自定义域名

- 在平台控制台添加域名后，按提示配置 DNS（子域用 CNAME，根域用 ALIAS/ANAME 或 NS）。上述五个平台都会自动签发 HTTPS 证书。
- `vite.config.ts` 设置了 `base: "./"`，同一份构建产物既能部署到域名根目录，也能部署到 GitHub Pages 项目页这类子路径。
- canonical 与 Open Graph 地址当前指向 `https://solidp.ndjp.net/`。更换主域名时，请同步修改 `index.html` 与 `domains.html`。

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
