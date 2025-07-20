import { DocItem } from '@/constants';
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
          {selectedDoc.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default DocViewer;
