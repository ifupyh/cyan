---
title: "epoll、select、poll的区别和性能比较"
category: network
difficulty: hard
order: 12
---

## 参考答案

三种IO多路复用机制：

- **select**：fd数量受限(默认1024)，每次拷贝fd集合，O(n)遍历
- **poll**：无fd数量限制(用链表)，但仍O(n)遍历
- **epoll**：Linux专有，性能最好
  - 红黑树管理fd，增删O(logN)
  - 就绪通知用回调，只返回就绪的fd
  - 支持ET(边沿触发)和LT(水平触发)

性能：连接数少差距不大，**连接数多时epoll碾压**。
