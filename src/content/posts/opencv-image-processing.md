---
title: "OpenCV 图像处理实战：画框、二值化、滤波与视频流"
published: 2026-10-27
description: "把 OpenCV 第二讲的高频操作串成一条可上手的线：几何绘制、灰度与二值化、归一化、噪声与滤波、视频读写。每个都给出关键函数、必要原理，以及真正会踩的坑。"
image: ""
tags: [OpenCV, 图像处理, 计算机视觉]
category: 技术
draft: false
---

假定你已经会用 `imread` 读图、`imshow` 显示、`Mat` 存图。这篇不再重复这些，只讲真正会反复用到的六件事：在图上画框、把图变成黑白、把像素拉到统一尺度、造噪声再滤掉、读写视频和摄像头。

每节给的是关键函数和最小调用，原理只讲到"能判断什么时候该用哪个"为止。再深的部分，查文档比读文章快。

## 一、在图上画东西

检测框、ROI 标注、调试可视化，都从这里开始。五种基本形状，本质都是"把点连成像素"：

| 形状 | 函数 | 关键参数 |
|------|------|---------|
| 矩形 | `rectangle(img, pt1, pt2, color, thickness)` | 两个对角点，或 `Rect(x, y, w, h)` |
| 圆 | `circle(img, center, radius, color, thickness)` | — |
| 线 | `line(img, pt1, pt2, color, thickness)` | — |
| 椭圆 | `ellipse(img, center, axes, angle, startAngle, endAngle, ...)` | 旋转角 + 起止角（0~360 为全椭圆） |
| 多边形 | `polylines(img, pts, isClosed, color, thickness)` | 点集，`isClosed` 决定是否闭合 |

```cpp
rectangle(img, Point(200, 50), Point(350, 250), Scalar(0, 0, 255), 2, LINE_AA);
rectangle(img, Rect(200, 50, 150, 200), Scalar(0, 255, 0), -1);   // -1 = 填充
circle(img, Point(320, 240), 80, Scalar(255, 0, 0), 2);
line(img, Point(0, 0), Point(640, 480), Scalar(0, 255, 255), 1);
ellipse(img, Point(320, 240), Size(120, 60), 30, 0, 360, Scalar(255, 0, 255), 2);
polylines(img, pts, true, Scalar(0, 255, 0), 2);
```

三个参数值得记住：

- **`thickness = -1`** 表示填充，不是"画一条很粗的线"。
- **`Scalar` 是 BGR 顺序**，`Scalar(0, 0, 255)` 是红色，不是蓝色。
- **`LINE_AA`** 开抗锯齿，边缘平滑但慢；`LINE_8` 默认，8 连通，可能拉出毛刺；`LINE_4` 更细更快，锯齿也更明显。

![LINE_8、LINE_4、LINE_AA 三种线条类型对比](/assets/images/posts/opencv-image-processing/line-types.webp)

### 半透明叠加

想高亮某个区域，标准做法是先画一张同尺寸的纯色图层，再按权重混合：

```cpp
Mat layer = Mat::zeros(src.size(), src.type());
rectangle(layer, Rect(200, 50, 150, 200), Scalar(0, 0, 255), -1);
addWeighted(src, 0.7, layer, 0.3, 0, dst);
```

公式是 `dst = α·src1 + β·src2 + γ`，α + β 等于 1 时就是纯粹的权重混合。**最后一个 `γ` 要写 0**——很多人从示例里抄成 1，效果是每个像素整体加 1，演示看不出来，做成产品就是"叠加层永远比原图亮一点"的 bug。

![矩形半透明叠加效果](/assets/images/posts/opencv-image-processing/overlay.webp)

### 原理：光栅化

这些函数干的事，是把连续的几何图形烧进离散的像素网格。画线段用 Bresenham：x 每步进 1，用整数误差项决定 y 要不要跟着走，全程只有加减和比较，没有浮点除法，所以快。

`LINE_AA` 则是按覆盖率混合：一条斜线只盖住某个像素的 30% 面积，那就用 30% 的线条颜色加 70% 的原像素，而不是非黑即白。

## 二、灰度与二值化

灰度化是降维：三通道变一通道，后续所有阈值、边缘、轮廓都基于它。

```cpp
Mat gray;
cvtColor(src, gray, COLOR_BGR2GRAY);
```

它内部算的是加权和：

```
Y = 0.299·R + 0.587·G + 0.114·B
```

系数不是随便定的，来自人眼对三个波段的敏感度。所以直接把 RGB 加起来除以 3 得到的"灰度图"会发闷——绿色贡献接近六成，平均却只给了三分之一。

