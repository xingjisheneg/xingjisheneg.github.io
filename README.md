# Marginalia — 个人写作博客

一份基于 **Markdown 驱动**的静态博客。写文章 = 新建一个 `.md` 文件，`git push` 后由 GitHub Actions 自动构建并部署到 GitHub Pages。零框架，单 HTML 输出，保留手工排版的质感。

---

## 仓库结构

```
.
├─ posts/                 # ← 你写文章的地方，每篇一个 .md
│  ├─ when-code-falls-silent.md   # 头条（frontmatter 里 featured: true）
│  ├─ interfaces-as-sentences.md
│  └─ ...
├─ scripts/
│  └─ build.mjs           # 构建脚本：读 posts → 注入 index → 生成文章页
├─ index.html             # 首页模板（含占位符，构建时填充）
├─ post.html              # 单篇文章页模板
├─ .github/workflows/
│  └─ deploy.yml          # GitHub Actions：push 到 main 自动构建+部署
├─ package.json
└─ README.md
```

构建产物输出到 `dist/`（被 `.gitignore` 忽略），里面是 `index.html` + `posts/*.html`，纯静态。

---

## 一、写一篇新文章（日常流程）

### 1. 在 `posts/` 新建一个 Markdown 文件

文件名随意，建议用英文短横线（会成为 URL 的 slug），例如 `2026-07-10-my-new-post.md`。

### 2. 填写 frontmatter + 正文

```markdown
---
title: 这是一篇*新文章*的标题
deck: 一句话摘要，会显示在列表和文章页顶部。
date: 2026-07-10
read: 6
tags: [代码, 工艺]
featured: false
---

正文用标准 Markdown 写。标题里可以用 `*星号*` 标记需要斜体强调的词，
构建时会自动转成 `<em>`。

## 小标题

段落照常写……
```

**frontmatter 字段说明**

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | ✅ | 文章标题。用 `*词*` 标记斜体强调词 |
| `deck` | ✅ | 副标题/摘要，一句 |
| `date` | ✅ | `YYYY-MM-DD`，决定排序 |
| `read` | ✅ | 阅读分钟数，如 `8` |
| `tags` | ✅ | 列表，如 `[代码, 工艺]`，用空格或逗号分隔 |
| `featured` | ❌ | `true` 则上首页头条。**同时只应有一篇为 true**；不填默认 `false` |

### 3. 本地预览

```bash
npm install        # 仅首次
npm run build      # 构建到 dist/
npm run serve      # 起本地服务器，访问 http://localhost:3000
# 或一步到位：
npm run dev        # 构建 + 起服务器
```

### 4. 提交并推送

```bash
git add posts/2026-07-10-my-new-post.md
git commit -m "post: 新文章标题"
git push
```

推送后 GitHub Actions 会自动构建并部署，约 1 分钟后线上更新。

---

## 二、首次部署到 GitHub Pages（一次性）

### 1. 把项目推到 GitHub

```bash
git init
git add .
git commit -m "init: Marginalia 博客"
git branch -M main
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

### 2. 启用 GitHub Pages

进入仓库 **Settings → Pages**：

- **Source** 选 `GitHub Actions`（不是 Deploy from branch）
- 保存

### 3. 触发部署

下次 `push` 到 `main` 时，Actions 会自动跑（见 `.github/workflows/deploy.yml`）。也可以在仓库 **Actions** 标签页手动 `Run workflow`。

部署成功后，站点地址形如：

```
https://<你的用户名>.github.io/<仓库名>/
```

> 如果用 `<用户名>.github.io` 这个仓库名，则直接是根域名 `https://<用户名>.github.io/`。

---

## 三、设头条

在你想顶到首页头条的那篇文章的 frontmatter 里设 `featured: true`，同时把旧的头条改回 `false`（或不填）。`build.mjs` 会取第一个 `featured: true` 的文章作为头条；如果都没有，取最新一篇。

---

## 四、本地开发命令

| 命令 | 作用 |
|------|------|
| `npm install` | 安装依赖（marked + gray-matter） |
| `npm run build` | 构建 `dist/` |
| `npm run serve` | 在 `dist/` 起静态服务器（默认 :3000） |
| `npm run dev` | 构建 + 起服务器 |

---

## 五、自定义

- **作者名 / 刊物名**：搜 `林深` 和 `Marginalia` 替换（在 `index.html`、`post.html`、`build.mjs` 的 byline 里）
- **配色**：改 `index.html` 和 `post.html` 顶部 `:root` 里的 oklch 令牌
- **字体**：改 `<link>` 里的 Google Fonts 链接 + `--font-*` 变量
- **Vol / Issue 号**：`index.html` masthead 里手动改；`№` 编号由脚本按文章数自动生成

---

## 设计说明

- **美学**：编辑式文学杂志风，温暖纸感配色 + 烧赭石强调色
- **字体**：Fraunces（展示衬线，可变光学尺寸）/ Newsreader（正文）/ IBM Plex Mono（元信息）
- **特性**：日夜主题切换、阅读进度条、容器查询响应式、`prefers-reduced-motion` 支持
- **零运行时 JS 框架**：构建期注入，部署的是纯静态 HTML，首屏快、SEO 友好

---

## 常见问题

**Q：推上去后 Pages 没更新？**
A：去仓库 Actions 标签看构建是否报错。常见是没装依赖——`deploy.yml` 里已用 `npm ci`，需要 `package-lock.json` 已提交（首次 `npm install` 后会生成）。

**Q：想用自定义域名？**
A：在 `dist/` 放一个 `CNAME` 文件（构建脚本里加上复制逻辑），然后在 GitHub Pages 设置里填域名。

**Q：想加图片？**
A：在仓库建 `public/`（或 `assets/`）放图，在 `build.mjs` 末尾加一段把该目录复制到 `dist/`，文章里用 `![](/assets/xxx.png)` 引用。
