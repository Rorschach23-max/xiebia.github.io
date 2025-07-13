import React from 'react';
import styles from '../index.less';

interface ScrollIndicatorProps {
  currentSection: number;
  onSectionClick: (section: number) => void;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ currentSection, onSectionClick }) => {
  return (
    <div className={styles.scrollIndicator}>
      <div
        className={`${styles.indicator} ${currentSection === 0 ? styles.active : ''}`}
        onClick={() => onSectionClick(0)}
      />
      <div
        className={`${styles.indicator} ${currentSection === 1 ? styles.active : ''}`}
        onClick={() => onSectionClick(1)}
      />
    </div>
  );
};

export default ScrollIndicator;
