---
title: "什么是线程安全的单例模式？双重检查锁定的问题？"
category: thread-safety
difficulty: hard
order: 19
---

## 参考答案

**线程安全的单例模式**实现方法：

- **C++11 static局部变量(最推荐)**：

```
static Singleton& getInstance() {
    static Singleton instance; // C++11保证线程安全
    return instance;
}
```

- **双重检查锁定(DCLP)**的问题：
  - 需要memory barrier防止指令重排
  - 不用volatile+barrier的DCLP是**有bug的**
  - C++11中用`std::atomic`+`memory_order_acquire/release`可以正确实现

最佳实践：**C++11以后直接用static局部变量，简单安全**。
