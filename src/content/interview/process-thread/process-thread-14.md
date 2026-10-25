---
title: "定位死锁问题时通常有哪些思路？"
category: process-thread
difficulty: medium
order: 14
---

## 参考答案

定位死锁问题的思路：

1. **复现**：找到稳定复现死锁的条件
2. 查看线程状态：
   - `gdb` attach 后 `thread apply all bt` 看所有线程堆栈
   - 或用 `pstack <pid>` 查看各线程调用栈
3. **分析锁持有关系**：从堆栈信息判断哪个线程持有哪个锁，在等哪个锁
4. **画锁依赖图**：如果存在**循环依赖**就是死锁
5. **检查代码**：确认是否有多锁嵌套且顺序不一致

**预防**：统一加锁顺序、使用 try_lock 超时、开启 Linux lockdep 检测。
