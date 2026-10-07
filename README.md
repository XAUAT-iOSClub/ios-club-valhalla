# 英灵殿 (Valhalla)

一个纪念网站，用于纪念对 iOS Club 做出贡献的重要人物。

纯静态站点：没有数据库、没有后端接口，全部数据存在一个 JSON 文件里，构建产物是可直接托管的静态 HTML/CSS/JS。

## 技术栈

- [Next.js 16](https://nextjs.org)（App Router，`output: 'export'` 静态导出）
- [TailwindCSS](https://tailwindcss.com)
- 数据源：`src/data/memorials.json`

## 开始开发

```bash
npm install
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看。

## 脚本

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建静态站点，产物在 `out/` |
| `npm run preview` | 本地预览 `out/` 的构建产物 |
| `npm run lint` | ESLint 检查 |
| `npm run typecheck` | TypeScript 类型检查 |

## 添加或修改人物

全部数据都在 [`src/data/memorials.json`](./src/data/memorials.json)。编辑这个文件，然后重新运行 `npm run build` 即可。

```json
[
  {
    "id": 1,
    "title": "太祖",
    "name": "韩晨超",
    "description": "创始人，奠定基石",
    "deed": "2020 年创立社团，组织首届 iOS 开发工作坊……",
    "tags": ["FOUNDER"],
    "createdAt": "2025-10-30"
  }
]
```

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `id` | 是 | 正整数，且在文件内唯一。决定详情页地址 `/memorials/{id}`，**改动会导致原链接失效** |
| `title` | 是 | 庙号，如「太祖」。显示在卡片和详情页姓名上方 |
| `name` | 是 | 姓名 |
| `description` | 是 | 一句话简介。显示在卡片上 |
| `deed` | 否 | 具体事迹，支持换行。留空则详情页不显示该区块 |
| `tags` | 否 | 标签数组，见下表。留空则不显示标签区块 |
| `createdAt` | 否 | 日期字符串，显示在详情页底部。留空则不显示 |

### 可用标签

| 值 | 显示为 |
| --- | --- |
| `FOUNDER` | 创始人 |
| `LEADER` | 领导者 |
| `CONTRIBUTOR` | 贡献者 |
| `INNOVATOR` | 创新者 |
| `MENTOR` | 导师 |
| `VOLUNTEER` | 志愿者 |

标签的完整定义在 [`src/lib/types.ts`](./src/lib/types.ts)，增删只需改那里的 `TAGS` 与 `TAG_LABELS`。

### 数据写错了会怎样

JSON 在构建时会被校验（见 [`src/lib/memorials.ts`](./src/lib/memorials.ts)）。字段缺失、`id` 重复、标签名拼错等问题都会让 `npm run build` 直接失败并指出具体位置，不会静默渲染出空白页面。

## 部署

`npm run build` 产出的 `out/` 目录可以直接部署到任意静态托管：Vercel、Netlify、Cloudflare Pages、GitHub Pages、对象存储等，都不需要 Node 运行时。

需要注意的是，静态托管对 URL 的处理方式不同：

- **大多数平台**（Vercel / Netlify / Cloudflare Pages / GitHub Pages / Firebase Hosting）开箱即用，会自动把 `/memorials/1` 映射到 `memorials/1.html`。
- **GitHub Pages**：在 `public/` 下放一个空的 `.nojekyll` 文件。GitHub Pages 默认会跑 Jekyll，而 Jekyll 会忽略所有下划线开头的目录，导致 `_next/` 被整个丢掉、页面没有样式。
- **GitHub Pages 项目页**（地址形如 `https://<用户名>.github.io/ios-club-valhalla/`）：需要在 `next.config.ts` 里加 `basePath: '/ios-club-valhalla'`。用自定义域名或部署在根路径时**不要加**。
- **自建 nginx**：需要 `try_files $uri $uri.html $uri/ =404;` 和 `error_page 404 /404.html;`，否则详情页和 404 页都不生效。

## 已知限制

- 站点是**只读**的。增删改人物只能编辑 JSON 并重新构建。
- 首页「赛博烧香」的计数存在浏览器 localStorage 里，是**本机累计次数**，不是全站总数 —— 换设备或清缓存都会归零。
- 构建时会从 `fonts.googleapis.com` 下载 Geist 字体，构建机需要能访问外网。
