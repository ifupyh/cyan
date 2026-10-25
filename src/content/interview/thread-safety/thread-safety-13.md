---
title: "什么是优先级反转？在实时系统中如何解决？"
category: thread-safety
difficulty: medium
order: 13
---

## 参考答案

**优先级反转**：高优先级任务等待低优先级任务持有的锁，而低优先级任务又被中优先级任务抢占。

结果：高优先级任务被间接阻塞，违反实时性要求。

**解决方法**：

- **优先级继承(Priority Inheritance)**：持锁的低优先级任务临时提升到等待者的优先级
- **优先级天花板(Priority Ceiling)**：锁的优先级设为可能使用该锁的最高优先级任务的优先级

Linux中：rt_mutex支持优先级继承。FreeRTOS的mutex也支持。

经典案例：火星探路者的优先级反转bug。
