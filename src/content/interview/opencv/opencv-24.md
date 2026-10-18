---
title: "深度学习实现步骤与 OpenCV 中分类/检测"
category: opencv
difficulty: medium
order: 24
---

## 参考答案

**通用流程**：数据收集 → 预处理 → 选模型架构 → 训练 → 评估调优 → 测试 → 部署。

**OpenCV 里用 DNN 模块**：`cv::dnn::readNetFromXXX` 加载模型 → 输入预处理（resize、归一化、通道转换）→ `net.forward()` 前向推理 → 解析输出（分类得类别，检测得类别+置信度+边界框）。

## 其他
