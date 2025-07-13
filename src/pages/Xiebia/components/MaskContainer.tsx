import { MaskItem, maskList } from '@/constants';
import React, { useEffect, useState } from 'react';
import styles from './MaskContainer.less';

interface MaskContainerProps {
  onMaskClick?: (mask: MaskItem) => void;
}

const MaskContainer: React.FC<MaskContainerProps> = ({ onMaskClick }) => {
  const [randomMasks, setRandomMasks] = useState<Array<MaskItem>>([]);
  const [flippingIndexes, setFlippingIndexes] = useState<Set<number>>(new Set());

  // 随机选择6个面具
  const getRandomMasks = () => {
    const shuffled = [...maskList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  };

  // 组件加载时随机选择6个面具
  useEffect(() => {
    setRandomMasks(getRandomMasks());
  }, []);

  // 处理面具点击事件
  const handleMaskClick = (mask: MaskItem) => {
    console.log('点击面具:', mask.name);
    onMaskClick?.(mask);
  };

  // 处理面具离开事件，翻转并替换
  const handleMaskLeave = (maskIndex: number) => {
    console.log('鼠标离开面具索引:', maskIndex);

    // 避免重复触发
    if (flippingIndexes.has(maskIndex)) {
      console.log('面具正在翻转中，跳过');
      return;
    }

    // 获取当前未显示的面具
    const currentMaskIds = randomMasks.map(mask => mask.id);
    const availableMasks = maskList.filter(mask => !currentMaskIds.includes(mask.id));

    if (availableMasks.length > 0) {
      // 添加到翻转状态
      console.log('开始翻转动画');
      setFlippingIndexes(prev => new Set(prev).add(maskIndex));

      // 在动画50%时替换内容
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * availableMasks.length);
        const newMask = availableMasks[randomIndex];
        console.log('替换面具:', randomMasks[maskIndex]?.name, '→', newMask.name);

        setRandomMasks(prev => prev.map((mask, index) => (index === maskIndex ? newMask : mask)));
      }, 300); // 动画总时长0.6s的一半
    }
  };

  // 处理动画结束事件
  const handleAnimationEnd = (e: React.AnimationEvent, maskIndex: number) => {
    console.log('动画结束:', e.animationName, 'maskIndex:', maskIndex);

    // 检查是否是我们的翻转动画（CSS Modules会添加哈希后缀）
    if (e.animationName.includes('flipAndReplace')) {
      console.log('翻转动画完成，清理状态');

      // 移除翻转状态
      setFlippingIndexes(prev => {
        const newSet = new Set(prev);
        newSet.delete(maskIndex);
        console.log('清理翻转状态，剩余:', Array.from(newSet));
        return newSet;
      });
    }
  };

  return (
    <div className={styles.sixMaskContainer}>
      {randomMasks.map((item, index) => (
        <div
          className={`${styles.MaskItem} ${flippingIndexes.has(index) ? styles.flipping : ''}`}
          key={`mask-${index}`}
          onClick={() => handleMaskClick(item)}
          onMouseLeave={() => handleMaskLeave(index)}
          onAnimationEnd={e => handleAnimationEnd(e, index)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default MaskContainer;
