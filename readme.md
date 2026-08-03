# IQB Design System

IQB Design System 是面向 IQB Agent 平台的静态设计规范站点，当前以 HTML 页面承载组件说明、交互示例、状态展示、API 表格和设计 Token。

## 内容

- `index.html`: 组件总览，以及 Button、Input、InputNumber、Radio、Checkbox、Switch、Select、DatePicker、TimePicker、Card、Table 等入口或规范内容。
- `date-picker.html`: DatePicker 日期选择器独立规范页。
- `time-picker.html`: TimePicker 时间选择器独立规范页。
- `upload.html`: Upload 上传组件独立规范页。
- `form.html`: Form 表单组件独立规范页。
- `table.html`: Table 表格组件独立规范页。
- `logo-cropped.png`: 站点品牌标识资源。
- `design.md`: 设计系统说明，包括设计原则、视觉 Token、组件结构和维护约定。

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

https://monica137142.github.io/iqb-designsystem/

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
- 新增组件时，同步补充使用场景、状态、尺寸、API 和 Token。
- 优先复用现有颜色、间距、圆角和阴影变量。
- 示例文案应贴近 IQB Agent 平台的真实业务语境。
- 避免提交本机系统文件，`.DS_Store` 已加入 `.gitignore`。

## 仓库

GitHub: https://github.com/monica137142/iqb-designsystem
