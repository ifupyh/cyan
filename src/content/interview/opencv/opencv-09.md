---
title: "灰度化"
category: opencv
difficulty: easy
order: 9
---

## 参考答案

**结论：** 把彩色多通道图像转成单通道亮度图，丢掉颜色只保留明暗，数据量降为 1/3。

- 目的：简化计算、很多算法只支持单通道、排除颜色干扰聚焦结构。
- 实现：`cvtColor(src, dst, COLOR_BGR2GRAY)`（加权公式 Gray = 0.299R + 0.587G + 0.114B）。
