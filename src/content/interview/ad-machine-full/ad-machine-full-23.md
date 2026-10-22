---
title: "配置完要做什么？（提交后做了什么）"
category: ad-machine-full
difficulty: medium
order: 23
---

## 参考答案

1. 写 `ads_config.ini`；
2. 需要 wifi 则调 wifi 联网流程；
3. 发 System V 消息通知主进程；
4. 主进程收到后向**后端注册**，注册成功设备上线。