![彩色图与灰度图对比](/assets/images/posts/opencv-image-processing/grayscale.webp)

### 阈值：五种模式其实只是五个分段函数

| 模式 | 条件 | 输出 |
|------|------|------|
| `THRESH_BINARY` | src > thresh | maxval，否则 0 |
| `THRESH_BINARY_INV` | src > thresh | 0，否则 maxval |
| `THRESH_TRUNC` | src > thresh | thresh，否则 src |
| `THRESH_TOZERO` | src > thresh | src，否则 0 |
| `THRESH_TOZERO_INV` | src > thresh | 0，否则 src |

看表能得出两个结论：`maxval` 只在带 BINARY 的两种模式里生效；TRUNC 和 TOZERO 输出的是截断后的原值，图不再是黑白两色——它们是对比度工具，不是分割工具。

```cpp
Mat bin;
threshold(gray, bin, 128, 255, THRESH_BINARY);              // 固定阈值
threshold(gray, bin, 0, 255, THRESH_BINARY | THRESH_OTSU);  // 自动阈值
adaptiveThreshold(gray, bin, 255, ADAPTIVE_THRESH_GAUSSIAN_C,
                  THRESH_BINARY, 11, 2);                     // 局部阈值
```

![OpenCV 五种阈值模式对比](/assets/images/posts/opencv-image-processing/threshold-modes.webp)

### 阈值怎么定

**固定阈值**最省事，但它假设光照均匀、目标和背景分得开。写 128 只在特定图上成立。

**Otsu** 给出可计算的答案：遍历 0~255 每个候选阈值，把像素分成两类，取类间方差最大的那个。

```
σ_b²(t) = ω₀(t)·ω₁(t)·(μ₀(t) − μ₁(t))²
```

ω 是两类占比，μ 是两类均值。它只依赖灰度直方图，256 次遍历，几乎不增加耗时。**失效条件很清楚**：直方图不是双峰（大面积渐变背景），或者两类面积悬殊（前景只占 1%），大类内部的波动会盖过类间差异。

**自适应阈值**换了个思路：不用全局一个值，而是逐像素用邻域均值（或高斯加权均值）减去常数 C 作为局部阈值。上面那行里 `11` 是邻域大小（必须是大于 1 的奇数），`2` 就是 C。光照不均时，全局阈值会把暗处整片判成背景，局部阈值能跟着亮度起伏走。

![固定阈值、Otsu 与自适应阈值对比](/assets/images/posts/opencv-image-processing/threshold-strategies.webp)

## 三、归一化

把像素值从 0~255 映射到统一尺度，是几乎所有深度学习预处理的第一步。

**min-max 归一化**是线性拉伸：

```cpp
Mat dst;
normalize(src, dst, 0.0, 1.0, NORM_MINMAX, CV_32F);
```

它把 [最小值, 最大值] 线性映射到 [0, 1]，保序，不改变像素之间的大小关系。

**Z-Score 标准化**则把分布搬到均值 0、标准差 1：

```cpp
Mat f;
src.convertTo(f, CV_32F, 1.0 / 255.0);

Scalar mean, stddev;
meanStdDev(f, mean, stddev);
f = (f - mean[0]) / stddev[0];
```

为什么要做这件事？因为输入尺度直接决定梯度的条件数。像素还是 0~255 时，第一层的权重更新会被放大两个数量级，学习率稍大就发散；映射到 0~1 后各维尺度一致，收敛才稳。

### uint8 上的两个陷阱

第一个是**回绕**。`uint8` 的算术是模 256 的：

```cpp
img.at<uchar>(i, j) = value + 50;        // 手动赋值：250 + 50 = 44
Mat dst = img + Scalar(50, 50, 50);      // 矩阵表达式：250 + 50 = 255
```

前者是 C++ 的窄化转换，直接截断；后者内部调 `saturate_cast`，超出范围就夹到边界。同一个"加 50"，结果完全不同。

第二个是**`convertTo` 的 α 和 β**：

```cpp
img.convertTo(dst, CV_32F, 1.0 / 255.0);   // dst = src * α + β
```

第三个参数是 α，第四个是 β。所以归一化到 0~1 只需要 `α = 1/255`；反过来从浮点回到 8 位，`convertTo(dst, CV_8U, 255.0)` 会自动饱和。理解了这一点，就不会困惑"为什么归一化后的图还能正常显示"——`imshow` 遇到 0~1 的浮点图会自动乘 255，它是在帮你做逆变换。

## 四、噪声与滤波

