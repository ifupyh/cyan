---
title: "glib 返回的堆内存为什么要 g_free？漏了会怎样？"
category: ad-machine-full
difficulty: hard
order: 35
---

## 参考答案

- glib 的 `g_*` 接口内部用 `g_malloc` 分配堆内存，必须用 **`g_free` 配对释放**，不能用 free（混用可能崩溃）。
- 漏了会**内存泄漏**：长跑进程内存持续增长，最终 OOM 被 kill。
