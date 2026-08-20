# Design System Design Notes

## 定位

Design System 服务于企业应用平台的组件规范、交互示例和视觉一致性沉淀。当前站点采用静态 HTML 实现，适合作为设计验收、前端还原和组件扩展的共同参考。

## 设计目标

- 清晰：组件说明应帮助使用者快速判断何时使用、如何组合、有哪些边界状态。
- 稳定：基础 Token、组件尺寸和状态表达保持一致，降低跨页面理解成本。
- 高效：页面结构服务于后台工作台场景，信息密度适中，便于扫描和对照。
- 贴近业务：示例围绕 Agent 创建、任务配置、店铺运营、素材上传、时间排期等实际场景展开。

## 视觉语言

### 字体

- 全局字体统一使用 `Inter`。
- 字体栈必须以 `Inter`、`Inter var` 开头，中文字体作为后备，例如 `"PingFang SC"`、`"Microsoft YaHei"`。
- 全局字体栈不得显式使用 `SF Pro`，也不得通过 `system-ui`、`-apple-system`、`BlinkMacSystemFont` 等苹果系统字体别名回退到 SF Pro。
- 主题切换脚本如需覆盖 `font-family`，也必须保持 `Inter` 在首位。
- Typography 只负责 Font Family、Font Size、Font Weight、Line Height 等排版属性；文字颜色统一由 Text Semantic 管理。
- Typography 命名按 `Display → Heading → Body → Caption` 组织，各组内部使用 `lg / md / sm` 表达尺寸层级。

| Typography Token | Size | Line Height | Weight | 使用场景 |
| --- | --- | --- | --- | --- |
| `display-lg` | `36px` | `1.2` | `500` | 全局样式页大标题、关键视觉标题 |
| `display-md` | `28px` | `1.25` | `500` | 页面级主标题、重要概览标题 |
| `heading-lg` | `24px` | `1.3` | `500` | 页面标题、一级内容标题 |
| `heading-md` | `20px` | `1.35` | `500` | 模块标题、表单区块标题 |
| `heading-sm` | `16px` | `1.5` | `500` | 卡片标题、重点信息标题 |
| `body-md` | `14px` | `1.75` | `400` | 主要说明、组件正文、配置项描述 |
| `body-sm` | `13px` | `1.65` | `400` | 表格内容、输入控件、菜单选项、紧凑信息 |
| `caption-sm` | `12px` | `1.55` | `400` | 辅助说明、状态标签、表格补充信息、弱提示 |

#### Typography Semantic

Typography Semantic 建立在现有 Typography Scale 之上，用文字角色和信息层级命名字体规格。页面和组件开发必须先判断文字功能，再选择 Semantic Typography，最后由 Semantic 映射到既有字号、字重和行高。

```text
Typography Scale → Semantic Typography → Component
```

禁止创建新的字号、字重或行高；禁止创建 15px、17px、18px 等现有规范之外的字体尺寸。相同 Typography Scale 可以对应多个 Semantic Typography。

##### Title

| Semantic Token | Typography Scale | Size / Weight / Line Height | 使用场景 |
| --- | --- | --- | --- |
| `text-page-title` | `heading-md` | `20px / Medium / 1.35` | Page Header / Detail Page Title / 普通业务页面主标题 |
| `text-section-title` | `heading-sm` | `16px / Medium / 1.5` | Section / 主要内容模块标题 |
| `text-card-title` | `heading-sm` | `16px / Medium / 1.5` | Card / Panel / 容器标题 |
| `text-overlay-title` | `heading-sm` | `16px / Medium / 1.5` | Modal / Drawer / 浮层主标题 |

##### Content

| Semantic Token | Typography Scale | Size / Weight / Line Height | 使用场景 |
| --- | --- | --- | --- |
| `text-body` | `body-md` | `14px / Regular / 1.75` | Description / Content / 常规内容与信息展示 |
| `text-body-strong` | `body-md` | `14px / Medium / 1.75` | 正文重点信息 / 强调内容 |
| `text-label` | `body-md` | `14px / Medium / 1.75` | Form Label / Field Name / Property Label |
| `text-control` | `body-sm` | `13px / Regular / 1.65` | Button / Input / Select / Menu / Dropdown |