滤波的选型依据，是噪声的类型。先手动造两种最常见的噪声，再看它们各自该被谁收拾。

### 椒盐噪声

随机把一部分像素打成纯黑或纯白：

```cpp
void addSaltPepper(Mat& img, double ratio = 0.05) {
    int n = (int)(img.total() * ratio);
    for (int i = 0; i < n; ++i) {
        int x = rand() % img.cols;
        int y = rand() % img.rows;
        img.at<uchar>(y, x) = (rand() % 2) ? 255 : 0;
    }
}
```

![椒盐噪声前后对比](/assets/images/posts/opencv-image-processing/salt-pepper.webp)

### 高斯噪声

每个像素加上一个服从正态分布的随机值：

```cpp
Mat noise(src.size(), CV_32FC1);
randn(noise, 0, 25);          // 均值 0，标准差 25（8 位尺度）

Mat f;
src.convertTo(f, CV_32FC1);
f += noise;                   // 浮点加法，不会回绕
f.convertTo(src, CV_8UC1);    // 回到 8 位，自动饱和
```

这段只适用于单通道图。彩色图先 `split` 成三个通道分别加噪，再 `merge` 回去。

![高斯噪声加噪前后对比](/assets/images/posts/opencv-image-processing/gaussian-noise.webp)

### 三种滤波的关键调用

```cpp
blur(src, dst, Size(3, 3));                 // 均值：邻域算术平均
GaussianBlur(src, dst, Size(5, 5), 0);      // 高斯：sigma=0 由 ksize 反推
medianBlur(src, dst, 3);                    // 中值：邻域排序取中间值
```

![原图与均值、高斯、中值滤波效果对比](/assets/images/posts/opencv-image-processing/filter-compare.webp)

| 方法 | 优点 | 缺点 | 适用 |
|------|------|------|------|
| 均值滤波 | 快 | 边缘一起糊掉 | 简单降噪、实时性优先 |
| 高斯滤波 | 边缘保留较好，符合"越近越像"的先验 | 对椒盐无效 | 高斯噪声、边缘检测前预处理 |
| 中值滤波 | 灭椒盐几乎完美 | 排序耗时，对高斯噪声一般 | 椒盐噪声、扫描件 |

### 为什么中值能灭椒盐，均值不能

均值是求和，一个 255 的坏点会把整个窗口的平均值拉高；中值是排序取中间，一个坏点排在队尾，根本轮不到它。

更准确的说法是**崩溃点**：中值滤波要等到窗口里超过 50% 的像素被污染才会失效，而均值的崩溃点是 0——一个坏点就够。椒盐通常只污染百分之几的像素，所以中值几乎是完美解。

代价是复杂度：朴素实现要排序，O(k² log k)；实际实现用直方图增量更新，窗口滑动时只增删一行一列，单像素降到 O(k)，这才是 `medianBlur` 在 3×3、5×5 上够快的原因。

顺带解释为什么大核高斯也敢用：二维高斯的指数是 `x² + y²`，可以拆成两个一维核的乘积。直接卷积每个像素要 k² 次乘加，拆开先横后竖只要 2k 次——5×5 是 25 比 10，15×15 是 225 比 30。这就是 `GaussianBlur` 比同尺寸的 `filter2D` 快得多的原因。

## 五、视频读写

视频是一串按时间排列的帧。读视频、读摄像头、写视频，三件事共用一套 `VideoCapture` / `VideoWriter`。

### 逐帧读文件

```cpp
VideoCapture cap("cat.mp4");
if (!cap.isOpened()) return -1;

double fps = cap.get(CAP_PROP_FPS);
Mat frame;
while (cap.read(frame) && !frame.empty()) {
    // 这里处理 frame
    imshow("video", frame);
    if (waitKey(1000 / (fps > 0 ? fps : 30)) == 27) break;   // Esc 退出
}
cap.release();
```

常用的几个属性：

| 属性 | 含义 | 注意 |
|------|------|------|
| `CAP_PROP_FRAME_WIDTH` / `HEIGHT` | 帧尺寸 | `double` |
| `CAP_PROP_FPS` | 帧率 | **部分摄像头流返回 0** |
| `CAP_PROP_FRAME_COUNT` | 总帧数 | 摄像头流通常为 0 |
| `CAP_PROP_POS_FRAMES` | 当前帧索引 | 可用于定位/跳帧 |

### `waitKey` 不是 sleep

这是整节最容易被误解的一行。`waitKey(33)` 的语义是"**最多等 33 毫秒，期间处理窗口消息，有按键就立刻返回**"，不是"睡 33 毫秒"。

