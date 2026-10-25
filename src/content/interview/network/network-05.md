---
title: "TCP的三次握手和四次挥手过程"
category: network
difficulty: easy
order: 5
---

## 参考答案

**三次握手(建立连接)**：

- 客户端 → SYN → 服务器
- 服务器 → SYN+ACK → 客户端
- 客户端 → ACK → 服务器

**四次挥手(断开连接)**：

- 主动方 → FIN → 被动方
- 被动方 → ACK → 主动方
- 被动方 → FIN → 主动方
- 主动方 → ACK → 被动方

为什么挥手要四次？因为TCP是全双工，**每个方向的关闭独立进行**。
