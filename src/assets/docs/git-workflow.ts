export const gitWorkflow = `# Git 工作流最佳实践

## 分支策略

### Git Flow

- \`main\` - 生产分支
- \`develop\` - 开发分支
- \`feature/\` - 功能分支
- \`release/\` - 发布分支
- \`hotfix/\` - 热修复分支

## 提交规范

使用 Conventional Commits 规范：

\`\`\`
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
\`\`\`

### 常用类型

- \`feat\`: 新功能
- \`fix\`: 修复问题
- \`docs\`: 文档更改
- \`style\`: 代码格式
- \`refactor\`: 重构
- \`test\`: 测试
- \`chore\`: 构建过程或辅助工具

## 实用命令

\`\`\`bash
# 创建并切换分支
git checkout -b feature/new-feature

# 暂存修改
git stash

# 恢复暂存
git stash pop

# 交互式重基
git rebase -i HEAD~3
\`\`\`

## 最佳实践

1. 频繁提交小的更改
2. 编写清晰的提交信息
3. 使用分支进行功能开发
4. 定期同步远程仓库`;