##### Supporting

| Semantic Token | Typography Scale | Size / Weight / Line Height | 使用场景 |
| --- | --- | --- | --- |
| `text-secondary` | `body-sm` | `13px / Regular / 1.65` | 次级描述 / 补充信息 |
| `text-helper` | `caption-sm` | `12px / Regular / 1.55` | Helper Text / 表单提示 / 解释信息 |
| `text-caption` | `caption-sm` | `12px / Regular / 1.55` | Time / Count / Metadata / 非常次要的信息 |

##### Data

| Semantic Token | Typography Scale | Size / Weight / Line Height | 使用场景 |
| --- | --- | --- | --- |
| `text-data` | `heading-lg` | `24px / Medium / 1.3` | Important Number / Statistic / Key Result |

示例：

```text
body-md / Regular → text-body → Description / Content
body-md / Medium → text-label → Form Label / Property Label
body-sm / Regular → text-control → Input / Select / Menu
```

使用规则：

- 页面和组件优先调用 Semantic Typography，不直接写 `font-size`。
- Semantic Typography 必须引用现有 Typography，不创建新的字体规格。
- 相同字号可以对应不同语义，不要求一个字号只能对应一个 Semantic Token。
- Typography Semantic 负责字号、字重和行高，不负责文字颜色。
- 文字颜色统一调用 `color-text-*` Semantic Color。
- Component 可以进一步覆盖 Semantic，但必须有明确的组件需求。
- 不因为单个页面的特殊需求新增 Semantic Token。
- 只有某种文字角色在多个页面或组件重复出现时，才允许增加新的 Semantic Typography。

AI Coding 选择顺序：

```text
文字是什么角色？
↓
属于 Title / Content / Supporting / Data 中的哪一种？
↓
选择对应 Semantic Typography
↓
Semantic Typography 映射现有 Typography
↓
组件最终渲染
```

禁止写法：这个文字看起来比较重要，所以使用 18px。

推荐写法：这是 Section Title，所以使用 `text-section-title`。

### 图标

所有界面中的功能性 Icon 默认使用统一的线性图标风格。

#### Default Style

- 使用 Outline / Linear Icon，不使用实心 Fill Icon。
- 默认 `stroke-width: 2px`。
- 使用圆角端点：`stroke-linecap: round`。
- 使用圆角连接：`stroke-linejoin: round`。
- 图标整体风格保持简洁、几何化、轻量。
- 同一页面内不得混用不同 Stroke Width 或不同视觉风格的图标。

推荐 SVG 基础属性：

```html
<svg
  width="20"
  height="20"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
```

#### Usage Rules

当界面需要 Icon 时，优先使用现有 Design System / Icon Library 中语义匹配的线性 Icon。

如果没有现成 Icon：

1. 根据功能语义绘制新的 SVG Icon。
2. 默认使用 24×24 `viewBox`。
3. Stroke Width 固定为 `2px`。
4. 使用 `round` linecap 和 `round` linejoin。
5. 保持图形结构简单，不增加装饰性细节。
6. 不使用渐变、阴影、复杂填充。
7. Icon 颜色默认使用 `currentColor`，由父级 Semantic Color 控制。
8. 不在 SVG 内写死 HEX 色值。

#### State

Icon 的状态颜色跟随所在组件，而不是单独定义：

| State | 颜色规则 |
| --- | --- |
| Default | 使用组件默认文字 / Icon Semantic Color |
| Hover | 跟随组件 Hover Color |
| Active / Selected | 跟随 Action / Selected Semantic Color |
| Disabled | 使用 Disabled Semantic Color |
| Error / Warning / Success | 使用对应 Status Semantic Color |

### 色彩

颜色体系采用三层调用关系：

```text
Primitive Color → Semantic Color → Component Token
```

