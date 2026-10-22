---
title: "项目怎么构建的？"
category: ad-machine-full
difficulty: medium
order: 14
---

## 参考答案

- **CMake** 组织多模块：顶层 CMakeLists 用 `add_subdirectory` 引入各进程子项目；公共库 `ads_common` 编译成静态库 `libads_common.a`，各进程 link。
- 依赖查找：CMake 自带 `FindCURL`；cJSON 用 pkg-config / 手动指定路径；Paho MQTT C 手动链接；pthread 用 `find_package(Threads)`。
- 交叉编译生成各进程可执行文件，输出到统一 bin 目录。
