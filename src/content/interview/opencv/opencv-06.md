---
title: "cv::Mat 的作用及常用方法"
category: opencv
difficulty: medium
order: 6
---

## 参考答案

**结论：** `cv::Mat` 是 OpenCV 核心的多维矩阵类，用来存图像数据，**引用计数自动管理内存**（浅拷贝共享数据，copyTo/clone 才深拷贝）。

- 创建：`Mat(rows,cols,type)`、`Mat::zeros/ones`。
- 访问：`at<T>(r,c)`（慢、安全）、`ptr<T>(r)`（快、按行）。
- 属性：`rows`、`cols`、`channels()`、`type()`。
- 操作：`clone()`（深拷贝）、`copyTo()`、`reshape()`、`t()`（转置）、`rowRange()/colRange()`（ROI）、`convertTo()`（类型转换）。
