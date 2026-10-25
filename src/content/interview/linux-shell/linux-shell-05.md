---
title: "怎么改Linux下的环境变量？临时和永久修改分别怎么操作？"
category: linux-shell
difficulty: easy
order: 5
---

## 参考答案

**临时修改**（当前终端有效，关闭即失效）：

- `export PATH=$PATH:/new/path`
- `export MY_VAR=value`

**永久修改**（需要编辑配置文件）：

- 当前用户生效：编辑 `~/.bashrc` 或 `~/.bash_profile`，加入export语句，然后 `source ~/.bashrc` 使其立即生效
- 所有用户生效：编辑 `/etc/profile` 或在 `/etc/profile.d/` 下新建 `.sh` 文件
- 系统服务环境变量：编辑 `/etc/environment`

查看环境变量：`echo $PATH`（查看单个）、`env` 或 `printenv`（查看所有）。

注意区分 `~/.bashrc`（每次开新终端执行）和 `~/.bash_profile`（登录时执行）
