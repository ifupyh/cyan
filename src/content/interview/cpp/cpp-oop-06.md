---
title: "单例模式"
category: cpp
difficulty: medium
order: 22
---

## 参考答案

**结论：** 保证一个类只有一个实例，并提供全局访问点。

**饿汉式**：静态成员在程序启动时即创建，线程安全但可能浪费资源。

```cpp
class Singleton {
    static Singleton instance;              // 类内声明
public:
    static Singleton& getInstance() { return instance; }
};
Singleton Singleton::instance;              // 类外定义（程序启动即构造）
```

**懒汉式**：第一次使用时才创建。C++11 起用局部静态变量最简单且线程安全：

```cpp
class Singleton {
    Singleton() = default;
public:
    static Singleton& getInstance() {
        static Singleton instance;   // 首次调用时构造，C++11 保证线程安全
        return instance;
    }
    Singleton(const Singleton&) = delete;
    Singleton& operator=(const Singleton&) = delete;
};
```
