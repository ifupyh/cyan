---
title: "Claude Code 安装、配置与使用"
published: 2026-11-10
description: "从 npm 与原生安装、PATH 排错，到用 API + CC Switch 接入 DeepSeek、GLM 等国产模型，一步步把 Claude Code 在没有官方账号的机器上跑起来。"
image: ""
tags: [Claude Code, AI, 开发工具, 配置]
category: 工具
draft: false
---

> 写于 2026-11-10。Claude Code 迭代很快，安装方式、模型名和价格都可能变化；遇到不一致，以官方文档和官网当前价格为准。

## 先说结论

- **装**：国内用户优先走 npm（可换国内镜像）；原生安装不需要 Node，但安装源在境外，能连上就用。
- **用**：没有 Claude 官方账号，就走 API + CC Switch，接 DeepSeek 或 GLM。
- **验**：`claude --version` 有版本号，再让它建一个 hello.py，跑通就算完成。

下面按「装 → 启动 → 接入模型 → 编辑器集成 → 排错」的顺序来。

---

## 1. 先选形态：CLI（终端）是主线

Claude Code 有四种入口，能力并不对等：

| 形态 | 适合人群 | 优点 | 缺点 | 国内可用性 |
| --- | --- | --- | --- | --- |
| Web 端 | 完全新手 | 打开就用 | 碰不到本地文件 | 基本不可用 |
| 桌面端 | 普通用户 | 图形界面 | 功能通常落后 CLI | 基本不可用 |
| CLI（终端） | 开发者 | 功能最全、集成度最高 | 有学习成本 | 可用 |
| VS Code 插件 | 日常开发 | 融入编辑器工作流 | **依赖 CLI 已装好** | 可用 |

如果你确实要拿它干活，直接学 CLI。

**我的建议：**

- **Web 端** <https://claude.ai/> 开发时基本上很少用，当作一个搜索引擎用即可，且国内不好注册用不了
- **桌面端**可以从这里直接下载：<https://claude.com/download>，也是不好注册用不了
- **CLI（命令行）** 真正用于开发
- **VS Code 版本**只是 CLI 的一层壳，装好 CLI 之后再装插件，配置是共用的。

---

## 2. 安装 Claude Code（CLI 终端版本）

安装有两条路，先看区别：

| 方式 | 需要 Node.js | 国内网络 | 自动更新 |
| --- | --- | --- | --- |
| 原生安装 | 不需要 | 安装源在境外，即便科学上网也可能连不上 | 是 |
| npm 安装 | 需要 22+ | 可走国内镜像，相对稳 | 否 |

**国内用户优先试 npm；原生安装能连上就用原生，连不上不用死磕。**

### 2.1 原生安装（官方推荐，国内可能连不上）

不需要 Node.js，装完自动更新，PATH 也会自动处理。

**Windows PowerShell 终端**（推荐）：

```powershell
irm https://claude.ai/install.ps1 | iex
```

**Windows CMD 终端**：

