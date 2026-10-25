---
title: "Linux内核有哪些同步方式？"
category: thread-safety
difficulty: easy
order: 1
---

## 参考答案

- **原子操作(atomic_t)**：硬件级别的不可分割操作
- **自旋锁(spinlock)**：忙等待，适合短临界区和中断上下文
- **互斥锁(mutex)**：可睡眠，适合长临界区
- **信号量(semaphore)**：计数锁，可睡眠
- **读写锁(rwlock/rwsem)**：读并行写互斥
- **RCU**：无锁读，延迟释放
- **顺序锁(seqlock)**：写优先
- **completion**：等待-通知
- **内存屏障(barrier)**：保证内存访问顺序
