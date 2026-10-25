---
title: "什么是条件变量？在生产者-消费者模型中的应用？"
category: thread-safety
difficulty: medium
order: 18
---

## 参考答案

**条件变量**用于线程间的**等待-通知**机制。

在生产者-消费者模型中：

- 消费者：buffer为空时`pthread_cond_wait()`等待
- 生产者：往buffer放数据后`pthread_cond_signal()`通知消费者

使用要点：

- 必须配合mutex使用(保护共享条件)
- wait前要在while循环中检查条件(**防止虚假唤醒**)
- signal唤醒一个等待线程，broadcast唤醒所有

```
pthread_mutex_lock(&mutex);
while (buffer_empty)
    pthread_cond_wait(&cond, &mutex);
// 消费数据
pthread_mutex_unlock(&mutex);
```
