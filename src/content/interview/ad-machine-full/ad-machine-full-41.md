---
title: "指令执行如何实现？想让设备重启怎么做？"
category: ad-machine-full
difficulty: medium
order: 41
---

## 参考答案

- 后端下发命令 JSON，如 `{"type":1,"cmd":1}`；设备订阅命令主题收到后 `QJsonDocument` 解析 `type` 和 `cmd`。
- `switch` 分发执行：`case 1` 重启 → 调 `echo 123456 | sudo -S reboot`（或调系统命令接口执行）。
- 指令通过封装好的 `CmdUtil::execCmd` 执行系统命令。
