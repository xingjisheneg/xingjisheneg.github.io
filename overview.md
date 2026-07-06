# Marginalia 个人博客 — Markdown 驱动 + GitHub Pages 部署方案

## 升级概述

在第一版单 HTML 博客基础上，升级为 **Markdown 驱动的静态站点**：写文章 = 新建 `.md`，`git push` 后 GitHub Actions 自动构建并部署到 GitHub Pages。零框架，构建期注入，部署纯静态 HTML（首屏快、SEO 友好）。

## 目录结构

```
posts/               # 写文章的地方，每篇一个 .md（带 frontmatter）
scripts/build.mjs     # 构建脚本：读 posts → 注入 index → 生成文章页
index.html            # 首页模板（含 <!--LEAD--> <!--POSTS--> <!--COUNT--> 占位符）
post.html             # 单篇文章页模板（含 <!--TITLE--> <!--BODY--> 等占位符）
.github/workflows/deploy.yml   # GitHub Actions 自动部署
package.json          # 依赖：marked + gray-matter
README.md             # 完整流程文档
```

## 写作流程（日常）

1. 在 `posts/` 新建 `xxx.md`，填 frontmatter（title/deck/date/read/tags/featured）+ Markdown 正文
2. 标题里用 `*词*` 标记斜体强调（构建时转 `<em>`）
3. `npm run dev` 本地预览
4. `git push` → GitHub Actions 自动构建部署

## 构建脚本逻辑（scripts/build.mjs）

1. 读 `posts/*.md`，用 gray-matter 解析 frontmatter，marked 渲染正文 HTML
2. 按日期倒序，取 `featured: true` 为头条，其余为列表
3. 生成 lead HTML → 注入 `index.html` 的 `<!--LEAD:START/END-->`
4. 生成 essay 列表 → 注入 `<!--POSTS:START/END-->`，替换 `<!--COUNT-->`
5. 为每篇生成 `dist/posts/{slug}.html`（基于 `post.html` 模板，含上下篇导航）
6. 产物输出到 `dist/`

## 部署流程（GitHub Actions）

- 触发：push 到 main（改动 posts/index.html/post.html/scripts/package.json 时）
- 步骤：checkout → setup-node 20 → npm ci → node build → upload-pages-artifact(dist) → deploy-pages
- 仓库 Settings → Pages → Source 选 "GitHub Actions"

## 设计保留

完整继承第一版的编辑式文学杂志美学：Fraunces + Newsreader + IBM Plex Mono 三重排版、oklch 温暖纸感配色、烧赭石强调色、日夜主题、阅读进度、入场动效、容器查询响应式。单篇文章页 `post.html` 复用同一套设计令牌，外加 `.prose` Markdown 正文排版（h2 带 § 前缀、blockquote 左边框、code 浅底、首字下沉）。

## 关键文件

- `README.md` — 完整流程文档（写文章/部署/自定义/FAQ）
- `scripts/build.mjs` — 构建脚本
- `.github/workflows/deploy.yml` — 自动部署
- `posts/*.md` — 7 篇示例文章
- `index.html` / `post.html` — 模板

## 本地预览

- 构建产物：`http://localhost:8766`（dist/，python http.server）
- 源模板：`http://localhost:8765`（index.html）
