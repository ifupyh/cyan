---
title: "广告机播放的广告资源从哪来"
category: ad-machine
difficulty: medium
order: 7
---

## 参考答案

客户给素材 → 运营商后台**上传广告、配置播放规则** → 下发 → 后端生成**播放列表（含素材下载 URL）** → **MQTT 推给设备** → 设备**下载到本地** → 存 sqlite → 播放。
- 误区：不是"后端用 ini 下发"，ini 只存设备配置。
