---
title: "为什么订阅要放在 stateChanged 里，而不是构造函数里？"
category: ad-machine-full
difficulty: hard
order: 58
---

## 参考答案

- `connectToHost()` 是**异步**的，构造函数里连接还没建立，立刻 `subscribe` 会失败。
- 必须等 `stateChanged` 变成 `Connected` 后再订阅。
- 更重要：**重连后 stateChanged 会再次触发**，把订阅放这里能自动重新订阅，避免"在线但收不到消息"。
