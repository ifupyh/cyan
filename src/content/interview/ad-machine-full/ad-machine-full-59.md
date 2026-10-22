---
title: "MQTT 账号密码是写死的吗？"
category: ad-machine-full
difficulty: medium
order: 59
---

## 参考答案

- 不是。账号密码等连接参数从 `ads_config.ini` 读取（配置进程写入），不硬编码。
