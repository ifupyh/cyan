---
title: "配置页面给谁用？怎么访问到？"
category: ad-machine-full
difficulty: medium
order: 20
---

## 参考答案

- 给运维/安装人员用。
- 访问方式：运维用**网线直连设备**，设备配置进程（mongoose）默认 IP 起了个 web 服务，浏览器访问该**默认 IP** 打开配置页。
- 填完提交 → 接口接收参数 → 写 ini → 联网 → 发消息给主进程。
