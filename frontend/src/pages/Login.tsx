import React, { useEffect } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { login, clearError } from '../store/slices/authSlice';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const onFinish = (values: { email: string; password: string }) => {
    dispatch(login(values));
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
          <h2>登入系統</h2>
          <p style={{ color: '#666' }}>歡迎使用線上預約系統</p>
        </div>
        
        <Form
          name="login"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: '請輸入電子郵件!' },
              { type: 'email', message: '請輸入有效的電子郵件!' }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="電子郵件" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '請輸入密碼!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密碼"
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
              登入
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <span>還沒有帳號？</span>
            <Button 
              type="link" 
              onClick={() => navigate('/register')}
              style={{ padding: 0, marginLeft: 8 }}
            >
              立即註冊
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login; 