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
          }}
        >
          {displayContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default DocViewer;
