---
title: "vector 如何实现（合并 6 扩容、7 迭代器变化）"
category: cpp
difficulty: medium
order: 49
---

## 参考答案

**结论：** vector 底层是**连续动态数组**，用三个指针（或指针+size）管理：首地址、已用末尾、容量末尾。

- **扩容**：当 `size == capacity` 时，分配一块更大内存（**常见 1.5 倍或 2 倍**：GCC 是 2 倍，MSVC 是 1.5 倍），把旧元素拷贝/移动到新空间，释放旧空间。因此**扩容后所有迭代器、指针、引用失效**。
- **增删**：`push_back` 尾部追加；中间 `insert` 要把后面元素整体后移；`erase` 返回**被删元素之后**元素的迭代器，且被删之后元素前移，其后迭代器失效。
- **不释放内存**：`erase`/`clear` 只改 size 不释放 capacity，释放内存在析构或用 `shrink_to_fit`（或 swap 空 vector 技巧）。

```cpp
for (auto it = v.begin(); it != v.end(); )
    if (should_remove(*it)) it = v.erase(it);   // 用返回值，防失效
    else ++it;
```
