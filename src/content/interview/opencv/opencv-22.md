---
title: "人脸检测与识别"
category: opencv
difficulty: medium
order: 22
---

## 参考答案

- **检测**：Haar 级联分类器 `CascadeClassifier::detectMultiScale`（传统、快），或 DNN（更准）。
- **识别**：检测到人脸后，用 LBPH/Eigenfaces/Fisherfaces 或深度学习模型（FaceNet 等）提取特征与库比对。

## 深度学习（简述）
