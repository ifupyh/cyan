---
title: "什么是Unix域套接字？与TCP Socket的区别？"
category: network
difficulty: medium
order: 14
---

## 参考答案

Unix域套接字(Unix Domain Socket)是**同一机器上进程间通信**的机制。

与TCP Socket的区别：

- **Unix域**：通过文件路径寻址，不经过网络协议栈，**速度更快**
- **TCP**：通过IP:端口寻址，经过完整网络栈

优势：

- 性能更好(无网络开销)
- 支持传递文件描述符
- 安全性：可通过文件权限控制访问

使用：`socket(AF_UNIX, SOCK_STREAM, 0)`，绑定文件路径。

场景：**同机进程间通信首选Unix域套接字**。
