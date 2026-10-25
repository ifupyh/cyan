---
title: "MQTT、CoAP、HTTP三种协议的区别和适用场景"
category: network
difficulty: medium
order: 21
---

## 参考答案

三种IoT常用协议的核心区别：

**MQTT**：发布/订阅模式，轻量级，适合低带宽不稳定网络，有QoS保证

场景：IoT设备上报、智能家居

**CoAP**：类似HTTP但基于UDP，极轻量，适合资源极受限设备

场景：NB-IoT传感器、低功耗节点

**HTTP**：请求/响应模式，通用性强但开销大

场景：设备配置、固件下载

选择：**资源受限选CoAP，需要可靠推送选MQTT，通用交互选HTTP**。
