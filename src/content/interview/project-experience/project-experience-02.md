---
title: "你在项目中是如何保证代码质量的？"
category: project-experience
difficulty: easy
order: 2
---

## 参考答案

保证**代码质量**的方法：

- **编码规范**：统一代码风格(MISRA C/Google Style)，用clang-format自动格式化
- **代码Review**：每次提交至少一人审查
- **静态分析**：cppcheck/Coverity自动扫描
- **单元测试**：关键模块写测试用例(Unity/GTest)
- **CI/CD**：提交自动编译+测试+分析
- **运行时检测**：开发阶段开ASan/UBSan
- **文档**：关键接口和设计决策有文档

实践经验：**自动化越多越好，人工检查是补充而不是主力**。
