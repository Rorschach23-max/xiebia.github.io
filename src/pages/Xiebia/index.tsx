import Header from '@/components/Header';
import { MaskItem, maskList } from '@/constants';
import React, { useState } from 'react';
import ChatSection from './components/ChatSection';
import Introduction from './components/Introduction';
import MaskContainer from './components/MaskContainer';
import MaskList from './components/MaskList';
import ScrollIndicator from './components/ScrollIndicator';
import { usePageScroll } from './hooks/usePageScroll';
import styles from './index.less';

const HomePage: React.FC = () => {
  const [showHeart, setShowHeart] = useState(false);
  const [selectedMask, setSelectedMask] = useState<MaskItem | null>(maskList[0] || null);

  // 使用自定义hooks
  const { currentSection, pageContainerRef, scrollToSection } = usePageScroll();

  // 处理MaskContainer中面具点击事件
  const handleMaskContainerClick = (mask: MaskItem) => {
    console.log('从MaskContainer点击面具:', mask.name);

    // 首先设置选中的面具
    setSelectedMask(mask);

    // 然后跳转到contentTwo
    setTimeout(() => {
      scrollToSection(1);
    }, 100); // 稍微延迟一下让状态更新
  };

  // 处理Header中"蟹之面具"点击事件
  const handleHeaderMaskClick = () => {
    console.log('从Header点击蟹之面具');

    // 跳转到contentTwo
    scrollToSection(1);
  };

  // 处理Header中"友情链接"点击事件
  const handleHeaderLinkClick = () => {
    window.open('https://www.winterlee.top', '_blank');
  };

  return (
    <div>
      {/* 开发测试组件 - 可以根据需要显示/隐藏 */}
      {/* <h2>复现一下</h2>
      <div style={{ marginBottom: '20px' }}>
        <Button
          type="primary"
          style={{ margin: '10px' }}
          onClick={() => setShowHeart(!showHeart)}
        >
          {showHeart ? '隐藏心形' : '显示心形'}
        </Button>
      </div>
      
      <HeartCanvas 
        style={{ display: showHeart ? 'flex' : 'none' }}
        isVisible={showHeart}
      />
      <div style={{ marginTop: '30px' }}>
        <InputModal />
      </div> */}

      {/* Header固定在顶部 */}
      <Header onMaskClick={handleHeaderMaskClick} onLinkClick={handleHeaderLinkClick} />

      {/* 滑动指示器 */}
      <ScrollIndicator currentSection={currentSection} onSectionClick={scrollToSection} />

      <div className={styles.pageContainer} ref={pageContainerRef}>
        <div className={styles.contentOne}>
          <Introduction />
          <MaskContainer onMaskClick={handleMaskContainerClick} />
        </div>
        <div className={styles.contentTwo}>
          <div className={styles.articleAndMask}>
            <MaskList selectedMask={selectedMask} onMaskSelect={setSelectedMask} />
            <div className={styles.articleAndMaskContent}>
              <ChatSection selectedMask={selectedMask} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
