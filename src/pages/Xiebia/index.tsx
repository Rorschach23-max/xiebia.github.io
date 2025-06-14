import { PageContainer } from '@ant-design/pro-components';
import { Button, Form, Input, message, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

/* 调试心形的canvas - 用于查看心形轮廓 */
const DebugHeartCanvas: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props,
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置Canvas尺寸
    const canvasWidth = 800;
    const canvasHeight = 600;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // 清空画布
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // 绘制心形轮廓 - 使用参数方程
    const drawHeartOutline = () => {
      ctx.strokeStyle = '#ff69b4';
      ctx.lineWidth = 3;
      ctx.beginPath();

      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;
      const scale = 8; // 调整心形大小

      let firstPoint = true;

      // 使用参数方程绘制心形轮廓
      for (let t = 0; t <= Math.PI * 2; t += 0.01) {
        // 经典心形参数方程
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y =
          13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t);

        const screenX = centerX + x * scale;
        const screenY = centerY - y * scale; // 翻转Y轴

        if (firstPoint) {
          ctx.moveTo(screenX, screenY);
          firstPoint = false;
        } else {
          ctx.lineTo(screenX, screenY);
        }
      }

      ctx.closePath();
      ctx.stroke();
    };

    // 绘制3D心形方程的点
    const draw3DHeartPoints = () => {
      // 方程1: 经典3D心形方程
      const heartFunction3D_v1 = (x: number, y: number, z: number): number => {
        return (
          Math.pow(x * x + (9 / 4) * y * y + z * z - 1, 3) -
          x * x * z * z * z -
          (9 / 80) * y * y * z * z * z
        );
      };

      // 方程2: 另一种3D心形方程
      const heartFunction3D_v2 = (x: number, y: number, z: number): number => {
        return (
          Math.pow(x * x + y * y + z * z - 1, 3) -
          x * x * z * z * z -
          (9 / 80) * y * y * z * z * z
        );
      };

      // 方程3: 基于2D心形的3D扩展
      const heartFunction3D_v3 = (x: number, y: number, z: number): number => {
        // 先计算2D心形值
        const heart2D = Math.pow(x * x + y * y - 1, 3) - x * x * x * y * y * y;
        // 添加z维度的影响
        return heart2D + z * z * 0.5;
      };

      // 方程4: 简单的基于参数方程的3D心形
      const isInHeart3D = (x: number, y: number, z: number): boolean => {
        // 将3D点投影到2D，然后检查是否在心形内
        const r = Math.sqrt(x * x + y * y);
        const theta = Math.atan2(y, x);

        // 心形的极坐标方程: r = 1 - cos(θ)
        const heartR = 2 * (1 - Math.cos(theta));

        // 检查是否在心形内，并且z在合理范围内
        return r <= heartR && Math.abs(z) <= 0.5;
      };

      // 绘制不同方程的结果
      const equations = [
        { func: heartFunction3D_v1, color: '#00ff00', name: '经典3D心形' },
        { func: heartFunction3D_v2, color: '#00ccff', name: '修改版3D心形' },
        { func: heartFunction3D_v3, color: '#ffff00', name: '2D扩展3D心形' },
      ];

      equations.forEach(({ func, color }, index) => {
        ctx.fillStyle = color;

        // 在z=0平面上采样
        for (let x = -2; x <= 2; x += 0.05) {
          for (let y = -2; y <= 2; y += 0.05) {
            const heartValue = func(x, y, 0);

            if (Math.abs(heartValue) < 0.1) {
              const screenX = canvasWidth / 2 + x * 100 + index * 5; // 稍微偏移避免重叠
              const screenY = canvasHeight / 2 - y * 100;

              ctx.beginPath();
              ctx.arc(screenX, screenY, 1.5, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      });

      // 绘制基于极坐标的心形
      ctx.fillStyle = '#ff00ff';
      for (let x = -3; x <= 3; x += 0.05) {
        for (let y = -3; y <= 3; y += 0.05) {
          if (isInHeart3D(x, y, 0)) {
            const screenX = canvasWidth / 2 + x * 80;
            const screenY = canvasHeight / 2 - y * 80;

            ctx.beginPath();
            ctx.arc(screenX, screenY, 1, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    // 绘制您原来的方程（显示为红色，用于对比）
    const drawOriginalEquation = () => {
      const originalHeartFunction = (
        x: number,
        y: number,
        z: number,
      ): number => {
        const a = x * x + y * y + z * z - 1;
        const b = x * x * z * z * z + (y * y * z * z * z * 9) / 80;
        return a * a * a - b;
      };

      ctx.fillStyle = '#ff0000';

      // 在2D平面上采样原来的方程 (z=0)
      for (let x = -1.5; x <= 1.5; x += 0.03) {
        for (let y = -1.5; y <= 1.5; y += 0.03) {
          const heartValue = originalHeartFunction(x, y, 0);

          if (Math.abs(heartValue) < 0.05) {
            const screenX = canvasWidth / 2 + x * 150;
            const screenY = canvasHeight / 2 - y * 150;

            ctx.beginPath();
            ctx.arc(screenX, screenY, 1, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    // 绘制网格辅助线
    const drawGrid = () => {
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1;

      // 垂直线
      for (let x = 0; x < canvasWidth; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
        ctx.stroke();
      }

      // 水平线
      for (let y = 0; y < canvasHeight; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
        ctx.stroke();
      }

      // 中心线
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(canvasWidth / 2, 0);
      ctx.lineTo(canvasWidth / 2, canvasHeight);
      ctx.moveTo(0, canvasHeight / 2);
      ctx.lineTo(canvasWidth, canvasHeight / 2);
      ctx.stroke();
    };

    // 添加文字说明
    const drawLabels = () => {
      ctx.fillStyle = '#fff';
      ctx.font = '14px Arial';
      ctx.fillText('粉色线: 参数方程心形轮廓 (标准)', 20, 25);
      ctx.fillText('绿色点: 经典3D心形方程', 20, 45);
      ctx.fillText('青色点: 修改版3D心形方程', 20, 65);
      ctx.fillText('黄色点: 2D扩展3D心形方程', 20, 85);
      ctx.fillText('紫色点: 极坐标心形方程', 20, 105);
      ctx.fillText('红色点: 您原来的方程 (圆形)', 20, 125);
      ctx.fillText('对比看哪种最接近粉色轮廓', 20, 145);
    };

    // 执行绘制
    drawGrid();
    drawHeartOutline();
    draw3DHeartPoints();
    drawOriginalEquation();
    drawLabels();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
        ...props.style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          border: '1px solid #eee',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      />
    </div>
  );
};

/* 心形的canvas */
const HeartCanvas: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    showMainPoints?: boolean;
    showRandomPoints?: boolean;
    isVisible?: boolean;
  }
> = (props) => {
  const {
    showMainPoints = true,
    showRandomPoints = true,
    isVisible = true,
    ...divProps
  } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const heartPointsRef = useRef<Array<[number, number, number]>>([]);
  const randomPointsRef = useRef<Array<[number, number, number]>>([]);

  // 心形参数
  const canvasWidth = 1000;
  const canvasHeight = 800;
  const particleCount = 6000;
  const randomParticleCount = 2000;
  //   const heartScale = 4; // 调整心形尺寸
  const randomMaxVar = 0.2;

  // 颜色参数
  const baseHue = 350;
  const colorSaturation = 90;
  const colorLightness = 70;

  // 动画参数
  const framesCount = 120;
  let currentFrame = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置Canvas尺寸
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // 简化的心形方程
    const heartFunction = (x: number, y: number, z: number): number => {
      // 使用正确的3D心形方程
      return (
        Math.pow(x * x + (9 / 4) * y * y + z * z - 1, 3) -
        x * x * z * z * z -
        (9 / 80) * y * y * z * z * z
      );
    };

    // 预生成心形点（仅执行一次）
    const generateHeartPoints = (
      count: number,
    ): Array<[number, number, number]> => {
      const points: Array<[number, number, number]> = [];
      let attempts = 0;
      const maxAttempts = count * 20; // 增加尝试次数

      console.log('开始生成心形点...');

      while (points.length < count && attempts < maxAttempts) {
        attempts++;

        // 在更大的范围内生成随机点
        const x = (Math.random() - 0.5) * 2;
        const y = (Math.random() - 0.5) * 2;
        const z = (Math.random() - 0.5) * 2;

        const heartValue = heartFunction(x, y, z);

        // 调整判断条件，使更容易生成点
        if (heartValue < 0.1 && heartValue > -0.1) {
          // 调整心形形状和方向
          const point: [number, number, number] = [
            x * 0.5,
            -y * 0.5, // 翻转Y轴使心形正向
            z * 0.3,
          ];

          // 计算距离，去除太靠近中心的点
          const dist = Math.sqrt(
            point[0] * point[0] + point[1] * point[1] + point[2] * point[2],
          );
          if (dist >= 0.1 && dist <= 1.5) {
            points.push(point);

            // 每生成100个点输出一次进度
            if (points.length % 500 === 0) {
              console.log(`已生成 ${points.length} 个点`);
            }
          }
        }
      }

      console.log(
        `心形点生成完成，尝试次数: ${attempts}, 成功生成: ${points.length}`,
      );
      return points;
    };

    // 使用经典的心形参数方程作为备选方案
    const generateHeartPointsParametric = (
      count: number,
    ): Array<[number, number, number]> => {
      const points: Array<[number, number, number]> = [];

      console.log('使用参数方程生成心形点...');

      // 计算需要的角度步数
      const angleSteps = Math.ceil(Math.sqrt(count)); // 使用平方根来平衡角度和径向密度
      const pointsPerAngle = Math.ceil(count / angleSteps);

      // 使用参数方程生成心形
      for (let i = 0; i < angleSteps; i++) {
        const t = (i / angleSteps) * Math.PI * 2;

        // 经典心形参数方程
        const baseX = 16 * Math.pow(Math.sin(t), 3);
        const baseY =
          13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t);

        // 在每个角度位置生成多个点
        for (let j = 0; j < pointsPerAngle && points.length < count; j++) {
          // 随机Z坐标创建3D效果
          const z = (Math.random() - 0.5) * 2;

          // 归一化并缩放
          const scale = 0.02;
          const point: [number, number, number] = [
            baseX * scale,
            -baseY * scale, // 翻转Y轴
            z * scale * 2,
          ];

          // 添加一些随机扰动
          const noise = 0.05;
          point[0] += (Math.random() - 0.5) * noise;
          point[1] += (Math.random() - 0.5) * noise;
          point[2] += (Math.random() - 0.5) * noise;

          points.push(point);
        }
      }

      console.log(`参数方程生成完成: ${points.length} 个点`);
      return points;
    };

    // 新增：基于参数方程的3D心形生成（更可靠的方法）
    const generateHeartPointsParametric3D = (
      count: number,
    ): Array<[number, number, number]> => {
      const points: Array<[number, number, number]> = [];

      console.log('使用3D参数方程生成心形点...');

      // 生成多层心形
      const layers = 15; // z方向的层数，从10增加到15
      const pointsPerLayer = Math.floor(count / layers);

      for (let layer = 0; layer < layers; layer++) {
        const z = (layer / (layers - 1) - 0.5) * 0.8; // z从-0.4到0.4
        const layerScale = 1 - Math.abs(z) * 0.3; // 根据z调整大小，形成3D效果

        for (let i = 0; i < pointsPerLayer; i++) {
          const t = (i / pointsPerLayer) * Math.PI * 2;

          // 心形参数方程
          const x = 16 * Math.pow(Math.sin(t), 3) * layerScale;
          const y =
            (13 * Math.cos(t) -
              5 * Math.cos(2 * t) -
              2 * Math.cos(3 * t) -
              Math.cos(4 * t)) *
            layerScale;

          // 归一化并缩放
          const scale = 0.02;
          const point: [number, number, number] = [
            x * scale,
            -y * scale, // 翻转Y轴
            z,
          ];

          // 添加轻微的随机扰动
          const noise = 0.02;
          point[0] += (Math.random() - 0.5) * noise;
          point[1] += (Math.random() - 0.5) * noise;
          point[2] += (Math.random() - 0.5) * noise * 0.5;

          points.push(point);
        }
      }

      console.log(`3D参数方程生成完成: ${points.length} 个点`);
      return points;
    };

    // 预生成随机心形点
    const generateRandomHeartPoints = (
      basePoints: Array<[number, number, number]>,
      maxVar: number,
    ): Array<[number, number, number]> => {
      if (basePoints.length === 0) return [];

      const points = basePoints.slice(0, randomParticleCount);
      return points.map((point) => {
        const randScale = 1 + (Math.random() * 2 - 1) * maxVar;
        return [
          point[0] * randScale,
          point[1] * randScale,
          point[2] * randScale,
        ] as [number, number, number];
      });
    };

    // 世界坐标到屏幕坐标转换
    const worldToScreen = (
      point: [number, number, number],
    ): [number, number] => {
      const depth = 2;
      const scale = 500; // 调整缩放比例，从350增加到500
      const factor = depth / (depth + point[2]);

      return [
        canvasWidth / 2 + point[0] * scale * factor,
        canvasHeight / 2 + point[1] * scale * factor,
      ];
    };

    // 预计算颜色缓存
    const colorCache = new Map<string, string>();

    // 优化的颜色计算函数
    const getColor = (depth: number, isRandom: boolean = false): string => {
      // 创建缓存键
      const cacheKey = `${Math.round(depth * 10)}_${isRandom}`;

      // 检查缓存
      if (colorCache.has(cacheKey)) {
        return colorCache.get(cacheKey)!;
      }

      const hue = isRandom ? baseHue - 10 : baseHue + ((depth * 20) % 10);
      const saturation = Math.max(50, colorSaturation - depth * 10);
      const lightness = Math.max(30, colorLightness - depth * 15);

      // 简化的HSL到RGB转换
      const h = hue / 360;
      const s = saturation / 100;
      const l = lightness / 100;

      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs(((h * 6) % 2) - 1));
      const m = l - c / 2;

      let r = 0,
        g = 0,
        b = 0;

      if (h < 1 / 6) {
        r = c;
        g = x;
        b = 0;
      } else if (h < 2 / 6) {
        r = x;
        g = c;
        b = 0;
      } else if (h < 3 / 6) {
        r = 0;
        g = c;
        b = x;
      } else if (h < 4 / 6) {
        r = 0;
        g = x;
        b = c;
      } else if (h < 5 / 6) {
        r = x;
        g = 0;
        b = c;
      } else {
        r = c;
        g = 0;
        b = x;
      }

      const rVal = Math.round((r + m) * 255);
      const gVal = Math.round((g + m) * 255);
      const bVal = Math.round((b + m) * 255);

      const color = `rgb(${rVal}, ${gVal}, ${bVal})`;

      // 缓存结果
      colorCache.set(cacheKey, color);

      return color;
    };

    // 只在第一次或者点数据为空时生成点
    if (heartPointsRef.current.length === 0) {
      console.log('开始生成心形点...');

      // 优先使用3D参数方程方法
      let mainPoints = generateHeartPointsParametric3D(particleCount);

      // 如果3D参数方程生成的点不够，补充使用普通参数方程
      if (mainPoints.length < particleCount * 0.8) {
        console.log('3D参数方程生成点数不足，补充使用普通参数方程');
        const additionalPoints = generateHeartPointsParametric(
          particleCount - mainPoints.length,
        );
        mainPoints = [...mainPoints, ...additionalPoints];
      }

      // 最后才尝试3D方程方法（作为备选）
      if (mainPoints.length < particleCount * 0.5) {
        console.log('参数方程生成点数不足，尝试3D方程方法');
        const equationPoints = generateHeartPoints(
          particleCount - mainPoints.length,
        );
        mainPoints = [...mainPoints, ...equationPoints];
      }

      heartPointsRef.current = mainPoints;
      randomPointsRef.current = generateRandomHeartPoints(
        heartPointsRef.current,
        randomMaxVar,
      );

      console.log(
        `生成完成: ${heartPointsRef.current.length} 个主点, ${randomPointsRef.current.length} 个随机点`,
      );
    }

    // 绘制心形（性能优化版本）
    const drawHeart = (ratio: number, randomRatio: number) => {
      // 清空画布
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // 预计算缩放值
      const mainScale = 1.2 + ratio * 0.4;
      const randomScale = 1.2 + randomRatio * 0.4;

      // 绘制主心形点（轮廓点）- 性能优化
      if (showMainPoints) {
        const mainPoints = heartPointsRef.current;

        for (let i = 0; i < mainPoints.length; i++) {
          const point = mainPoints[i];

          // 缩放和位置调整
          const scaledPoint: [number, number, number] = [
            point[0] * mainScale,
            point[1] * mainScale,
            point[2] * mainScale,
          ];

          // 投影到屏幕
          const [screenX, screenY] = worldToScreen(scaledPoint);

          // 扩大边界检查范围，减少不必要的绘制
          if (
            screenX < -10 ||
            screenX > canvasWidth + 10 ||
            screenY < -10 ||
            screenY > canvasHeight + 10
          ) {
            continue;
          }

          // 预计算深度，避免重复计算
          const depth = Math.sqrt(
            point[0] * point[0] + point[1] * point[1] + point[2] * point[2],
          );

          // 使用固定算法代替随机，提高性能
          const size = 1.2 + ((depth * 3) % 1.8);
          const color = getColor(depth);

          // 绘制点
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 绘制随机心形点（其他点）- 性能优化
      if (showRandomPoints) {
        const randomPoints = randomPointsRef.current;

        for (let i = 0; i < randomPoints.length; i++) {
          const point = randomPoints[i];

          // 应用随机比例变化
          const scaledPoint: [number, number, number] = [
            point[0] * randomScale,
            point[1] * randomScale,
            point[2] * randomScale,
          ];

          const [screenX, screenY] = worldToScreen(scaledPoint);

          // 扩大边界检查范围
          if (
            screenX < -10 ||
            screenX > canvasWidth + 10 ||
            screenY < -10 ||
            screenY > canvasHeight + 10
          ) {
            continue;
          }

          const depth = Math.sqrt(
            point[0] * point[0] + point[1] * point[1] + point[2] * point[2],
          );

          // 使用固定算法代替随机
          const size = 0.8 + ((depth * 2) % 1.2);
          const color = getColor(depth, true);

          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    // 动画循环
    const animate = () => {
      // 如果不可见，停止动画
      if (!isVisible) {
        animationRef.current = null;
        return;
      }

      const frameRatio = currentFrame / framesCount;

      // 使用更平滑的动画函数
      const animationRatio = (Math.sin(frameRatio * Math.PI * 2) + 1) / 2;
      // 让其他点使用相同的跳动速度，但可以有轻微的相位差
      const randomRatio =
        (Math.sin(frameRatio * Math.PI * 2 + Math.PI / 4) + 1) / 2;

      drawHeart(animationRatio, randomRatio);

      currentFrame = (currentFrame + 1) % framesCount;
      animationRef.current = requestAnimationFrame(animate);
    };

    // 只在可见时开始动画，隐藏时清空画布
    if (isVisible) {
      animate();
    } else {
      // 隐藏时清空画布，释放GPU资源
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    // 清理函数
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [showMainPoints, showRandomPoints, isVisible]); // 添加isVisible依赖，控制动画启停

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
        ...divProps.style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          border: '1px solid #eee',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      />
    </div>
  );
};

/* antdesign封装的Modal */
const InputModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // 打开Modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  // 确认按钮处理函数
  const handleOk = async () => {
    try {
      // 验证表单
      const values = await form.validateFields();
      message.success(`输入的内容是: ${values.inputContent}`);
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      // 验证失败时不关闭Modal
      console.error('表单验证失败:', error);
    }
  };

  // 取消按钮处理函数
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        打开输入框
      </Button>
      <Modal
        title="请输入内容"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
          >
            确认
          </Button>,
        ]}
      >
        <Form form={form}>
          <Form.Item
            name="inputContent"
            rules={[
              { required: true, message: '请输入内容!' },
              { min: 3, message: '内容至少3个字符!' },
              {
                pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]+$/,
                message: '只能输入中文、英文和数字!',
              },
            ]}
          >
            <Input placeholder="蟹老师，请输入你的面具" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const HomePage: React.FC = () => {
  const [showHeart, setShowHeart] = useState(false);
  const [showDebugHeart, setShowDebugHeart] = useState(false);
  const [showMainPoints, setShowMainPoints] = useState(true);
  const [showRandomPoints, setShowRandomPoints] = useState(true);

  return (
    <PageContainer ghost>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h2>复现一下</h2>
        <div style={{ marginBottom: '20px' }}>
          <Button
            type="primary"
            style={{ margin: '10px' }}
            onClick={() => setShowHeart(!showHeart)}
          >
            {showHeart ? '隐藏心形' : '显示心形'}
          </Button>
          <Button
            type="default"
            style={{ margin: '10px' }}
            onClick={() => setShowDebugHeart(!showDebugHeart)}
          >
            {showDebugHeart ? '隐藏调试心形' : '显示调试心形'}
          </Button>
        </div>

        {showHeart && (
          <div style={{ marginBottom: '20px' }}>
            <h4>心形点类型控制：</h4>
            <Button
              type={showMainPoints && showRandomPoints ? 'primary' : 'default'}
              style={{ margin: '5px' }}
              onClick={() => {
                setShowMainPoints(true);
                setShowRandomPoints(true);
              }}
            >
              显示全部
            </Button>
            <Button
              type={showMainPoints && !showRandomPoints ? 'primary' : 'default'}
              style={{ margin: '5px' }}
              onClick={() => {
                setShowMainPoints(true);
                setShowRandomPoints(false);
              }}
            >
              只显示轮廓点
            </Button>
            <Button
              type={!showMainPoints && showRandomPoints ? 'primary' : 'default'}
              style={{ margin: '5px' }}
              onClick={() => {
                setShowMainPoints(false);
                setShowRandomPoints(true);
              }}
            >
              只显示其他点
            </Button>
          </div>
        )}

        {showDebugHeart && (
          <div>
            <h3>调试心形 - 查看形状轮廓</h3>
            <DebugHeartCanvas />
          </div>
        )}

        <HeartCanvas
          style={{ display: showHeart ? 'flex' : 'none' }}
          showMainPoints={showMainPoints}
          showRandomPoints={showRandomPoints}
          isVisible={showHeart}
        />
        <div style={{ marginTop: '30px' }}>
          <InputModal />
        </div>
      </div>
    </PageContainer>
  );
};

export default HomePage;
