# Design System

Design System 是面向企业应用平台的静态设计规范站点，当前以 HTML 页面承载组件说明、交互示例、状态展示、API 表格和设计 Token。

## 内容

- `index.html`: 组件总览与全局样式入口。
- `general/button.html`: Button 按钮独立规范页。
- `general/typography.html`: Typography 排版独立规范页。
- `layout/divider.html`: Divider 分割线独立规范页。
- `layout/space.html`: Space 间距独立规范页。
- `layout/grid.html`: Grid 栅格独立规范页。
- `layout/layout.html`: Layout 布局独立规范页。
- `layout/splitter.html`: Splitter 分隔面板独立规范页。
- `dataentry/input.html`: Input 输入框独立规范页。
- `dataentry/input-number.html`: InputNumber 数字输入框独立规范页。
- `dataentry/radio.html`: Radio 单选框独立规范页。
- `dataentry/checkbox.html`: Checkbox 复选框独立规范页。
- `dataentry/switch.html`: Switch 开关独立规范页。
- `dataentry/select.html`: Select 选择器独立规范页。
- `dataentry/date-picker.html`: DatePicker 日期选择器独立规范页。
- `dataentry/time-picker.html`: TimePicker 时间选择器独立规范页。
- `dataentry/upload.html`: Upload 上传组件独立规范页。
- `dataentry/form.html`: Form 表单组件独立规范页。
- `dataentry/autocomplete.html`: AutoComplete 自动补全独立规范页。
- `dataentry/cascader.html`: Cascader 联级选择独立规范页。
- `dataentry/mentions.html`: Mentions 提及独立规范页。
- `dataentry/verification-code.html`: VerficationCode 验证码输入框独立规范页。
- `dataentry/rate.html`: Rate 评分独立规范页。
- `dataentry/slider.html`: Slider 滑块独立规范页。
- `datadisplay/table.html`: Table 表格组件独立规范页。
- `datadisplay/list.html`: List 列表独立规范页。
- `datadisplay/statistic.html`: Statistic 数值显示独立规范页。
- `datadisplay/chart.html`: Chart 图表独立规范页。
- `datadisplay/tag.html`: Tag 标签独立规范页。
- `datadisplay/tooltip.html`: Tooltip 提示气泡独立规范页。
- `datadisplay/avatar.html`: Avatar 头像独立规范页。
- `datadisplay/timeline.html`: Timeline 时间轴独立规范页。
- `datadisplay/carousel.html`: Carousel 轮播独立规范页。
- `datadisplay/collapse.html`: Collapse 折叠面板独立规范页。
- `datadisplay/image.html`: Image 图片独立规范页。
- `datadisplay/badge.html`: Badge 徽标独立规范页。
- `datadisplay/empty.html`: Empty 空状态独立规范页。
- `logo-cropped.png`: 站点品牌标识资源。
- `design.md`: 设计系统说明，包括设计原则、视觉 Token、组件结构和维护约定。

## Components

当前可复用组件包括：

- Button
- Typography
- Divider
- Space
- Grid
- Layout
- Splitter
- Input
- InputNumber
- Radio
- CheckBox
- Switch
- Select
- DatePicker
- TimePicker
- Upload
- Form
- AutoComplete
- Cascader
- Mentions
- VerficationCode
- Rate
- Slider
- Table
- List
- Statistic
- Chart
- Tag
- Tooltip
- Avatar
- Timeline
- Carousel
- Collapse
- Image
- Badge
- Empty

组件使用约定：

- 优先复用已有组件。
- 不要新建组件。
- 不存在时再提出建议。

## 本地预览

这是一个无构建依赖的静态站点，可以直接在浏览器中打开：

```bash
open index.html
```

也可以使用任意静态服务器预览，例如：

```bash
python3 -m http.server 8000
```

然后访问 `http://localhost:8000`。

## 在线访问

GitHub Pages 启用后，站点访问地址为：

https://example.github.io/design-system/

如果该地址返回 404，请在 GitHub 仓库中进入 `Settings` -> `Pages`，将 Source 设置为 `Deploy from a branch`，Branch 选择 `main`，目录选择 `/root`，保存后等待部署完成。

## 设计系统范围

当前规范围绕后台工作台和 Agent 配置场景展开，优先覆盖高频表单、选择、时间日期、上传和基础数据展示组件。

组件文档通常包含：

- 何时使用
- 基础用法
- 组合类型或布局
- 状态
- 尺寸
- API
- 设计 Token

## 维护约定

- 保持导航中的组件名称、页面标题和文档标题一致。
- 优先从 Components 清单中选择已有组件；确实不存在时，先提出新增建议。
- 调整组件状态时，同步更新状态示例、API 和设计 Token。
- 优先复用现有颜色、间距、圆角和阴影变量，不为同类状态重复定义新变量。
- 示例文案应贴近 企业应用平台的真实业务语境。
- 避免提交本机系统文件，`.DS_Store` 已加入 `.gitignore`。

## 仓库

GitHub: https://github.com/example/design-system
