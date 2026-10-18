---
title: "OpenCV 性能优化方法"
category: opencv
difficulty: medium
order: 25
---

## 参考答案

1. 用合适的数据类型（`CV_8U` 代替 `CV_32F` 省内存）。
2. 多线程并行（`parallel_for_`）、SIMD 向量化。
3. 用 `UMat` 走 OpenCL/GPU 加速。
4. 图像金字塔降分辨率先粗后精；只处理 ROI。
5. 复用内存缓冲减少分配；用快速算法（FFT 代卷积）。
6. 减少 I/O，尽量内存内处理。
