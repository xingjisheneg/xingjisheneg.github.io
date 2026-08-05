/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║          青灯黄卷 · 站点文字集中配置                          ║
 * ║          所有页面可见文字均在此文件修改                        ║
 * ╚══════════════════════════════════════════════════════════╝
 *
 * 使用方法：
 *   1. 找到你要改的字段，直接修改引号内的文字
 *   2. 保存后推送，GitHub Actions 会自动构建部署
 *   3. 数值类字段（如 count）保持数字类型
 *   4. 数组类字段（如 chips、paragraphs）按顺序对应显示
 */

export const site = {
  /** 站点名称 — 显示在导航栏左侧、页脚、RSS 标题 */
  name: '青灯黄卷',
  /** 站点副标题/描述 — 用于 RSS 描述、SEO */
  description: '青灯之下，黄卷之间，为值得重读的字句留一笔朱批。',
  /** 作者署名 */
  author: 'QD',
  /** 域名（不含 https://）— 显示在页脚 */
  domain: 'xingjisheneg.github.io',
  /** 起始年份 — 显示在页脚版权 */
  sinceYear: 2023,
};

/** 顶部导航栏 */
export const nav = {
  /** 左上角站点名称（如需与 site.name 不同可单独设置） */
  brand: '青灯黄卷',
  /** 导航选项卡 */
  items: [
    { label: '札记', href: '/',     key: 'notes',   count: 12 },
    { label: '随笔', href: '/essays', key: 'essays', count: 7  },
    { label: '作品', href: '/works',  key: 'works',  count: 5  },
    { label: '关于', href: '/about',  key: 'about',  count: null },
  ],
};

/** 首页 Hero 区域 */
export const hero = {
  /** 印章文字（两行，用数组表示） */
  seal: ['青', '灯'],
  /** 期刊号 / 版本号 */
  vol: 'Vol. III · Issue 28 · 2026 夏夜读',
  /** 大标题 */
  title: '青灯黄卷',
  /** 介绍段落（支持 <b> 标签加粗） */
  lede: '青灯之下，黄卷之间，为值得重读的字句留一笔朱批。这里写<b>阅读札记</b>、<b>生活随笔</b>，也放我做的些<b>小东西</b>。',
  /** 标签胶囊（b 标签为高亮前缀，后接普通文字） */
  chips: [
    { hi: 'QD',     text: '青灯 · 写作者 工程师' },
    { hi: 'RSS',    text: '订阅' },
    { hi: '2023—',  text: '始于一个雨夜' },
  ],
};

/** 首页各分区标题与副标题 */
export const sections = {
  notes: {
    title: '阅读札记',
    sub: '书评 · 摘抄 · 批注',
    /** 「查看全部」链接文字（{n} 会被替换为实际数量） */
    moreLabel: '全部 {n} 篇 →',
    /** 首页展示数量 */
    showCount: 4,
  },
  essays: {
    title: '随笔·生活',
    sub: '城市 · 随想 · 日常',
    moreLabel: '全部 {n} 篇 →',
    showCount: 3,
  },
  works: {
    title: '作品集',
    sub: '写代码也是一种手艺',
    moreLabel: '全部 {n} 个 →',
  },
};

/** 列表页头部信息 */
export const listPages = {
  notes: {
    title: '札记',         // 大标题
    vol: '阅读札记',       // 上方小标题
    lede: '书评、摘抄与批注。为读过的书，留一笔朱批。',
    pageTitle: '阅读札记', // 浏览器标签页标题
  },
  essays: {
    title: '随笔',
    vol: '随笔·生活',
    lede: '非技术的所思所感。城市、生活、与一些不着边际的念头。',
    pageTitle: '随笔·生活',
  },
  works: {
    title: '作品',
    vol: '作品集',
    lede: '写代码也是一种手艺。这里是我做的些小东西。',
    pageTitle: '作品集',
  },
};

/** 关于页 */
export const about = {
  /** 头像里的字 */
  avatar: '青',
  /** 标题（名字） */
  name: 'QD · 青灯',
  /** 身份标签 */
  role: '写作者 · 工程师 · 偶尔的排印爱好者',
  /** 正文段落（每段一个字符串） */
  paragraphs: [
    '我是 QD，青灯。白天在一家做开发者工具的小公司写代码，夜里读些杂书，写些"为什么这样比那样好"的长文。',
    '我相信好界面和好代码共享同一种品质——它们都不急着解释自己。也相信读书和写代码一样，是慢的手艺，急不得。',
    '青灯黄卷始于 2023 年的一个雨夜，最初只想给读过的书留点批注，后来慢慢长成了现在这样：一份关于工艺、代码与好奇心的不定期札记。如果你也愿意在细节里多停一会儿，欢迎留下来。',
  ],
  /** 引用语句 */
  quote: '好的判断需要时间，而时间是最被低估的设计工具。',
  /** 「近况」标题 */
  statusTitle: '近况',
  /** 近况列表（label 为加粗前缀，value 为内容） */
  status: [
    { label: '现在',   value: '在写一个关于"克制"的系列' },
    { label: '在读',   value: 'Tim Ingold《如何观看一棵树》' },
    { label: '在听',   value: '坂本龙一晚期钢琴小品' },
    { label: '用的栈', value: 'TypeScript · Astro · 一杯清茶' },
    { label: '坐标',   value: '南方某座多雨的城市' },
  ],
  /** 联系链接 */
  contacts: [
    { label: 'RSS 订阅', href: '/rss.xml' },
    { label: 'GitHub',   href: 'https://github.com/xingjisheneg' },
  ],
};

/** 页脚 */
export const footer = {
  /** 各段文字，用 · 分隔显示 */
  parts: [
    site.name,
    site.author,
    site.domain,
    '© 2023—2026',
  ],
  /** 页脚中的 RSS 链接文字（空字符串则不显示） */
  rssLabel: 'RSS',
};

/** RSS 订阅源 */
export const rss = {
  title: site.name,
  description: site.description,
};
