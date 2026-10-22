---
title: "每一次下发的广告都要重新下载所有资源吗？"
category: ad-machine-full
difficulty: medium
order: 8
---

## 参考答案

- 不是。**只有新增/变更的素材才下载**，本地已有且未变化的跳过。
- 判断依据：素材 URL 或 sign 与本地记录比对，相同则复用本地文件。

---

## 三、架构设计
