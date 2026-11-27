---
title: "一句话实现AI嵌入式代码编写、编译、烧录、调试、日志抓取全流程"
published: 2026-11-27
description: "把芯片型号、外设引脚丢给 AI，让它自己写模块化代码、编译、烧录、抓串口日志。这是我在 STM32F103ZET6 上的一次完整实录，附日志与踩坑。"
image: ""
tags: [嵌入式, AI Agent, STM32, Keil, embed-ai-tool, Claude Code]
category: 技术
draft: false
---

我给 AI 发的那句话是这样的：

> 我的芯片是 stm32f103zet6，温度传感器是 PG11，跑马灯是 PF0 到 PF7 低电平有效，USART1 是 PA9 和 PA10，PA5/PA6/PA7/PA8 是按键，按下是低电平。

中间我没有写一行 C 代码，也没有打开 Keil 的 IDE。这篇文章把这个过程拆开，包括它顺的地方和它卡住的地方。

## 一、全景：这几分钟里，谁做了什么

先把话说清楚：**这不是"AI 全自动"，是"AI 全自动 + 你在三个时刻必须动手"**。把那三个时刻标出来，整件事才可复现。

| 阶段 | AI 负责 | 我负责 |
| --- | --- | --- |
| 环境自检 | 探测 Keil、串口、调试器、技能是否就位 | 提前说清芯片型号与外设引脚 |
| 写代码 | 8 个模块、外设驱动、状态机 | 无 |
| 编译 | 拼命令、解析日志、报错误码 | 无 |
| 烧录 | 调 ST-Link 下载、读回验证 | 确认调试器接在板子上 |
| 抓日志 | 打开串口、按行统计、判断健康 | **按一下复位键**、配合按键 |

整条链路是这样的：

```
需求（芯片 + 引脚）
   └─ 环境自检 ──→ 装技能 / 定位 Keil / 选调试器
        └─ 写代码 ──→ 8 个 .c/.h，改 uvprojx
             └─ 编译 ──→ UV4.exe -r → 0 Error 0 Warning
                  └─ 烧录 ──→ UV4.exe -f → Verify OK
                       └─ 抓日志 ──→ COM5 115200 → [TEMP] 24.87 C
```

"5 分钟"这个说法，指的是从发需求到串口出温度；如果算上环境探测、发现技能没装、定位 Keil 路径这些前置动作，实际大概 15 分钟。这个区别我在后面会具体交代。

把时间摊开看更有意思：环境探测 2 分钟（其中一半花在"技能没装"上），写 8 个模块约 6 分钟，编译 2 秒，烧录 4 秒，剩下全花在"抓日志—没抓到—按复位—再抓"这一轮来回上。**真正耗时的不是写代码，是等人和等硬件。** 这也解释了为什么 agent 类工具在嵌入式上体感比纯软件弱：它的计算很快，但它要等一个物理世界慢慢回应。

## 二、准备：三样东西，和三条必须先交代的信息

三样东西：

1. **一个能执行命令的 agent 工具**（我用的是 Claude Code）；
2. **embed-ai-tool 技能集**，从 GitHub 下载，里面是 build-keil / flash-keil / serial-monitor 这些技能；
3. **一个最小工程脚手架**，我用的是 `st-template`，已经含 StdPeriph 库、启动文件、SystemInit，能把注意力集中在业务代码上。

为什么强调"最小脚手架"？因为从零开始建 Keil 工程，AI 要处理启动文件放哪、库函数怎么 include、`system_stm32f10x.c` 里的时钟宏改不改，这些和业务无关的琐事能吃掉一大半时间，而且每一步都有静默出错的可能。给一个已经能编译通过的骨架，等于把"确定能跑的基线"钉死，后面任何失败都只可能来自新写的代码。这次从第一版代码到编译通过，中间没有出现过链接错误，脚手架是有功的。

三条必须先交代的信息，缺一条就白跑：

