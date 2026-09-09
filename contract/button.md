# Button Component Contract

本文件是 Button 的 AI Coding 生成契约。实现或修改按钮时，以 `styles/button.css` 为样式 Source of Truth；不得根据截图重新猜测颜色、透明度、尺寸或状态。

## 推荐组件接口

```ts
type ButtonVariant =
  | "primary"
  | "secondary"
  | "brandOutline"
  | "neutralOutline"
  | "neutralDashed"
  | "text";

type ButtonStatus = "default" | "success" | "testing" | "info" | "danger";
type ButtonSize = "small" | "medium" | "default" | "large";

interface ButtonProps {
  variant?: ButtonVariant;
  status?: ButtonStatus;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  iconOnly?: boolean;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
}
```

默认值：`variant="neutralOutline"`、`status="default"`、`size="default"`、`type="button"`。

## 类名映射

| API 值 | HTML / CSS 类名 | 中文名称 |
| --- | --- | --- |
| `primary` | `spec-btn primary` | 主要按钮 |
| `secondary` | `spec-btn permission` | 次要按钮 |
| `brandOutline` | `spec-btn ghost-primary` | 实线按钮（彩） |
| `neutralOutline` | `spec-btn solid` | 实线按钮（灰） |
| `neutralDashed` | `spec-btn dashed` | 虚线按钮（灰） |
| `text` | `spec-btn text` | 文字按钮 |
| `small` | `small` | 28px |
| `medium` | `medium` | 30px |
| `default` | 无尺寸类名 | 32px |
| `large` | `large` | 36px |
| `iconOnly=true` | `icon-only` | 仅图标按钮 |

## 基础变体状态矩阵

| Variant | Default | Hover | Focus Visible | Disabled |
| --- | --- | --- | --- | --- |
| Primary | 文字 `color-text-inverse`；背景和描边 `color-action-primary` | 背景和描边 `color-action-primary-hover` | 保留当前状态并增加 `shadow-focus` | 保持 Default，整体透明度 `0.6`，不响应 Hover |
| Secondary | 文字 `color-text-primary`；背景 `color-bg-subtle`；透明描边 | 背景 `color-border-subtle` | 增加 `shadow-focus` | 保持 Default，透明度 `0.6` |
| Brand Outline | 文字 `color-action-primary-hover`；50% `color-action-primary` 描边；透明背景 | 60% 品牌色描边；10% 品牌色背景 | 增加 `shadow-focus` | 保持 Default，透明度 `0.6` |
| Neutral Outline | 文字 `color-text-default`；背景 `color-bg-container`；描边 `color-border-default` | 文字和描边保持不变；背景为 10% 黑色语义色 `color-text-primary` | 增加 `shadow-focus` | 保持 Default，透明度 `0.6` |
| Neutral Dashed | 文字 `color-text-default`；背景 `color-bg-container`；虚线描边 `color-border-default` | 文字和虚线描边保持不变；背景为 10% 黑色语义色 `color-text-primary` | 增加 `shadow-focus` | 保持 Default，透明度 `0.6` |
| Text | 文字 `color-text-default`；背景和描边透明 | 文字 `color-text-primary`；背景 `color-bg-subtle`；描边透明 | 增加 `shadow-focus` | 保持 Default，透明度 `0.6` |

透明品牌色必须使用 `color-mix()`，不得创建 RGB 辅助变量，不得直接写 HEX、RGB 或 RGBA：

```css
background: color-mix(in srgb, var(--color-action-primary) 10%, transparent);
border-color: color-mix(in srgb, var(--color-action-primary) 50%, transparent);
```

## Status 状态按钮

`status` 不改变按钮的层级逻辑。Testing、Info、Danger 替换为固定状态色；Success 表达随主题变化的正向品牌操作，必须使用 Brand / Action Token，不创建 Success Semantic Token 或 Button Success Component Token。

