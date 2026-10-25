---
title: "Linux 中打开或查看文件的常用命令有哪些？"
category: linux-shell
difficulty: easy
order: 8
---

## 参考答案

Linux 中打开或查看文件的常用命令：

- `cat file`：输出文件全部内容
- `less file` / `more file`：分页查看
- `head -n 20 file`：查看前 20 行
- `tail -n 20 file`：查看后 20 行；`tail -f` 实时追踪
- `vi` / `vim`：编辑器打开
- `nano`：轻量编辑器
- `grep pattern file`：搜索匹配行

查看文件信息：`ls -l`、`file filename`（查看文件类型）、`stat filename`（详细元信息）。
