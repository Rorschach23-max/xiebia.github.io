import React, { useEffect, useState } from 'react';
import styles from './MaskContainer.less';

interface MaskItem {
  id: number;
  name: string;
}

const MaskContainer: React.FC = () => {
  const [randomMasks, setRandomMasks] = useState<Array<MaskItem>>([]);
  const [flippingIndexes, setFlippingIndexes] = useState<Set<number>>(new Set());

  const maskList: MaskItem[] = [
    { id: 0, name: '蟹老师' },
    { id: 1, name: 'biabia' },
    { id: 2, name: '好汉' },
    { id: 3, name: 'xiebia' },
    { id: 5, name: 'bia姐' },
    { id: 6, name: '尼拔' },
    { id: 7, name: '耶路撒冷' },
    { id: 8, name: '神奇女侠' },
    { id: 9, name: '北海鲛人' },
    { id: 10, name: '蝙蝠侠' },
    { id: 11, name: '小皇帝' },
    { id: 12, name: '路见不平biabia蟹' },
    { id: 13, name: '魅魔蟹' },
    { id: 14, name: '蟹女明星' },
    { id: 15, name: '蟹宝王' },
    { id: 16, name: '蟹伯乐' },
    { id: 17, name: '面具蟹' },
    { id: 18, name: '小怂蟹' },
    { id: 19, name: '蟹妹妹' },
    { id: 20, name: '铜墙铁壁蟹' },
    { id: 21, name: '胆小蟹' },
    { id: 23, name: '缪斯女神蟹' },
  ];

  // 随机选择6个面具
  const getRandomMasks = () => {
    const shuffled = [...maskList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  };

  // 组件加载时随机选择6个面具
  useEffect(() => {
    setRandomMasks(getRandomMasks());
  }, []);

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
