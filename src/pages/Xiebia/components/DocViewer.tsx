import { DocItem } from '@/constants';
import { useMarkdownLoader } from '@/hooks/useMarkdownLoader';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useDocViewerScroll } from '../hooks/useDocViewerScroll';
import styles from '../index.less';

interface DocViewerProps {
  selectedDoc: DocItem | null;
}

const DocViewer: React.FC<DocViewerProps> = ({ selectedDoc }) => {
  const { docViewerRef } = useDocViewerScroll();

  // 动态加载Markdown文件
  const {
    content: markdownContent,
    loading,
    error,
  } = useMarkdownLoader(selectedDoc?.filename || null);

  // 确定使用的内容：优先使用动态加载的内容，其次使用静态内容
  const displayContent = markdownContent || selectedDoc?.content || '';

  // 图片路径转换函数
  const transformImagePath = (src: string): string => {
    // 如果已经是完整的URL（http/https），直接返回
    if (src.startsWith('http://') || src.startsWith('https://')) {
      return src;
    }

    // 如果是绝对路径（包含盘符），需要转换
    if (src.includes(':\\')) {
      // 提取文件名
      const fileName = src.split(/[\\\/]/).pop() || '';

      // 如果路径包含 public/docs，提取相对于 public 的路径
      const publicIndex = src.indexOf('public');
      if (publicIndex !== -1) {
        const relativePath = src.substring(publicIndex + 6); // 去掉 "public"
        return relativePath.replace(/\\/g, '/'); // 统一使用正斜杠
      }

      // 如果是建站过程相关的图片，放到对应目录
      if (selectedDoc?.filename === '建站过程.md') {
        return `/docs/建站过程/${fileName}`;
      }

      // 其他情况，尝试从docs目录查找
      return `/docs/${fileName}`;
    }

    // 如果是相对路径，需要基于当前文档路径进行转换
    if (!src.startsWith('/')) {
      // 获取当前文档的目录
      const currentDocFile = selectedDoc?.filename || '';
      const docName = currentDocFile.replace('.md', '');

      // 如果路径包含目录分隔符，说明是相对路径
      if (src.includes('/')) {
        return `/docs/${src}`;
      } else {
        // 单独的文件名，根据当前文档推断目录
        return `/docs/${docName}/${src}`;
      }
    }

    // 已经是绝对路径（以/开头），直接返回
    return src;
  };

  if (!selectedDoc) {
    return (
      <div className={styles.docViewerContainer}>
        <div className={styles.noDocSelected}>
          <p>请选择一个文档查看</p>
          <p>从左侧列表中选择文档开始阅读</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.docViewerContainer}>
      <div className={styles.docHeader}>
        <h2>{selectedDoc.title}</h2>
        <div className={styles.docInfo}>
          <span className={styles.category}>{selectedDoc.category}</span>
          <span className={styles.date}>最后更新: {selectedDoc.updateTime}</span>
        </div>
      </div>

      <div className={styles.docContent} ref={docViewerRef}>
        {loading ? (
          <div className={styles.loading}>
            <p>加载中...</p>
          </div>
        ) : error ? (
          <div className={styles.error}>
            <p>加载失败: {error}</p>
            <p>尝试显示备用内容...</p>
          </div>
        ) : null}

        <ReactMarkdown
          components={{
            code({ inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter style={tomorrow} language={match[1]} PreTag="div" {...props}>
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            // 🆕 添加图片处理器
            img({ src, alt, ...props }: any) {
              const transformedSrc = transformImagePath(src || '');
              return (
                <img
                  src={transformedSrc}
                  alt={alt || ''}
                  className={styles.markdownImage}
                  onError={e => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'block';
                    target.style.padding = '20px';
                    target.style.backgroundColor = '#f8f9fa';
                    target.style.border = '1px dashed #dee2e6';
                    target.style.borderRadius = '4px';
                    target.style.textAlign = 'center';
                    target.style.color = '#6c757d';
                    target.alt = `图片加载失败: ${alt || src}`;
                  }}
                  {...props}
                />
              );
            },
          }}
        >
          {displayContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default DocViewer;
