---
title: "什么是Nagle算法？什么情况下需要禁用？"
category: network
difficulty: medium
order: 8
---

## 参考答案

Nagle算法：**合并小包，减少网络中的小报文数量**。

- 原理：有未确认数据时，新小数据先缓存，等ACK回来或积累够MSS再发
- 好处：减少小包浪费带宽

需要禁用的场景：

- **实时性要求高**：游戏、远程控制
- **请求-响应模式**：每个请求需要立即发出
- 与Delayed ACK配合时可能导致200ms延迟

禁用方法：设置`TCP_NODELAY`套接字选项。
