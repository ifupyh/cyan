---
title: "左值引用与右值引用、移动语义、完美转发"
category: cpp
difficulty: hard
order: 16
---

## 参考答案

**结论：** 左值引用绑定持久对象，右值引用绑定临时对象，为移动语义和完美转发提供基础。

- **左值**：有名字、可取地址、能长期存在（变量、返回左值引用的函数调用）。
- **右值**：临时对象、字面量，没有持久身份（`42`、`a+b`、函数返回的临时值）。
- **左值引用 `T&`**：绑定左值，作别名、避免拷贝传参。
- **右值引用 `T&&`**：绑定右值，用于**移动语义**和**完美转发**。

**移动语义**：把临时对象的资源「偷」过来，避免深拷贝。

```cpp
class MyString {
    char* data_;
public:
    MyString(MyString&& other) noexcept   // 移动构造
        : data_(other.data_) { other.data_ = nullptr; }
};
```

**完美转发**：模板中用 `T&&` + `std::forward<T>` 保持参数的值类别原样传递。

```cpp
template<class T>
void wrapper(T&& arg) { foo(std::forward<T>(arg)); }
```

**加分点：** 移动后源对象处于「有效但未指定」状态，只能安全析构或重新赋值；移动构造/赋值应声明 `noexcept`（否则标准容器扩容时可能退化为拷贝）。
