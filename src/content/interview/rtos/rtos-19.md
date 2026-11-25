---
title: "FreeRTOS 的源码了解多少？它跟其他实时操作系统有什么区别？"
category: rtos
difficulty: medium
order: 19
---

## 参考答案

FreeRTOS 源码特点：

- **核心源码很少**：`tasks.c`、`queue.c`、`list.c` 三个核心文件约 **1万行** C 代码，非常精简
- **可读性高**：代码风格统一，注释详尽，适合学习 RTOS 原理
- **可配置性强**：通过 `FreeRTOSConfig.h` 裁剪功能，最小内核几KB

**与其他 RTOS 的区别**：

| 对比项 | FreeRTOS | μC/OS | RT-Thread |
| :--- | :--- | :--- | :--- |
| 开源协议 | MIT（免费） | 商业授权 | Apache 2.0 |
| 代码量 | 极小 | 中等 | 较大（组件丰富） |
| 生态 | AWS IoT 支持 | 教学经典 | 国产，组件丰富 |
| 特点 | 轻量极简 | 规范严谨 | 类Linux框架 |
