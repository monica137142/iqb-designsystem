# Component Contract Index

`contract/` 是所有组件级实现契约的唯一存放目录。AI Coding 在创建、修改或评审组件前，必须先读取 `design.md`，再读取本目录中与目标组件同名的 Contract。

## Contract 清单

| Component | Contract | 状态 | 实现 Source of Truth |
| --- | --- | --- | --- |
| Button | [`button.md`](button.md) | Active | `styles/button.css` |
| Tabs | [`tabs.md`](tabs.md) | Active | `navigation/tabs.html`（Tabs component-local styles） |

## 文件约定

- 文件名使用组件英文名的小写 kebab-case，例如 `input-number.md`、`date-picker.md`。
- 一个文件只描述一个组件，不在 Contract 中重复定义全局 Semantic Token。
- Contract 必须包含：接口、变体、状态矩阵、尺寸、Token 映射、行为、可访问性、代码示例和生成检查清单。
- 新增组件 Contract 后，必须同步登记到本索引。
