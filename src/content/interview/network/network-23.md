---
title: "什么是DNS？DNS解析的过程？"
category: network
difficulty: easy
order: 23
---

## 参考答案

DNS是**将域名转换为IP地址**的系统。

**解析过程**：

- 应用 → 本地DNS缓存 → 本地DNS服务器
- → 根域名服务器(.)
- → 顶级域名服务器(.com)
- → 权威域名服务器(example.com)
- 返回IP地址，沿途缓存

查询方式：

- **递归查询**：本地DNS负责完整查询
- **迭代查询**：DNS服务器之间逐级引用

嵌入式设备通常用`getaddrinfo()`或lwIP的DNS模块。
