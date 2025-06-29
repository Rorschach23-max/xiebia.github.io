import React, { useEffect, useState } from 'react';
import './SvgIcon.less';

interface SvgIconProps {
  prefix?: string;
  name?: string; // 可选，当使用sprite方式时需要
  src?: string; // 可选，当使用内联方式时指定SVG文件路径
  color?: string;
  size?: number | string;
  style?: React.CSSProperties;
  className?: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({
  prefix = 'icon',
  name,
  src,
  color = 'currentColor',
  size = '1em',
  style,
  className = '',
}) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(!!src);

  // 加载SVG文件内容
  useEffect(() => {
    if (!src) {
      setLoading(false);
      return;
    }

    const fetchSvg = async () => {
      try {
        const response = await fetch(src);
        const svgText = await response.text();
        setSvgContent(svgText);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load SVG:', src, error);
        setSvgContent(null);
        setLoading(false);
      }
    };

    fetchSvg();
  }, [src]);

  // 内联SVG渲染方式
  if (src) {
    if (loading) {
      // 加载中的占位符
      return (
        <div
          className={`svg-icon-loading ${className}`}
          style={{ width: size, height: size, ...style }}
        />
      );
    }

    if (svgContent) {
      return (
        <div
          className={`svg-icon ${className}`}
          style={{
            display: 'inline-block',
            verticalAlign: '-0.15em',
            width: size,
            height: size,
            fill: color,
            ...style,
          }}
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      );
    }

    return null; // 加载失败
  }

  // 兼容现有的sprite使用方式
  if (name) {
    const symbolId = `#${prefix}-${name}`;
    return (
      <svg
        aria-hidden="true"
        className={`svg-icon ${className}`}
        style={{
          verticalAlign: '-0.15em',
          fill: color,
          width: size,
          height: size,
          ...style,
        }}
      >
        <use xlinkHref={symbolId} fill={color} />
      </svg>
    );
  }

  return null;
};

export default SvgIcon;
