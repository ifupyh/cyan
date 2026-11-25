---
title: "让 AI 直接画原理图：嘉立创EDA 接入 AI Agent 实测"
published: 2026-11-22
description: "把嘉立创EDA 接到 AI Agent：装 Run API Gateway 扩展、给 Codex 装上 skill，一句话在画布里放器件、连线、跑 DRC。实测 STM32 最小系统 DRC 0 错误，但图不好看。"
image: ""
tags: [嘉立创EDA, AI, 原理图, STM32]
category: 技术
draft: false
---

> 不用截图、不用描述坐标，一句话让 AI 在嘉立创EDA 专业版里放器件、连线、跑 DRC。
> 我拿 STM32F103C8T6 最小系统实测了一遍：**DRC 0 错误，AI 耗时 10 分 54 秒，但图不好看。**

---

## 这套方案是怎么跑起来的

原理很简单：嘉立创EDA 官方有个扩展 **Run API Gateway**，把 EDA 的画布操作（放器件、连线、命名网络、读库）通过本地 **WebSocket** 暴露出来；官方再配一个 **easyeda-api skill**，让 AI Agent 知道"有哪些接口、怎么调"。

```
AI Agent（Codex / Claude Code / Cursor）
        │  本地 WebSocket
        ▼
Run API Gateway 扩展  ←→  嘉立创EDA 画布
```

AI 不"看图"，它直接调 API——所以不要指望它像人一样审美，但"摆对、连对、跑通 DRC"这件事，它已经能做了。

---

## 一、准备清单

| 项目 | 说明 |
| --- | --- |
| 嘉立创EDA 专业版 | 我用的是 **V3.2.175**，版本太老可能没有扩展管理器入口 |
| Run API Gateway 扩展 | 官方扩展，给 AI 工具提供 WebSocket 桥接（我看到的是 v1.0.8） |
| AI Agent 客户端 | Codex、Claude Code、Cursor 等，需支持 Skill |
| 模型 | 尽量上前沿模型。我用 Codex 里的 **6.2 Sol**；轻度模型容易画歪 |

经验：这类任务要同时理解器件库、坐标、引脚和网络名，**弱模型会画出一堆悬空引脚**，纠正起来比自己画还贵。我对比过，前沿模型（GPT 系、Claude 系）基本能一次画对；DeepSeek、豆包在我这台机器上不太理想，容易漏接线。

![在 Codex 里切到 6.2 Sol](/assets/images/posts/easyeda-ai-agent/codex-model.webp)

---

## 二、第一步：装桥接扩展

1. 打开嘉立创EDA，点顶部菜单 **高级(A) → 扩展管理器(E)…**
2. 搜索框输入 `run`，找到 **Run API Gateway**（作者 EasyEDA，描述为"为 AI 编程工具提供 WebSocket 网关桥接服务"），点 **安装**
3. 安装后点 **配置**，勾上 **允许外部交互**
   - 其余两项"显示在顶部菜单""自动更新"保持默认就行
4. **关掉嘉立创EDA**

![扩展管理器入口](/assets/images/posts/easyeda-ai-agent/extension-menu.webp)

![安装 Run API Gateway 并打开"允许外部交互"](/assets/images/posts/easyeda-ai-agent/gateway-install.webp)

> 不勾"允许外部交互"，AI 那边端口连得上，但一操作画布就被拒——这是最常见的"看着通了其实没通"。

---

## 三、第二步：给 Agent 装技能

技能仓库（官方）：<https://github.com/easyeda/easyeda-api-skill>

最省事的办法不是自己 clone、拷目录，而是**让 AI 自己装**。它知道自己的全局 Skill 目录在哪，也会顺手处理依赖。把下面这句话复制进对话框即可：

**OpenCode**

```text
请帮我从 https://github.com/easyeda/easyeda-api-skill 安装 easyeda-api skill 到 OpenCode 的全局 Skill 目录
```

**Claude Code**

```text
请帮我从 https://github.com/easyeda/easyeda-api-skill 安装 easyeda-api skill 到 Claude Code 的全局 Skill 目录
```

**Cursor / Cline / Continue / Windsurf / WorkBuddy / QwenCode / KimiCode / Trae**

```text
请帮我从 https://github.com/easyeda/easyeda-api-skill 下载并安装 easyeda-api skill
```

装完重启一下 Agent 客户端，确保技能被加载。

---

## 四、第三步：连上，然后开口下单

注意顺序：**先起技能，再开 EDA。**

