# 面试题库管理（八股文）

面试题库是「浮光集」下的八股文容器进入的功能，采用「分类 → 题目列表 → 题目详情」三级浏览。题目以 Markdown 文件存放，分类由配置驱动。这里记录题目的增删改查方法。

## 目录结构与 URL

- 题目文件：`src/content/interview/<分类slug>/<文件名>.md`
- 分类配置：`src/config/interviewConfig.ts`
- 工具函数：`src/utils/interview-utils.ts`
- 答案折叠插件：`src/plugins/rehype-split-answer.mjs`

访问路径：

| 页面 | URL |
|---|---|
| 分类页 | `/interview/` |
| 题目列表 | `/interview/<分类slug>/` |
| 题目详情 | `/interview/<分类slug>/<题目标题slug>/` |

- 题目的 URL slug = 文件名（去扩展名），如 `ad-machine-03.md` → `/interview/ad-machine/ad-machine-03/`
- 分类的 URL slug = `interviewConfig.ts` 里配置的 `slug` 字段

## 题目文件格式

每个题一个 `.md` 文件，frontmatter 声明元数据，正文用 `## 参考答案` 分隔答案：

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

关键机制：**`## 参考答案` 之后的内容会被自动折叠成「查看答案」按钮**，点击才展开。`## 参考答案` 之前的内容（如果有）会作为题目描述直接展示；没有也可以，题目描述就是列表页/详情页的标题。

## Frontmatter 字段

| 字段 | 必填 | 默认 | 说明 |
|---|---|---|---|
| `title` | ✅ | — | 题目标题 |
| `category` | ✅ | — | 分类 slug，必须与 `interviewConfig.ts` 里的某个 `slug` 一致 |
| `difficulty` | ✅ | — | `easy` / `medium` / `hard`，对应 简单/中等/困难 |
| `order` | ✅ | — | 同分类内排序，数字越小越靠前 |
| `tags` | ❌ | `[]` | 预留字段，目前界面未使用 |

## 增（新增题目）

直接在对应分类目录下建 `.md` 文件，如 `src/content/interview/ad-machine/ad-machine-21.md`，填好 frontmatter 和答案即可。

### 批量导入

几十题一起导入时用脚本更省事。把题目整理成 Markdown 源文件后，用一个 Node 脚本循环生成 `.md` 文件。核心是把「标题行」和「答案行」区分开——标题行按源文件的格式写正则匹配，其余行累积为答案。

```js
// 批量导入脚本模板（按源文件格式改正则即可复用）
import fs from "node:fs";
import path from "node:path";

const SRC = "C:/path/to/源文件.md";
const OUT_DIR = "E:/MyCC/web/Cyan/src/content/interview/<分类slug>";
const CATEGORY = "<分类slug>";
const DEFAULT_DIFFICULTY = "medium"; // 无难度标注时的兜底值

const lines = fs.readFileSync(SRC, "utf-8").split(/\r?\n/);

// ① 标题行正则：匹配「一行一题」的标题（按源文件实际格式改这里）
//    例：### 1. 题目标题
const titleRe = /^###\s+(\d+)\.\s*(.+)$/;

// ② 可选：从标题尾部剥离并映射难度标签
//    【普通】→ easy  【一般】→ medium  【困难】→ hard
const diffTagRe = /　(?:🔥)?\s*`【(普通|一般|困难)】`$/;
const diffMap = { 普通: "easy", 一般: "medium", 困难: "hard" };

let current = null;
const questions = [];

for (const line of lines) {
  const m = line.match(titleRe);
  if (m) {
    const num = parseInt(m[1], 10);
    // 可选：只取前 N 题
    if (num > 999) break;
    if (current) questions.push(current);
    const raw = m[2];
    const tag = raw.match(diffTagRe);
    current = {
      title: raw.replace(diffTagRe, "").trim(),
      difficulty: tag ? diffMap[tag[1]] : DEFAULT_DIFFICULTY,
      order: num,
      body: [],
    };
  } else if (current) {
    current.body.push(line);
  }
}
if (current) questions.push(current);

fs.mkdirSync(OUT_DIR, { recursive: true });
questions.forEach((q) => {
  // 去掉答案首尾空行，保留中间空行
  while (q.body.length && q.body[0].trim() === "") q.body.shift();
  while (q.body.length && q.body[q.body.length - 1].trim() === "") q.body.pop();
  const body = q.body.join("\n").trim();
  const title = q.title.replace(/"/g, '\\"');
  const file = `${CATEGORY}-${String(q.order).padStart(2, "0")}.md`;
  const content = `---
