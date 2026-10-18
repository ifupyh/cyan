---
title: "数据库表怎么设计（两张表对应关系）"
category: ad-machine
difficulty: hard
order: 15
---

## 参考答案

- `t_ad`（广告表）：`ad_id`、`is_downloaded`（素材是否下完的标记）。
- `t_ad_resource`（素材表）：`ad_id`、`type`（上屏/下屏）、`url`（远程）、`local_path`（本地），`UNIQUE(ad_id,type)`。
- 对应：**一条广告对应两条素材（上屏 + 下屏）**，通过 `ad_id` 关联。
