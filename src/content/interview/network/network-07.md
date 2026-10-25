---
title: "什么是TCP的RST报文？触发条件有哪些？"
category: network
difficulty: medium
order: 7
---

## 参考答案

TCP的RST报文用于**强制重置连接**。

**触发条件**：

- 收到一个不存在连接的报文(如服务器重启后收到旧连接的数据)
- 连接异常需要立即终止(不走正常四次挥手)
- 接收到非法报文(如SYN发到非监听端口)
- 程序设置了`SO_LINGER`且linger=0时close
- 半连接超时

与FIN的区别：FIN是优雅关闭(四次挥手)，**RST是暴力关闭，不需要对方确认**。
