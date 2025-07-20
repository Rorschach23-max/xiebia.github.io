export const cssGridLayout = `# CSS Grid 布局详解

## 基本概念

CSS Grid 是一个二维布局系统，可以同时处理行和列。

## 基础用法

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px 100px;
  gap: 10px;
}
\`\`\`

## 常用属性

### 容器属性

- \`grid-template-columns\`
- \`grid-template-rows\`
- \`gap\`
- \`justify-items\`
- \`align-items\`

### 项目属性

- \`grid-column\`
- \`grid-row\`
- \`justify-self\`
- \`align-self\`

## 实用示例

\`\`\`css
.layout {
  display: grid;
  grid-template-areas: 
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: 80px 1fr 60px;
  height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
\`\`\``;