Primitive Color 是基础色板，Semantic Color 是用途命名，Component Token 是组件私有映射。页面和组件开发必须优先根据用途选择 Semantic Token，不直接根据视觉相似度调用 `primary-500`、`neutral-600` 等 Primitive Token。

#### Primitive Color

- 保留现有 Primary、Neutral、Red、Yellow、Blue、Success Green 的 50-900 色阶，不修改既有 HEX。
- Primitive Color 仅作为基础色板和 Semantic Token 的取值来源。
- Brand 相关色阶通过 `brand-50` 到 `brand-900` 暴露，并随当前 Theme 改变。
- Status Color 表达固定状态含义，不随 Brand Theme 改变。
- 遮罩沿用现有 rgba 值，不新增遮罩颜色。

#### Semantic Color

核心 Semantic Token 控制在 20-30 个左右，按 Text、Background、Border、Action、Status、Overlay 组织。新增 Semantic Token 必须引用已有 Primitive Token 或现有遮罩值，不在 Semantic 层创建新的 HEX。

##### Text

| Semantic Token | Primitive Token | HEX | 使用场景 |
| --- | --- | --- | --- |
| `color-text-primary` | `neutral-900` | `#14171A` | 页面标题 / 重要信息 / 表单 Label / 关键数据 |
| `color-text-default` | `neutral-700` | `#343A40` | 正文说明 / 菜单项 / 输入内容 / 可阅读段落 |
| `color-text-secondary` | `neutral-600` | `#59616A` | 说明文案 / 表格补充信息 / 次要状态描述 / Helper Text |
| `color-text-tertiary` | `neutral-500` | `#78818C` | Placeholder / 说明尾注 / 计数器 / 低优先级信息 |
| `color-text-disabled` | `neutral-400` | `#A5ADB6` | Disabled 文本 / 禁用输入 / 不可用操作 |
| `color-text-inverse` | `white` | `#FFFFFF` | 深色底 / Primary Button / 深色标签 / 深色浮层内容 |
| `color-text-link` | `blue-600` | `#1570EF` | 可点击文本 / 跳转入口 / 外部资源访问 |

文字用途禁止直接使用 `neutral-900`、`neutral-600` 等 Primitive Token 表达，应优先使用 `color-text-*` Semantic Token。

示例：

```text
neutral-900 → color-text-primary → Page Title / Form Label
neutral-600 → color-text-secondary → Description / Helper Text
```

##### Background

| Semantic Token | Primitive Token | HEX | 使用场景 |
| --- | --- | --- | --- |
| `color-bg-page` | `neutral-50` | `#FAFBFC` | 页面基础背景 |
| `color-bg-container` | `white` | `#FFFFFF` | Card / Form / 主要内容容器 |
| `color-bg-subtle` | `neutral-100` | `#F3F5F7` | 次级区域 / 弱强调背景 |
| `color-bg-hover` | `neutral-100` | `#F3F5F7` | 中性组件 Hover |
| `color-bg-selected` | `brand-50` | 随 Theme 改变 | Selected / Active 区域 |
| `color-bg-disabled` | `neutral-100` | `#F3F5F7` | Disabled 控件背景 |

##### Border

| Semantic Token | Primitive Token | HEX | 使用场景 |
| --- | --- | --- | --- |
| `color-border-default` | `neutral-300` | `#D4D9DE` | Input / Select / Card 常规边框 |
| `color-border-subtle` | `neutral-200` | `#E7EAEE` | Divider / 弱边界 |
| `color-border-strong` | `neutral-400` | `#A5ADB6` | 强调边界 |
| `color-border-focus` | `brand-500` | 随 Theme 改变 | Focus 状态 |
| `color-border-disabled` | `neutral-200` | `#E7EAEE` | Disabled 控件边框 |

示例：

```text
neutral-300 → color-border-default → input-border / select-border / card-border
```

##### Action

Action 类颜色必须跟随当前 Theme 的 Brand Color，不直接绑定固定绿色。

