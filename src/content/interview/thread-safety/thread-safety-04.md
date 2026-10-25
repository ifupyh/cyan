---
title: "在Linux驱动中spinlock和mutex的使用场景有什么不同？"
category: thread-safety
difficulty: medium
order: 4
---

## 参考答案

在Linux驱动中spinlock和mutex的使用场景：

**spinlock场景**：

- 中断处理函数中保护共享数据
- 中断和进程间共享数据：`spin_lock_irqsave()`
- 极短的临界区(几行代码)
- softirq/tasklet中

**mutex场景**：

- `file_operations`的read/write/ioctl(进程上下文)
- 需要睡眠的操作(如I2C/SPI通信、等待中断)
- 较长的临界区
- probe/remove函数中

经验：**驱动中大部分锁场景用mutex，只有涉及中断的才用spinlock**。