- **芯片型号**。STM32F103ZE 和 F103C8 的启动文件、Flash 算法、链接脚本都不一样，AI 猜错就是一堆 `Undefined symbol`。
- **外设引脚 + 有效电平**。PF0–PF7 低电平亮，PA5–PA8 按下为低——这两句直接决定代码里是 `GPIO_ResetBits` 还是 `GPIO_SetBits`，以及按键要不要配内部上拉。
- **物理连接状态**。串口线接好了、ST-Link 接好了、板子已供电。AI 看不见你的桌子，它只能相信你说的话。

![把芯片型号和引脚一次性交代清楚](/assets/images/posts/embed-ai-tool/02-requirement.webp)

这次我把这些信息一条消息发完了，所以后面没有出现"引脚接反了"的返工。

补一句关于"串口接好了"的真相。我这块蓉华底板**没有板载 USB 转串口芯片**——核心板原理图上写得很直接：

> 注：核心板不具备硬件USB转串口电路！！
> TypeC 直接连接到 STM32 的 PA11 和 PA12

也就是说 TypeC 口是 MCU 的原生 USB 从机口，不是串口。板上没有转串口没关系——我这套接线里另接了一块 USB 转串口模块（CH340），它的 TX/RX 分别接到 PA9/PA10，设备管理器里枚举出来的 COM5 就是它。AI 不需要知道这些细节，但它必须知道**串口号是 COM5、波特率 115200**；而你在接线时得知道"PA9 是 TX、PA10 是 RX，模块的 RX 要接 PA9"——这一步 AI 帮不了，插反了它只会告诉你"没数据"。

## 三、第一幕：环境自检，AI 先被绊了三下

agent 起步的第一件事不是写代码，是探测环境。这一步暴露了三个坑。

**坑一：技能没装进项目。** 我把 embed-ai-tool 放在工作目录下，但 agent 的技能列表里没有它——只是同级目录，不是已安装技能。解决方式是把它装到 `st-template/.claude/skills/`，之后 build-keil、flash-keil、serial-monitor、memory-analysis、workflow 才作为"技能"被识别。

**坑二：Keil 不在默认候选路径。** 技能脚本内置的候选是 `C:\Keil_v5`、`D:\Keil_v5` 这类常见位置，而我的 Keil 装在 `D:\develop\Keil_v5\UV4\UV4.exe`。AI 的处理是显式指定路径并把结果存进 `st-template/.em_skill.json`，下次自动复用。这一点值得学：**它的默认值很窄，但它允许你用参数覆盖，并把覆盖记住**。

**坑三：OpenOCD 没装。** 于是"烧录"和"调试"不能走 OpenOCD + GDB 那条通用路线，退回 Keil 自带的 ST-Link 下载器。这不是降级——对 Keil 工程来说反而是最稳的一条，因为复用工程里已经配好的 Flash 算法。

![AI 在动笔前先查 core_cm3.h 里的 DWT 定义](/assets/images/posts/embed-ai-tool/04-project.webp)

上面这张截图是我比较看重的一处细节：它在写 `bsp_delay.c` 之前，先 `grep` 了 `core_cm3.h` 里 `DWT_BASE`、`DWT_Type`、`CYCCNT` 的定义。**DWT 微秒延时是 1-Wire 的命门**，写错一个寄存器名，DS18B20 就永远读不到数据。它先核实再写，这个顺序是对的。

自检结束，屏幕上打出五个勾：Keil MDK ✅、COM5 ✅、ST-Link ✅、技能 ✅，OpenOCD ❌（已知）。

这里值得多说一句 `.em_skill.json`——它是 embed-ai-tool 的"工程记忆"。这次跑完，文件里留下了这样的记录（截取）：

