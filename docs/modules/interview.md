# 面试题库管理（八股文）

面试题库是「浮光集」下的八股文容器进入的功能,采用「分类 → 题目列表 → 题目详情」三级浏览。题目以 Markdown 文件存放,分类由配置驱动。这里记录题目的增删改查方法。

## 目录结构与 URL

- 题目文件:`src/content/interview/<分类slug>/<文件名>.md`
- 分类配置:`src/config/interviewConfig.ts`
- 工具函数:`src/utils/interview-utils.ts`
- 答案折叠插件:`src/plugins/rehype-split-answer.mjs`

访问路径:

| 页面 | URL |
|---|---|
| 分类页 | `/interview/` |
| 题目列表 | `/interview/<分类slug>/` |
| 题目详情 | `/interview/<分类slug>/<题目标题slug>/` |

- 题目的 URL slug = 文件名(去扩展名),如 `ad-machine-03.md` → `/interview/ad-machine/ad-machine-03/`
- 分类的 URL slug = `interviewConfig.ts` 里配置的 `slug` 字段

## 题目文件格式

每个题一个 `.md` 文件,frontmatter 声明元数据,正文用 `## 参考答案` 分隔答案:

```markdown
---
title: "设备端的架构（四进程）"
category: ad-machine
difficulty: medium
order: 3
---

## 参考答案

- 配置进程：本地 web 配置页…
- 主进程：向云端注册设备、心跳保活…
```

关键机制:**`## 参考答案` 之后的内容会被自动折叠成「查看答案」按钮**,点击才展开。`## 参考答案` 之前的内容(如果有)会作为题目描述直接展示;没有也可以,题目描述就是列表页/详情页的标题。

## Frontmatter 字段

| 字段 | 必填 | 默认 | 说明 |
|---|---|---|---|
| `title` | ✅ | — | 题目标题 |
| `category` | ✅ | — | 分类 slug,必须与 `interviewConfig.ts` 里的某个 `slug` 一致 |
| `difficulty` | ✅ | — | `easy` / `medium` / `hard`,对应 简单/中等/困难 |
| `order` | ✅ | — | 同分类内排序,数字越小越靠前 |

## 增（新增题目）

直接在对应分类目录下建 `.md` 文件,如 `src/content/interview/ad-machine/ad-machine-21.md`,填好 frontmatter 和答案即可。

**批量导入**(几十题一起导入时用脚本更省事):

1. 把题目整理成「`### 题号. 标题` + 内容」的 Markdown 源文件
2. 写一个 Node 脚本解析源文件,循环生成 `.md` 文件(参考之前导入 C++/C 语言/广告机项目的方式)
3. 生成后 `pnpm astro sync` + `pnpm check` 验证

## 删（删除题目）

直接删除对应 `.md` 文件。分类卡片上的题目数量是实时统计的,删除后自动更新,无需手动改。

## 改（修改题目）

- **改答案**:编辑 `## 参考答案` 之后的内容
- **改标题/难度/顺序**:编辑 frontmatter
- **改分类**:把 `category` 改成另一个分类的 slug(文件放哪个目录不影响,`category` 字段才是权威)

## 查（查找题目）

- **站点内**:`/interview/` 分类页 → 点分类 → 列表页(可按难度筛选)
- **文件系统**:题目都在 `src/content/interview/<分类slug>/`,按文件名或 grep 正文

## 新增分类

编辑 `src/config/interviewConfig.ts`,在 `categories` 数组里加一条:

```ts
{
  slug: "ad-machine",        // URL 和 category 字段用的 slug
  name: "广告机项目",         // 分类卡片显示的名称
  icon: "material-symbols:tv", // 分类卡片图标
},
```

加完后 `pnpm astro sync` 生成类型,再在 `src/content/interview/<新slug>/` 下建题目即可。

## 注意事项

- **新题目/新分类要重启 dev**:dev server 的 content 加载器不会实时识别新增文件,新增后需重启 `pnpm dev`
- **`category` 是权威字段**:即使文件放在别的目录,也按 frontmatter 的 `category` 归类
- **答案必须用 `## 参考答案` 分隔**:否则答案不会折叠,会直接平铺显示
- **同分类排序靠 `order`**:跨分类的展示顺序由 `interviewConfig.ts` 里分类的排列顺序决定
- **难度文案**:`easy/medium/hard` 自动显示为 简单/中等/困难,标签颜色绿/橙/红
