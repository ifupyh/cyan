---
title: "优先级反转问题是什么？怎么解决？"
category: process-thread
difficulty: medium
order: 16
---

## 参考答案

**优先级反转**：**高优先**级任务P1**等待低优先**级P3的锁，**中优先**级P2**抢占低优先**级P3，导致**高优先**级P1被**中优先**级P2间接**阻塞**。

![优先级反转示意图](/assets/images/interview/process-thread/priority-inversion.png)

**优先级继承（Priority Inheritance）**：当L持有的锁导致H阻塞时，**临时将L的优先级提升到H的级别**，让L能尽快执行完释放锁。锁释放后L恢复原来的优先级。

**优先级天花板（Priority Ceiling）**：给每个锁预设一个**天花板优先级**（等于所有可能使用该锁的任务中最高优先级）。任何任务获取该锁时，优先级自动提升到天花板。

注意：FreeRTOS中**只有Mutex支持优先级继承，普通信号量不支持**。
