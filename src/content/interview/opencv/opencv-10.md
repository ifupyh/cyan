---
title: "二值化及类型"
category: opencv
difficulty: medium
order: 10
---

## 参考答案

**结论：** 把灰度图按阈值分成只有 0/255 两值的黑白图，用于分割前景。

```cpp
cv::threshold(gray, dst, 127, 255, THRESH_BINARY);   // 全局固定阈值
cv::adaptiveThreshold(...);                          // 自适应阈值（光照不均）
cv::threshold(gray, dst, 0, 255, THRESH_OTSU);       // OTSU 自动算阈值
```

类型：`THRESH_BINARY`、`THRESH_BINARY_INV`、`THRESH_TRUNC`、`THRESH_TOZERO` 等。
