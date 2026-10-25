---
title: "嵌入式Web服务器（如Mongoose、libmicrohttpd）的选择"
category: network
difficulty: medium
order: 25
---

## 参考答案

嵌入式Web服务器的选择：

- **Mongoose**：
  - 单文件C库，极易集成
  - 支持HTTP/WebSocket/MQTT/SNTP等
  - 适合IoT设备管理界面
- **libmicrohttpd**：
  - GNU项目，纯C实现
  - 专注HTTP服务，API规范
  - 支持HTTPS/认证/文件上传
- **其他**：GoAhead(商业友好)、lighttpd(功能强但较重)

选择建议：**快速原型用Mongoose(简单)，正式项目用libmicrohttpd(稳定)**。
