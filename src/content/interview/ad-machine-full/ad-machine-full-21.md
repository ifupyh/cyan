---
title: "配置进程里是怎么部署 HTML 页面的？怎么做路由分发？"
category: ad-machine-full
difficulty: hard
order: 21
---

## 参考答案

- HTML 页面放在设备本地文件系统，mongoose 作为内嵌 web 服务器加载并返回。
- **路由分发**：在 mongoose 的事件/请求处理回调里，按请求 URL 分发——静态页面路由返回 HTML 文件内容，接口路由（如提交配置的 URL）调用对应的处理函数解析表单参数、写 ini。
