import { useEffect, useRef } from 'react';

export const useChatScroll = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // 使用鼠标位置检测来确保稳定性
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    // 检查鼠标是否在聊天区域内
    const isMouseInChatArea = (e: MouseEvent | WheelEvent) => {
      const rect = chatContainer.getBoundingClientRect();
      return (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      );
    };

    // 在document级别处理滚轮事件
    const handleDocumentScroll = (e: WheelEvent) => {
      console.log(isMouseInChatArea(e));
      // 实时检测鼠标位置
      if (isMouseInChatArea(e)) {
        e.stopPropagation();
        e.preventDefault();

        // 手动处理聊天区域的滚动
        const { scrollTop, scrollHeight, clientHeight } = chatContainer;
        const maxScroll = scrollHeight - clientHeight;

        if (maxScroll > 0) {
          const scrollDelta = e.deltaY;
          const newScrollTop = Math.max(0, Math.min(maxScroll, scrollTop + scrollDelta));
          chatContainer.scrollTop = newScrollTop;
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

      // 手动处理聊天区域的滚动
      const { scrollTop, scrollHeight, clientHeight } = chatContainer;
      const maxScroll = scrollHeight - clientHeight;

      if (maxScroll > 0) {
        const newScrollTop = Math.max(0, Math.min(maxScroll, scrollTop + deltaY));
        chatContainer.scrollTop = newScrollTop;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.stopPropagation();
    };

    // 绑定事件监听器
    chatContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
    chatContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
    chatContainer.addEventListener('touchend', handleTouchEnd, { passive: false });

    // 在document级别监听滚轮事件，使用捕获阶段
    document.addEventListener('wheel', handleDocumentScroll, { passive: false, capture: true });

    return () => {
      chatContainer.removeEventListener('touchstart', handleTouchStart);
      chatContainer.removeEventListener('touchmove', handleTouchMove);
      chatContainer.removeEventListener('touchend', handleTouchEnd);

      // 清理document级别的事件监听器
      document.removeEventListener('wheel', handleDocumentScroll, { capture: true });
    };
  }, []);

  return {
    chatContainerRef,
  };
};
