---
title: "C 的 static 和 C++ 的 static 区别"
category: cpp
difficulty: easy
order: 24
---

## 参考答案

- **C**：static 只用于控制链接/生命周期——修饰局部变量延长生命周期，修饰全局变量/函数限定文件内可见。
- **C++**：除上述用法，还可用 static 修饰**类成员**：静态成员属于类，所有对象共享，需类外定义；静态成员函数无 this 指针，只能访问静态成员。
