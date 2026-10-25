---
title: "在项目中用到了 Qt 和多线程，你的多线程是怎么开辟的？"
category: process-thread
difficulty: medium
order: 17
---

## 参考答案

在 Qt 中开辟多线程主要有三种方式：

1. **继承 QThread**：重写 `run()` 方法，在 `run()` 中执行耗时操作。调用 `start()` 启动线程
2. **moveToThread**：创建一个 `QObject` 子类，使用 `moveToThread()` 把它移到新线程中，通过**信号槽**触发执行。这是 Qt **推荐的方式**
3. **QtConcurrent::run()**：更简洁，直接把函数丢到线程池执行

线程间通信主要靠 Qt 的**信号槽机制**（跨线程时自动使用 `QueuedConnection`），也可以用 `QMutex`、`QSemaphore`、`QWaitCondition` 做同步。
