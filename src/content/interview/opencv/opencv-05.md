---
title: "通道和数据类型"
category: opencv
difficulty: medium
order: 5
---

## 参考答案

- **通道**：每像素含几个独立分量。单通道=灰度（0~255）；三通道=BGR（OpenCV 默认颜色顺序，不是 RGB）。
- **数据类型**（`CV_<depth>C<channels>`）：
  - `CV_8U`（8 位无符号，0~255，最常用图像类型）
  - `CV_32F`（32 位浮点，算法中间结果）
  - `CV_16U`（16 位无符号，深度图/医学图）
  - `CV_64F`（64 位双精度，高精度计算）