```bat
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

**Windows 包管理器**：

```bash
winget install Anthropic.ClaudeCode
```

**macOS / Linux / WSL**：

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

注意：

1. **不要加 `sudo`**（macOS / Linux）。原生安装会装到用户目录，加 sudo 会把文件装到 root 名下，后面更新容易出问题。
2. 装完**重开一个终端**，再执行 `claude`，让 PATH 生效。
3. 原生版会后台自动更新，不用手动管。
4. 如果脚本卡住或报错，多半是连不上安装源，直接跳到 2.2 用 npm。

### 2.2 npm 安装（国内更稳，需要先装 Node.js）

npm 方式是先装 Node.js，再用 npm 把 Claude Code 装到全局。npm 包本质上还是下载对应平台的原生二进制，装好后运行不依赖 Node，但**安装过程要求 Node.js 22 或更高**。

#### 2.2.1 安装 Node.js

1. 打开 <https://nodejs.org/zh-cn/download>，下载 **LTS** 版本的 Windows 安装包（`.msi`）。

   ![Node.js 官网下载页](/assets/images/posts/claude-code-setup/node-download.webp)

2. 双击安装，**一路默认**下一步。安装向导默认会勾选 Add to PATH，不要取消。

3. 装完**重开终端**，验证：

```bash
node --version
npm --version
```

两个命令都能输出版本号，就说明装好了。`node` 版本低于 22 的话，去官网下新版覆盖安装。

![node 与 npm 版本号](/assets/images/posts/claude-code-setup/node-version.webp)

#### 2.2.2 安装 Claude Code

```bash
npm install -g @anthropic-ai/claude-code@latest
```

**网络慢或卡住，用镜像源**：

```bash
npm install -g @anthropic-ai/claude-code@latest --registry=https://registry.npmmirror.com
```

几个坑：

- npm 方式**不会自动更新**。升级时要重新执行一次 `npm install -g @anthropic-ai/claude-code@latest`，不要用 `npm update -g`，它可能按旧版本范围更新，升不到最新。
- Node 低于 22 会出现 `EBADENGINE` 警告。能装但不建议，先升级 Node。
- 如果命令提示「禁止运行脚本」，见 3.4。

### 2.3 验证

```bash
claude --version
claude doctor
```

`claude --version` 有版本号就说明装好了。

![claude --version 输出版本号](/assets/images/posts/claude-code-setup/claude-version.webp)

`claude doctor` 会显示安装类型（native / npm）、PATH 状态和配置检查结果——当你不确定命令指向哪个版本时，先跑它。

**升级版本**命令按安装方式区分：

```bash
# npm 方式
npm install -g @anthropic-ai/claude-code@latest
# 原生方式
claude update
```

---

## 3. 安装阶段的常见问题（出现版本号没问题可以跳过）

### 3.1 `claude: command not found`

PATH 没生效。先重开终端；还不行就检查安装位置：

```bash
# macOS / Linux
ls ~/.local/bin/claude

# Windows PowerShell
where.exe claude
```

找不到文件说明安装没成功，按你用的方式重装（2.1 或 2.2）。找得到文件但命令仍然不可用，就把所在目录加进系统 PATH。

### 3.2 `permission denied` / `EACCES` / `EPERM`

多半是权限问题。**不要用 sudo 重装**：

- Windows：用「以管理员身份运行」打开 PowerShell 再装。
- macOS / Linux：检查 npm 全局目录的归属，或用 nvm 管理 Node，避免用 sudo 装全局包。

### 3.3 安装很慢或卡住

原生脚本和 npm 都依赖网络。npm 换 npmmirror 镜像；原生脚本如果卡住，多半是连不上安装源——国内直接按 2.2 走 npm，或者试试 winget / brew，不必在原生脚本上耗时间。

### 3.4 PowerShell 提示「禁止运行脚本」

npm 的入口是一个 `.ps1` 文件，Windows 默认策略会拦截。以当前用户身份放开本地脚本：

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

输入 `Y` 确认，然后重开终端。这个策略只影响当前用户，是 Windows 推荐的安全级别，不会降低整机安全性。

### 3.5 npm 报 `EBADENGINE`

Node 版本太低。Claude Code 的 npm 包要求 Node 22+。升级 Node；如果原生安装的网络可用，也可以按 2.1 绕开 Node。

### 3.6 装过两遍，命令指向旧版本

先用 `claude doctor` 看当前生效的是哪个安装。常见原因是 npm 版和原生版同时存在，PATH 里旧的 npm shim 排在前面。保留一种即可：

```bash
npm uninstall -g @anthropic-ai/claude-code
hash -r
```

然后重开终端确认 `claude doctor` 显示的是你想要的那个。

---

## 4. 第一次启动

### 4.1 先建一个空目录

右键用终端打开，输入指令：

```bash
claude
```

### 4.2 首次启动会问什么

会让你选主题、确认一些使用注意事项、然后要求登录。主题随便选，**一路回车确认即可。**

### 4.3 登录失败是正常的

没有 Claude 官方账号或订阅，登录会失败，提示连不上服务器。**这一步直接跳过**，不用反复重试。

接下来用 **API 方式接入模型**——也就是下面两章的内容。

---

## 5. 接入模型：两条路

### 5.1 两种方式对比

| 方式 | 适合谁 | 优点 | 缺点 |
| --- | --- | --- | --- |
| 手改 `settings.json` | 只用一个供应商 | 不装额外软件，配置透明 | 换供应商要手改 |
| **CC Switch**（推荐） | 要来回切换 | 图形化、多套配置、**一键切换任意模型**、健康检查 | 多装一个软件 |

**结论**：如果你只打算用一个平台，手改配置最省事；如果可能在国内平台、官方 API 之间切换，装 CC Switch。

### 5.2 方式一：手改 settings.json

配置文件位置：

- Windows：`C:\Users\<用户名>\.claude\settings.json`

没有就新建。接 DeepSeek 的例子：

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.deepseek.com/anthropic",
    "ANTHROPIC_AUTH_TOKEN": "你的 DeepSeek API Key【6.2 节有获取教程】",
    "ANTHROPIC_MODEL": "deepseek-flash[1m]",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "deepseek-flash[1m]",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "deepseek-flash[1m]",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "deepseek-v4-pro[1m]"
  }
}
```

