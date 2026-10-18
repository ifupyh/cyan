---
title: "有没有自己写过异常类"
category: cpp
difficulty: medium
order: 11
---

## 参考答案

**结论：** 有，继承 `std::exception`，重写 `what()`。

```cpp
#include <exception>
#include <string>
class MyException : public std::exception {
    std::string msg_;
public:
    explicit MyException(const std::string& msg) : msg_(msg) {}
    const char* what() const noexcept override { return msg_.c_str(); }
};
// 使用：
// throw MyException("invalid config");
// catch (const std::exception& e) { e.what(); }
```
