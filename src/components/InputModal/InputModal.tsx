import { Button, Form, Input, message, Modal } from 'antd';
import React, { useState } from 'react';

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

export default InputModal;
