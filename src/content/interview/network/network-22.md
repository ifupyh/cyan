---
title: "JSON和XML在嵌入式通信中的选择"
category: network
difficulty: easy
order: 22
---

## 参考答案

JSON和XML在嵌入式通信中的选择：

- **JSON**：轻量、可读性好、解析简单
  - 优势：数据量小，解析库小(cJSON约几KB)
  - 适合：IoT数据上报、配置文件
- **XML**：结构复杂但功能强大
  - 优势：支持Schema验证、命名空间
  - 缺点：冗余多，解析复杂，占内存
  - 适合：工业标准协议(如SOAP)

嵌入式推荐：**首选JSON，只有协议要求时才用XML**。

更极致的选择：Protobuf/MessagePack等二进制序列化，体积更小。
