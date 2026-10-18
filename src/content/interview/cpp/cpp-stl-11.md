---
title: "map、set 是怎么实现的，为什么用红黑树"
category: cpp
difficulty: medium
order: 53
---

## 参考答案

**结论：** 标准库的 `map`/`set` 基于**红黑树**实现，保证查找、插入、删除都是 **O(log n)**，且中序遍历有序。

- map 存 key-value（按 key 排序），set 只存 key。
- 红黑树能同时实现两者，是因为它对「有序 + 动态增删 + 平衡」提供了稳定 O(log n) 保证。
- 选红黑树而非 AVL：增删频繁时红黑树调整代价更低（最多 3 次旋转）。
- 若只需哈希无序，用 `unordered_map/unordered_set`（哈希表，平均 O(1)）。
