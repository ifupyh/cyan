---
title: "socket通信的基本流程"
category: network
difficulty: easy
order: 13
---

## 参考答案

Socket通信基本流程（TCP为例）：

**服务端**：`socket(创建套接字)` → `bind(绑定地址和端口)` → `listen(监听)` → `accept(接受连接)` → `recv/send(收发数据)` → `close(关闭套接字)`

**客户端**：`socket(创建套接字)` → `connect(连接服务端)` → `send/recv(收发数据)` → `close(关闭套接字)`

关键函数：

- `socket()`创建套接字
- `bind()`绑定IP和端口
- `listen()`设为监听模式
- `accept()`接受连接，返回新socket

UDP更简单：不需要listen/accept/connect，直接`sendto`/`recvfrom`。
