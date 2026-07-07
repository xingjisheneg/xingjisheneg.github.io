/**
 * Marginalia 构建脚本
 * -----------------------------------------------------------
 * 读取 posts/*.md（带 frontmatter）→ 按日期倒序 →
 *   1) 把 featured 头条 + 文章列表注入 index.html 占位符
 *   2) 为每篇文章生成 dist/posts/{slug}.html（基于 post.html 模板）
 *   3) 产物全部输出到 dist/
 *
 * 用法：node scripts/build.mjs
 */
import { readdir, readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { join, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const POSTS_DIR = join(ROOT, "posts");
const DIST = join(ROOT, "dist");

marked.setOptions({ gfm: true, breaks: false });

/* ---------- 工具函数 ---------- */

// 把字符串里的 *重点* 转成 <em>重点</em>（用于标题/摘要里的强调）
function em(s) {
  return String(s).replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

// HTML 转义（用于把 title 放进 <title>、属性里）
function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// 日期格式化：返回 { dot: "07.02", iso: "2026.07.02" }
function fmtDate(d) {
  const x = new Date(d);
  const mm = String(x.getMonth() + 1).padStart(2, "0");
  const dd = String(x.getDate()).padStart(2, "0");
  return { dot: `${mm}.${dd}`, iso: `${x.getFullYear()}.${mm}.${dd}` };
}

// 取 HTML 里的前 N 个 <p> 块（用于首页头条摘要）
function firstParagraphs(html, n = 2) {
  const ps = html.match(/<p>[\s\S]*?<\/p>/g) || [];
  return ps.slice(0, n).join("\n      ");
}

/* ---------- 1. 读取所有文章 ---------- */

const files = (await readdir(POSTS_DIR))
  .filter((f) => extname(f) === ".md")
  .sort();

if (files.length === 0) {
  console.error("✗ posts/ 目录里没有任何 .md 文件");
  process.exit(1);
}

const posts = [];
for (const f of files) {
  const raw = await readFile(join(POSTS_DIR, f), "utf8");
  const { data, content } = matter(raw);
  const slug = basename(f, ".md");
  posts.push({
    slug,
    title: data.title || slug,
    deck: data.deck || "",
    date: data.date || new Date().toISOString().slice(0, 10),
    read: data.read || 5,
    tags: data.tags || [],
    featured: !!data.featured,
    body: content,
    html: marked.parse(content),
  });
}

// 按日期倒序（最新在前）
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

const featured = posts.find((p) => p.featured) || posts[0];
const list = posts.filter((p) => p !== featured);
const issueNo = String(posts.length).padStart(3, "0");

/* ---------- 2. 生成文章列表项 ---------- */

function essayLi(p, i) {
  const num = String(i + 1).padStart(2, "0");
  const d = fmtDate(p.date);
  return `        <li class="essay reveal">
          <span class="essay__num">${num}</span>
          <div class="essay__main">
            <h3 class="essay__title"><a href="posts/${p.slug}.html">${em(p.title)}</a></h3>
            <p class="essay__deck">${em(p.deck)}</p>
          </div>
          <div class="essay__meta">${d.dot}<span class="read">${p.read} min</span></div>
        </li>`;
}
const postsHtml = list.map((p, i) => essayLi(p, i)).join("\n");

/* ---------- 3. 生成头条 lead ---------- */

const fd = fmtDate(featured.date);
const tagsStr = featured.tags.join(" / ");
const leadBody = firstParagraphs(featured.html, 2);
const leadHtml = `    <div class="lead__kicker reveal">
      <span class="num">№ ${issueNo}</span>
      <span>头条 · Essay</span>
      <span class="sep" aria-hidden="true"></span>
      <span>${fd.iso}</span>
    </div>

    <h1 class="lead__title reveal" data-delay="1">
      ${em(featured.title)}
    </h1>

    <p class="lead__deck reveal" data-delay="2">
      ${em(featured.deck)}
    </p>

    <div class="lead__byline reveal" data-delay="3">
      <span class="author">青灯 · 撰稿</span>
      <span class="dot" aria-hidden="true"></span>
      <span>约 ${featured.read} 分钟阅读</span>
      <span class="dot" aria-hidden="true"></span>
      <span>收录：${tagsStr}</span>
    </div>

    <div class="lead__body reveal" data-delay="3">
      ${leadBody}

      <a class="lead__continue" href="posts/${featured.slug}.html" aria-label="继续阅读：${esc(featured.title)}">
        继续阅读 <span class="arrow" aria-hidden="true">→</span>
      </a>
    </div>`;

/* ---------- 4. 清理并重建 dist ---------- */

try { await rm(DIST, { recursive: true, force: true }); } catch (e) { console.log("（dist 被占用，跳过清理，直接覆盖）"); }
await mkdir(join(DIST, "posts"), { recursive: true });

/* ---------- 5. 注入 index.html ---------- */

let indexTpl = await readFile(join(ROOT, "index.html"), "utf8");
indexTpl = indexTpl.replace(
  /<!--LEAD:START-->[\s\S]*?<!--LEAD:END-->/,
  `<!--LEAD:START-->\n${leadHtml}\n    <!--LEAD:END-->`
);
indexTpl = indexTpl.replace(
  /<!--POSTS:START-->[\s\S]*?<!--POSTS:END-->/,
  `<!--POSTS:START-->\n${postsHtml}\n        <!--POSTS:END-->`
);
indexTpl = indexTpl.replace(/<!--COUNT-->/g, String(posts.length));
await writeFile(join(DIST, "index.html"), indexTpl);

/* ---------- 6. 生成每篇文章页 ---------- */

let postTpl = await readFile(join(ROOT, "post.html"), "utf8");

posts.forEach((p, i) => {
  const d = fmtDate(p.date);
  // 倒序数组：i=0 最新，i+1 更旧（更早一篇），i-1 更新（更近一篇）
  const older = posts[i + 1];
  const newer = posts[i - 1];

  const prevLink = older
    ? `<a class="post__nav-link post__nav-prev" href="${older.slug}.html"><span class="post__nav-label">← 更早</span><span class="post__nav-title">${esc(older.title)}</span></a>`
    : `<span class="post__nav-link post__nav-placeholder"></span>`;
  const nextLink = newer
    ? `<a class="post__nav-link post__nav-next" href="${newer.slug}.html"><span class="post__nav-label">更近 →</span><span class="post__nav-title">${esc(newer.title)}</span></a>`
    : `<span class="post__nav-link post__nav-placeholder"></span>`;

  let page = postTpl
    .replace(/<!--TITLE-ESC-->/g, esc(p.title))
    .replace(/<!--TITLEHTML-->/g, em(p.title))
    .replace(/<!--DECK-->/g, em(p.deck))
    .replace(/<!--DATE-->/g, d.iso)
    .replace(/<!--READ-->/g, `${p.read} min`)
    .replace(/<!--TAGS-->/g, p.tags.join(" / "))
    .replace(/<!--BODY-->/g, p.html)
    .replace(/<!--ISSUE-->/g, issueNo)
    .replace(/<!--PREV-->/g, prevLink)
    .replace(/<!--NEXT-->/g, nextLink);

  writeFile(join(DIST, "posts", `${p.slug}.html`), page);
});

/* ---------- 7. 完成 ---------- */

console.log(`\n✓ 构建完成 — 共 ${posts.length} 篇文章`);
console.log(`  头条 №${issueNo}：${featured.title}`);
console.log(`  列表：${list.length} 篇`);
console.log(`  产物：dist/index.html + dist/posts/*.html\n`);
