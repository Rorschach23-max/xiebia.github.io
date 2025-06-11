import { PageContainer } from '@ant-design/pro-components';
import { Button, Form, Input, message, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

/* 心形的canvas */
const HeartCanvas: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const heartPointsRef = useRef<Array<[number, number, number]>>([]);
  const randomPointsRef = useRef<Array<[number, number, number]>>([]);

  // 心形参数
  const canvasWidth = 1000;
  const canvasHeight = 800;
  const particleCount = 3000;
  const randomParticleCount = 1000;
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
      // 使用更简单的心形方程
      const a = x * x + y * y + z * z - 1;
      const b = x * x * z * z * z + (y * y * z * z * z * 9) / 80;
      return a * a * a - b;
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

      // 使用参数方程生成心形
      for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 2;

        // 经典心形参数方程
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y =
          13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t);

        // 随机Z坐标创建3D效果
        const z = (Math.random() - 0.5) * 2;

        // 归一化并缩放
        const scale = 0.02;
        const point: [number, number, number] = [
          x * scale,
          -y * scale, // 翻转Y轴
          z * scale * 2,
        ];

        // 添加一些随机扰动
        const noise = 0.05;
        point[0] += (Math.random() - 0.5) * noise;
        point[1] += (Math.random() - 0.5) * noise;
        point[2] += (Math.random() - 0.5) * noise;

        points.push(point);
      }

      console.log(`参数方程生成完成: ${points.length} 个点`);
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
      const scale = 350; // 调整缩放比例
      const factor = depth / (depth + point[2]);

      return [
        canvasWidth / 2 + point[0] * scale * factor,
        canvasHeight / 2 + point[1] * scale * factor,
      ];
    };

    // 预计算颜色
    const getColor = (depth: number, isRandom: boolean = false): string => {
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

      return `rgb(${rVal}, ${gVal}, ${bVal})`;
    };

    // 预生成所有点（只执行一次）
    console.log('开始生成心形点...');

    // 首先尝试使用3D心形方程
    let mainPoints = generateHeartPoints(particleCount);

    // 如果3D方程生成的点太少，使用参数方程
    if (mainPoints.length < particleCount / 2) {
      console.log('3D方程生成点数不足，切换到参数方程');
      mainPoints = generateHeartPointsParametric(particleCount);
    }

    heartPointsRef.current = mainPoints;
    randomPointsRef.current = generateRandomHeartPoints(
      heartPointsRef.current,
      randomMaxVar,
    );

    console.log(
      `生成完成: ${heartPointsRef.current.length} 个主点, ${randomPointsRef.current.length} 个随机点`,
    );

    // 绘制心形（优化版本）
    const drawHeart = (ratio: number, randomRatio: number) => {
      // 清空画布
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // 绘制主心形点
      const mainPoints = heartPointsRef.current;
      for (let i = 0; i < mainPoints.length; i++) {
        const point = mainPoints[i];

        // 缩放和位置调整
        const scale = 0.8 + ratio * 0.4;
        const scaledPoint: [number, number, number] = [
          point[0] * scale,
          point[1] * scale,
          point[2] * scale,
        ];

        // 投影到屏幕
        const [screenX, screenY] = worldToScreen(scaledPoint);

        // 检查是否在画布范围内
        if (
          screenX < 0 ||
          screenX >= canvasWidth ||
          screenY < 0 ||
          screenY >= canvasHeight
        ) {
          continue;
        }

        // 根据深度计算点的大小和颜色
        const depth = Math.sqrt(
          point[0] * point[0] + point[1] * point[1] + point[2] * point[2],
        );
        const size = 1 + Math.random() * 2;

        const color = getColor(depth);

        // 绘制点
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 绘制随机心形点
      const randomPoints = randomPointsRef.current;
      for (let i = 0; i < randomPoints.length; i++) {
        const point = randomPoints[i];

        // 应用随机比例变化
        const scaledPoint: [number, number, number] = [
          point[0] * (0.8 + randomRatio * 0.4),
          point[1] * (0.8 + randomRatio * 0.4),
          point[2] * (0.8 + randomRatio * 0.4),
        ];

        const [screenX, screenY] = worldToScreen(scaledPoint);

        // 检查是否在画布范围内
        if (
          screenX < 0 ||
          screenX >= canvasWidth ||
          screenY < 0 ||
          screenY >= canvasHeight
        ) {
          continue;
        }

        const depth = Math.sqrt(
          point[0] * point[0] + point[1] * point[1] + point[2] * point[2],
        );
        const size = 0.5 + Math.random() * 1.5;

        const color = getColor(depth, true);

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // 动画循环
    const animate = () => {
      const frameRatio = currentFrame / framesCount;

      // 使用更平滑的动画函数
      const animationRatio = (Math.sin(frameRatio * Math.PI * 2) + 1) / 2;
      const randomRatio = (Math.sin(frameRatio * Math.PI * 4) + 1) / 2;

      drawHeart(animationRatio, randomRatio);

      currentFrame = (currentFrame + 1) % framesCount;
      animationRef.current = requestAnimationFrame(animate);
    };

    // 开始动画
    animate();

    // 清理函数
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
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

  return (
    <PageContainer ghost>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h2>复现一下</h2>
        <Button
          type="primary"
          style={{ margin: '10px' }}
          onClick={() => setShowHeart(!showHeart)}
        >
          {showHeart ? '隐藏心形' : '显示心形'}
        </Button>
        <HeartCanvas style={{ display: showHeart ? 'flex' : 'none' }} />
        <div style={{ marginTop: '30px' }}>
          <InputModal />
        </div>
      </div>
    </PageContainer>
  );
};

export default HomePage;