> Key 的获取流程见第 6 章。

接智谱 GLM 的例子：

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://open.bigmodel.cn/api/anthropic",
    "ANTHROPIC_AUTH_TOKEN": "你的智谱 API Key",
    "ANTHROPIC_MODEL": "glm-5.3[1m]",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "glm-5.3-flash[1m]",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "glm-5.3[1m]",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "glm-5.3[1m]",
    "CLAUDE_CODE_AUTO_COMPACT_WINDOW": "1000000"
  }
}
```

完成后，打开终端，输入 **claude** 即可对话或者做任意业务。

![配置完成后在终端里对话](/assets/images/posts/claude-code-setup/claude-chat.webp)

### 5.3 方式二：CC Switch

CC Switch 的原理是替你读写各工具自己的配置文件，所以**必须先把 CLI 装好**，否则它没有可写的目标。具体步骤见第 **7 章**。

---

## 6. API Key 从哪来

Key 都在各平台控制台的「API Keys / 密钥管理」里创建。两个通用规则：

- **创建后只显示一次**，关掉窗口就看不到了，必须立刻复制保存。
- **套餐 Key 和按量 Key 不通用**，买的是 Coding Plan，就要用套餐页面给的 Key。

### 6.1 国内平台速查

| 平台 | 写作时主力模型 | 计费方式 | Key 获取入口 |
| --- | --- | --- | --- |
| DeepSeek | `deepseek-flash` / `deepseek-v4-pro` | API 按量，1M 上下文 | [platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys) |
| 智谱 GLM | `glm-5.3` / `glm-5.3-flash` | Coding Plan 订阅，Lite / Pro / Max | [bigmodel.cn 的 Coding Plan 个人中心](https://bigmodel.cn/coding-plan/personal/overview) |
| 月之暗面 Kimi | K3 / K2.8（`kimi-for-coding`） | Kimi Code 订阅，Plus 起 | [kimi.com/code](https://www.kimi.com/code) 控制台 |
| 阿里云百炼 | 千问系列 + GLM / Kimi / MiniMax 部分型号 | Coding Plan，Pro ¥200/月 | 百炼控制台 → Coding Plan → 套餐专属 Key（`sk-sp-` 开头） |
| MiniMax | `MiniMax-M3.1-Flash` | Token Plan / M Plan 订阅 | 控制台 → Plan Details → 订阅 Key |

备注：

- **DeepSeek**：基础端点 `https://api.deepseek.com/anthropic`，高峰价格约为非高峰的两倍。
- **智谱 GLM**：端点 `https://open.bigmodel.cn/api/anthropic`。价格 2026 年内调整过，下单前看官网。
- **阿里云百炼**：仅支持主账号，需使用套餐专属 Base URL，不能拿 `dashscope.aliyuncs.com` 代替。
- **MiniMax**：订阅 Key 与普通 API Key 不通用，别复制错。
- **Kimi / MiniMax**：档位和价格调整频繁，以官网为准。

### 6.2 以 DeepSeek 为例：完整获取流程

**第 1 步：注册并登录**

打开 <https://platform.deepseek.com/>，用手机号或邮箱注册，登录后进入控制台。

**第 2 步：进入 API Keys 页面**

点左侧栏的「API keys」，或者直接打开 <https://platform.deepseek.com/api_keys>。

![DeepSeek API Keys 页面](/assets/images/posts/claude-code-setup/deepseek-keys.webp)

**第 3 步：创建 Key**

点右上角的「创建 API key」。

**第 4 步：给 Key 起名字**

名字只用于你自己区分，例如 `Window-claude`，随便取，点「创建」。

![创建 API Key](/assets/images/posts/claude-code-setup/deepseek-create-key.webp)

