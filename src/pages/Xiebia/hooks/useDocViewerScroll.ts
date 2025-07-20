import { useEffect, useRef } from 'react';

export const useDocViewerScroll = () => {
  const docViewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const docViewerContainer = docViewerRef.current;
    if (!docViewerContainer) return;

    // 检查鼠标是否在文档查看器区域内
    const isMouseInDocViewerArea = (e: MouseEvent | WheelEvent) => {
      const rect = docViewerContainer.getBoundingClientRect();
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
      if (isMouseInDocViewerArea(e)) {
        e.stopPropagation();
        e.preventDefault();

        // 手动处理文档查看器区域的滚动
        const { scrollTop, scrollHeight, clientHeight } = docViewerContainer;
        const maxScroll = scrollHeight - clientHeight;

        if (maxScroll > 0) {
          const scrollDelta = e.deltaY;
          const newScrollTop = Math.max(0, Math.min(maxScroll, scrollTop + scrollDelta));
          docViewerContainer.scrollTop = newScrollTop;
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

      // 手动处理文档查看器区域的滚动
      const { scrollTop, scrollHeight, clientHeight } = docViewerContainer;
      const maxScroll = scrollHeight - clientHeight;

      if (maxScroll > 0) {
        const newScrollTop = Math.max(0, Math.min(maxScroll, scrollTop + deltaY));
        docViewerContainer.scrollTop = newScrollTop;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.stopPropagation();
    };

    // 绑定事件监听器
    docViewerContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
    docViewerContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
    docViewerContainer.addEventListener('touchend', handleTouchEnd, { passive: false });

    // 在document级别监听滚轮事件，使用捕获阶段
    document.addEventListener('wheel', handleDocumentScroll, { passive: false, capture: true });

    return () => {
      docViewerContainer.removeEventListener('touchstart', handleTouchStart);
      docViewerContainer.removeEventListener('touchmove', handleTouchMove);
      docViewerContainer.removeEventListener('touchend', handleTouchEnd);

      // 清理document级别的事件监听器
      document.removeEventListener('wheel', handleDocumentScroll, { capture: true });
    };
  }, []);

  return {
    docViewerRef,
  };
};
