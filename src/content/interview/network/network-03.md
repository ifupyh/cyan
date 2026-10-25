---
title: "TCP和UDP的区别？各自的优缺点？"
category: network
difficulty: easy
order: 3
---

## 参考答案

TCP和UDP的核心区别：

- **TCP**：面向连接、可靠(重传排序)、有流控、头部20字节、较慢
- **UDP**：无连接、不可靠、无流控、头部8字节、快
- TCP适合：文件传输、Web、远程控制等**要求可靠**的场景
- UDP适合：音视频流、DNS查询、游戏等**要求低延迟**的场景

一句话：**要可靠用TCP，要快用UDP**。
