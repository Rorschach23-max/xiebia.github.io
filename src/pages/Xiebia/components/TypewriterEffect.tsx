import { MaskItem } from '@/constants';
import React, { useEffect, useRef, useState } from 'react';
import styles from './TypewriterEffect.less';

interface TypewriterEffectProps {
  selectedMask: MaskItem | null;
  typingSpeed?: number; // 打字速度 (ms)
  deletingSpeed?: number; // 删除速度 (ms)
  pauseTime?: number; // 完整文本显示时间 (ms)
  switchDelay?: number; // 切换消息的间隔 (ms)
  userDisplayName?: string; // 用户显示名称
  className?: string; // 自定义样式类名
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  selectedMask,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 2000,
  switchDelay = 500,
  userDisplayName = 'Winter',
  className = '',
}) => {
  const [currentText, setCurrentText] = useState('');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  // 使用 useRef 来管理打字机效果的状态和 timeout
  const typewriterState = useRef({
    currentIndex: 0,
    charIndex: 0,
    isDeleting: false,
    timeoutId: null as NodeJS.Timeout | null,
    isRunning: false,
  });

  // 清理打字机效果
  const cleanupTypewriter = () => {
    if (typewriterState.current.timeoutId) {
      clearTimeout(typewriterState.current.timeoutId);
      typewriterState.current.timeoutId = null;
    }
    typewriterState.current.isRunning = false;
    setIsTyping(false);
  };

  // 打字机效果
  useEffect(() => {
    if (!selectedMask || !selectedMask.dialogue.length) {
      cleanupTypewriter();
      setCurrentText('');
      return;
    }

    // 清理之前的打字机效果
    cleanupTypewriter();

    const dialogue = selectedMask.dialogue;

    // 重置状态
    typewriterState.current = {
      currentIndex: 0,
      charIndex: 0,
      isDeleting: false,
      timeoutId: null,
      isRunning: true,
    };

    const typeWriter = () => {
      // 如果效果已经被停止，直接返回
      if (!typewriterState.current.isRunning) return;

      const { currentIndex, charIndex, isDeleting } = typewriterState.current;
      const currentMessage = dialogue[currentIndex];
      const fullText = `${
        currentMessage.sender === 'user' ? userDisplayName : selectedMask.name
      }: ${currentMessage.content}`;

      if (!isDeleting) {
        // 打字过程
        if (charIndex < fullText.length) {
          setCurrentText(fullText.slice(0, charIndex + 1));
          typewriterState.current.charIndex++;
          typewriterState.current.timeoutId = setTimeout(typeWriter, typingSpeed);
        } else {
          // 打字完成，暂停一段时间后开始删除
          typewriterState.current.timeoutId = setTimeout(() => {
            if (typewriterState.current.isRunning) {
              typewriterState.current.isDeleting = true;
              typeWriter();
            }
          }, pauseTime);
        }
      } else {
        // 删除过程
        if (charIndex > 0) {
          setCurrentText(fullText.slice(0, charIndex - 1));
          typewriterState.current.charIndex--;
          typewriterState.current.timeoutId = setTimeout(typeWriter, deletingSpeed);
        } else {
          // 删除完成，切换到下一条消息
          typewriterState.current.isDeleting = false;
          typewriterState.current.currentIndex = (currentIndex + 1) % dialogue.length;
          setCurrentMessageIndex(typewriterState.current.currentIndex);
          typewriterState.current.timeoutId = setTimeout(typeWriter, switchDelay);
        }
      }
    };

    setCurrentText('');
    setCurrentMessageIndex(0);
    setIsTyping(true);
    typeWriter();

    return () => {
      cleanupTypewriter();
    };
  }, [selectedMask, typingSpeed, deletingSpeed, pauseTime, switchDelay, userDisplayName]);

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      cleanupTypewriter();
    };
  }, []);

  if (!selectedMask || !selectedMask.dialogue.length) {
    return null;
  }

  return (
    <div className={`${styles.typewriterContainer} ${className}`}>
      <div className={styles.typewriterText}>
        {currentText}
        <span className={styles.cursor}>|</span>
      </div>
    </div>
  );
};

export default TypewriterEffect;
