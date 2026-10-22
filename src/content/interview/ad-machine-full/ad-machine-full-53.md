---
title: "sign 是怎么来的？"
category: ad-machine-full
difficulty: medium
order: 53
---

## 参考答案

- 后端对素材文件内容算 **sha256 哈希**，作为 `sign` 字段放在播放列表 JSON 里随列表下发，设备下载后算本地 sha256 与之比对。
