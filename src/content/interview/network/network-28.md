---
title: "嵌入式系统中的NTP时间同步协议"
category: network
difficulty: easy
order: 28
---

## 参考答案

NTP(Network Time Protocol)用于**网络时间同步**。

- 精度：LAN内1ms级别，WAN内几十ms
- 端口：UDP 123
- 工作方式：客户端向NTP服务器请求时间，通过往返延迟计算时间差

嵌入式应用：

- 设备启动后同步网络时间
- 日志时间戳准确性
- 定时任务依赖准确时间

轻量实现：SNTP(Simple NTP)，只做一次查询不做持续校准。

嵌入式中常用`ntpdate`或lwIP的SNTP模块。
