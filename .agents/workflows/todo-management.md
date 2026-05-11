# Workflow: Todo Task Management

## Description
指导 Agent 如何对当前项目的 todo task 进行 CRUD 操作。每个 task 对应一个 `.agents/todos/<name>.md` 文件。

## Task 文件模板

每个 task 文件应包含以下结构：

### 1. Title
文件名：`<kebab-case-name>-todo.md`，标题为一级标题。

### 2. Metadata
文件头包含元信息：

```
> **Created**: YYYY-MM-DD | **Updated**: YYYY-MM-DD
> **Priority**: P0 | P1 | P2 | P3 | P4
> **Status**: 🔲 Pending | 🔄 In Progress | ✅ Completed | ❌ Cancelled
> **Version**: 1.0
```

### 3. 实现现状和原理
当前项目关于该 task 领域的实现状态描述、关键代码位置、数据流等。此部分帮助读者理解 "为什么需要这个 task" 和 "当前处于什么状态"。

### 4. 目标任务和可选方案
task 的目标、可选实现方案、各方案的优缺点对比、推荐的方案（如有）。

### 5. Todo 列表
可勾选的子任务列表，支持嵌套：

```
- [ ] 主任务 1
  - [ ] 子任务 1.1
  - [ ] 子任务 1.2
- [ ] 主任务 2
```

## CRUD 操作规则

### Create
1. 确认 `.agents/todos/` 中不存在同名文件
2. 按模板创建 `<name>-todo.md`
3. 更新 `.agents/todos/README.md` 的索引（添加引用行）
4. 提交：`chore: add <name> todo`

### Read（查询）
- 遍历 `.agents/todos/*.md` 文件
- 按需 grep 过滤：`Priority`、`Status`、名称等
- 工具：`grep -l 'P0' .agents/todos/*.md` 列出 P0 任务

### Update
1. 修改 task 文件内容（描述、方案、todo 列表等）
2. 更新 `Updated` 日期和版本号
3. 如果状态变更，同步更新 `Status` 标记
4. 如果 todo 项完成，将 `[ ]` 改为 `[x]`
5. 同步更新 `.agents/todos/README.md` 索引中的状态
6. 提交：`chore: update <name> todo`

### Delete
1. 从 `.agents/todos/` 中删除文件
2. 从 `.agents/todos/README.md` 中移除引用
3. 提交：`chore: remove <name> todo`

## 优先级定义

| 级别 | 含义 | 示例 |
|------|------|------|
| **P0** | 阻塞级，必须立即处理 | 数据库迁移失败、核心链路不通 |
| **P1** | 高优先级，影响核心功能 | 必须发布的功能、严重 bug |
| **P2** | 中优先级，能力扩建 | 新功能、性能优化 |
| **P3** | 低优先级，生产加固/质量提升 | 安全、监控、错误处理 |
| **P4** | 非必要，文档/体验/优化 | 注释、格式、辅助工具 |

## 状态定义

| 状态 | 含义 | 后续动作 |
|------|------|----------|
| `🔲 Pending` | 待开始 | 等待资源或被调度 |
| `🔄 In Progress` | 进行中 | 正在实现的 task，同一时间仅一个 |
| `✅ Completed` | 已完成 | 所有 todo 已勾选，可归档 |
| `❌ Cancelled` | 已取消 | 不再需要，可删除文件 |

## 提交规范

| 场景 | 提交信息 |
|------|---------|
| 创建新 task | `chore: add <name> todo` |
| 更新 task | `chore: update <name> todo` |
| 删除 task | `chore: remove <name> todo` |
| 标记完成 | `chore: mark <name> done` |
| 归档过期 task | `chore: archive <name> todo` |

## 示例

### 创建（已存在）
```bash
# 查看现有 todos
ls .agents/todos/*.md

# 确认不重名
# 创建文件 .agents/todos/rate-limiting-todo.md
# 编辑 README.md 添加索引
# 提交
git add -A && git commit -m "chore: add rate-limiting todo"
```

### 更新（标记完成）
```bash
# 修改 .agents/todos/xxx.md 中的 todo 项
#   把 [ ] 改为 [x]
# 更新 metadata 中的 Updated 日期和 Status
# 同步更新 README.md 索引
# 提交
git add -A && git commit -m "chore: mark rate-limiting done"
```

### 删除
```bash
rm .agents/todos/xxx.md
# 移除 README.md 中的引用
git add -A && git commit -m "chore: remove xxx todo"
```
