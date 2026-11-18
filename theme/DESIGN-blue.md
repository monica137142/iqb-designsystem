# 蓝调主题 — Light / Dark

> Theme：IQ Blue Night。主题 3（Light）与主题 4（Dark）共用本文件、同一套 Primitive 色板和品牌蓝。
> 本文件仅定义主题差异；Token 名称、用途、完整 Light / Dark 语义映射及组件规范继承 [主规范](../design.md)。

## 主题身份与继承

| 选择器名称 | Mode | 运行时标识 |
| --- | --- | --- |
| 主题 3 · 蓝调明亮 | Light | `blue-night-light` |
| 主题 4 · 蓝调暗夜 | Dark | `blue-night-dark` |

- Neutral 基于默认主题灰阶微调：0 保持白色，1–6 轻微偏蓝，7–13 为蓝黑色调；色阶从亮到暗。
- Brand 使用本文件定义的品牌蓝色阶，`brand-5` 为 `#2563EB`，`brand-rgb` 为 `37, 99, 235`；Success、Danger、Warning、Info 色板继续继承主规范，不随品牌蓝改变。
- 两种模式分别继承主规范 Light / Dark 映射，包括 Categorical Color；无新增 Semantic Token 或主题映射覆盖。
- 字体、圆角、尺寸、布局、组件状态及交互继承主规范。

## 共享 Primitive 色板

下表仅定义物理色值，具体用途随 Light / Dark 映射变化；组件优先调用 Semantic Token。

### Neutral

| Token | HEX |
| --- | --- |
| `neutral-0` | `#FFFFFF` |
| `neutral-1` | `#F3F5F8` |
| `neutral-2` | `#E7EAEE` |
| `neutral-3` | `#D9DDE2` |
| `neutral-4` | `#9FA3AA` |
| `neutral-5` | `#6F737B` |
| `neutral-6` | `#62666E` |
| `neutral-7` | `#3A3D42` |
| `neutral-8` | `#26292E` |
| `neutral-9` | `#1C1F24` |
| `neutral-10` | `#14171C` |
| `neutral-11` | `#0E1116` |
| `neutral-12` | `#070A0F` |
| `neutral-13` | `#03060B` |

### Brand

Brand 使用 0–9 共 10 档，5 为默认基准色；Light / Dark 共用以下 Primitive 色阶，Action 与 Focus 等语义继续使用主规范对应模式的映射。

| Token | HEX |
| --- | --- |
| `brand-0` | `#EFF6FF` |
| `brand-1` | `#DBEAFE` |
| `brand-2` | `#BFDBFE` |
| `brand-3` | `#93C5FD` |
| `brand-4` | `#60A5FA` |
| `brand-5` | `#2563EB` |
| `brand-6` | `#1D4ED8` |
| `brand-7` | `#1E40AF` |
| `brand-8` | `#1E3A8A` |
| `brand-9` | `#172554` |

## Light / Dark 关键语义预览

以下为共享色板按主规范解析后的结果，不构成独立映射；完整规则以主规范为准。

| Semantic Token | Light：Primitive / HEX | Dark：Primitive / HEX |
| --- | --- | --- |
| `color-bg-page` | `neutral-0` / `#FFFFFF` | `neutral-12` / `#070A0F` |
| `color-bg-container` | `neutral-0` / `#FFFFFF` | `neutral-11` / `#0E1116` |
| `color-bg-elevated` | `neutral-0` / `#FFFFFF` | `neutral-10` / `#14171C` |
| `color-bg-subtle` | `neutral-1` / `#F3F5F8` | `neutral-9` / `#1C1F24` |
| `color-bg-hover` | `neutral-1` / `#F3F5F8` | `neutral-9` / `#1C1F24` |
| `color-bg-overlay-hover` | `neutral-2` / `#E7EAEE` | `neutral-8` / `#26292E` |
| `color-bg-disabled` | `neutral-2` / `#E7EAEE` | `neutral-8` / `#26292E` |
| `color-bg-inverse` | `neutral-9` / `#1C1F24` | `neutral-0` / `#FFFFFF` |
| `color-text-top` | `neutral-12` / `#070A0F` | `neutral-0` / `#FFFFFF` |
| `color-text-primary` | `neutral-10` / `#14171C` | `neutral-1` / `#F3F5F8` |
| `color-text-default` | `neutral-9` / `#1C1F24` | `neutral-2` / `#E7EAEE` |
| `color-text-secondary` | `neutral-7` / `#3A3D42` | `neutral-4` / `#9FA3AA` |
| `color-text-tertiary` | `neutral-6` / `#62666E` | `neutral-5` / `#6F737B` |
| `color-text-disabled` | `neutral-4` / `#9FA3AA` | `neutral-6` / `#62666E` |
| `color-text-inverse` | `neutral-0` / `#FFFFFF` | `neutral-12` / `#070A0F` |
| `color-border-default` | `neutral-3` / `#D9DDE2` | `neutral-7` / `#3A3D42` |
| `color-border-subtle` | `neutral-2` / `#E7EAEE` | `neutral-8` / `#26292E` |
| `color-border-strong` | `neutral-4` / `#9FA3AA` | `neutral-6` / `#62666E` |

| `color-action-primary` | `brand-5` / `#2563EB` | `brand-5` / `#2563EB` |
| `color-action-primary-hover` | `brand-6` / `#1D4ED8` | `brand-6` / `#1D4ED8` |
| `color-action-primary-bg` | `brand-0` / `#EFF6FF` | `brand-8` / `#1E3A8A` |
| `color-action-primary-bg-hover` | `brand-1` / `#DBEAFE` | `brand-7` / `#1E40AF` |
| `color-border-focus` | `brand-5` / `#2563EB` | `brand-5` / `#2563EB` |
| `color-bg-selected` | `brand-0` / `#EFF6FF` | `neutral-8` / `#26292E` |

## 切换、兼容与验收

- 品牌蓝已接入运行时 CSS 与 topbar 菜单预览；选择主题 3 / 4 时应用本文件 Brand 色阶，主题 1 / 2 继续使用默认品牌绿。
- 两种模式共用 `iqb-design-palette-theme=blue-night`，通过 `iqb-design-color-mode=light/dark` 区分，刷新和跨页导航保留选择。
- 原主题 3 的已保存暗夜选择继续保持 Dark，显示为主题 4；历史实验主题配置不自动迁移为蓝调主题。
- 切换至主题 1、2 时恢复默认色板；主题 1、2 的原色值与映射不变。
- Overlay 继承主规范的 Primitive 与透明度公式；Dark 遮罩随色板带轻微蓝调。
- 页面验收应覆盖两种模式的文字、链接、输入边界、选中、聚焦、禁用、状态与浮层；文档色值核对不代表完成浏览器视觉或对比度验收。
