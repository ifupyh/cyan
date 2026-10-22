---
title: "为什么收到消息用 lambda 直接写，不单独开槽函数？"
category: ad-machine-full
difficulty: hard
order: 43
---

## 参考答案

- 订阅消息处理逻辑简单（解析+分发），**lambda 就地书写更简洁**，避免为每个处理在类里声明额外槽函数。
- 注意：lambda 里捕获 this 要保证对象存活；复杂逻辑才抽槽函数。
