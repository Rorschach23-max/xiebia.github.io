import { MaskItem } from '../../../constants';

export interface TypewriterEffectProps {
  /**
   * 当前选中的面具数据
   */
  selectedMask: MaskItem | null;

  /**
   * 打字速度（毫秒）
   * @default 100
   */
  typingSpeed?: number;

  /**
   * 删除速度（毫秒）
   * @default 50
   */
  deletingSpeed?: number;

  /**
   * 完整文本显示时间（毫秒）
   * @default 2000
   */
  pauseTime?: number;

  /**
   * 切换消息的间隔（毫秒）
   * @default 500
   */
  switchDelay?: number;

  /**
   * 用户显示名称
   * @default 'Winter'
   */
  userDisplayName?: string;

  /**
   * 自定义CSS类名
   * @default ''
   */
  className?: string;
}

export interface TypewriterState {
  currentIndex: number;
  charIndex: number;
  isDeleting: boolean;
  timeoutId: NodeJS.Timeout | null;
  isRunning: boolean;
}

export declare const TypewriterEffect: React.FC<TypewriterEffectProps>;
export default TypewriterEffect;
