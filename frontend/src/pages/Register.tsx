import React, { useEffect } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, IdcardOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { register, clearError } from '../store/slices/authSlice';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const onFinish = (values: { email: string; password: string; username: string; full_name: string }) => {
    dispatch(register(values));
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#f0f2f5'
    }}>
      <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h2>註冊帳號</h2>
          <p style={{ color: '#666' }}>建立您的線上預約系統帳號</p>
        </div>
        
        <Form
          name="register"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="full_name"
            rules={[{ required: true, message: '請輸入姓名!' }]}
          >
            <Input 
              prefix={<IdcardOutlined />} 
              placeholder="姓名" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="username"
            rules={[{ required: true, message: '請輸入使用者名稱!' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="使用者名稱" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: '請輸入電子郵件!' },
              { type: 'email', message: '請輸入有效的電子郵件!' }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="電子郵件" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: '請輸入密碼!' },
              { min: 6, message: '密碼至少6個字元!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密碼"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="confirm_password"
            dependencies={['password']}
            rules={[
              { required: true, message: '請確認密碼!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('兩次輸入的密碼不一致!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="確認密碼"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              style={{ width: '100%' }}
              size="large"
            >
              註冊
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <span>已有帳號？</span>
            <Button 
              type="link" 
              onClick={() => navigate('/login')}
              style={{ padding: 0, marginLeft: 8 }}
            >
              立即登入
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register; 