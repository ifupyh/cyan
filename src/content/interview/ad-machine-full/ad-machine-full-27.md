---
title: "配置进程为什么要发消息给主进程？怎么发的？"
category: ad-machine-full
difficulty: medium
order: 27
---

## 参考答案

- 配置完要触发主进程**向云端注册**（注册动作归主进程），所以发消息通知它"配置就绪"。
- 怎么发：向 **System V 消息队列** `msgsnd` 一条消息，主进程子线程阻塞 `msgrcv` 收到。

---

## 五、主进程（注册 / 心跳 / JSON 解析）
