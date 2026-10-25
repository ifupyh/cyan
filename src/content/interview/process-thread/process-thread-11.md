---
title: "孤儿进程、僵尸进程、守护进程分别是什么？"
category: process-thread
difficulty: easy
order: 11
---

## 参考答案

三种特殊进程：

- **孤儿进程**：父进程先于子进程退出，子进程变成孤儿，被 **init（PID=1）进程收养**，由 init 负责回收。**无害**
- **僵尸进程**：子进程退出后，父进程没有调用 `wait()/waitpid()` 回收其退出状态。子进程的 `task_struct` 还残留在内核中，状态为 **Z（Zombie）**。**有害**（占用 PID 和内核资源）
- **守护进程（Daemon）**：在后台运行的服务进程，与终端脱离关联。如 `sshd`、`crond`。通常通过两次 `fork()` + `setsid()` 创建

面试重点：僵尸进程的危害和处理方法（`wait()`/`SIGCHLD` 信号处理）
