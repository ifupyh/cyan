---
title: "图像平滑（滤波）"
category: opencv
difficulty: medium
order: 12
---

## 参考答案

**结论：** 平滑=降噪、去高频细节。常见方法：

| 方法 | 函数 | 特点 |
|------|------|------|
| 均值滤波 | `blur` | 邻域平均，会模糊边缘 |
| 高斯滤波 | `GaussianBlur` | 加权平均，对高斯噪声好 |
| 中值滤波 | `medianBlur` | 去椒盐噪声，保边缘 |
| 双边滤波 | `bilateralFilter` | 保边去噪，慢 |
