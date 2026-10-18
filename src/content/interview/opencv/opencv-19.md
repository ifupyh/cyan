---
title: "模板匹配"
category: opencv
difficulty: medium
order: 19
---

## 参考答案

**结论：** 用一个小模板图在源图里滑动，逐位置算相似度，找最匹配区域。

- `cv::matchTemplate(src, tmpl, result, TM_CCOEFF_NORMED)` 得到响应图，`minMaxLoc` 找极值定位。
- 缺点：对尺度、旋转、光照敏感，只适合平移匹配。

## 视频处理
