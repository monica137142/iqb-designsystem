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

Icon 是界面中的语义型 UI 元素，不作为装饰图形使用。优先复用现有 Design System 或 Icon Library 中同语义图标；仅当现有资源无法覆盖业务语义时，AI 才允许按本章节规则自动生成 SVG Icon。

#### Icon 基础原则

- Reuse first. Generate only when necessary.
- 已有同语义 Icon 时，直接复用，不重新生成近似版本。
- 缺少现成 Icon 时，允许 AI 自动生成符合本规范的 SVG。
- Icon 只表达功能语义，不作为装饰插画使用。
- 同一语义在同一页面必须保持同一图形。
- 语义清晰度优先于视觉新颖度。

#### Icon Canvas

- Canvas：`24 × 24`
- 推荐安全边距：`2px`
- 图形保持视觉居中，左右和上下视觉重量尽量均衡。
- 不允许主要路径紧贴画布边缘。
- 不因为实际显示尺寸变化改变 `viewBox`。

统一保持：

```html
viewBox="0 0 24 24"
```

#### Icon Size

Icon 尺寸默认与相邻文字字号保持一致或接近，并根据组件高度和视觉平衡进行调整。

- Icon 尺寸不设置推荐的固定尺寸阶梯。
- 图文组合中，Icon 与相邻文字字号保持一致或接近。
- Button、Menu、Navigation、Form、Toolbar 等组件内的 Icon，按组件高度、内边距和视觉重量进行微调。
- 独立操作入口、空状态或功能入口中的 Icon，可根据版面层级放大，但仍以语义角色和视觉平衡为准。

#### Stroke Style

- 所有默认线性 Icon 使用 `stroke-width="2"`。
- 使用圆角端点：`stroke-linecap="round"`。
- 使用圆角连接：`stroke-linejoin="round"`。
- 不因 Icon 尺寸变化自行改变 stroke width。
- 不在同一个 Icon 内混用 `1px`、`1.5px`、`2px` 或 `2.5px`。

除非 Design System 后续明确新增其他 Icon Style，否则统一保持 `2px`。

#### Geometry

AI 自动绘制 Icon 时优先使用：

- Line
- Circle
- Rounded Rect
- Polyline
- 简单 Path

几何规则：

- 尽量减少无意义的细碎路径。
- 单个 Icon 保持结构简单，避免过度复杂。
- 相同结构元素保持间距、圆角、对齐和描边一致。
- 尽可能保持视觉对称或视觉平衡。
- 矩形类图标优先采用轻微圆角，而不是完全尖角。
- 图形转折优先保持圆润，不使用过度锋利、机械感强的节点。
- 不为了“更像真实物体”加入不必要的细节。

设计目标：Simple / Clear / Geometric / Consistent。

#### Color & Semantic Color

Icon 禁止直接写死 `#000`、`#333`、`#666`、`#999` 或其他 HEX Color。默认使用 `currentColor`，颜色继承所在组件或父级语义颜色。

```css
.icon {
  color: var(--color-text-primary);
}

.icon svg {
  stroke: currentColor;
}
```

不要单独给 SVG Path 设置固定颜色。

#### Interaction State

Icon 自身原则上不独立维护 Hover、Active、Selected、Disabled。状态优先由父组件控制：

- Button Icon 自动继承 Button Text Color。
- Navigation Icon 自动继承 Navigation Item Color。
- Disabled Icon 自动继承 Disabled Semantic Color。
- Error Icon 自动继承 Error Semantic Color。

禁止让 Icon 状态和组件状态形成两套独立逻辑，例如禁止 `.button:hover svg path { stroke: #xxx; }`。

#### Outline / Filled 使用规则

当前 Design System 默认采用 Line / Outline Icon，Filled Icon 不作为默认风格。仅在以下情况允许使用 Filled Icon：

- Selected State 需要明确增强识别。
- Status / Badge 有明确规范要求。
- 特殊业务场景已经由设计规范定义。

