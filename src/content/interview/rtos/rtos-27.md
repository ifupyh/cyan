---
title: "FreeRTOS 中的内存管理方案（heap_1 到 heap_5）有什么区别？"
category: rtos
difficulty: medium
order: 27
---

## 参考答案

FreeRTOS的 **5种内存管理方案**：

- **heap_1**：只分配不释放，最简单，适合不需要删除任务的系统
- **heap_2**：支持释放但 **不合并碎片**，适合分配释放大小固定的场景
- **heap_3**：封装标准库 `malloc/free`，线程安全，依赖编译器堆
- **heap_4**：支持释放且 **合并相邻空闲块**，最常用，适合大多数场景
- **heap_5**：heap_4的增强版，支持 **跨多个不连续内存区域** 分配

推荐：一般项目用 **heap_4**，有外部SRAM用 heap_5。
