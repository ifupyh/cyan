---
title: "sqlite 里存了什么数据？"
category: ad-machine-full
difficulty: medium
order: 50
---

## 参考答案

- 广告列表（t_ad）和素材索引（t_ad_resource：远程 url + 本地路径 + 上下屏 type）。
- 就是"播什么、素材在哪"的持久化记录。
