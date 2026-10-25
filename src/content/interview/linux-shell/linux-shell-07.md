---
title: "Linux 中如何查找指定文件？常用命令与排障思路是什么？"
category: linux-shell
difficulty: easy
order: 7
---

## 参考答案

Linux 查找文件常用命令：

- `find`

  ：最强大，支持按名称、类型、大小、时间等条件搜索

  - `find / -name "*.conf"` 按名搜
  - `find /tmp -type f -mtime -1` 最近1天修改的文件

- **`locate`**：基于数据库的快速搜索，先 `updatedb` 更新索引

- **`which / whereis`**：查找可执行文件的路径

- **`grep -r`**：按文件内容搜索

**排障思路**：

1. 先 `which` / `whereis` 找命令位置
2. `find` 配合条件精确定位
3. 权限问题加 `sudo`
4. 文件被删但进程仍持有，用 `lsof` 查找