| Semantic Token | Primitive Token | HEX | 使用场景 |
| --- | --- | --- | --- |
| `color-action-primary` | `brand-500` | 随 Theme 改变 | Primary Button / Checkbox / Radio / Switch / Slider |
| `color-action-primary-hover` | `brand-600` | 随 Theme 改变 | 主要操作 Hover |
| `color-action-primary-active` | `brand-700` | 随 Theme 改变 | 主要操作 Active / Pressed |
| `color-action-primary-subtle` | `brand-50` | 随 Theme 改变 | 轻量选中态 / 品牌弱背景 |
| `color-action-primary-disabled` | `brand-200` | 随 Theme 改变 | 主要操作 Disabled |

示例：

```text
primary-500 → color-action-primary → button-primary-background
```

##### Status

Status Color 表达固定状态含义，不随 Brand Theme 改变。

| Semantic Token | Primitive Token | HEX | 使用场景 |
| --- | --- | --- | --- |
| `color-status-success` | `success-green-500` | `#22B573` | Alert / Message / Badge / 任务成功 |
| `color-status-error` | `red-500` | `#F04438` | Form Validation / Alert / Message 错误 |
| `color-status-warning` | `yellow-500` | `#F79009` | 警告 / 待处理 / 中风险提示 |
| `color-status-info` | `blue-500` | `#2E90FA` | 信息反馈 / 进行中 / Notification |

示例：

```text
red-500 → color-status-error → form-error / alert-error / message-error
```

##### Overlay

Overlay 沿用现有遮罩 rgba 值，并统一语义命名。

| Semantic Token | 取值 | 使用场景 |
| --- | --- | --- |
| `color-overlay-modal` | `rgba(0, 0, 0, 0.45)` | Modal / 确认弹窗 |
| `color-overlay-drawer` | `rgba(0, 0, 0, 0.35)` | Drawer / 侧边配置 |
| `color-overlay-loading` | `rgba(255, 255, 255, 0.72)` | 局部加载 / 表格遮罩 |

#### 使用原则

- 页面和组件优先使用 Semantic Token，不直接调用 Primitive Color。
- 禁止根据 HEX 或 Primitive Token 猜颜色；必须先判断 UI 语义，再查找对应 Semantic Token，最后由 Semantic Token 映射到 Primitive Color。
- Component Token 应优先引用 Semantic Token。
- Brand / Action Semantic Token 随 Theme 改变。
- Text、Background、Border 等中性色语义默认跨 Theme 保持一致。
- Success / Warning / Error / Info 表达固定状态含义，不随 Brand Theme 改变。
- 不要因为单个组件需求随意增加 Semantic Token；只有出现跨组件、重复使用的颜色语义时才新增。
- 如果现有 Semantic Token 可以表达用途，不创建新的 Token。

### 布局

- 顶部栏高度：`60px`
- 侧边导航宽度：`300px`
- 主内容区采用左侧导航加右侧画布的工作台布局。
- 文档内容以组件说明、示例块、属性表和 Token 表为主要结构。

### 浮层层级

下拉菜单、级联菜单、自动补全候选、日期时间面板、Tooltip、Popover 等浮层必须作为触发控件的 `+1` 层级呈现，不参与原底层 card、表单行或页面区块的高度计算：

- 浮层容器应使用 `position: absolute` 或等价的 portal/overlay 机制，并设置明确的 `z-index`，相对触发控件悬浮展示。
- 触发控件所在 card 的默认高度不得因为浮层展开而增加；展开和收起时，底层布局、相邻 card 与页面滚动位置应保持稳定。
- 文档示例如果需要展示默认打开状态，只能为演示区域预留固定高度或使用独立预览画布，不得依赖浮层内容把 card 撑高。
- 下拉类组件默认应收起；除非组件规范明确说明“默认展开演示”，否则页面加载时不应自动选中或展开。
- 下拉类浮层展开后，点击触发控件和浮层内容以外的页面区域必须自动收起；组件内部点击不应误触发收起。
- 浮层超出容器时优先通过更高层级、裁切规避或 portal 处理，不通过增加父级 padding、margin、min-height 来临时修补。

### 全局侧导航

