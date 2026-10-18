---
title: "常用基础类（Scalar / Point / Size / Rect / RotatedRect）"
category: opencv
difficulty: easy
order: 7
---

## 参考答案

- `cv::Scalar`：多通道像素值（最多 4 个 double），如 `Scalar(255,0,0)` 表示蓝色。
- `cv::Point`：二维点 `(x, y)`。
- `cv::Size`：尺寸 `(width, height)`。
- `cv::Rect`：矩形（左上角 x,y + 宽高），定义 ROI 或目标框。
- `cv::RotatedRect`：带旋转角的矩形，用于描述倾斜的目标边界框。

## 图像处理
