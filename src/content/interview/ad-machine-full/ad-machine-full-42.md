---
title: "指令解析的执行流程？"
category: ad-machine-full
difficulty: hard
order: 42
---

## 参考答案

- 收到 MQTT 消息 → `QJsonDocument::fromJson` 解析 payload → 取 `type`（消息类别）、`cmd`（具体命令）→ `switch(cmd)` 分发 → 调用对应执行函数（重启/更新/截图等）→ 执行系统命令。
