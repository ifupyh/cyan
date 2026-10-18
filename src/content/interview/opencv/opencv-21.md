---
title: "视频追踪与 MeanShift / CamShift"
category: opencv
difficulty: hard
order: 21
---

## 参考答案

**结论：** 视频追踪是在连续帧中持续定位目标。经典颜色跟踪算法：

- **MeanShift（均值漂移）**：以目标颜色直方图为模型，用反向投影得到概率图，迭代地把搜索窗移到质心直到收敛。**窗口大小固定**。
- **CamShift**：MeanShift 的改进，用图像矩**自适应调整窗口大小和方向**，适应目标尺度变化。
