---
title: "项目怎么部署 + 硬件环境"
category: ad-machine
difficulty: medium
order: 18
---

## 参考答案

- 部署：**交叉编译**（ARM 工具链）→ 二进制 + 配置 + HTML 拷到板子 → **systemd 开机自启**拉起四进程。
- 硬件：ARM 架构**嵌入式 Linux** 设备。（具体芯片型号按实际补）
