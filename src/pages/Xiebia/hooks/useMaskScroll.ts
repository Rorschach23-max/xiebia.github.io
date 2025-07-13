import { useEffect, useRef } from 'react';

export const useMaskScroll = () => {
  const maskItemsRef = useRef<HTMLDivElement>(null);

  // 阻止面具区域滚动事件冒泡
  useEffect(() => {
    const maskItemsContainer = maskItemsRef.current;
    if (!maskItemsContainer) return;

    // 直接阻止面具区域的所有滚轮事件
    const handleMaskScroll = (e: WheelEvent) => {
      // 完全阻止滚轮事件的冒泡和默认行为
      e.stopPropagation();
      e.preventDefault();

      // 手动处理面具区域的滚动
      const { scrollTop, scrollHeight, clientHeight } = maskItemsContainer;
      const maxScroll = scrollHeight - clientHeight;

      if (maxScroll > 0) {
        const scrollDelta = e.deltaY;
        const newScrollTop = Math.max(0, Math.min(maxScroll, scrollTop + scrollDelta));
        maskItemsContainer.scrollTop = newScrollTop;
      }
    };

    // 触摸事件处理
    let touchStartY = 0;
    let lastTouchY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      lastTouchY = touchStartY;
      e.stopPropagation();
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = lastTouchY - touchY;
      lastTouchY = touchY;

      e.stopPropagation();
      e.preventDefault();

      // 手动处理面具区域的滚动
      const { scrollTop, scrollHeight, clientHeight } = maskItemsContainer;
      const maxScroll = scrollHeight - clientHeight;

      if (maxScroll > 0) {
        const newScrollTop = Math.max(0, Math.min(maxScroll, scrollTop + deltaY));
        maskItemsContainer.scrollTop = newScrollTop;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.stopPropagation();
    };

    // 绑定事件监听器
    maskItemsContainer.addEventListener('wheel', handleMaskScroll, { passive: false });
    maskItemsContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
    maskItemsContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
    maskItemsContainer.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      maskItemsContainer.removeEventListener('wheel', handleMaskScroll);
      maskItemsContainer.removeEventListener('touchstart', handleTouchStart);
      maskItemsContainer.removeEventListener('touchmove', handleTouchMove);
      maskItemsContainer.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return {
    maskItemsRef,
  };
};