如果 Line / Filled 同时存在，必须具有明确的状态关系，例如 Default 使用 Outline，Selected 使用 Filled。禁止同一页面中无规则混用 Outline / Filled。

#### AI Generated Icon Rule

当 AI Coding 需要当前 Design System 未提供的 Icon 时，必须按以下顺序处理：

```text
Existing Icon
↓
判断是否存在同语义 Icon
↓
如果存在，直接复用
↓
如果不存在，根据 Icon Contract 自动生成 SVG
```

生成时必须：

- 使用 `24 × 24` viewBox。
- 默认 `2px` stroke。
- 使用 `round` linecap 和 `round` linejoin。
- 使用 `fill="none"` 和 `stroke="currentColor"`。
- 保持简单几何结构。
- Icon 尺寸默认与相邻文字字号保持一致或接近，并根据组件高度和视觉平衡进行调整。
- 与现有 Icon 保持相近视觉重量。

禁止 AI 使用 Emoji、Unicode 字符、文本符号、CSS Border、大量 div、网络图片或装饰性插画替代正式 UI Icon。

#### Do / Don't

DO：

- `24 × 24` Canvas
- `2px` Stroke
- Round Linecap
- Round Linejoin
- `currentColor`
- 简洁几何结构
- 统一视觉重量
- 优先复用现有 Icon

DON'T：

- `1px` / `1.5px` / `2.5px` 随机混用
- Emoji 或 Unicode Symbol 代替正式 Icon
- 随机 Filled Icon
- 不同圆角风格混用
- 使用固定 HEX Color
- 复杂细碎 SVG
- 为相同语义重复生成不同 Icon
- 使用 CSS 临时拼接 Icon

#### SVG 示例代码

```html
<svg
  width="1em"
  height="1em"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="..."
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  ...
</svg>
```

如果包含多个 Path，每个 Path 必须保持 `stroke="currentColor"`、`stroke-width="2"`、`stroke-linecap="round"`、`stroke-linejoin="round"`，不要在不同 Path 中创建不同视觉风格。

#### ICON Contract

```text
Reuse first.
Generate only when necessary.

If an icon must be generated, use:

24px canvas
+ 2px rounded stroke
+ simple geometric shape
+ currentColor
+ semantic size
+ consistent visual weight
```

确保 AI Coding 后续在任何页面自动生成的 Icon，即使不是预先存在于组件库中的资源，仍然能够在视觉上属于同一套 Design System。

### 圆角

圆角用于表达组件边界的柔和程度和可点击形态。全局组件默认使用克制的小圆角，输入类控件使用更明显的圆角增强可识别性，胶囊与圆形元素使用完整圆角保持形态稳定。

| Token | 值 | 语义 | 典型组件 |
| --- | --- | --- | --- |
| `radius-none` | `0` | 无圆角，用于拼接边、分段控件内部边界或需要直角对齐的局部。 | Input addon 拼接边、表格内部连续边界 |
| `radius-compact` | `2px` | 极小圆角，用于密集主题或需要更克制形态的业务控件。 | Test theme 控件圆角覆盖 |
| `radius-xs` | `4px` | 小型边界圆角，用于面积很小的控件或内嵌状态块。 | Checkbox、代码 token、表格内小标签 |
| `radius-sm` | `6px` | 全局基础圆角，适合导航、轻量容器和多数弱边界元素。 | Side nav item、Tag、spec table wrap、基础示例卡片 |
| `radius-md` | `8px` | 常规组件圆角，用于按钮、浮层和承载型容器。 | Button、Dropdown panel、Card、Collapse |
| `radius-lg` | `10px` | 输入类控件圆角，强化可编辑区域的完整边界。 | Input、Select、AutoComplete、Cascader、DatePicker、TimePicker |
| `radius-xl` | `12px` | 展示容器圆角，用于更大面积的图形、插图或媒体承载。 | Empty illustration、Image fallback、媒体预览 |
| `radius-full` | `999px` | 完整圆角，元素应呈现胶囊或圆形。 | Badge、Switch、Avatar、Pill、Scrollbar thumb |

