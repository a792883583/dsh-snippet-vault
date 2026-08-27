# dsh-snippet-vault

[English](README.en.md) · [Español](README.es.md)

DSH Web GUI 的常用 Prompt 提示词与指令库管理插件。在侧边栏提供快速入口，支持集中管理、分类归档、关键字搜索，并一键将常用的 Prompt 模板直接插入当前对话输入框或复制到剪贴板。

## 功能

- **侧边栏一键入口**：侧边栏配备「💡 提示词库」按钮，点击弹出全屏管理画板
- **分类与标签归档**：支持按开发、排错、审查、写作等自由分类，结构清晰
- **实时关键字检索**：支持按标题、分类、Prompt 正文极速模糊匹配
- **一键填入输入框**：点击「插入到输入框」直接注入当前对话输入框，自动触发事件；未定位到输入框时自动优雅回退为复制到剪贴板
- **动态占位符支持**：模板支持 `{{selected}}` 等通用占位符语法
- **浏览器本地持久化**：数据安全存储于 `localStorage`，断网可用，刷新不丢失
- **多语言**：中文 / English / Español 自动跟随宿主系统语言

## 界面预览

![提示词库](docs/vault.png)

## 安装

```sh
dsh plugin --profile web add dsh-snippet-vault
```

## 反馈

使用中遇到问题或有功能建议？欢迎到 [GitHub Issues](https://github.com/a792883583/dsh-snippet-vault/issues) 反馈，帮助我们把插件做得更好。

## License

MIT