**① 起技能**：在 AI 对话框输入 `$`，选择 `easyeda-api`（也可以直接打 `$easyeda-api`）后回车。它会启动本地桥接服务并告诉你端口，比如"桥接服务已在本机 49620 端口启动"。

**② 开 EDA**：这时候再启动嘉立创EDA，扩展会自动连过去。顶部菜单栏跳出 **Bridge 已连接（端口 49620）**，链路才算真的通了。

![Bridge 已连接](/assets/images/posts/easyeda-ai-agent/bridge-connected.webp)

如果 AI 提示"端口已启动，但当前没有连接的 EasyEDA 窗口"，就是 EDA 没开、或者扩展没启用，关掉重开一次即可。

**③ 下单**：新建一个原理图，用自然语言说人话就行：

```text
Easyeda API 帮我生成一个 STM32 的最小原理图
```

它会先确认窗口连接、再查器件库、再动手。这次它自己把型号补全成 **STM32F103C8T6**，整体用时 10 分 54 秒：

![AI 正在确认库和接口](/assets/images/posts/easyeda-ai-agent/ai-building.webp)

---

## 五、结果：DRC 全绿，但不好看

这是导出的成品图：

![STM32F103C8T6 最小系统](/assets/images/posts/easyeda-ai-agent/schematic-result.webp)

DRC 结果很干净：致命错误 0、错误 0、警告 0，只有两条信息日志（开始检查 / 完成检查）。

![DRC 检查结果](/assets/images/posts/easyeda-ai-agent/drc-result.webp)

但图一打开问题就来了：

- **标注乱飞**：说明文字直接压在芯片引脚标签上，"Remove J2…"那一整段和 PB 引脚糊在一起
- **网络标签代替导线**：右侧一片 GND / 3V3 用的是网络标签，没有接地符号，读图要靠脑补
- **没有功能分区**：晶振、复位、BOOT、去耦、排针全堆在中间
- **对齐随意**：元件没贴网格，留白不均，标注朝向也不统一

这也说明一件很重要的事：**DRC 只查电气规则，不查可读性。** 0 错误只代表"连对了"，不代表"人能看懂"，更不代表能直接投板。

---

## 六、救场：用约束型 Skill 兜住审美

所以下一步不是让它重画一遍，而是给它一套**画图规范**。

GitHub 上有社区做的约束型 skill，比如 <https://github.com/zhoushoujianwork/easyeda-agent>：把网格、标注位置、命名、走线、分区这些"人类工程师的默认习惯"写成规则，让 AI 照着画，而不是自由发挥。

安装还是那句话——交给 AI：

```text
帮我从这个仓库安装 easyeda-agent 技能：https://github.com/zhoushoujianwork/easyeda-agent
```

装好后别只说"重画"，要说"**按规范整理当前这张图**"，效果会好很多：

```text
用 easyeda-agent 的规范整理当前原理图：说明文字统一挪到图纸下方，GND 全部换成接地符号，
按功能分区重排，元件对齐网格。
```

---

## 七、踩坑清单

1. **改完配置不重启 EDA**：桥接不生效，表现为"端口在、窗口没连上"。
2. **顺序反了**：先开 EDA 再起技能，EDA 可能会一直找不到服务；按"技能 → EDA"的顺序来。
3. **端口会变**：我这次是 49620，下次不一定是它。别把端口写死在脚本里，以顶部提示为准。
4. **弱模型别硬上**：画得出来是运气，画不出来是常态。
5. **必须人工审核**：AI 会"自信地连错"。常见的是去耦电容位置、复位/BOOT 极性、悬空引脚处理——DRC 过了也要对着数据手册过一遍。
6. **离线/半离线搜不到器件**：它会退而求其次找相近封装，封装对不上的坑比连线错更难发现。

---

## 八、到底值不值得用

坦白说，这张最小系统我手画也就十几分钟，**省下的时间不是重点**。

重点是**"想验证一个电路"的启动成本被压到接近零**：想试某个传感器的接法、想确认上拉电阻放哪、想看看两个模块怎么接——直接说，它在画布里摆给你看，不行就让它改。

至于"好不好看"和"能不能投板"，现阶段还是约束 + 人工收尾。AI 已经从"给你画 ASCII 图"进化到"在真实画布里动手"，剩下的差距，一半靠 skill 里写的规范，一半靠审图的人。

---

*实测环境：嘉立创EDA 专业版 V3.2.175，Run API Gateway v1.0.8，Codex + 6.2 Sol，实测日期 2026-11-22。*