使用规则：

- 组件优先引用圆角 token，不在局部样式里临时写散落数值。
- 输入触发器、弹出层和展示容器可以拥有不同圆角语义，不要求所有组件统一为一个数值。
- `radius-full` 只用于需要胶囊或圆形轮廓的元素，不用于普通卡片。
- 主题可以覆盖全局基础圆角，但不改变组件结构和交互路径。

### 色彩

颜色体系采用三层调用关系：

```text
Primitive Color → Semantic Color → Component Token
```

Primitive Color 是基础色板，Semantic Color 是用途命名，Component Token 是组件私有映射。页面和组件开发必须优先根据用途选择 Semantic Token，不直接根据视觉相似度调用 `brand-500`、`gray-neutral-600` 等 Primitive Token。

#### Primitive Color

- Brand、Gray-Neutral、Danger、Warning、Info 色板均采用 50-950 共 11 档色阶，500 作为默认基准色。
- Gray-Neutral 采用无色相中性灰，RGB 三通道保持一致，避免偏绿或偏蓝。
- Primitive Color 仅作为基础色板和 Semantic Token 的取值来源。
- Brand 相关色阶通过 `brand-50` 到 `brand-950` 暴露，并随当前 Theme 改变。
- Status Color 表达固定状态含义，不随 Brand Theme 改变。
- 遮罩沿用现有 rgba 值，不新增遮罩颜色。

| 色板 | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Brand | `#F0FDF3` | `#DBFDE3` | `#B9F9C9` | `#82F39F` | `#45E36E` | `#1CC749` | `#00AE2E` | `#118430` | `#13682A` | `#125526` | `#042F11` |
| Gray-Neutral | `#FAFAFA` | `#F5F5F5` | `#EDEDED` | `#D9D9D9` | `#BFBFBF` | `#8C8C8C` | `#6B6B6B` | `#4A4A4A` | `#333333` | `#1F1F1F` | `#141414` |
| Danger | `#FFF2F1` | `#FFE2E0` | `#FFC8C5` | `#FFA29D` | `#FF6D65` | `#FE3D33` | `#EC2116` | `#C7170E` | `#A41710` | `#881A14` | `#4A0805` |
| Warning | `#FFFAEC` | `#FFF4D3` | `#FFE5A5` | `#FFD16D` | `#FFB232` | `#FF990A` | `#FF8400` | `#CC6002` | `#A14B0B` | `#823F0C` | `#461E04` |
| Info | `#EEF9FF` | `#D9F0FF` | `#BCE6FF` | `#8ED9FF` | `#58C2FF` | `#31A6FF` | `#1887F5` | `#1370E2` | `#1370E2` | `#184E90` | `#143057` |

#### Semantic Color

核心 Semantic Token 按 Text、Background、Border、Action、Status、Overlay 组织。新增 Semantic Token 必须引用已有 Primitive Token 或现有遮罩值，不在 Semantic 层创建新的 HEX。

##### Text

| Semantic Token | Primitive Token | HEX | 使用场景 |
| --- | --- | --- | --- |
| `color-text-primary` | `gray-neutral-900` | `#1F1F1F` | 页面标题 / 重要信息 / 表单 Label / 关键数据 |
| `color-text-default` | `gray-neutral-700` | `#4A4A4A` | 正文说明 / 菜单项 / 输入内容 / 可阅读段落 |
| `color-text-secondary` | `gray-neutral-600` | `#6B6B6B` | 说明文案 / 表格补充信息 / 次要状态描述 / Helper Text |
| `color-text-tertiary` | `gray-neutral-500` | `#8C8C8C` | Placeholder / 说明尾注 / 计数器 / 低优先级信息 |
| `color-text-disabled` | `gray-neutral-400` | `#BFBFBF` | Disabled 文本 / 禁用输入 / 不可用操作 |
| `color-text-inverse` | `white` | `#FFFFFF` | 深色底 / Primary Button / 深色标签 / 深色浮层内容 |
| `color-text-link` | `info-600` | `#1887F5` | 可点击文本 / 跳转入口 / 外部资源访问 |
| `color-text-link-hover` | `info-700` | `#1370E2` | 链接 Hover / 可点击文本强调 |
| `color-text-link-disabled` | `gray-neutral-400` | `#BFBFBF` | 禁用链接 / 不可点击文本入口 |

