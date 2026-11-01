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

- Data-driven architecture: all categories and links are stored in `links.json`, decoupled from HTML markup
- Separated stylesheet (`style.css`) and script (`main.js`) shared by both pages
- Semantic card markup (`<a class="link-card">`) with `:focus-visible` keyboard navigation support
- Smooth anchor navigation with `scroll-margin-top`, `IntersectionObserver` ScrollSpy, and `history.pushState` hash sync
- Complete SEO & Open Graph metadata and CDN `preconnect` optimization
- CSS custom properties for the color palette and streamlined responsive breakpoints (1200px / 768px / 480px / 360px)
- Custom SVG favicon, no image assets required

## 📂 Project Structure

```
├── index.html      # Home page shell — top nav & semantic container
├── domains.html    # Free domain / DNS sub-page shell
├── links.json      # Centralized link data (6 categories / 160 home cards + 30 domain cards)
├── style.css       # Shared stylesheet for both pages
├── main.js         # Shared behaviour: JSON rendering, ScrollSpy, anchor nav, footer year
├── favicon.svg     # Site icon
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

The 实用工具 grid contains one internal card (`"internal": true`) that links to `domains.html`. The sub-page itself is rendered from the `domains` array in `links.json`.

## 🚀 Deployment Options

### GitHub Pages Deployment

1. Fork this repository
2. Go to repository Settings > Pages
3. Select main branch as source
4. Your site will be available at `https://[username].github.io/[repo-name]`

### Cloudflare Pages Deployment

1. Connect your GitHub repository to Cloudflare Pages
2. Set build settings:
   - Build command: `N/A` (static site)
   - Build output directory: `/`
3. Deploy and access via Cloudflare's URL

### Custom Domain Setup

1. Register at [dynv6](https://dynv6.com)
2. Add a new domain and configure DNS settings
3. Point domain to your deployment URL
4. Update DNS settings in your deployment platform

## 🛠 Customization

### Adding a New Link

Append an entry to the target category's `links` array (or to the `domains` array) in `links.json`:

```json
{
  "title": "[TITLE]",
  "url": "[URL]",
  "icon": "[ICON-CLASS]"
}
```

For internal links that should open in the same tab, add `"internal": true`. At runtime, `main.js` renders each item as a semantic `<a class="link-card">` element.

### Adding a New Category

1. Add a new category object to the `categories` array in `links.json`:

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

2. Add a matching navigation item to `.top-nav` in `index.html`:

```html
<li><a href="#[CATEGORY-ID]">[CATEGORY-NAME]</a></li>
```

`main.js` automatically renders the new section and wires up smooth scrolling and ScrollSpy active-state highlighting.

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

- Modern browsers with CSS Grid and `fetch` / `IntersectionObserver` support
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

- 数据与视图解耦：所有分类与卡片数据集中在 `links.json` 中维护，由 `main.js` 动态渲染
- 样式与脚本分离为 `style.css` 和 `main.js`，两个页面共用
- 语义化卡片结构（`<a class="link-card">`），支持 `:focus-visible` 键盘无障碍导航
- 锚点导航平滑滚动（带 `scroll-margin-top` 防遮挡），配合 `IntersectionObserver` 滚动监听（ScrollSpy）与 `history.pushState` 自动同步高亮和地址栏
- 完善的 SEO 与 Open Graph 社交分享元数据，以及 CDN `preconnect` 预连接优化
- 使用 CSS 自定义属性管理配色，精简四档响应式断点（1200px / 768px / 480px / 360px）
- 自绘 SVG 图标，不依赖任何位图资源

## 📂 项目结构

```
├── index.html      # 首页骨架 — 顶部导航与语义化容器
├── domains.html    # 免费域名 / DNS 子页骨架
├── links.json      # 集中式链接数据源（首页 6 个分类 160 张卡片 + 子页 30 张卡片）
├── style.css       # 两个页面共用的样式表
├── main.js         # 共用行为：JSON 数据渲染、ScrollSpy、锚点导航、年份更新
├── favicon.svg     # 站点图标
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

实用工具网格中有一张内部卡片（`"internal": true`）指向 `domains.html`。该子页的数据存储在 `links.json` 的 `domains` 数组中。

## 🚀 部署选项

### GitHub Pages 部署

1. Fork 本仓库
2. 进入仓库设置 > Pages
3. 选择 main 分支作为源
4. 您的站点将在 `https://[用户名].github.io/[仓库名]` 可用

### Cloudflare Pages 部署

1. 将您的 GitHub 仓库连接到 Cloudflare Pages
2. 设置构建选项：
   - 构建命令：`N/A`（静态站点）
   - 构建输出目录：`/`
3. 部署并通过 Cloudflare 提供的 URL 访问

### 自定义域名设置

1. 在 [dynv6](https://dynv6.com) 注册
2. 添加新域名并配置 DNS 设置
3. 将域名指向您的部署 URL
4. 在部署平台更新 DNS 设置

## 🛠 自定义设置

### 添加新链接

只需在 `links.json` 对应分类的 `links` 数组（或子页的 `domains` 数组）中新增一项：

```json
{
  "title": "[标题]",
  "url": "[URL]",
  "icon": "[图标类名]"
}
```

如果是站内跳转链接（无需新标签页打开），可额外加上 `"internal": true`。`main.js` 会在运行时将其渲染为语义化的 `<a class="link-card">` 元素。

### 添加新分类

1. 在 `links.json` 的 `categories` 数组中新增一个分类对象：

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

2. 在 `index.html` 的 `.top-nav` 导航栏中添加对应项：

```html
<li><a href="#[分类ID]">[分类名称]</a></li>
```

`main.js` 会自动渲染该分类区块，并绑定平滑滚动与 ScrollSpy 滚动高亮状态。

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

- 支持具有 CSS Grid、`fetch` 及 `IntersectionObserver` 功能的现代浏览器
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
