# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

「铁馆指南」— 一个纯静态增肌减脂训练手册网站，中文内容，部署在 GitHub Pages。

## Architecture

纯前端静态站，无构建工具、无框架、无包管理器。

```
index.html          — 单页应用，所有 section 在一个文件
css/style.css       — 全部样式，深色主题
js/exercises.js     — 动作数据（EXERCISES 对象），按肌群分组
js/main.js          — 交互逻辑：标签切换、弹窗、导航、滚动动画
```

### 数据流

- `EXERCISES` 对象（exercises.js）是唯一数据源，按 `chest/back/legs/shoulders/arms/core` 分组
- `renderExercises(group)` 读取数据生成卡片列表
- 点击"查看详情"按钮打开弹窗，弹窗中如果有 `video` 字段则嵌入 musclewiki 的 MP4 视频
- 视频来源：`https://media.musclewiki.com/media/uploads/videos/branded/male-{exercise-name}-front.mp4`

### Key Patterns

- 肌群标签切换：`.muscle-tab[data-group]` → `renderExercises(group)`
- 弹窗：`.modal-overlay#exerciseModal`，通过 JS innerHTML 动态填充
- 滚动动画：`requestAnimationFrame` + `ticking` 节流

## Development

```bash
# 本地预览（无构建步骤）
npx http-server -p 8123 --cors -c-1

# 部署：push 到 main 分支，GitHub Actions 自动部署到 Pages
```

## Conventions

- 中文内容，UI 文案和代码注释都用中文
- CSS 变量定义在 `:root`，深色主题
- 动作数据结构：`{ name, muscle, difficulty, sets, video?, steps[], tips[] }`
- `video` 字段为可选，没有视频的动作弹窗中不显示视频区域