文字用途禁止直接使用 `gray-neutral-900`、`gray-neutral-600` 等 Primitive Token 表达，应优先使用 `color-text-*` Semantic Token。

示例：

```text
gray-neutral-900 → color-text-primary → Page Title / Form Label
gray-neutral-600 → color-text-secondary → Description / Helper Text
```

##### Background

| Semantic Token | Primitive Token | HEX | 使用场景 |
| --- | --- | --- | --- |
| `color-bg-page` | `gray-neutral-50` | `#FAFAFA` | 页面基础背景 |
| `color-bg-container` | `white` | `#FFFFFF` | Card / Form / 主要内容容器 |
| `color-bg-subtle` | `gray-neutral-100` | `#F5F5F5` | 次级区域 / 弱强调背景 |
| `color-bg-hover` | `gray-neutral-100` | `#F5F5F5` | 中性组件 Hover |
| `color-bg-selected` | `brand-100` | 随 Theme 改变 | Selected / Active 区域 |
| `color-bg-disabled` | `gray-neutral-100` | `#F5F5F5` | Disabled 控件背景 |
| `color-bg-inverse` | `gray-neutral-900` | `#1F1F1F` | Tooltip / 深色浮层背景 |

##### Border

| Semantic Token | Primitive Token | HEX | 使用场景 |
| --- | --- | --- | --- |
| `color-border-default` | `gray-neutral-300` | `#D9D9D9` | Input / Select / Card 常规边框 |
| `color-border-subtle` | `gray-neutral-200` | `#EDEDED` | Divider / 弱边界 |
| `color-border-strong` | `gray-neutral-400` | `#BFBFBF` | 强调边界 |
| `color-border-focus` | `brand-500` | 随 Theme 改变 | Focus 状态 |
| `color-border-disabled` | `gray-neutral-200` | `#EDEDED` | Disabled 控件边框 |

示例：

```text
gray-neutral-300 → color-border-default → input-border / select-border / card-border
```

##### Action

Action 类颜色必须跟随当前 Theme 的 Brand Color，不直接绑定固定绿色。

| Semantic Token | Primitive Token | HEX | 使用场景 |
| --- | --- | --- | --- |
| `color-action-primary` | `brand-500` | 随 Theme 改变 | Primary Button / Checkbox / Radio / Switch / Slider |
| `color-action-primary-hover` | `brand-600` | 随 Theme 改变 | 主要操作 Hover |
| `color-action-primary-active` | `brand-700` | 随 Theme 改变 | 主要操作 Active / Pressed |
| `color-action-primary-subtle` | `brand-100` | 随 Theme 改变 | 轻量选中态 / 品牌弱背景 |
| `color-action-primary-disabled` | `brand-200` | 随 Theme 改变 | 主要操作 Disabled |

示例：

```text
brand-500 → color-action-primary → button-primary-background
```

##### Status

Status Color 表达固定状态含义，不随 Brand Theme 改变。

