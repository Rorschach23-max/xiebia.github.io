import { useEffect, useRef } from 'react';

export const useDocListScroll = () => {
  const docListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const docListContainer = docListRef.current;
    if (!docListContainer) return;

    // 检查鼠标是否在文档列表区域内
    const isMouseInDocListArea = (e: MouseEvent | WheelEvent) => {
      const rect = docListContainer.getBoundingClientRect();
      return (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      );
    };

    // 在document级别处理滚轮事件
    const handleDocumentScroll = (e: WheelEvent) => {
      // 实时检测鼠标位置
      if (isMouseInDocListArea(e)) {
        e.stopPropagation();
        e.preventDefault();

        // 手动处理文档列表区域的滚动
        const { scrollTop, scrollHeight, clientHeight } = docListContainer;
        const maxScroll = scrollHeight - clientHeight;

        if (maxScroll > 0) {
          const scrollDelta = e.deltaY;
          const newScrollTop = Math.max(0, Math.min(maxScroll, scrollTop + scrollDelta));
          docListContainer.scrollTop = newScrollTop;
        }
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

      // 手动处理文档列表区域的滚动
      const { scrollTop, scrollHeight, clientHeight } = docListContainer;
      const maxScroll = scrollHeight - clientHeight;

      if (maxScroll > 0) {
        const newScrollTop = Math.max(0, Math.min(maxScroll, scrollTop + deltaY));
        docListContainer.scrollTop = newScrollTop;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.stopPropagation();
    };

    // 绑定事件监听器
    docListContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
    docListContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
    docListContainer.addEventListener('touchend', handleTouchEnd, { passive: false });

    // 在document级别监听滚轮事件，使用捕获阶段
    document.addEventListener('wheel', handleDocumentScroll, { passive: false, capture: true });

    return () => {
      docListContainer.removeEventListener('touchstart', handleTouchStart);
      docListContainer.removeEventListener('touchmove', handleTouchMove);
      docListContainer.removeEventListener('touchend', handleTouchEnd);

      // 清理document级别的事件监听器
      document.removeEventListener('wheel', handleDocumentScroll, { capture: true });
    };
  }, []);

  return {
    docListRef,
  };
};
