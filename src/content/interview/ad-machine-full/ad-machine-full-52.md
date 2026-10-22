---
title: "如何校验下载的文件是否完整？"
category: ad-machine-full
difficulty: hard
order: 52
---

## 参考答案

- 后端下发播放列表时带 **sign（对素材内容算的 sha256）**；
- 设备下载时**分块读**文件喂给 sha256 算法（避免大文件一次性读进内存），算完和 sign 比对；
- 一致 → 写库、标记 is_downloaded；不一致 → 重下或丢弃。
