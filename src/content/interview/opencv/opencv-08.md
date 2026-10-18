---
title: "颜色空间转换"
category: opencv
difficulty: easy
order: 8
---

## 参考答案

用 `cv::cvtColor(src, dst, COLOR_BGR2GRAY / COLOR_BGR2HSV)`。常见：BGR↔灰度、BGR↔HSV（HSV 对光照变化更鲁棒，适合颜色分割）。