title: "${title}"
category: ${CATEGORY}
difficulty: ${q.difficulty}
order: ${q.order}
---

## 参考答案

${body}
`;
  fs.writeFileSync(path.join(OUT_DIR, file), content, "utf-8");
});
console.log(`共生成 ${questions.length} 题`);
```

两种常见源文件格式的处理要点：

- **带难度标签**（如 `### 1. 自我介绍　🔥 `【普通】``）：标题行用 `### 题号. 标题` 匹配，难度标签在标题尾部单独剥离并映射。
- **纯问句列表**（无编号、无难度，如 `Linux 中如何查找文件？`）：标题行用「以全角 `？` 结尾」识别，难度统一给默认值。

生成后 `pnpm astro sync` + `pnpm check` 验证，再重启 dev server。

## 删（删除题目）

直接删除对应 `.md` 文件。分类卡片上的题目数量是实时统计的，删除后自动更新，无需手动改。

## 改（修改题目）

- **改答案**：编辑 `## 参考答案` 之后的内容
- **改标题/难度/顺序**：编辑 frontmatter
- **改分类**：把 `category` 改成另一个分类的 slug（文件放哪个目录不影响，`category` 字段才是权威）

## 查（查找题目）

- **站点内**：`/interview/` 分类页 → 点分类 → 列表页（可按难度筛选）
- **文件系统**：题目都在 `src/content/interview/<分类slug>/`，按文件名或 grep 正文

## 分类管理

### 新增分类

编辑 `src/config/interviewConfig.ts`，在 `categories` 数组里加一条：

```ts
{
  slug: "linux-shell",              // URL 和 category 字段用的 slug
  name: "Linux/Shell 基础",          // 分类卡片显示的名称
  icon: "material-symbols:terminal", // 分类卡片图标
},
```

分类在数组里的**排列顺序**决定了分类页的展示顺序。加完后 `pnpm astro sync`，再在 `src/content/interview/<新slug>/` 下建题目。

### 重命名分类

只改 `name` 字段即可，不影响 URL 和已有题目。若要改 `slug`，则需同步修改该分类下所有题目的 `category` frontmatter，否则题目会变成「孤儿」（详情页仍可访问，但分类入口消失）。

### 删除分类

两步都要做，否则会留残留：

1. 从 `interviewConfig.ts` 的 `categories` 里删掉对应条目
2. 删除题目目录 `src/content/interview/<slug>/`（`git rm -r` 即可）

只删配置不删题目目录，题目详情页仍会生成，但分类入口没了；只删目录不删配置，分类卡片会显示但计数为 0。

## 注意事项

- **新题目/新分类要重启 dev**：dev server 的 content 加载器不会实时识别新增文件，新增后需重启 `pnpm dev`
- **`category` 是权威字段**：即使文件放在别的目录，也按 frontmatter 的 `category` 归类
- **答案必须用 `## 参考答案` 分隔**：否则答案不会折叠，会直接平铺显示
- **同分类排序靠 `order`**：跨分类的展示顺序由 `interviewConfig.ts` 里分类的排列顺序决定
- **难度文案**：`easy/medium/hard` 自动显示为 简单/中等/困难，标签颜色绿/橙/红
