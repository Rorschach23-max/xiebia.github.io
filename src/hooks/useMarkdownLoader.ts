import { useEffect, useState } from 'react';

export const useMarkdownLoader = (filename: string | null) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!filename) {
      setContent('');
      return;
    }

    const loadMarkdown = async () => {
      setLoading(true);
      setError(null);

      try {
        // 从public目录加载Markdown文件
        const response = await fetch(`/docs/${filename}`);
        if (!response.ok) {
          throw new Error(`无法加载文件: ${filename}`);
        }
        const text = await response.text();
        setContent(text);
      } catch (err) {
        console.error('加载Markdown文件失败:', err);
        setError(err instanceof Error ? err.message : '加载失败');
        setContent('# 加载失败\n\n无法加载文档内容，请检查文件是否存在。');
      } finally {
        setLoading(false);
      }
    };

    loadMarkdown();
  }, [filename]);

  return { content, loading, error };
};
