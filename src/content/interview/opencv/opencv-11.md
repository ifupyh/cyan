---
title: "常见噪声及处理"
category: opencv
difficulty: easy
order: 11
---

## 参考答案

- **高斯噪声**：像素值服从正态分布扰动，像蒙一层雾 → 用**高斯滤波** `GaussianBlur`。
- **椒盐噪声**：随机黑白点 → 用**中值滤波** `medianBlur`（能去孤立点又保边缘）。
