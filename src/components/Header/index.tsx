import React from 'react';
import styles from './index.less';

interface HeaderProps {
  onMaskClick?: () => void;
  onLinkClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMaskClick, onLinkClick }) => {
  return (
    <div className={styles.navHeader}>
      <div className={styles.navHeaderLeft}>XieBia</div>
      <div className={styles.navHeaderRight}>
        <div className={`${styles.headerItem} ${styles.maskItem}`} onClick={onMaskClick}>
          蟹之面具
        </div>
        <div className={styles.headerItem} onClick={onLinkClick}>
          友情链接
        </div>
        <div className={styles.headerItem}>文章</div>
      </div>
    </div>
  );
};

export default Header;
