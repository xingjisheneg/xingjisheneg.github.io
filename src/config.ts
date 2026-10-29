/** 站点文字与作者维护开关；内容未确认时保留 demo: true。 */
export const site = {
  name: '青灯黄卷',
  description: '阅读札记、生活随笔与小作品。当前文章、作品介绍和个人简介均为演示内容。',
  author: 'QD',
  authorDemo: true,
  domain: 'xingjisheneg.github.io',
  sinceYear: 2023,
};

export const nav = {
  brand: site.name,
  items: [
    { label: '首页', href: '/', key: 'home' },
    { label: '札记', href: '/notes/', key: 'notes' },
    { label: '随笔', href: '/essays/', key: 'essays' },
    { label: '作品', href: '/works/', key: 'works' },
    { label: '关于', href: '/about/', key: 'about' },
  ],
};

export const hero = {
  seal: ['青', '灯'],
  title: site.name,
  lede: '青灯之下，黄卷之间，为值得重读的字句留一笔朱批。这里收录阅读札记、生活随笔与小作品。',
};

export const sections = {
  notes: { title: '札记', sub: '书评 · 摘抄 · 批注', moreLabel: '全部 {n} 篇 →' },
  essays: { title: '随笔', sub: '城市 · 随想 · 日常', moreLabel: '全部 {n} 篇 →' },
  works: { title: '作品', sub: '写代码也是一种手艺', moreLabel: '全部 {n} 个 →' },
};

export const listPages = {
  notes: { title: '札记', vol: '阅读札记', lede: '书评、摘抄与批注。为读过的书，留一笔朱批。', pageTitle: '阅读札记' },
  essays: { title: '随笔', vol: '随笔·生活', lede: '非技术的所思所感。城市、生活、与一些不着边际的念头。', pageTitle: '随笔·生活' },
  works: { title: '作品', vol: '作品集', lede: '写代码也是一种手艺。这里保留小作品的站内介绍。', pageTitle: '作品集' },
};

export const about = {
  demo: true,
  avatar: '青',
  name: 'QD · 青灯',
  role: '写作者 · 工程师 · 偶尔的排印爱好者',
  paragraphs: [
    '我是 QD，青灯。白天在一家做开发者工具的小公司写代码，夜里读些杂书，写些"为什么这样比那样好"的长文。',
    '我相信好界面和好代码共享同一种品质——它们都不急着解释自己。也相信读书和写代码一样，是慢的手艺，急不得。',
    '青灯黄卷始于 2023 年的一个雨夜，最初只想给读过的书留点批注，后来慢慢长成了现在这样：一份关于工艺、代码与好奇心的不定期札记。如果你也愿意在细节里多停一会儿，欢迎留下来。',
  ],
  quote: '好的判断需要时间，而时间是最被低估的设计工具。',
  statusTitle: '近况',
  status: [
    { label: '现在', value: '在写一个关于"克制"的系列' },
    { label: '在读', value: 'Tim Ingold《如何观看一棵树》' },
    { label: '在听', value: '坂本龙一晚期钢琴小品' },
    { label: '用的栈', value: 'TypeScript · Astro · 一杯清茶' },
    { label: '坐标', value: '南方某座多雨的城市' },
  ],
  contacts: [
    { label: 'RSS 订阅', href: '/rss.xml', verified: true },
    { label: 'GitHub', href: 'https://github.com/xingjisheneg', verified: false },
  ],
};

export const footer = {
  parts: [site.name, site.domain],
  rssLabel: 'RSS 摘要订阅',
};

export const rss = { title: site.name, description: site.description };

export const hitokoto = {
  enabled: true,
  categories: ['i', 'd', 'k'],
  autoRefresh: 0,
  clickToRefresh: true,
  // 有限等待的实现默认值，作者可调整；不是加载时效承诺。
  timeoutMs: 6000,
  fallback: { text: '青灯之下，黄卷之间，为值得重读的字句留一笔朱批。', from: '青灯黄卷' },
};

export const calendar = {
  enabled: true,
  label: '日 历',
  seal: '历',
  // 农历库从 CDN 加载；公历始终本地计算。
  timeoutMs: 6000,
};
