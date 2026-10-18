---
title: "map 的插入方式"
category: cpp
difficulty: easy
order: 54
---

## 参考答案

```cpp
m.insert(std::pair<int,std::string>(1, "a"));   // 1. pair
m.insert(std::map<int,std::string>::value_type(2, "b")); // 2. value_type
m.insert(std::make_pair(3, "c"));               // 3. make_pair（推荐）
m[4] = "d";                                     // 4. 下标：key 不存在则插入，存在则覆盖 value
```

**加分点：** `insert` 对已存在的 key **不覆盖**（返回 pair<iterator,bool>，second 为 false）；`[]` 会覆盖。`m[k]` 若 k 不存在会先插入默认值。
