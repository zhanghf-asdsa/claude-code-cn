# Claude Code 全局规则

这些规则将自动应用于所有项目和所有会话。

## 环境信息

- **操作系统**: Windows 10
- **命令环境**: Windows 命令行（cmd、PowerShell）
- **编码问题**: 窗口可能会出现中文乱码，需要特别注意

### 命令执行规范

1. **使用 Windows 命令格式**
   - 文件路径使用反斜杠 `\` 或双反斜杠 `\\`
   - 使用 `cmd /c` 执行命令
   - 使用 `powershell -Command` 执行 PowerShell 命令
   - 目录操作使用 `dir` 而非 `ls`

2. **中文乱码处理**
   - 设置 UTF-8 编码：`chcp 65001`
   - Python 脚本添加：`# -*- coding: utf-8 -*-`
   - 输出中文时使用适当的编码处理
   - 避免在命令行直接输出大量中文

3. **路径处理示例**
   ```
   ✅ 正确: C:\Users\张海峰\Documents
   ✅ 正确: C:\\Users\\张海峰\\Documents
   ❌ 错误: /Users/张海峰/Documents (Linux 格式)
   ```

## 语言要求
- **所有回答必须使用中文**与用户交流
- 代码注释应使用中文
- 错误信息和说明使用中文

## 组件使用规范

使用任何组件（MCP、Skill、Plugin、Agent、Command、Hook、Script）时，必须明确提示：

```
📦 正在使用：[组件名称]
📍 路径/包名：[具体路径或包名]
🎯 用途：[使用目的]
```

### 各组件类型示例格式

**🌐 MCP 服务器：**
```
📦 正在使用：context7 MCP 服务器
📍 包名：@modelcontextprotocol/server-context7
🎯 用途：查询编程文档和代码示例
```

**⚡ Skills 技能：**
```
📦 正在使用：code-reviewer Skill
📍 路径：~/.claude/skills/code-reviewer
🎯 用途：审查代码质量和最佳实践
```

**🔌 Plugins 插件：**
```
📦 正在使用：superpowers Plugin
📍 来源：superpowers-marketplace
🎯 用途：提供开发工作流技能库
```

**🤖 Agents 子代理：**
```
📦 正在使用：Explore Agent
📍 路径：~/.claude/agents/explore.md
🎯 用途：快速探索代码库结构
```

**💻 Commands 命令：**
```
📦 正在使用：/commit 命令
📍 路径：~/.claude/commands/commit.md
🎯 用途：生成 Git 提交信息
```

**🪝 Hooks 钩子：**
```
📦 正在使用：session-start Hook
📍 路径：~/.claude/hooks/session-start/
🎯 用途：会话开始时自动执行初始化
```

**📜 Scripts 脚本：**
```
📦 正在使用：generate-all-components.py
📍 路径：~/.claude/scripts/generate-all-components.py
🎯 用途：扫描并生成组件浏览器页面
```

## 其他行为规范

1. **操作确认**：重要操作（删除、覆盖、重构）前先确认
2. **位置提示**：代码修改后提示文件路径和行号，格式：`文件路径:行号`
3. **任务管理**：复杂任务使用 TodoWrite 工具进行任务追踪
4. **简洁沟通**：回复简洁明了，避免过度冗长