所以实际帧间隔是：

```
实际帧间隔 ≈ 单帧处理耗时 + waitKey 的等待
```

如果处理一帧要 50ms，再 `waitKey(33)`，实际帧率只有约 12fps，不是 30。实时系统里最重要的账就是这个**帧预算**：30fps 对应 33ms，60fps 对应 16ms。超了预算，就不是实时处理，而是慢放。

超预算只有三种降级方式：降分辨率（像素数按平方下降，最有效）、跳帧（隔一帧处理一次）、只处理 ROI。没有第四种。

### 摄像头实时捕获

```cpp
VideoCapture cap(0);                     // 0 = 默认摄像头
cap.set(CAP_PROP_FRAME_WIDTH, 640);
cap.set(CAP_PROP_FRAME_HEIGHT, 480);
cap.set(CAP_PROP_BUFFERSIZE, 1);         // 只保留最新一帧

Mat frame;
while (cap.read(frame) && !frame.empty()) {
    // 处理 frame
    imshow("camera", frame);
    if (waitKey(30) == 27) break;
}
```

`CAP_PROP_BUFFERSIZE = 1` 是交互场景的关键一行。默认情况下 `VideoCapture` 内部有缓冲队列，你读到的帧可能比摄像头当前画面晚几百毫秒。注意这个属性依赖后端实现，不是所有平台都生效。

### 保存视频

```cpp
VideoWriter writer("out.avi",
                   VideoWriter::fourcc('M', 'J', 'P', 'G'),
                   fps, Size(width, height), true);   // true = 彩色

if (!writer.isOpened()) return -1;

while (cap.read(frame)) {
    writer.write(frame);
}
writer.release();
```

**FourCC 决定压缩方式**，而压缩方式决定了文件大小和可编辑性：

| 编码 | 容器 | 特点 |
|------|------|------|
| `MJPG` | .avi | 每帧独立 JPEG（全 I 帧），文件大，任意帧可直接解码 |
| `XVID` | .avi | 帧间压缩，体积小一些，兼容性好 |
| `H264` | .mp4 | 帧间预测，体积小一个数量级，但 OpenCV 默认不带编码器，要额外装 OpenH264 |

H.264 只存 I 帧和后续帧的差异，所以解码必须从最近的关键帧开始，延迟更高。这也是"用 OpenCV 存 mp4 经常没反应"的原因。

### 视频链路的坑：它会静默失败

OpenCV 在图像 API 上很少出问题，在视频链路上却倾向于**静默失败**：

- `VideoWriter::isOpened()` 可能是 true，但编码器实际不可用，最后写出一堆坏帧——判断标准只有一个：写完播一下。
- `isColor` 写错不报错，产出的文件打不开或全灰。摄像头采的是彩色就必须写 `true`。
- `fps` 拿到 0 直接当除数会得到 `inf`，正确写法是 `fps > 0 ? 1000.0 / fps : 30`。
- `waitKey(1000 / fps)` 里的 `1000 / fps` 是浮点除，传进 `waitKey` 会被截断成整数，30fps 得到 33，够用。

## 六、速查表

把这些操作按"要干什么"归一次类，比背 API 有用：

| 任务 | 关键函数 | 主要代价 |
|------|---------|---------|
| 标注 / 可视化 | `rectangle` / `circle` / `polylines` + `addWeighted` | 可忽略 |
| 降维 | `cvtColor(…, COLOR_BGR2GRAY)` | O(N) |
| 分割 | `threshold` / `adaptiveThreshold` / `THRESH_OTSU` | O(N)，Otsu 多 256 次 |
| 尺度统一 | `normalize` / `convertTo` / `meanStdDev` | O(N) |
| 去噪 | `blur` / `GaussianBlur` / `medianBlur` / `bilateralFilter` | O(N·k²)，中值多一个 log |
| 视频读取 | `VideoCapture` + `waitKey` | 受帧预算约束 |
| 视频保存 | `VideoWriter` + FourCC | 受编码器支持约束 |

选型的判断标准只有两条：**这个算子假设了什么？我的数据满足吗？** 椒盐噪声是脉冲，不满足"邻域同分布"的假设，所以用中值而不是均值；光照不均不满足"全局一个阈值"的假设，所以用自适应而不是固定阈值。不满足就换算子，而不是调参数硬凑。

再往下走，边缘检测是"求导 + 非极大值抑制 + 双阈值"的组合，轮廓是二值图上的连通性分析，形态学是结构元做集合运算——它们拆开看，都还是这几类基本操作。
