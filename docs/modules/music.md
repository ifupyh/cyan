# 音乐模块（余音）

全屏沉浸式音乐播放器,路由 `/music/`,导航栏名「余音」。复用全局音频引擎 `window.__cyanMusic`,所有播放器视图通过 CustomEvent 同步状态。

## 目录结构

### 资源目录 `public/assets/music/`

| 目录 | 内容 | 命名约定 |
|---|---|---|
| `audio/` | 音频 mp3 | `歌名-序号.mp3`,如 `nightreign-01.mp3` |
| `cover/` | 背景图(动图/静图) | `歌名-序号.mp4` 或 `歌名-序号.jpg` |
| `lyrics/` | 歌词 lrc | `歌名-序号.lrc` |
| `vinyl-record/` | 黑胶唱片封面图 | `歌名-序号.jpg` |

> 歌名用英文 kebab-case(小写连字符),序号两位(01、02…)。同一首歌的四个资源用同一个「歌名-序号」前缀对应。

### 代码

| 文件 | 职责 |
|---|---|
| `src/pages/music/index.astro` | 页面入口(全屏布局,脱离常规博客) |
| `src/config/musicConfig.ts` | 歌单配置 |
| `src/types/musicConfig.ts` | 配置类型 |
| `src/components/features/MusicManager.astro` | 全局音频引擎(单例,管理唯一 audio 元素和播放状态) |
| `src/components/features/MusicPlayerFullscreen.svelte` | 全屏播放器 UI(音乐页主体) |
| `src/components/features/MusicPlayer.astro` | 侧边栏小部件播放器视图 |
| `src/components/widget/Music.astro` | 侧边栏音乐小部件 |

## 配置说明 `musicConfig.ts`

关键字段:

- `mode`:`"local"` 本地音乐 / `"meting"` Meting API
- `showLyrics`:是否启用歌词
- `showInNavbar`:是否在导航栏显示音乐入口
- `local.playlist`:本地歌单数组,每项:

| 字段 | 必填 | 说明 |
|---|---|---|
| `name` | ✅ | 歌曲名 |
| `artist` | ✅ | 艺术家 |
| `url` | ✅ | 音频路径,如 `/assets/music/audio/nightreign-01.mp3` |
| `cover` | 选填 | 背景图路径,支持图片(jpg/webp)或视频(mp4) |
| `vinyl` | 选填 | 黑胶唱片封面图路径,留空则回退用 `cover` |
| `lrc` | 选填 | 歌词路径或 LRC 字符串 |

## 添加新歌

1. mp3 放入 `audio/`,命名 `歌名-序号.mp3`
2. 封面放入 `cover/`,命名 `歌名-序号.(mp4|jpg)`
3. 歌词放入 `lyrics/`,命名 `歌名-序号.lrc`
4. (可选)唱片图放入 `vinyl-record/`,命名 `歌名-序号.jpg`
5. 在 `musicConfig.ts` 的 `local.playlist` 数组里加一项:

```ts
{
    name: "Song Name",
    artist: "Artist",
    url: "/assets/music/audio/song-name-11.mp3",
    cover: "/assets/music/cover/song-name-11.jpg",
    vinyl: "/assets/music/vinyl-record/song-name-11.jpg",
    lrc: "/assets/music/lyrics/song-name-11.lrc",
},
```

## 修改封面 / 歌词 / 唱片图

- 改某首歌的封面:替换 `cover/` 对应文件,或改配置里该歌的 `cover` 路径
- 改歌词:替换 `lyrics/` 对应 `.lrc` 文件
- 改唱片图:替换 `vinyl-record/` 对应文件,或改配置 `vinyl` 路径

## 歌词格式(LRC)

```lrc
[00:00.00]第一句歌词
[00:05.00]第二句歌词
```

- `[mm:ss.xx]` 时间标签,后面跟歌词文本
- 歌词按时间顺序排列,播放时自动高亮当前句

## 注意事项

- **封面动图**:`cover` 支持 mp4 视频,播放器会自动用 `<video>` 渲染(自动播放、静音、循环);jpg/webp 用背景图渲染
- **歌多图少**:当前 10 首歌、4 张封面,后 6 首复用 `the-outset-02.jpg`。新增封面图后把复用项改成各自的 `cover` 路径即可
- **唱片图回退**:`vinyl` 留空时,黑胶唱片封面自动用 `cover`(背景图)
- **MUSIC 标题字体**:全屏播放器的「M U S I C」标题用 Cinzel 字体(`@fontsource-variable/cinzel`),样式在 `MusicPlayerFullscreen.svelte` 的 `.music-fs__kicker`
- **音频引擎**:`MusicManager` 是单例,通过 `fm:*` 系列 CustomEvent 同步所有播放器视图,新播放器视图只需监听这些事件,不要自建 audio 元素