| Semantic Token | Primitive Token | HEX | 使用场景 |
| --- | --- | --- | --- |
| `color-status-success` | `success-green-500` | `#1CC749` | Alert / Message / Badge / 任务成功 |
| `color-status-error` | `danger-500` | `#FE3D33` | Form Validation / Alert / Message 错误 |
| `color-status-error-hover` | `danger-600` | `#EC2116` | 错误状态 Hover / 强调错误背景 |
| `color-status-error-bg` | `danger-50` | `#FFF2F1` | 错误弱背景 |
| `color-status-error-bg-hover` | `danger-100` | `#FFE2E0` | 错误弱背景 Hover |
| `color-status-error-text` | `danger-600` | `#EC2116` | 错误文本 / 危险文字按钮 |
| `color-status-error-text-hover` | `danger-700` | `#C7170E` | 错误文本 Hover |
| `color-status-warning` | `warning-500` | `#FF990A` | 警告 / 待处理 / 中风险提示 |
| `color-status-warning-hover` | `warning-600` | `#FF8400` | 警告状态 Hover / 强调警告背景 |
| `color-status-warning-bg` | `warning-50` | `#FFFAEC` | 警告弱背景 |
| `color-status-warning-bg-hover` | `warning-100` | `#FFF4D3` | 警告弱背景 Hover |
| `color-status-warning-border` | `warning-400` | `#FFB232` | 警告弱边框 |
| `color-status-warning-text` | `warning-700` | `#CC6002` | 警告文本 / Testing 文字按钮 |
| `color-status-warning-text-hover` | `warning-800` | `#A14B0B` | 警告文本 Hover |
| `color-status-info` | `info-500` | `#31A6FF` | 信息反馈 / 进行中 / Notification |
| `color-status-info-hover` | `info-600` | `#1887F5` | 信息状态 Hover / 强调信息背景 |
| `color-status-info-bg` | `info-50` | `#EEF9FF` | 信息弱背景 |
| `color-status-info-bg-hover` | `info-100` | `#D9F0FF` | 信息弱背景 Hover |
| `color-status-info-text` | `info-600` | `#1887F5` | 信息文本 / Link 默认文本 |
| `color-status-info-text-hover` | `info-700` | `#1370E2` | 信息文本 Hover |

示例：

```text
danger-500 → color-status-error → form-error / alert-error / message-error
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

### 投影

投影用于表达弱层级、交互悬停、临时浮层和焦点可达性。组件应先判断投影承担的语义，再引用对应 token，不按视觉强弱临时挑选阴影值。

| Token | 值 | 语义 | 典型组件 |
| --- | --- | --- | --- |
| `shadow-surface` | `0 2px 6px rgba(20, 28, 36, 0.06)` | 弱层级投影，用于让静态轻量容器从背景中轻微浮起。 | 低强调卡片、统计卡片、轻量预览容器 |
| `shadow-hover` | `0 4px 12px rgba(20, 28, 36, 0.08)` | 交互悬停投影，用于表达可点击模块被指向或轻微抬升。 | Card hover、列表项 hover、可点击模块 |
| `shadow-overlay` | `0 12px 28px rgba(20, 28, 36, 0.12)` | 浮层投影，用于临时覆盖在页面之上的面板和菜单。 | Select Dropdown、DatePicker Panel、Popover、Menu |
| `shadow-focus` | `0 0 0 3px rgba(var(--brand-rgb), 0.16)` | 焦点环投影，用于键盘可达性、输入聚焦和需要明确定位当前操作对象的控件。 | Input、Select、Button、Slider、Segmented Control、主题选择卡 |
| `selector-focus-shadow` | `var(--shadow-focus)` | 选择器类组件获焦或展开时的固定投影参数，统一映射到 Focus Ring。 | Select、DatePicker、TimePicker、Pagination Size Select、主题/色板选择器 |

使用规则：

- 静态容器优先使用 `shadow-surface`，不要用高强度阴影制造层级。
- 交互 hover 只在可点击或可选中模块上使用 `shadow-hover`。
- 下拉、菜单、日期时间面板等临时浮层统一使用 `shadow-overlay`。
- 控件输入焦点和配置卡片焦点统一使用 `shadow-focus`。
- Select、DatePicker、TimePicker、Pagination Size Select、主题/色板选择器等选择器类组件的 focus/open 状态必须使用 `selector-focus-shadow`，不要直接写 rgba 或单独定义第二套选择器焦点投影。
- 焦点态必须配合明确边框或状态色，不只依赖阴影变化。

### 聚焦

- 焦点阴影：`shadow-focus`
- 选择器类组件获焦固定参数：`selector-focus-shadow = shadow-focus`

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
