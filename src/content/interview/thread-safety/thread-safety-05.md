---
title: "什么是信号量和互斥量在POSIX中的区别？"
category: thread-safety
difficulty: medium
order: 5
---

## 参考答案

POSIX中**信号量和互斥量**的区别：

- **互斥量(pthread_mutex)**：
  - 二值(锁定/解锁)
  - **谁锁谁解**：只有持有者能解锁
  - 支持优先级继承
  - 用于保护临界区
- **信号量(sem_t)**：
  - 计数值(0到N)
  - **任何线程都能post/wait**
  - 不支持优先级继承
  - 用于资源计数和线程同步

选择：保护共享数据用**mutex**，同步事件(如生产者消费者)用**信号量**。
