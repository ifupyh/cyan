---
title: "投放广告的完整流程"
category: ad-machine-full
difficulty: medium
order: 6
---

## 参考答案

1. 客户提供广告素材给运营商；
2. 运营商后台创建广告、上传素材、配置播放规则（区域、时段、上下屏）；
3. 点击下发 → 后端生成播放列表 JSON（含素材 URL 和 sign）；
4. 后端 MQTT publish 到 `ads/adslist/{area}`；
5. 对应区域设备订阅收到 → 解析 JSON → 下载素材 → sha256 校验 → 写 sqlite → 刷新播放列表；
6. 设备开始轮播。