```json
"skill_profiles": {
  "build-keil": { "default": {
    "project": "...\\st-template\\st-template.uvprojx",
    "target": "User",
    "uv4": "D:\\develop\\Keil_v5\\UV4\\UV4.exe",
    "artifact_path": "...\\Obj\\st-template.axf",
    "artifact_kind": "elf",
    "target_mcu": "STM32F103ZE",
    "toolchain": "ARMCC"
  } },
  "flash-keil": { "default": {
    "debugger": "Unknown(-1)",
    "device": "STM32F103ZE"
  } }
}
```

两个观察。第一，它把"用哪个 uvprojx、哪个 target、axf 在哪、什么 MCU、什么工具链"全记下来了，下次 `--resume --profile default` 直接用，不用再解释一遍；显式参数永远优先于缓存，所以换板子也不会被旧配置卡死。第二，`"debugger": "Unknown(-1)"` 是个坦白的失败——脚本没从工程里认出调试器型号，但它没有因此拒绝烧录，而是继续用 Keil 自己的配置去下，最后 `Verify OK`。**能降级就降级、把不确定写进记录**，比假装识别成功要好。

这个设计看着朴素，价值却实在：它把"每次对话都从零解释环境"这件事省掉了。对需要长期维护的工程，这比任何花哨功能都重要。

![环境自检结果](/assets/images/posts/embed-ai-tool/01-env-check.webp)

## 四、第二幕：8 个模块，AI 为什么要拆

我要求"代码分模块、规范一些"，AI 交出来的是 8 个文件：

| 文件 | 职责 |
| --- | --- |
| `board.h` | 引脚映射：PF0–7 LED / PA5–8 KEY / PA9–10 USART1 / PG11 DS18B20 |
| `bsp_delay.c` | SysTick 1 ms 时基 + DWT 微秒延时 |
| `bsp_led.c` | PF0–7 低电平有效，`mask` 语义统一为 1=亮 |
| `bsp_key.c` | PA5–8 上拉输入，30 ms 消抖，只上报按下沿 |
| `bsp_usart.c` | USART1 115200 + `fputc` 重定向到 MicroLIB printf |
| `bsp_ds18b20.c` | 完整 1-Wire：复位/读写位/CRC8/跳过 ROM/转换/读暂存器 |
| `app.c` | 非阻塞状态机：跑马灯 + 温度周期采样 |
| `main.c` | 初始化 + 10 ms 按键扫描主循环 |

拆分的理由不是"看起来专业"，而是三个真实约束。

还有一个结构上的好处：**`board.h` 是引脚的唯一真源**。换板子时只改这一个文件里的 8 个宏，`bsp_*.c` 和 `app.c` 一个字都不用动。这次能"一次写对"，很大程度是因为引脚没有散落在各个 `.c` 里——散落的话，改一处漏一处，编译永远零错误，现象却时对时错。

**一、1-Wire 对时间敏感，必须独占微秒级延时。** DS18B20 的时序是硬指标：复位拉低至少 480 µs，写 1 是拉低 2 µs 后释放、保持高 60 µs，读时隙是拉低 2 µs、释放 10 µs 后采样。所以 `bsp_delay.c` 里既有 SysTick 的毫秒，又有 DWT 的微秒：

```c
uint8_t ds18b20_reset(void)
{
    uint8_t presence;

    ow_output();
    GPIO_ResetBits(DS18B20_GPIO_PORT, DS18B20_PIN);   /* Pull low. */
    delay_us(480U);

    ow_input();                                       /* Release. */
    delay_us(70U);

    presence = ow_read_pin();                         /* 0 = sensor answered. */
    delay_us(410U);

    return (presence == 0U) ? 0U : 1U;
}
```

这段代码里有两个容易忽略的点：总线是开漏的，释放靠外部 4.7 kΩ 上拉，代码里用 `GPIO_Mode_IPU` 作为没有外部电阻时的兜底；presence 为 0 才是"传感器应答"。