| 类型 | Success | Testing | Info | Danger |
| --- | --- | --- | --- | --- |
| Primary | `success-primary` | `warning-primary` | `info-primary` | `danger` |
| Outline | `success-secondary` | `warning-secondary` | `info-secondary` | `danger-secondary` |
| Subtle | `success-subtle` | `warning-subtle` | `info-subtle` | `danger-subtle` |
| Text | `success-text` | `warning-text` | `info-text` | `danger-text` |

- Primary：状态色实底与描边；Hover 使用对应状态 Hover 色。Success 使用 `color-action-primary`，Hover 使用 `color-action-primary-hover`。
- Outline：Default 使用 50% 状态色描边和透明背景；Hover 使用 60% 状态色描边及 10% 状态色背景。
- Subtle：Default 使用 10% 状态色背景和透明描边；Hover 使用 20% 状态色背景。
- Success 的 Outline、Subtle、Text 透明色统一通过 `color-mix()` 基于 `color-action-primary` 计算，百分比与上述层级规则一致。
- Text：Default 背景和描边透明；Hover 使用 10% 状态色背景，描边保持透明。
- Disabled：保留对应类型的 Default 颜色，整体透明度为 `0.6`，禁止出现 Hover 增强。

## 尺寸与结构

| Token | 值 | 用途 |
| --- | --- | --- |
| `button-height-small` | `28px` | Small |
| `button-height-medium` | `30px` | Medium |
| `button-height-default` | `32px` | Default |
| `button-height-large` | `36px` | Large |
| `button-radius` | `6px` | 所有标准按钮 |
| `button-icon-size` | `14px` | 按钮内图标 |
| `button-icon-only-size` | `32px` | 默认仅图标按钮宽高 |
| `button-gap` | `5px` | 图标与文字间距 |
| `button-motion-duration` | `0.15s` | 颜色和描边过渡 |

按钮内容顺序固定为“前置图标 → 文案 → 后置图标”。加载状态用加载图标替换前置图标并保留按钮原宽度，避免布局抖动。

无容器的 `icon-only icon-plain` 按钮 Default 使用透明背景和透明描边；Hover 使用 10% 黑色语义色 `color-text-primary` 作为背景，描边保持透明；Disabled 不响应 Hover。

## 可访问性和行为约束

- 必须使用原生 `<button>`；导航行为使用 `<a>` 并复用等价视觉类，不用 `div` 模拟按钮。
- 未明确提交表单时必须设置 `type="button"`。
- 仅图标按钮必须提供可读的 `aria-label`。
- `loading=true` 时同时设置 `disabled` 或 `aria-disabled="true"`，并用 `aria-busy="true"` 表达处理中。
- Disabled 状态禁止触发点击事件，鼠标样式使用 `default`。
- 键盘焦点统一使用 `shadow-focus`，不得移除焦点反馈。
- 同一操作区原则上只出现一个 Primary Button；危险主操作只在明确的确认场景使用。
- 所有颜色必须引用 Semantic Token；透明品牌色允许通过 `color-mix()` 直接基于 `color-action-primary` 计算，不得写 HEX、RGB 或 RGBA。

## AI Coding 输出示例

```html
<button class="spec-btn primary" type="button">保存</button>
<button class="spec-btn permission" type="button">取消</button>
<button class="spec-btn ghost-primary" type="button">查看详情</button>
<button class="spec-btn dashed" type="button">添加标签</button>
<button class="spec-btn success-secondary" type="button">验证通过</button>
<button class="spec-btn danger-secondary" type="button">删除</button>
<button class="spec-btn solid icon-only" type="button" aria-label="刷新">
  <svg class="spec-icon" aria-hidden="true"><!-- icon path --></svg>
</button>
<button class="spec-btn primary" type="button" disabled aria-busy="true">
  <span class="loading-dot" aria-hidden="true"></span>处理中
</button>
```

## 生成前检查清单

- Variant、Status、Size 均来自本 Contract 的合法枚举。
- 颜色只使用 Semantic Token 或规定的 Component Token。
- Hover 与 Disabled 状态不冲突。
- Focus Visible 清晰可见。
- Icon-only 提供 `aria-label`。
- Loading 保持按钮原宽度并声明 `aria-busy`。
