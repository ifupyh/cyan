---
title: "配置进程和主进程是怎么通信的？为什么不用 Socket？"
category: ad-machine-full
difficulty: hard
order: 13
---

## 参考答案

- 方式：配置进程写完 `ads_config.ini` 后，向 **System V 消息队列**发一条消息，主进程子线程阻塞 `msgrcv` 收到后发起注册。
- 为什么不用 socket：本机单机通信，消息队列足够（有边界、按类型、内核管理、轻量）；socket 适合跨主机，本机用是杀鸡用牛刀，还要管端口/连接/协议。
