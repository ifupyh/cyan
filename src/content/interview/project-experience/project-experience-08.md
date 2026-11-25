---
title: "项目中如何进行版本管理和发布流程？"
category: project-experience
difficulty: medium
order: 8
---

## 参考答案

项目中**版本管理和发布流程**：

**版本管理**：

- Git分支策略：main(稳定) + develop(开发) + feature分支
- 版本号：语义化版本(Major.Minor.Patch)
- 固件版本编译时嵌入(编译时间+Git hash)

**发布流程**：

- 代码冻结 → 创建release分支
- 集成测试 → 修复bug
- 打Tag → 编译正式固件
- 签名 → 灰度发布(部分设备先升级)
- 全量推送OTA

嵌入式特殊点：**固件二进制要归档、硬件版本和固件版本要匹配**。
