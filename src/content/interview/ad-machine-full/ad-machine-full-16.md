---
title: "项目怎么部署的？代码如何跑到开发板？"
category: ad-machine-full
difficulty: hard
order: 16
---

## 参考答案

- **交叉编译**：在 PC 上用 ARM 交叉工具链（如 arm-linux-gnueabihf-gcc）编译出 ARM 架构二进制。
- 部署：把四个进程二进制 + 依赖库 + 配置文件 + HTML 页面拷贝到板子（scp / U盘 / NFS）。
- 开机自启：用 **systemd 服务**（或 init.d 脚本）拉起四个进程，崩溃自动重启。
- 安装脚本 install.sh / 升级脚本 update.sh 完成落盘。
