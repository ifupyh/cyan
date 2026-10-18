---
title: "投放广告的完整流程"
category: ad-machine
difficulty: medium
order: 8
---

## 参考答案

1. 客户提供素材给运营商；
2. 后台创建广告、上传素材、配置区域/时段；
3. 下发 → 后端生成播放列表 JSON（含 URL 和 sign）；
4. MQTT publish 到 `ads/adslist/{area}`；
5. 设备订阅收到 → 解析 → 下载 → sha256 校验 → 写 sqlite → 刷新播放列表；
6. 开始轮播。