侧导航是所有 HTML 页面共享的全局结构，新增或调整组件页时必须保持一致：

- 所有导航项和分组文案统一使用英文在前、中文在后，例如 `Styles 全局样式`、`Components 组件总览`、`Data Entry 数据录入`、`AutoComplete 自动补全`。
- 所有页面侧导航宽度、字号、行高和间距保持一致：桌面端侧栏宽度 `300px`，导航项最小高度 `40px`，导航文字字号 `14px`，分组文字字号 `12px`。
- 侧导航中的当前页必须通过 `aria-current="page"` 标记，便于视觉高亮、辅助技术识别和脚本定位。
- 页面加载后，当前选中的导航 tab 应自动滚动到侧导航可视区域中部。桌面端按垂直方向居中；移动端或横向侧导航按横向方向居中。
- 页面布局必须固定在视口高度内，让侧导航自身成为滚动容器；不得依赖 `body` 滚动承载侧导航，否则靠后的 tab 无法稳定自动居中。
- 侧导航列表底部需要保留约半屏高度的滚动缓冲，确保 `Cascader 联级选择` 及其下方 tab 也能滚动到可视区域中部。
- 侧导航滚动条必须与主模板保持一致：使用细滚动条、透明轨道、中性色滑块和稳定 gutter，独立组件页不得使用浏览器默认粗滚动条。
- 首页 `index.html` 的 `Styles` 与 `Components` 使用 `data-page` 切换面板，其他独立组件页使用链接跳转，但展示文案、尺寸和选中态行为必须一致。

### 圆角与聚焦

- 基础圆角：`6px`
- 焦点阴影：`0 0 0 3px rgba(0, 209, 87, 0.16)`

交互控件需要提供清晰的 hover、focus、active、disabled 和 error 表达，焦点态应稳定可见，避免只依赖颜色变化。

### 滚动条

- 细滚动条宽度：`4px`
- 滚动条轨道：`transparent`
- 滚动条滑块：`var(--gray-300)`
- 滚动条圆角：`999px`

下拉菜单、浮层列表和组件内部滚动区域默认使用细滚动条。滚动条轨道不应出现底色，避免在轻量浮层中形成额外边界；仅显示中性色滑块，并在需要滚动时提供足够可见性。

## 组件组织

当前组件按四类组织：

- 通用：Button
- 布局：Divider、Space、Grid、Layout、Splitter
- 数据录入：Input、InputNumber、Radio、Checkbox、Switch、Select、DatePicker、TimePicker、Upload、Form、AutoComplete、Cascader、Mentions、VerficationCode、Rate、Slider
- 数据展示：Card、Table

完整组件规范建议包含以下章节：

- 何时使用：说明组件适用场景和不适用边界。
- 基础用法：展示默认结构和最常见用法。
- 组合类型或布局：说明复合场景、变体和信息组织方式。
- 状态：覆盖默认、悬停、聚焦、选中、错误、禁用、加载等状态。
- 尺寸：说明小、中、大或业务约定尺寸。
- API：列出属性、说明、类型、默认值。
- 设计 Token：列出组件私有或共享样式变量。

## 交互原则

- 表单反馈应靠近字段，帮助用户快速定位问题。
- 选择类组件应明确当前值、展开状态、选项状态和清除操作。
- 日期与时间组件应同时照顾单值、范围、空状态和错误状态。
- 上传组件应展示文件队列、进度、成功、失败和删除能力。
- 按钮应根据任务优先级区分主按钮、次按钮、文本按钮、危险按钮和加载状态。

## 内容风格

文案保持简洁、明确、业务化。示例中优先使用 企业应用平台相关对象，例如 Agent、任务、店铺、素材、授权、回调地址、排期和批量操作参数。

## 扩展建议

新增组件时，先补齐组件入口和全局侧导航，并复用统一的侧导航文案顺序、尺寸规则和选中项自动居中逻辑，再补齐规范章节。若组件有复杂交互，应提供可操作示例；若组件仅作为展示规范，也应包含关键状态和 Token 表，确保设计与实现可以对齐。
