---
title: "配置进程（功能 / 配置什么 / 谁配置 / 怎么访问）"
category: ad-machine
difficulty: medium
order: 11
---

## 参考答案

- 功能：web 配置页接收配置 → 写 `ads_config.ini` → 联网 → 发消息通知主进程注册。
- 配置什么：联网方式（wifi SSID/密码）、后端地址、MQTT 地址、区域 area。
- 谁配置：运维/安装人员，**网线直连设备**，浏览器访问**默认 IP** 打开页面。
