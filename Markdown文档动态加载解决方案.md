# Markdown 文档动态加载解决方案

## 🎯 问题原因

你的项目之前只能读取 TypeScript 文件而不能直接读取 Markdown 文件的原因是：

### 原来的实现方式：

```
Markdown 内容 → 硬编码到 .ts 文件 → 导出为字符串常量 → 静态导入到 constants
```

**问题：**

1. 文档内容被硬编码在 TypeScript 文件中
2. 每次添加文档都需要修改多个文件
3. 无法直接使用 `.md` 文件，维护困难

## ✅ 解决方案实现

### 1. 创建动态加载 Hook

```typescript
// src/hooks/useMarkdownLoader.ts
export const useMarkdownLoader = (filename: string | null) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!filename) return;

    const loadMarkdown = async () => {
      try {
        // 从 public/docs/ 目录加载
        const response = await fetch(`/docs/${filename}`);
        const text = await response.text();
        setContent(text);
      } catch (err) {
        setError('加载失败');
        setContent('# 加载失败\n\n无法加载文档内容');
      }
    };

    loadMarkdown();
  }, [filename]);

  return { content, loading, error };
};
```

### 2. 更新数据结构

```typescript
// src/constants/index.ts
export interface DocItem {
  id: number;
  title: string;
  content?: string; // 可选：保留兼容性
  filename?: string; // 新增：Markdown文件名
  category: string;
  createTime: string;
  updateTime: string;
}

// 示例：混合使用新旧方式
export const docList: DocItem[] = [
  {
    id: 1,
    title: 'React Hooks 使用指南',
    filename: 'react-hooks-guide.md', // 🆕 动态加载
    category: '技术文档',
    createTime: '2024-01-15',
    updateTime: '2024-01-20',
  },
  {
    id: 8,
    title: 'Git 工作流最佳实践',
    content: gitWorkflow, // 🔄 保留旧方式
    category: '工具使用',
    createTime: '2024-01-12',
    updateTime: '2024-01-16',
  },
];
```

### 3. 更新 DocViewer 组件

```typescript
// src/pages/Xiebia/components/DocViewer.tsx
const DocViewer: React.FC<DocViewerProps> = ({ selectedDoc }) => {
  const { docViewerRef } = useDocViewerScroll();

  // 🆕 动态加载Markdown文件
  const {
    content: markdownContent,
    loading,
    error,
  } = useMarkdownLoader(selectedDoc?.filename || null);

  // 🔄 兼容处理：优先使用动态内容，备选静态内容
  const displayContent = markdownContent || selectedDoc?.content || '';

  return (
    <div className={styles.docViewerContainer}>
      {/* 加载状态显示 */}
      {loading && <div className={styles.loading}>加载中...</div>}
      {error && <div className={styles.error}>加载失败: {error}</div>}

      {/* Markdown 渲染 */}
      <ReactMarkdown>{displayContent}</ReactMarkdown>
    </div>
  );
};
```

### 4. 文件存放位置

```
项目根目录/
├── public/
│   └── docs/                    # 🆕 Markdown 文件存放位置
│       ├── react-hooks-guide.md
│       ├── 页面滑动交互的实现.md
│       └── ...
├── src/
│   ├── hooks/
│   │   └── useMarkdownLoader.ts # 🆕 动态加载 Hook
│   └── assets/docs/             # 🔄 保留旧的 TS 文件（向后兼容）
│       ├── index.ts
│       └── *.ts
```

## 🚀 使用方式

### 添加新的 Markdown 文档：

1. **创建 `.md` 文件**：

   ```bash
   # 在 public/docs/ 目录下创建
   public/docs/new-article.md
   ```

2. **更新 constants**：

   ```typescript
   // src/constants/index.ts
   {
     id: 10,
     title: '新文章标题',
     filename: 'new-article.md',  // 🎯 只需要文件名
     category: '技术文档',
     createTime: '2024-01-22',
     updateTime: '2024-01-22',
   }
   ```

3. **自动工作** ✨：
   - DocViewer 自动检测到 `filename` 字段
   - 动态加载对应的 Markdown 文件
   - 支持完整的 Markdown 语法和代码高亮

## 💡 优势对比

### 🔴 原来的方式：

- ❌ 内容硬编码在 TypeScript 文件中
- ❌ 每次添加文档需要修改多个文件
- ❌ 无法直接编辑 Markdown 文件
- ❌ 维护困难

### ✅ 新的方式：

- ✅ 直接使用 `.md` 文件
- ✅ 添加文档只需创建文件和更新配置
- ✅ 支持动态加载和错误处理
- ✅ 向后兼容原有内容
- ✅ 编辑体验友好

## 🔧 技术细节

### 文件访问原理：

- `public/` 目录中的文件可以通过 HTTP 请求访问
- `fetch('/docs/filename.md')` 等同于访问 `public/docs/filename.md`
- 浏览器会自动处理文件路径解析

### 错误处理：

- 网络请求失败时显示错误信息
- 文件不存在时回退到静态内容
- 加载状态的用户友好提示

### 性能优化：

- 只有选中文档时才加载对应文件
- 使用 React Hook 的依赖数组避免重复加载
- 错误状态缓存，避免重复请求失败的文件

## 🎉 现在你可以：

1. **直接编辑 `.md` 文件**：在 `public/docs/` 中编辑
2. **即时预览**：保存后刷新页面即可看到更新
3. **轻松添加文档**：只需创建 `.md` 文件并更新配置
4. **保持兼容性**：旧的内容仍然正常工作

现在文档系统既支持动态 Markdown 文件，又保持了向后兼容性！🎊