CRC8 也值得一提。DS18B20 读回来的 9 个字节里，最后一个是前 8 个的 CRC。不做校验的话，接触不良时温度会跳成 85.0 °C 或者 -0.06 °C 这种假值，而串口照常打印，你根本看不出错。`bsp_ds18b20.c` 里带的是标准 Dallas CRC8（多项式 `x^8 + x^5 + x^4 + 1`），校验不过就返回错误码，日志里打 `[TEMP] read failed (code=...)`。**宁可报错，也不要静静地给出一个错的温度。**

LED 那边有个容易埋雷的语义问题。PF0–PF7 低电平有效，意味着"亮"对应寄存器位是 0。如果把 `mask` 直接当"要点亮的位"写进 `GPIO_WriteBit`，灯的逻辑就整体反了，而且编译零警告。`bsp_led.c` 的做法是把 `mask` 定义成"1 = 亮"，内部再取反：调用方永远不用想电平极性，极性只在一个函数里出现一次。

`printf` 能直接用，靠的是 `bsp_usart.c` 里的 `fputc` 重定向到 USART1，加上工程里 MicroLIB 是开着的（`<useUlib>1</useUlib>`）。这两件事必须配对：用标准 C 库跑 `printf` 会走 semihosting，一旦没有调试器接管，程序就停在半路，表现是"烧录成功但串口一个字都没有"。这类故障和硬件坏了的症状一模一样，非常费时间。

**二、按键必须消抖，且只报按下沿。** 机械按键抖动会连发好几次事件，如果每抖一下就切一次灯速，体验就是乱的。`bsp_key.c` 用"连续 3 次扫描一致"（3 × 10 ms = 30 ms）才认一次按下，并且只在稳定态从抬起变按下时上报。

**三、主循环不能阻塞。** 如果 `delay_ms(1000)` 写死在主循环里，按键就没人扫了。所以 `app.c` 是一个基于时间戳的状态机，温度采样拆成两段：

```c
#define TEMP_CONVERT_MS        800U    /* DS18B20 12 位转换需要 750 ms 上限 */
#define TEMP_PERIOD_MS         1000U
static const uint16_t kSpeedMs[4] = { 600U, 350U, 180U, 90U };
```

主循环每 10 ms 扫一次按键、调一次 `app_tick(now)`，跑马灯按档位推进，温度则"发起转换 → 800 ms 后回来取结果"，全程不阻塞。这也是为什么后来串口日志是**大约 1.8 秒一条**，而不是 1 秒一条：1 秒周期加上 800 ms 转换，两段时间并不完全重叠。

## 五、第三幕：0 Error 0 Warning，然后烧进去

编译走的是 `build-keil`，本质是拼一条 Keil 命令行：

```
UV4.exe -r st-template.uvprojx -t "User" -o "User_build.log"
```

`-r` 是 rebuild（先清再全编），`-b` 是 build（增量）。改过引脚宏之后应该用 `-r`，否则可能出现"头文件里的宏改了，目标文件却是旧的"这种幽灵问题——这类问题最难查，因为你读的代码和跑的代码不是一份。

`-o` 指定日志文件，这一点很关键：UV4 是 GUI 程序，命令行下它不往 stdout 打东西，所有编译信息都在这份日志里。脚本的做法是跑完再解析日志，从里面数 `Error(s)` 和 `Warning(s)` 的数量。

还有个容易被忽略的细节：**UV4 的退出码只有 0 和 1 是正常的**（1 表示有警告或少量错误），真正的成功判据得是"退出码 ≤ 1 且日志里 Error 数为 0"。如果只用 `returncode == 0` 判断，一次带警告的成功编译会被误判为失败，AI 就会去"修"一个不存在的 bug。

结果是我这次最满意的地方——干净的零：

```
Program Size: Code=4880 RO-data=344 RW-data=80 ZI-data=1024
".\Obj\st-template.axf" - 0 Error(s), 0 Warning(s).
Build Time Elapsed:  00:00:02
```

