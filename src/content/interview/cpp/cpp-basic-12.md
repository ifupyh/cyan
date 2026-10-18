---
title: "C++11/14/17 新特性（精简）"
category: cpp
difficulty: medium
order: 12
---

## 参考答案

**C++11（现代 C++ 奠基）**：`auto`、范围 for、智能指针 `unique_ptr/shared_ptr/weak_ptr`、右值引用与移动语义、lambda、`nullptr`、`constexpr`、`std::thread`、统一初始化 `{}`。

**C++14（完善）**：函数返回类型推导（`auto` 作返回类型）、泛型 lambda、`decltype(auto)`、放宽 constexpr、`std::make_unique`。

**C++17（现代化）**：结构化绑定 `auto [a,b]`、`if/switch` 初始化语句、`std::string_view`、`std::optional/variant/any`、`std::filesystem`、折叠表达式。

**纠正原稿：** C++11 已支持 `auto`，但「返回类型自动推导」是 C++14；「标准库新增 thread/mutex」等（原稿该处文字缺失）。
