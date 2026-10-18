---
title: "一个指针可以是 volatile 吗"
category: cpp
difficulty: medium
order: 15
---

## 参考答案

**结论：** 可以。指针本身是个变量，同样可能被外部（如中断）改变。

```cpp
int * volatile p;   // p 本身 volatile：每次读 p 都从内存取，可能被 ISR 改了指向
volatile int *p;    // 指向 volatile 数据：p 指向的数据可能被外部改变
```

常见例子：中断服务程序会更新一个指向 buffer 的指针，必须用 volatile 修饰该指针本身。