算一下占用：Flash = Code + RO + RW = 4880 + 344 + 80 = 5304 B ≈ **5.2 KB**；RAM = RW + ZI = 80 + 1024 = 1104 B ≈ **1.1 KB**。一颗 512 KB Flash / 64 KB RAM 的芯片，用了 1%。

![编译成功，先检查警告再烧](/assets/images/posts/embed-ai-tool/03-build.webp)

接着烧录。烧之前它做了一件我认为是对的检查：先确认 Keil 工程里的调试器配的是 ST-Link，而不是默认的 ULINK 或 J-Link。

![0 Error / 0 Warning，确认调试器是 ST-Link](/assets/images/posts/embed-ai-tool/05-build-ok.webp)

确认到 `ST-LINKIII-KEIL_SWO.dll` 之后才下载：

```
Erase Done.Programming Done.Verify OK.Application running ...
Flash Load finished at 14:35:10
```

`Verify OK` 说明回读校验通过，`Erase Done` 说明是整片擦除后重新烧。到这里，固件确实在芯片里了。

至于 `Unknown(-1)`，那是脚本在探测调试器时没能从 `uvoptx` 里认出型号（我的工程里明明配了 `ST-LINKIII-KEIL_SWO.dll`）。它的处理方式是"认不出就不猜"，但仍然把下载交给 UV4 去做——因为 Flash 算法、RAM 算法这些都在工程配置里，UV4 自己知道。这是一个正确的边界划分：**脚本负责调起，工程负责细节**。反过来，如果脚本硬要自己实现 ST-Link 时序，遇到各种固件版本反而更容易坏。

![工程已配置 ST-Link](/assets/images/posts/embed-ai-tool/06-stlink.webp)

## 六、第四幕：串口有温度了，还差一次复位

烧完，agent 打开 COM5、115200、8N1 抓了 8 秒，屏幕上只有温度：

```
[TEMP] 24.87 C
[TEMP] 24.93 C
```

没有启动 banner。原因是 `Application running ...` 是一句谎话——它只表示"下载器把芯片放开了"，不代表程序从头跑了一遍。如果烧录前程序已经在跑，烧完之后 CPU 接着原来的状态执行，`main()` 顶上的 banner 就被跳过了。所以"没抓到 banner"不代表固件有问题。

![AI 请我按一下复位键](/assets/images/posts/embed-ai-tool/07-reset.webp)

它让我按复位，然后开着 20 秒的窗口等我按 KEY1→KEY4。

![AI 要求：20 秒内按复位 + 四个键，它同时抓](/assets/images/posts/embed-ai-tool/08-temp.webp)

那一轮什么都没等到。这里暴露了一个很朴素的现实：**串口是独占资源，同一时刻只能有一个程序打开 COM5**。它开着窗口，我就没法用自己的工具；我等它关掉，它的窗口又已经过了。

最后是我用自己的 SSCOM 重做的：先按复位，再依次按四个键，全齐了：

```
[14:38:45.601]收←◆
===== STM32F103ZE Demo =====
SYSCLK : 72000000 Hz
LED    : PF0-PF7 (active low)
KEY    : PA5-PA8 (active low)
USART1 : PA9/PA10 @ 115200 8N1
DS18B20: PG11 (1-Wire)
----------------------------------------
[APP] DS18B20 presence: OK
[APP] running=1 dir=FWD speed=1 (350 ms)

[14:38:48.218]收←◆[KEY] KEY4 -> pause
[14:38:49.738]收←◆[KEY] KEY3 -> immediate temperature sample
[14:38:50.610]收←◆[KEY] KEY2 -> direction REV
[14:38:52.259]收←◆[KEY] KEY2 -> direction FWD
[14:38:54.145]收←◆[TEMP] 25.06 C
```

这串时间戳能读出不少东西：`45.601` 复位，banner 一次打完；`presence: OK` 说明 PG11 上的 DS18B20 应答正常；`running=1 dir=FWD speed=1 (350 ms)` 是初始状态；2.6 秒后按下 KEY4，事件立刻出现，说明 10 ms 扫描 + 30 ms 消抖这条链路是通的；KEY3 触发一次立即采样，KEY2 把方向切到 REV 再切回 FWD。

