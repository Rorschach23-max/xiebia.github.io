import { useEffect, useRef, useState } from 'react';

export const usePageScroll = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const isTransitioning = useRef(false);
  const transitionTimer = useRef<NodeJS.Timeout>();

  // 滑动到指定区域
  const scrollToSection = (sectionIndex: number) => {
    const container = pageContainerRef.current;
    if (container && !isTransitioning.current) {
      isTransitioning.current = true;

      const targetScroll = sectionIndex * window.innerHeight;
      container.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });

      // 设置全局防抖
      clearTimeout(transitionTimer.current);
      transitionTimer.current = setTimeout(() => {
        isTransitioning.current = false;
      }, 800); // 800ms防抖，给足够时间完成动画
    }
  };

  // 监听滚动事件，更新当前区域
  useEffect(() => {
    const container = pageContainerRef.current;
    if (!container) return;

    let scrollTimer: NodeJS.Timeout;

    const handleScroll = () => {
      // 防抖处理，避免频繁触发状态更新
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const scrollTop = container.scrollTop;
        const sectionHeight = window.innerHeight;
        const currentIndex = Math.round(scrollTop / sectionHeight);
        setCurrentSection(Math.max(0, Math.min(2, currentIndex))); // 现在支持3个区域 (0, 1, 2)
      }, 50); // 减少到50ms，让状态更新更及时
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  // 键盘事件监听
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning.current) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        if (currentSection < 2) {
          // 最大到第3个区域
          scrollToSection(currentSection + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentSection > 0) {
          scrollToSection(currentSection - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSection]);

  // 触摸事件监听
  useEffect(() => {
    const container = pageContainerRef.current;
    if (!container) return;

    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      const threshold = 50; // 触摸阈值

      if (Math.abs(deltaY) > threshold && !isTransitioning.current) {
        if (deltaY > 0 && currentSection < 2) {
          // 向上滑动，切换到下一个区域
          scrollToSection(currentSection + 1);
        } else if (deltaY < 0 && currentSection > 0) {
          // 向下滑动，切换到上一个区域
          scrollToSection(currentSection - 1);
        }
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection]);

  // 鼠标滚轮事件监听
  useEffect(() => {
    const container = pageContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // 使用全局防抖状态，避免重复触发
      if (isTransitioning.current) return;

      e.preventDefault();

      // 根据滚轮方向切换区域
      if (e.deltaY > 0 && currentSection < 2) {
        // 向下滚动，切换到下一个区域
        scrollToSection(currentSection + 1);
      } else if (e.deltaY < 0 && currentSection > 0) {
        // 向上滚动，切换到上一个区域
        scrollToSection(currentSection - 1);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [currentSection]);

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      clearTimeout(transitionTimer.current);
    };
  }, []);

  return {
    currentSection,
    pageContainerRef,
    scrollToSection,
  };
};
