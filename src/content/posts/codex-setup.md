---
title: "Codex 安装、配置与使用"
published: 2026-11-12
description: "Codex 的三种入口——桌面应用、CLI 和 IDE 插件：从装 Node、npm 安装、登录，到第一次跑通项目分析，把会踩的坑一次说清。"
image: ""
tags: [Codex, AI, 开发工具, 配置]
category: 工具
draft: false
---

使用 Codex 前，建议先通过 CC Switch 把模型供应商配置好，之后切换模型会方便很多——具体做法见[上一篇：Claude Code 安装、配置与使用](/posts/claude-code-setup/)的第 5、7 章，Codex 和 Claude Code 走的是同一套思路。

Codex 有三种用法，按上手成本从低到高排：

![Codex 的三种使用方式：桌面应用、IDE、终端](/assets/images/posts/codex-setup/codex-three-ways.webp)

下面分别介绍。

---

## 一、Codex 桌面应用

最简单的方式是直接用桌面应用，前提是网络能连上。

访问 <https://chatgpt.com/codex>，页面底部就有下载按钮，Windows 用户选 "Download for Windows"。

![Codex 下载页：桌面应用 / IDE 插件 / 终端三种入口](/assets/images/posts/codex-setup/codex-download.webp)

登录 ChatGPT 账号即可使用（<https://chatgpt.com/>），免费版也能跑。也可以接 DeepSeek 或中转站，做法同样见上一篇的第 5、7 章。

![免费版 ChatGPT 账号也能直接用，示例是让它生成一张 STM32 架构图](/assets/images/posts/codex-setup/codex-desktop.webp)

### 界面说明

![Codex 桌面应用主界面](/assets/images/posts/codex-setup/codex-interface.webp)

左侧栏还有几项值得先认识：

- **搜索**：翻历史对话记录。
- **插件**：安装插件或工具，扩展它能调用的能力。
- **自动化**：设置自动化任务。

右上角的图标可以切到其他 IDE 打开当前项目。

真正干活的地方是右侧面板——可以把侧边栏理解成"工作台"：

![侧边栏的四个面板：文件、浏览器、审查、终端](/assets/images/posts/codex-setup/codex-sidebar.webp)

- **文件**：看当前工作区的文件树。用来打开、检查、定位项目文件，也方便确认改了哪些文件。
- **浏览器**：内置浏览器。前端项目跑起来后，可以打开页面，让它点击、截图、检查样式和交互。
- **审查**：看代码变更和 review 结果。通常用来检查 diff、确认它做了什么、有没有潜在问题。
- **终端**：看命令执行现场。比如安装依赖、启动服务、跑测试、看报错日志。

然后在输入框里提需求：

![在输入框里提需求](/assets/images/posts/codex-setup/codex-prompt.webp)

### 模式选择

**计划模式**：适合先想清楚再动手。它会先拆解任务、列步骤、识别风险，必要时向你确认关键选择。一般用于需求还不清楚、方案需要比较、不想让它直接改文件的时候。

**追求目标**：适合让它持续推进一个明确目标。比如"把这个网页做完并测试好""修复这个报错直到能跑通"。开启后会围绕这个目标持续工作，跨多轮也尽量不丢上下文，直到目标完成、被你停止，或确实卡住。

![计划模式与追求目标](/assets/images/posts/codex-setup/codex-plan-mode.webp)

### 权限设置

![权限设置](/assets/images/posts/codex-setup/codex-permissions.webp)

### 推理深度与模型选择

![推理深度与模型选择](/assets/images/posts/codex-setup/codex-reasoning.webp)

桌面应用适合快速体验 Codex、做常规任务；深度开发时效率偏低，这时候换 CLI。

---

## 二、Codex CLI（最常用）

开发者最常用的方式是 **Codex CLI**。

### 2.1 安装 Node.js

如果电脑已经装了 Node.js，在命令行输入：

```bash
node --version
```

显示版本号（比如 `v24.17.0`）就说明已安装。没有的话去 <https://nodejs.org/zh-cn/download> 下载安装。

安装方式很简单：按系统下载安装包，一路默认下一步即可。

![Node.js 安装向导](/assets/images/posts/codex-setup/node-install.webp)

安装完成后关掉命令行再重新打开，再次输入：

```bash
node --version
```

![node --version 输出版本号](/assets/images/posts/codex-setup/node-version.webp)

### 2.2 安装 Codex CLI

用 npm 安装：

```bash
npm install -g @openai/codex

# 国内网络可以换镜像，快很多
npm install -g @openai/codex --registry=https://registry.npmmirror.com
```

安装完验证并启动：

```bash
# 查看版本
codex --version

# 启动
codex
```

其实还有更省事的方式——让另一个 AI 工具帮你装，把下面这段提示词丢给它：

```text
帮我安装 Codex CLI 工具，按以下步骤执行：

第一步：检查环境
- 运行 node -v 确认 Node.js ≥ 22（已安装则跳过）
- 如果未安装，帮我从 nodejs.org 下载安装

第二步：安装 Codex
- 直接运行 npm install -g @openai/codex
- 如果是国内网络，执行 npm i -g @openai/codex --registry=https://registry.npmmirror.com

第三步：验证安装
- 运行 codex --version
```

#### 报错：禁止运行脚本

Windows 上第一次跑 `codex` 可能被 PowerShell 拦下来：

![PowerShell 提示禁止运行脚本](/assets/images/posts/codex-setup/codex-script-blocked.webp)

以管理员身份打开 PowerShell，执行：

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

输入 `Y` 确认，然后重开终端。

![放开策略后正常启动](/assets/images/posts/codex-setup/codex-script-fixed.webp)

### 2.3 登录 Codex

首次运行需要登录，有两种方式：

**方法一：ChatGPT 登录**

```bash
codex
```

选择 `Sign in with ChatGPT`，浏览器会打开登录页，登录完成即可使用。

**方法二：API Key 登录**

想用国产模型或中转站，就通过 CC Switch 配置 API Key（同样是[上一篇的第 7 章](/posts/claude-code-setup/)），然后在终端运行：

```bash
codex
```

### 2.4 第一次运行 Codex

进入项目目录：

```bash
cd my-project
```

启动 Codex：

```bash
codex
```

然后输入：

```text
分析下当前的项目结构
```

它会自动扫描代码库、分析项目结构，并输出系统架构说明。

### 2.5 更新与卸载

```bash
# 更新到最新版本
npm update -g @openai/codex

# 或强制重装最新版
npm install -g @openai/codex@latest

# 卸载
npm uninstall -g @openai/codex

# Homebrew 卸载
brew uninstall --cask codex
```

---

## 三、IDE 插件

Codex 也能在 IDE 里用，比如 VS Code、Cursor：

1. 打开 IDE 的插件市场。
2. 搜索 **Codex**。
3. 安装插件。
4. 登录 ChatGPT 账号。

![在 IDE 里安装 Codex 插件](/assets/images/posts/codex-setup/codex-ide-plugin.webp)

这样就能在编辑器内直接使用，比如自动修复代码、自动生成函数、自动重构代码。

---

## 写在最后

三种方式的取舍很清楚：

- **桌面应用**用来体验和做常规任务，界面直观，但对复杂项目的推进能力有限。
- **CLI**是主力，功能最全，适合真正开发。
- **IDE 插件**是日常写代码时最顺手的入口，本质还是调用同一个模型。

先用 CLI 跑通一次真实的项目分析，再决定平时固定在哪个入口上，比在配置上反复折腾更有意义。