还有个值得注意的细节：**按键事件和温度日志共用一条串口，却没有互相打架**。按键是"事件驱动、立即打印"，温度是"800 ms 后打印结果"，两者在主循环里都是非阻塞的。如果哪里写了一个 `delay_ms(1000)`，按键就要等一秒才响应，甚至被整段跳过。

![完整日志：复位 banner、按键事件、温度交替出现](/assets/images/posts/embed-ai-tool/10-tool.webp)

温度值在 25.00 和 25.06 之间跳，这也是 12 位精度 0.0625 °C 刻度的正常表现，不是抖动。

顺带解释 1.8 秒的采样间隔：1 秒周期到了才发起转换，12 位转换本身要 800 ms，所以两条 `[TEMP]` 之间自然拉到 1.8 秒左右。想更快就改 `TEMP_PERIOD_MS`，但 12 位精度下的转换时间省不掉。

## 七、三处不完美

**一、`memory-analysis` 解析 ARMCC 的 `.map` 失败了。** 脚本输出的内存占用是 0 B，符号名全丢。原因是它的解析器盯着 GCC 的 map 格式写的，对 armlink 产出的 `.map` 不兼容。所以文章里那组 5.2 KB / 1.1 KB 的数据，来源是 Keil 自己的 `Program Size` 行，不是这个技能。

这件事的教训不止"这个技能有 bug"，而是：**当工具的输出和常识冲突时，先怀疑工具。** 一份用了 StdPeriph、开了 MicroLIB 的工程，`.map` 不可能 0 字节；出现 0，一定是解析失败，而不是工程真的没占内存。判断标准很简单——去翻编译日志里那行 `Program Size`，它才是链接器亲手写的。技能不是万能的，遇到不兼容要立刻换证据源。

**二、AI 的监听窗口和人的操作节奏对不上，而且串口只能被一个程序独占。** 它开 20 秒窗口让我按键，等我真的按下，它的窗口已经结束；轮到我自己打开 SSCOM，它又得先把端口让出来。这不是谁的错误，是"一条串口 + 两个工具"的物理限制。可行的解法只有两种：约死一个时间窗口，或者干脆分工——AI 负责编译烧录，抓日志这种需要人机同步的环节交给带时间戳的串口助手。我这次选了后者。

**三、两次会话的温度读数不一样**（24.87 / 24.93 与 25.00 / 25.06）。不是代码问题，是室温在变，也可能是我手碰过传感器。这一点提醒：**单次读数不能当校准依据**，得看十几分钟的趋势才有意义。

## 八、复盘：AI 能替你做多少

把这次的体感拆成两半。

**AI 明显更强的地方：**

- **环境探测**。它一次问清 Keil 路径、串口编号、调试器类型、技能状态，比我手动 `where` 快得多。
- **胶水代码**。1-Wire 时序、CRC8、按键消抖、非阻塞状态机，全是"知道怎么写但要花时间"的活。
- **失败归因**。编译报错能定位到文件和行；串口没数据会分"固件没跑"和"线没接"两种假设，而不是干等。
- **可重复**。路径和参数会存进 `.em_skill.json`，第二次直接复用，不用重新交代。

**只能你来的地方：**

- **物理状态**。板子有没有电、线松没松、复位键按没按。它看不见，也按不了。
- **口述的准确性**。我如果少说一句"按键按下是低电平"，代码就会把按下判成抬起，而且编译一样是 0 Error——这种错只有人肉能发现。
- **验收判断**。灯是不是真的在流、按 KEY4 是不是真的停住、温度是不是接近室温。数字对不代表现象对。

