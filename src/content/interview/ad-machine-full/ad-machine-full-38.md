---
title: "QT 进程启动后做了哪些事情？"
category: ad-machine-full
difficulty: medium
order: 38
---

## 参考答案

1. 读取 `ads_config.ini`（QSettings）；
2. 创建 `QMqttClient` 连接 MQTT（host/port/clientId/账号密码）；
3. 连接成功回调里**订阅**命令主题 `ads/cmd/{area}` 和播放列表主题 `ads/adslist/{area}`；
4. 收到命令 → 解析执行；收到播放列表 → 解析下载存 sqlite → 刷新播放；
5. 驱动分屏播放视频/图片。
