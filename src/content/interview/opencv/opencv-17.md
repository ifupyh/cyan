---
title: "轮廓检测与轮廓近似"
category: opencv
difficulty: medium
order: 17
---

## 参考答案

**结论：** 轮廓是物体边界的连续点集合，用于形状分析、目标识别。

```cpp
cv::findContours(binary, contours, hierarchy, RETR_EXTERNAL, CHAIN_APPROX_SIMPLE);
cv::drawContours(img, contours, i, Scalar(0,255,0), 2);
```

流程：读图 → 灰度化 → 二值化 → findContours → drawContours。

- **轮廓近似** `approxPolyDP`：用 Douglas-Peucker 算法减少轮廓点数，保持形状特征。
- **最小外接**：`boundingRect`（正矩形）、`minAreaRect`（旋转矩形）、`minEnclosingCircle`（最小外接圆）。
