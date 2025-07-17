# TypewriterEffect 组件

打字机效果组件，用于循环显示面具对话内容。

## 功能特点

- ✅ 逐字打字效果
- ✅ 自动删除和切换消息
- ✅ 循环播放所有对话
- ✅ 可自定义速度和时间
- ✅ 响应式设计
- ✅ 主题变体支持
- ✅ 内存泄漏保护

## 使用方法

### 基本用法

```tsx
import { TypewriterEffect } from '@/pages/Xiebia/components';

function MyComponent() {
  const [selectedMask, setSelectedMask] = useState<MaskItem | null>(maskList[0]);

  return (
    <div>
      <TypewriterEffect selectedMask={selectedMask} />
    </div>
  );
}
```

### 自定义配置

```tsx
<TypewriterEffect
  selectedMask={selectedMask}
  typingSpeed={50} // 打字速度更快
  deletingSpeed={30} // 删除速度更快
  pauseTime={3000} // 完整文本显示3秒
  switchDelay={800} // 切换消息间隔更长
  userDisplayName="用户" // 自定义用户名
  className="my-custom-style" // 自定义样式
/>
```

### 主题变体

```tsx
{
  /* 深色主题 */
}
<TypewriterEffect selectedMask={selectedMask} className="dark" />;

{
  /* 紧凑样式 */
}
<TypewriterEffect selectedMask={selectedMask} className="compact" />;

{
  /* 组合样式 */
}
<TypewriterEffect selectedMask={selectedMask} className="dark compact" />;
```

## Props 参数

| 参数              | 类型               | 默认值     | 说明                     |
| ----------------- | ------------------ | ---------- | ------------------------ |
| `selectedMask`    | `MaskItem \| null` | -          | 必需，当前选中的面具数据 |
| `typingSpeed`     | `number`           | `100`      | 打字速度（毫秒）         |
| `deletingSpeed`   | `number`           | `50`       | 删除速度（毫秒）         |
| `pauseTime`       | `number`           | `2000`     | 完整文本显示时间（毫秒） |
| `switchDelay`     | `number`           | `500`      | 切换消息的间隔（毫秒）   |
| `userDisplayName` | `string`           | `'Winter'` | 用户显示名称             |
| `className`       | `string`           | `''`       | 自定义 CSS 类名          |

## 样式自定义

### CSS 变量

```css
.typewriterContainer {
  --typewriter-bg: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  --typewriter-border: #dee2e6;
  --typewriter-text-color: #495057;
  --typewriter-cursor-color: #e87782;
  --typewriter-font-size: 16px;
  --typewriter-padding: 15px 20px;
  --typewriter-border-radius: 15px;
}
```

### 覆盖样式

```css
.my-custom-typewriter {
  .typewriterContainer {
    background: #your-background;
    border: 2px solid #your-border;

    .typewriterText {
      font-family: 'Your Font', sans-serif;
      font-size: 18px;
      color: #your-text-color;

      .cursor {
        color: #your-cursor-color;
        animation-duration: 0.8s;
      }
    }
  }
}
```

## 使用示例

### 替换当前打字机效果

```tsx
// 在 index.tsx 中替换现有的打字机效果
import { TypewriterEffect } from './components';

// 替换现有的打字机逻辑
<div className={styles.contentTwo}>
  <div className={styles.articleAndMask}>
    <MaskList selectedMask={selectedMask} onMaskSelect={setSelectedMask} />
    <div className={styles.articleAndMaskContent}>
      <ChatSection selectedMask={selectedMask} />
    </div>
  </div>
  {/* 使用新的打字机组件 */}
  <TypewriterEffect selectedMask={selectedMask} />
</div>;
```

### 多个打字机效果

```tsx
// 可以在页面不同位置使用多个打字机效果
<TypewriterEffect
  selectedMask={selectedMask}
  typingSpeed={200}
  className="header-typewriter"
/>

<TypewriterEffect
  selectedMask={selectedMask}
  typingSpeed={50}
  className="footer-typewriter compact"
/>
```

## 性能优化

- 组件内部使用 `useRef` 管理状态，避免不必要的重渲染
- 自动清理定时器，防止内存泄漏
- 切换面具时立即停止之前的效果
- 组件卸载时自动清理所有资源

## 兼容性

- React 16.8+ (需要 Hooks 支持)
- 支持 TypeScript
- 兼容主流浏览器
- 响应式设计，支持移动端
