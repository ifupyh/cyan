---
title: "Linux中查看CPU信息、内存使用、磁盘存储的命令分别是什么？"
category: linux-shell
difficulty: easy
order: 1
---

## 参考答案

**查看CPU信息**：

- `cat /proc/cpuinfo`：查看CPU型号、核心数、频率等详细信息
- `lscpu`：更简洁的CPU概要
- `top` / `htop`：实时查看CPU使用率

**查看内存使用**：

- `free -h`：以人类可读格式显示内存使用情况
- `cat /proc/meminfo`：更详细的内存信息

**查看磁盘存储**：

- `df -h`：查看各文件系统的磁盘使用率和剩余空间
- `du -sh *`：查看当前目录下各文件/文件夹的大小
- `lsblk`：查看块设备（硬盘、分区）信息

面试时说这几个常用的就够了，记住 `-h` 选项是 human-readable。
