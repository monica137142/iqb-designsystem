# Tabs Component Contract

本文件是 Tabs 标签页的 AI Coding 生成契约。实现或修改 Tabs 时，必须先遵循 `design.md` 的 Semantic Color、Font Style 与 Radius 规则；当前样式 Source of Truth 为 `navigation/tabs.html` 中的 `Tabs documentation demos` 区块。

## 推荐组件接口

```ts
type TabsSize = "small" | "default" | "large";
type TabsType = "line" | "text" | "rounded" | "capsule" | "card";
type TabsPosition = "top" | "bottom" | "left" | "right";

interface TabsProps {
  activeTab?: string;
  defaultActiveTab?: string;
  size?: TabsSize;
  type?: TabsType;
  tabPosition?: TabsPosition;
  editable?: boolean;
  showAddButton?: boolean;
  disabled?: boolean;
  onChange?: (key: string) => void;
}
```

默认值：`size="default"`、`type="line"`、`tabPosition="top"`、`editable=false`、`showAddButton=true`。

## 语义映射

| 角色 | Component Token | 全局 Semantic Token |
| --- | --- | --- |
| 默认文字 | `tabs-color` | `color-text-secondary` |
| Hover 文字 | `tabs-hover-color` | `color-text-primary` |
| Line / Capsule / Card 激活文字 | `tabs-active-color` | `color-text-primary` |
| Text 选中文字 | `tabs-text-active-color` | `color-action-primary` |
| 实色背景激活文字 | `tabs-active-color-inverse` | `color-text-inverse` |
| 禁用文字 | `tabs-disabled-color` | `color-text-disabled` |
| 指示器 / 实色激活背景 | `tabs-indicator-color` / `tabs-bg-active` | `color-action-primary` |
| Hover / 弱背景 | `tabs-bg-hover` / `tabs-bg-subtle` | `color-bg-hover` / `color-bg-subtle` |
| 边界 | `tabs-border-color` | `color-border-subtle` |
| 面板正文 | `tabs-panel-color` | `color-text-default` |
| 附加操作 | `tabs-action-*` | 对应 Text / Background / Border Semantic Token |

组件选择器不得直接引用 Primitive Color，也不得写 HEX、RGB 或 RGBA。

## 文字与圆角

| API | Font Style | Radius |
| --- | --- | --- |
| `small` | 默认 Caption；选中 Caption-Medium | 按 `type` 使用组件圆角 token |
| `default` | Body；激活态使用 Body-Medium 字重 | 按 `type` 使用组件圆角 token |
| `large` | Body-Large；激活态使用强调字重 | 按 `type` 使用组件圆角 token |
| `line` / `text` Hover | — | `tabs-hover-radius` → `radius-small` |
| `card` / Capsule 轨道 | — | `tabs-radius` → `radius-default` |
| Capsule 内部项 | — | `tabs-capsule-radius` → `radius-small` |
| Rounded / 指示器 | — | `tabs-rounded-radius` / `tabs-indicator-radius` → `radius-full` |

所有 Large 样式统一使用 `tabs-height-large: 40px`，不因 Line、Text、Rounded、Capsule 或 Card 类型改变高度。

## 状态与可访问性

- 页签栏使用 `role="tablist"`，页签使用原生 `button` 与 `role="tab"`。
- 当前项设置 `aria-selected="true"`，并通过 `aria-controls` 关联 `role="tabpanel"`。
- 禁用项使用原生 `disabled`；禁用态不响应 Hover 或点击。
- 键盘支持方向键移动焦点，方向由 `tabPosition` 决定，并支持 Home / End。
- `focus-visible` 使用 `shadow-focus`，不得移除焦点反馈。
- Rounded 选中态本身不使用投影；仅在键盘聚焦时通过 `focus-visible` 显示 `shadow-focus`。
- 实色品牌背景必须使用 `color-text-inverse`，保证亮暗模式下的文字对比关系。

## 生成前检查清单

- Size、Type、Position 均来自合法枚举。
- 颜色只经过 `--tabs-*` Component Token 映射到全局 Semantic Token。
- 字号、字重、行高完整绑定既有 Font Style，不拆分或临时写值。
- 圆角只使用 `radius-small`、`radius-default`、`radius-full` 的语义映射。
- 激活、Hover、Focus、Disabled 状态不冲突。
- Tab 与 TabPanel 的 ARIA 关系完整，键盘操作可用。
