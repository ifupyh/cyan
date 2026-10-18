---
title: "string 和 C 风格字符串相互转换"
category: cpp
difficulty: easy
order: 52
---

## 参考答案

```cpp
std::string s = "hello";
const char* c = s.c_str();      // string → const char*
std::string s2(c);              // const char* → string
// 需要可写缓冲时：
char buf[32];
strcpy(buf, s.c_str());         // 拷到 char[]
```
