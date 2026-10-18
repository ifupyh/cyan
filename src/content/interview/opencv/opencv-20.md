---
title: "OpenCV 如何操作视频"
category: opencv
difficulty: easy
order: 20
---

## 参考答案

```cpp
cv::VideoCapture cap(0);            // 0 摄像头，或文件路径
Mat frame;
while (cap.read(frame)) { /* 处理 frame */ }
cv::VideoWriter writer("out.avi", fourcc, fps, size);
writer.write(frame);
```

`cap.get(CAP_PROP_FPS/FRAME_COUNT)` 取属性。
