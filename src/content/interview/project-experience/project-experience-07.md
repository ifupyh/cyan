---
title: "项目中如何进行代码Review？有什么规范？"
category: project-experience
difficulty: easy
order: 7
---

## 参考答案

项目中**代码Review的实践**：

流程：

- 提交Pull/Merge Request
- 至少一人Review后才能合入
- 使用GitLab/GitHub的Review功能逐行评论

审查内容：

- **功能正确性**：逻辑是否正确
- **边界条件**：错误处理、空指针检查
- **资源管理**：内存释放、锁的配对
- **编码规范**：命名、注释、格式
- **性能**：是否有不必要的开销
- **安全**：缓冲区溢出、整数溢出

规范：参照MISRA C(汽车行业)、CERT C(安全)等标准。
