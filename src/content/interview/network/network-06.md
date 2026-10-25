---
title: "TCP的TIME_WAIT状态的作用和影响"
category: network
difficulty: medium
order: 6
---

## 参考答案

TIME_WAIT出现在**主动关闭连接的一方**，持续**2MSL**(约60秒)。

**作用**：

确保最后一个ACK能到达对方

让网络中残留的旧报文过期

**影响**：大量短连接时产生大量TIME_WAIT，占用端口

**优化**：

` SO_REUSEADDR`：允许重用TIME_WAIT地址

`tcp_tw_reuse`：安全重用TIME_WAIT连接

使用长连接减少频繁建断连
