---
title: "配置进程有什么功能？"
category: ad-machine-full
difficulty: easy
order: 18
---

## 参考答案

- 提供**本地 web 配置页**，接收运维提交的配置信息（联网方式、后端地址、MQTT 地址、区域 area 等）；
- 把配置保存到 `ads_config.ini`；
- 需要 wifi 则触发**联网**；
- 最后发消息队列通知主进程"配置就绪，去注册"。