**第 5 步：复制并保存**

创建成功后，Key 只显示这一次。点「复制」，立刻存到密码管理器或私密文件里。关掉窗口就再也看不到，只能重新创建。

![复制 API Key](/assets/images/posts/claude-code-setup/deepseek-copy-key.webp)

**第 6 步：充值，保证余额**

点左侧栏的「充值」，先充最小金额（例如 5 元）。余额为 0 时，Claude Code 的请求会直接失败。

**第 7 步：填到配置里**

回到第 5 章的 `settings.json`，把 Key 填进 `ANTHROPIC_AUTH_TOKEN`；或者在第 7 章的 CC Switch 里填到 API Key 一栏。

注意：Key 以 `sk-` 开头，是调用凭证，不是账号密码。不要发群、不要截图发人、不要提交到 Git。

### 6.3 其他平台怎么找

- **智谱 GLM**：登录 <https://bigmodel.cn>，进 Coding Plan → 个人中心，复制套餐 API Key。不要用普通按量 API 的 Key。
- **Kimi**：登录 <https://www.kimi.com/code>，订阅后在控制台获取 API Key。
- **阿里云百炼**：主账号登录百炼控制台，进 Coding Plan，复制 `sk-sp-` 开头的套餐 Key，同时记下页面给的专用 Base URL。
- **MiniMax**：控制台 → Plan Details → 复制订阅 Key，不是普通 API Key。
- **第三方中转**：服务商会直接给你 Key 和 Base URL，按第 5 章填。先小额充值，不要一次充大额。

## 7. CC Switch：安装和使用

如果我们需要在 Claude Code 或者 Codex 这类工具中使用国产模型或者中转站的模型，是需要对文件进行配置的，但文本配置比较繁琐，切换也不方便——这时候有没有什么工具能让我们快速配置和使用？CC Switch 就是干这个的。

### 一、下载

安装包在 GitHub Releases 页面下载，地址是 <https://github.com/farion1231/cc-switch/releases/latest>。页面拉到底部，在资源包里选自己的系统版本。

![CC Switch Releases 页面](/assets/images/posts/claude-code-setup/ccswitch-releases.webp)

Windows 用户优先选 MSI。

### 二、安装与启动

双击 MSI，安装路径自选，其他一律默认即可，按向导装完，在开始菜单里搜 CC Switch 启动。

然后加第一个：选择 claude 的图标，点右上角的加号。

![在 CC Switch 里添加供应商](/assets/images/posts/claude-code-setup/ccswitch-add.webp)

从预设里选 DeepSeek，点击添加，如果有其他弹窗不用管。

![从预设选择 DeepSeek](/assets/images/posts/claude-code-setup/ccswitch-preset.webp)

点击编辑。

![编辑供应商配置](/assets/images/posts/claude-code-setup/ccswitch-edit.webp)

#### CC Switch 配置 Claude Code 使用 DeepSeek

首先，在 <https://platform.deepseek.com/api_keys> 获取你自己的 API Key。

如果你用的是最新版本的 CC Switch，添加模型供应商时可以直接选择 DeepSeek，这样只需要配置 API Key。

![直接选择 DeepSeek 预设](/assets/images/posts/claude-code-setup/ccswitch-model-list.webp)

![只需要填 API Key](/assets/images/posts/claude-code-setup/ccswitch-key-field.webp)

如果你是老版本，或者找不到 DeepSeek 预设，**建议升级 CC Switch 到最新版本**。当然，也可以手动填写自定义配置：

```text
供应商名称：DeepSeek
官网链接（可选）：https://platform.deepseek.com
请求地址：https://api.deepseek.com/anthropic
API Key：你自己的 key
```

![自定义配置字段](/assets/images/posts/claude-code-setup/ccswitch-custom.webp)

然后在高级设置中获取模型列表，选择需要的模型，最终保存即可。

![高级设置里获取模型列表](/assets/images/posts/claude-code-setup/ccswitch-advanced-models.webp)

保存后，回到主界面选择这个模型，然后重启 Claude Code 使用。

![回到主界面选择模型](/assets/images/posts/claude-code-setup/ccswitch-model-select.webp)

![切换后的运行状态](/assets/images/posts/claude-code-setup/ccswitch-running.webp)

