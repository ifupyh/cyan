---
title: "更新播放列表 / 正在播时来了新广告，怎么刷新？"
category: ad-machine-full
difficulty: medium
order: 56
---

## 参考答案

- 用**信号槽**解耦：`AdsLogic` 单例收到新列表后发 `notifyAdsUpdate` 信号，UI 的 `adsUpdate` 槽重新 `loadVideos/loadImages`、重建 `QMediaPlaylist` 并重新播放。
- 界面"自动刷新"就是靠这个信号驱动。
