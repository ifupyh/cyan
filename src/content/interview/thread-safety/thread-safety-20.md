---
title: "pthread_once的作用和使用场景"
category: thread-safety
difficulty: easy
order: 20
---

## 参考答案

使用场景：

- 全局资源的线程安全初始化(单例模式)
- 库的首次初始化
- 配置文件的一次性加载

内部实现：用原子操作和mutex保证只有第一个调用者执行函数，其他调用者等待完成。

与C++11 `std::call_once`功能相同。
