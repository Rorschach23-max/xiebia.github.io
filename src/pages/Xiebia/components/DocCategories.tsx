import { docCategories } from '@/constants';
import React from 'react';
import styles from '../index.less';

interface DocCategoriesProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

const DocCategories: React.FC<DocCategoriesProps> = ({ selectedCategory, onCategorySelect }) => {
  return (
    <div className={styles.tab}>
      <div className={styles.docCategoriesTab}>
        <div className={styles.docCategoriesTabTitle}>
          <span>文档分类</span>
        </div>
        <div className={styles.docCategoriesItems}>
          <div
            className={`${styles.categoryItem} ${selectedCategory === null ? styles.selected : ''}`}
            onClick={() => onCategorySelect(null)}
          >
            全部文档
          </div>
          {docCategories.map(category => (
            <div
              key={category.id}
              className={`${styles.categoryItem} ${
                selectedCategory === category.name ? styles.selected : ''
              }`}
              onClick={() => onCategorySelect(category.name)}
            >
              {category.name}
              <span className={styles.count}>({category.count})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocCategories;
