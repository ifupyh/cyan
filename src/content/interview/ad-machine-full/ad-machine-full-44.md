---
title: "分屏播放怎么实现？"
category: ad-machine-full
difficulty: medium
order: 44
---

## 参考答案

- 用 **QSplitter** 做分割容器：`addWidget` 加子部件，`setStretchFactor` 设占比，`setHandleWidth(0)` 去掉分割线，`showFullScreen()` 全屏。
- 支持上下、左右、上中下、左中右；通过 `templateId` 决定分屏模式（设备→设备类型→模板绑定）。