这套技能之所以能做到上面这些，靠的是一份很短的约定：每个动作必须有四种结局之一——`success`、`partial_success`、`blocked`、`failure`，并且每种结局都要带上 `summary`（做了什么）、`evidence`（凭什么这么说）、`next_action`（下一步该谁做什么）、`failure_category`（失败属于七类里的哪一类）。它禁止"我觉得应该行了"这种回答。

这个约束的实际效果在这次很明显：串口抓到 `[TEMP] 24.87 C`，它给的是 `success` + 证据行；没抓到启动 banner，它没有硬说成功，而是标成"需要你按复位"的 `blocked` 并给出 next_action。**AI 的可靠性不来自它多聪明，而来自它被迫把"不确定"写成结构化的一行。**

**什么时候不建议这么干：**

- 项目已经在量产维护期，改动要走评审。让 AI 直接改 `uvprojx`（加文件、改分组）风险太高，这类改动应该人工 diff 后再提交。
- 时序本身就是难点，比如 USB、以太网、高速 SPI。这类代码 AI 能写出"能编译的版本"，但调试成本可能比手写还高。
- 你需要为交付质量负全责、且无法逐行审查的场景。这次的代码我通读过一遍，1-Wire 那些 `delay_us` 的数值我也对着手册核了——**能读懂，才敢签收。**

一句话总结这次实验：**AI 把"我知道该怎么做但懒得做"的部分吃掉了，把"必须有人在场"的部分留给了我。** 前者大概占 80%，后者 20%，但少了那 20%，剩下的 80% 一行都跑不起来。

![全流程跑通](/assets/images/posts/embed-ai-tool/09-done.webp)

## 九、附：命令与文件

工程结构：

```
st-template/
├── User/
│   ├── board.h          # 引脚映射
│   ├── bsp_delay.c/.h   # SysTick + DWT
│   ├── bsp_led.c/.h     # PF0-7
│   ├── bsp_key.c/.h     # PA5-8 消抖
│   ├── bsp_usart.c/.h   # USART1 + fputc
│   ├── bsp_ds18b20.c/.h # 1-Wire + CRC8
│   ├── app.c/.h         # 状态机
│   └── main.c           # banner + 主循环
├── Obj/st-template.axf  # 304 KB（含调试信息）
├── User_build.log       # 0 Error(s), 0 Warning(s)
├── User_flash.log       # Erase/Program/Verify OK
└── com5_log.txt         # [TEMP] 24.87 C
```

几个可直接抄的命令（在工程目录下执行）：

```bash
# 环境探测
python ../embed-ai-tool/skills/build-keil/scripts/keil_builder.py --detect

# 指定 Keil 路径（存进 .em_skill.json，之后不用再传）
python ../embed-ai-tool/scripts/em_config.py set uv4 "D:\develop\Keil_v5\UV4\UV4.exe"

# 编译
python ../embed-ai-tool/skills/build-keil/scripts/keil_builder.py \
  --rebuild --project "st-template.uvprojx" --target "User"

# 烧录（ST-Link）
python ../embed-ai-tool/skills/flash-keil/scripts/keil_flasher.py \
  --flash --project "st-template.uvprojx" --target "User"

# 抓串口日志
pip install pyserial -i https://mirrors.aliyun.com/pypi/simple/
python ../embed-ai-tool/skills/serial-monitor/scripts/serial_monitor.py \
  --port COM5 --baud 115200 --duration 20 --timestamp
```

两个小提醒，都是我自己踩出来的：

- Windows 控制台默认 GBK，技能脚本里的 ✅ 之类的字符会触发 `UnicodeEncodeError: 'gbk' codec can't encode character`。先 `set PYTHONUTF8=1` 再跑，或者改用 Windows Terminal。
- 如果 `--detect` 报 `❌ UV4.exe`，八成不是没装 Keil，而是装在了非默认路径。用 `em_config.py set uv4` 指定即可，不用去改脚本里的候选列表。

（文中日志、截图、工程代码均来自本人 2026-11-27 的实机运行。）
