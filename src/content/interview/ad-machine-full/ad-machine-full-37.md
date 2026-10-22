---
title: "libcurl 写回调的返回值有什么讲究？"
category: ad-machine-full
difficulty: hard
order: 37
---

## 参考答案

- 设置 `CURLOPT_WRITEFUNCTION` 时，回调**必须返回实际处理的字节数（= size*nmemb）**。
- 返回不一致 curl 会认为写入失败，**中止本次传输并报错**。这是 curl 的硬性约定。

---

## 六、QT 播放进程（本项目核心）
