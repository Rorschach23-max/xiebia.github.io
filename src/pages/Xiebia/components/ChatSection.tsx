import wechatAvatar from '@/assets/wechat_avatar.jpg';
import winterAvatar from '@/assets/winter_avatar.jpg';
import { MaskItem } from '@/constants';
import React from 'react';
import { useChatScroll } from '../hooks/useChatScroll';
import styles from '../index.less';

interface ChatSectionProps {
  selectedMask: MaskItem | null;
}

const ChatSection: React.FC<ChatSectionProps> = ({ selectedMask }) => {
  const { chatContainerRef } = useChatScroll();

  return (
    <div className={styles.chatContent}>
      {selectedMask && (
        <div className={styles.dialogueContainer}>
          <div className={styles.dialogueHeader}>
            <h3>{selectedMask.name}</h3>
          </div>
          <div className={styles.chatContainer} ref={chatContainerRef}>
            {selectedMask.dialogue.map((message, index) => (
              <div
                key={`${selectedMask.id}-${index}`}
                className={`${styles.chatMessage} ${
                  message.sender === 'user' ? styles.userMessage : styles.maskMessage
                }`}
                style={{
                  animationDelay: `${index * 0.15}s`,
                }}
              >
                <img
                  src={message.sender === 'user' ? winterAvatar : wechatAvatar}
                  alt={message.sender === 'user' ? 'user' : 'mask'}
                  className={styles.messageAvatar}
                />
                <div className={styles.messageContent}>{message.content}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSection;
