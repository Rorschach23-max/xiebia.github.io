import { MaskItem, maskList } from '@/constants';
import React from 'react';
import { useMaskScroll } from '../hooks/useMaskScroll';
import styles from '../index.less';

interface MaskListProps {
  selectedMask: MaskItem | null;
  onMaskSelect: (mask: MaskItem) => void;
}

const MaskList: React.FC<MaskListProps> = ({ selectedMask, onMaskSelect }) => {
  const { maskItemsRef } = useMaskScroll();

  return (
    <div className={styles.tab}>
      <div className={styles.xiebiaMaskTab}>
        <div className={styles.xiebiaMaskTabTitle}>
          <span>蟹之面具</span>
        </div>
        <div className={styles.xiebiaMaskItems} ref={maskItemsRef}>
          {maskList.map(mask => (
            <div
              key={mask.id}
              className={`${styles.maskItem} ${
                selectedMask?.id === mask.id ? styles.selected : ''
              }`}
              onClick={() => onMaskSelect(mask)}
            >
              {mask.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MaskList;
