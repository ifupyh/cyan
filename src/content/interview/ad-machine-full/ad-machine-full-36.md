---
title: "为什么要使用 libcurl？"
category: ad-machine-full
difficulty: medium
order: 36
---

## 参考答案

- 主进程/设备端要向云端发 **HTTP 请求**（注册、上报），libcurl 是成熟稳定的 HTTP 客户端库，支持 GET/POST/HTTPS/超时/回调，跨平台、可交叉编译。
