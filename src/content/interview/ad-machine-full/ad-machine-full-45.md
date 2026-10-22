---
title: "广告机重启后怎么知道要播放哪些广告？"
category: ad-machine-full
difficulty: medium
order: 45
---

## 参考答案

- 素材已下载到本地 + **sqlite 里存了播放列表和本地路径**，重启后 QT 进程从 sqlite 读播放列表、按本地路径恢复播放，无需重新下载。
