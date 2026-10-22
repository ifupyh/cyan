---
title: "数据库表怎么设计？两张表怎么对应？"
category: ad-machine-full
difficulty: hard
order: 49
---

## 参考答案

- `t_ad`（广告表）：一条广告一行，含 `ad_id`（主键）、`is_downloaded`（上下屏素材是否下完的标记）等。
- `t_ad_resource`（素材表）：含 `id`、`ad_id`（外键 → t_ad）、`type`（上屏/下屏）、`url`（远程 http 地址）、`local_path`（本地路径），约束 `UNIQUE(ad_id, type)`。
- 对应关系：**一条广告（t_ad）对应两条素材（t_ad_resource）**——上屏 + 下屏，通过 `ad_id` 关联。
