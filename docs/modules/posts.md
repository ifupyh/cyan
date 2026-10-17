# 文章管理（博客内容）

博客文章以 Markdown 文件形式存放在 `src/content/posts/`,正文用 Markdown 写,开头用 frontmatter 声明元数据。这里记录文章的增删改查方法。

## 文章位置与 URL

- 目录:`src/content/posts/`,支持 `.md` 和 `.mdx`
- 文件名 = URL slug,如 `building-cyan-blog.md` → 访问 `/posts/building-cyan-blog/`
- **注意 URL 尾斜杠**:站点强制尾斜杠,访问时结尾要带 `/`
- 支持子目录:`notes/foo.md` → `/posts/notes/foo/`
- slug 必须唯一,重名会冲突

## Frontmatter 字段

| 字段 | 必填 | 默认 | 说明 |
|---|---|---|---|
| `title` | ✅ | — | 标题 |
| `published` | ✅ | — | 发布日期(`YYYY-MM-DD`) |
| `updated` | — | — | 最后更新日期 |
| `draft` | — | `false` | 草稿开关,`true` 不发布 |
| `description` | — | `""` | 简介(用于列表/SEO) |
| `image` | — | `""` | 封面图,`/` 开头走 public,否则走 src |
| `tags` | — | `[]` | 标签数组,如 `[Astro, 前端]` |
| `category` | — | `""` | 分类,自动从文章收集,无需预先建 |
| `lang` | — | `""` | 语言代码 |
| `pinned` | — | `false` | 是否置顶 |
| `pinnedOrder` | — | — | 置顶顺序(越小越靠前) |
| `author` | — | `""` | 作者 |
| `sourceLink` | — | `""` | 来源链接 |
| `licenseName` / `licenseUrl` | — | `""` | 许可证 |
| `comment` | — | `true` | 是否开评论 |
| `password` / `passwordHint` | — | `""` | 加密文章密码/提示 |
| `aiSummary` / `aiPolished` | — | `""` / `true` | AI 摘要/润色标记 |

## 增（新建文章）

**方式一:脚手架命令**

```bash
pnpm new-post my-post        # 生成 src/content/posts/my-post.md
pnpm new-post notes/foo      # 生成子目录 src/content/posts/notes/foo.md
```

生成的文件带基础 frontmatter(title/published/draft 等),填全后写正文即可。

**方式二:手动创建**

直接在 `src/content/posts/` 下建 `.md` 文件,最简 frontmatter:

```markdown
---
title: 标题
published: 2026-10-17
draft: false
---

正文内容…
```

## 删（删除文章）

直接删除对应的 `.md` 文件即可。注意:

- 删除后该文章的所有关联(分类/标签统计、归档)会自动消失,无需手动清理
- 如果文章图片放在 `public/assets/images/posts/<slug>/`,记得一并删除

## 改（修改文章）

- **改内容**:直接编辑 `.md` 文件的正文
- **改元数据**:编辑 frontmatter
- **下架**:把 `draft` 改成 `true`(比删除更温和,可随时恢复)
- **改封面**:改 `image` 字段;图片放 `public/assets/images/posts/<slug>/` 下

## 查（查找文章）

- **站点内**:导航栏「旅记」下的分类/归档页,或 Pagefind 全文搜索
- **文件系统**:文章就在 `src/content/posts/`,按文件名或 grep 正文即可

## 发布流程

1. 写/改完文章,`draft: false`
2. `pnpm dev` 本地预览(`http://localhost:4321/posts/<slug>/`)
3. `pnpm check` 验证 frontmatter
4. commit + push → Cloudflare 自动部署上线

## 注意事项

- **新文章要重启 dev**:dev server 的 content 加载器不会实时识别新增文件,新增文章后需重启 `pnpm dev`
- **分类自动生成**:分类从文章 `category` 字段自动收集,不用预先创建分类
- **封面图 fallback**:`image` 留空时用默认封面 `cover.webp`
- **加密文章**:设了 `password` 的文章访问时需输入密码
- **配图**:建议放在 `public/assets/images/posts/<slug>/` 下,和文章 slug 对应,便于管理
