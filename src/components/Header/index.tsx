import React from 'react';
import styles from './index.less';

const Header: React.FC = () => {
  return (
    <div className={styles.navHeader}>
      <div className={styles.navHeaderLeft}>XieBia</div>
      <div className={styles.navHeaderRight}>
        <div className={styles.headerItem}>蟹之面具</div>
        <div className={styles.headerItem}>友情链接</div>
        <div className={styles.headerItem}>文章</div>
      </div>
    </div>
  );
};

export default Header;