切完最好顺手做一次健康检查。它会发一个测试请求，帮你确认 API Key、Base URL、网络连通性有没有问题。

---

## 8. VS Code 插件

前提：**CLI 已经装好并能跑通**。插件本身不包含模型，它调用的是本地的 Claude Code。

1. 用 VS Code 打开任意项目目录。
2. 打开扩展面板，搜索 **Claude Code**，安装 Anthropic 官方插件。
3. 点侧边栏或右上角的 Claude 图标启动。
4. 配置沿用 CC Switch 写入的那套，可以直接对话。

如果插件里登录失败或连不上，先在终端确认 `claude` 能正常用；终端不通，插件也不会通。

---

## 9. 问题汇总

**一直提示连不上 Claude 官方服务器**

没有官方订阅时的正常现象。跳过登录，用第 5 章的方式接入 API。

**改了配置不生效**

按顺序查：① 终端/编辑器是否重开；② `settings.json` 是否是合法 JSON；③ CC Switch 写的是不是当前工具；④ 是否同时存在多份配置（环境变量优先级可能高于配置文件）。

**启动时提示模型不在目录里**

第三方模型名不在 Claude Code 自带目录中，不影响使用。需要 1M 上下文就加 `[1m]`。

**`deepseek-flash` 和 `deepseek-v4-pro` 怎么选**

日常写代码用 flash，响应快、便宜；复杂重构、疑难 bug 切 pro。也可以把 Opus 档位映射到 pro、其余映射到 flash。

**频繁 429 或提示额度用完**

套餐通常有 5 小时滚动窗口和每周/每月上限。等窗口恢复，或升级套餐；也要确认没有把批量任务跑在只允许交互式使用的套餐上。

**VS Code 插件能用但终端不能用，或者反过来**

两者共用配置但环境不同。分别执行 `claude doctor`，检查 PATH 和配置文件位置。

---

## 10. 安全与成本

装完能用只是第一步，下面几条比安装本身更重要：

1. **Key 是明文存储的**。`settings.json` 和 CC Switch 的本地数据都没有额外加密。不要截图发群，不要把配置提交到 Git，公共电脑用完清理。
2. **中转站能看到你的请求内容**。包括 prompt 和它读到的代码。公司项目、客户数据、密钥文件，不要走第三方中转。
3. **第三方模型属于非官方用法**。Anthropic 只保证 Claude 模型下的体验；接第三方模型后，能力、兼容性和账号风险都由你自己承担。
4. **Coding Plan 通常只允许交互式使用**。把套餐 Key 拿去做脚本、后端服务或批量调用，可能违反条款并封号。
5. **按量计费会比你想的贵**。Agent 一次任务可能触发几十次模型调用，账单按调用累加。先小额充值，观察一周用量再决定。
6. **先月付，别年付**。这类套餐的价格和规则变动频繁，年付锁定的「优惠」可能几个月后就失去竞争力。

---

## 11. 最后

装好之后，最值得先养成的习惯不是记命令，而是两件事：

- **先让它读，再让它改**。上来就说「帮我优化这个项目」，它只能猜；先让它看目录、读关键文件，再提需求。
- **看清权限请求再点同意**。它会执行命令、改文件，权限提示不是走流程。

跑通 hello.py 之后，可以试着让它做一件真实的小事：给现有项目加一个参数、补一段测试、解释一个不熟悉的模块。比继续折腾配置更能判断这套工具值不值。

---

## 附录：官方链接

- Claude Code 安装文档：<https://code.claude.com/docs/en/setup>
- Claude Code 环境变量：<https://code.claude.com/docs/en/env-vars>
- CC Switch Releases：<https://github.com/farion1231/cc-switch/releases/latest>
- DeepSeek API Key：<https://platform.deepseek.com/api_keys>
- DeepSeek 价格：<https://api-docs.deepseek.com/quick_start/pricing>
- DeepSeek 接入 Claude Code：<https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code>
- 智谱 GLM Coding Plan：<https://bigmodel.cn/glm-coding>
- 智谱 Claude Code 文档：<https://docs.bigmodel.cn/cn/coding-plan/tool/claude>
- Kimi Code：<https://www.kimi.com/code>
- 阿里云百炼 Coding Plan：<https://www.aliyun.com/benefit/scene/codingplan>
- MiniMax 开放平台：<https://platform.minimaxi.com/>
