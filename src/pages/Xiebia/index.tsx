import crabCursorImg0 from '@/assets/crab-cursor-0.png';
import crabCursorImg1 from '@/assets/crab-cursor-1.png';
import crabCursorImg2 from '@/assets/crab-cursor-2.png';
import crabCursorImg3 from '@/assets/crab-cursor-3.png';
import crabCursorImg4 from '@/assets/crab-cursor-4.png';
import crabCursorImg6 from '@/assets/crab-cursor-6.png';
import Header from '@/components/Header';
import HeartCanvas from '@/components/HeartScene';
import { DocItem, docList, MaskItem, maskList } from '@/constants';
import { Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import ChatSection from './components/ChatSection';
import DocCategories from './components/DocCategories';
import DocList from './components/DocList';
import DocViewer from './components/DocViewer';
import Introduction from './components/Introduction';
import MaskContainer from './components/MaskContainer';
import MaskList from './components/MaskList';
import ScrollIndicator from './components/ScrollIndicator';
import { usePageScroll } from './hooks/usePageScroll';
import styles from './index.less';

const HomePage: React.FC = () => {
  const [showHeart, setShowHeart] = useState(false);
  const [selectedMask, setSelectedMask] = useState<MaskItem | null>(maskList[0] || null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<DocItem | null>(docList[0] || null);
  const [heartModalVisible, setHeartModalVisible] = useState(false);
  const crabIndexRef = useRef(0); // 使用 useRef 追踪当前螃蟹图片索引

  // 键盘输入追踪
  const keySequenceRef = useRef('');
  const keySequenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 触发词列表
  const triggerWords = ['winter', 'xiebia', '656385'];

  // 使用自定义hooks
  const { currentSection, pageContainerRef, scrollToSection } = usePageScroll();

  // 创建点击效果
  const createClickEffect = (x: number, y: number) => {
    const crabPatterns = [
      crabCursorImg0,
      crabCursorImg1,
      crabCursorImg2,
      crabCursorImg3,
      crabCursorImg4,
      crabCursorImg6,
    ];
    const randomOffset = (Math.random() - 0.5) * 60; // -30px 到 30px 的随机水平偏移

    const crabElement = document.createElement('img');
    crabElement.className = styles.crabEffect;
    crabElement.src = crabPatterns[crabIndexRef.current];
    crabElement.style.left = `${x}px`;
    crabElement.style.top = `${y}px`;
    crabElement.style.position = 'fixed';
    crabElement.style.pointerEvents = 'none';
    crabElement.style.zIndex = '9999';
    crabElement.style.width = '32px';
    crabElement.style.height = '32px';
    crabElement.style.setProperty('--random-offset', `${randomOffset}px`);
    crabElement.style.animation = `${styles.crabFloat} 2s ease-out forwards`;

    document.body.appendChild(crabElement);

    // 更新索引，循环到下一个图片
    crabIndexRef.current = (crabIndexRef.current + 1) % crabPatterns.length;

    // 2秒后移除元素
    setTimeout(() => {
      if (crabElement && crabElement.parentNode) {
        crabElement.parentNode.removeChild(crabElement);
      }
    }, 2000);
  };

  // 检查输入序列是否包含触发词
  const checkTriggerWords = (sequence: string) => {
    const lowerSequence = sequence.toLowerCase();
    return triggerWords.some(word => lowerSequence.includes(word.toLowerCase()));
  };

  // 键盘事件监听器
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // 如果当前焦点在输入框或文本域，不处理
      const activeElement = document.activeElement;
      if (
        activeElement &&
        (activeElement.tagName === 'INPUT' ||
          activeElement.tagName === 'TEXTAREA' ||
          activeElement.getAttribute('contenteditable') === 'true')
      ) {
        return;
      }

      // 只处理字母、数字和中文字符
      if (e.key.match(/^[\w\u4e00-\u9fa5]$/)) {
        keySequenceRef.current += e.key.toLowerCase();

        // 限制序列长度，避免无限增长
        if (keySequenceRef.current.length > 20) {
          keySequenceRef.current = keySequenceRef.current.slice(-20);
        }

        // 检查是否包含触发词
        if (checkTriggerWords(keySequenceRef.current)) {
          console.log('检测到触发词，显示心形动画！');
          setHeartModalVisible(true);
          keySequenceRef.current = ''; // 重置序列
        }

        // 清除之前的定时器
        if (keySequenceTimerRef.current) {
          clearTimeout(keySequenceTimerRef.current);
        }

        // 设置新的定时器，2秒后清空序列
        keySequenceTimerRef.current = setTimeout(() => {
          keySequenceRef.current = '';
        }, 2000);
      }
    };

    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
      if (keySequenceTimerRef.current) {
        clearTimeout(keySequenceTimerRef.current);
      }
    };
  }, []);

  // 显示使用提示
  useEffect(() => {
    const showTip = () => {};

    // 页面加载3秒后显示提示
    const timer = setTimeout(showTip, 3000);

    return () => clearTimeout(timer);
  }, []);

  // 监听全局鼠标点击事件
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      createClickEffect(e.clientX, e.clientY);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

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

  // 处理Header中"文章"点击事件
  const handleHeaderArticleClick = () => {
    console.log('从Header点击文章');

    // 跳转到contentThree
    scrollToSection(2);
  };

  // 关闭心形弹窗
  const handleHeartModalClose = () => {
    setHeartModalVisible(false);
  };

  return (
    <div>
      {/* Header固定在顶部 */}
      <Header
        onMaskClick={handleHeaderMaskClick}
        onLinkClick={handleHeaderLinkClick}
        onArticleClick={handleHeaderArticleClick}
      />

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
        <div className={styles.contentThree}>
          <div className={styles.docsAndViewer}>
            <DocCategories
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
            <div className={styles.docsContent}>
              <DocList
                selectedCategory={selectedCategory}
                selectedDoc={selectedDoc}
                onDocSelect={setSelectedDoc}
              />
              <DocViewer selectedDoc={selectedDoc} />
            </div>
          </div>
        </div>
      </div>

      {/* 心形Canvas弹窗 - 条件渲染 */}
      {heartModalVisible && (
        <Modal
          title=""
          open={heartModalVisible}
          onCancel={handleHeartModalClose}
          footer={null}
          centered
          maskClosable={true}
          closable={false}
          bodyStyle={{
            padding: '0px',
            background: 'transparent',
          }}
          style={{
            padding: 0,
          }}
          styles={{
            content: {
              padding: 0,
            },
            body: {
              padding: 0,
            },
            header: {
              padding: 0,
              border: 'none',
              background: 'transparent',
            },
          }}
        >
          <HeartCanvas isVisible={true} />
        </Modal>
      )}
    </div>
  );
};

export default HomePage;
