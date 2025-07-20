import { DocItem, docList } from '@/constants';
import React, { useMemo } from 'react';
import { useDocListScroll } from '../hooks/useDocListScroll';
import styles from '../index.less';

interface DocListProps {
  selectedCategory: string | null;
  selectedDoc: DocItem | null;
  onDocSelect: (doc: DocItem) => void;
}

const DocList: React.FC<DocListProps> = ({ selectedCategory, selectedDoc, onDocSelect }) => {
  const { docListRef } = useDocListScroll();

  const filteredDocs = useMemo(() => {
    if (!selectedCategory) return docList;
    return docList.filter(doc => doc.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className={styles.docListContainer}>
      <div className={styles.docListHeader}>
        <h3>
          {selectedCategory ? `${selectedCategory}` : '全部文档'}
          <span className={styles.count}>({filteredDocs.length})</span>
        </h3>
      </div>
      <div className={styles.docListContent} ref={docListRef}>
        {filteredDocs.map(doc => (
          <div
            key={doc.id}
            className={`${styles.docItem} ${selectedDoc?.id === doc.id ? styles.selected : ''}`}
            onClick={() => onDocSelect(doc)}
          >
            <div className={styles.docTitle}>{doc.title}</div>
            <div className={styles.docMeta}>
              <span className={styles.category}>{doc.category}</span>
              <span className={styles.date}>{doc.updateTime}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocList;
