---
title: "什么是顺序锁（seqlock）？适用场景？"
category: thread-safety
difficulty: medium
order: 9
---

## 参考答案

**顺序锁(seqlock)\**是\**写者优先**的锁机制。

原理：

- 维护一个序列号(sequence number)
- 写者：加锁时序列号+1(变为奇数)，解锁时再+1(变为偶数)
- 读者：不加锁，先读序列号，读数据，再读序列号，两次不同则重试

特点：

- **写者不被读者阻塞**
- 读者可能需要重试
- 适合：写少读多，且读者可以容忍重试

典型场景：jiffies计时器更新(写频率低但读极频繁)。

与rwlock区别：**seqlock写优先，rwlock读写平等**。
