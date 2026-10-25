---
title: "Linux查看端口占用情况的命令是什么？netstat和ss命令的区别？"
category: linux-shell
difficulty: easy
order: 2
---

## 参考答案

**查看端口占用**：

- `netstat -tlnp`：查看所有TCP监听端口及对应进程
- `ss -tlnp`：功能类似，**推荐用ss**
- `lsof -i :8080`：查看8080端口被哪个进程占用

**netstat vs ss的区别**：

- `ss` 更快：直接读取内核的socket信息（通过netlink），不需要遍历 `/proc`
- `netstat` 较慢：需要遍历 `/proc/net` 下的文件，连接数多时明显卡顿
- `ss` 功能更强：支持更丰富的过滤表达式，如 `ss -t state established`
- `ss` 是新工具，`netstat` 属于旧的 `net-tools` 包（部分新系统已不预装）

简单来说：**ss是netstat的替代品，更快更强，优先使用ss**。
