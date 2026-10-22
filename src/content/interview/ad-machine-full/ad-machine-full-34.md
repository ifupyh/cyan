---
title: "后端返回的 JSON 怎么解析？为什么用 cJSON 不用 glib？"
category: ad-machine-full
difficulty: medium
order: 34
---

## 参考答案

- 用 **cJSON** 解析：`cJSON_Parse` 得到根节点，`cJSON_GetObjectItem` 取字段，`valuestring/valueint` 取值。
- 为什么不用 glib：glib 是重量级库，JSON 相关（json-glib）要拖入整个 glib 生态；cJSON **单文件、轻量、无依赖、易集成**到嵌入式。
- glib 在本项目只用来**读 ini 配置**（GKeyFile），不用于 JSON。
