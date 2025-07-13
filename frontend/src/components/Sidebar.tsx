import React from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  CalendarOutlined,
  ShopOutlined,
  CustomerServiceOutlined,
  UserOutlined,
  CreditCardOutlined,
  GiftOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: '儀表板',
    },
    {
      key: '/bookings',
      icon: <CalendarOutlined />,
      label: '預約管理',
    },
    {
      key: '/stores',
      icon: <ShopOutlined />,
      label: '店舖管理',
    },
    {
      key: '/services',
      icon: <CustomerServiceOutlined />,
      label: '服務管理',
    },
    {
      key: '/customers',
      icon: <UserOutlined />,
      label: '客戶管理',
    },
    {
      key: '/payments',
      icon: <CreditCardOutlined />,
      label: '支付管理',
    },
    {
      key: '/promotions',
      icon: <GiftOutlined />,
      label: '促銷活動',
    },
    {
      key: '/notifications',
      icon: <BellOutlined />,
      label: '通知中心',
    },
  ];

  return (
    <Sider
      width={200}
      style={{
        background: '#fff',
        borderRight: '1px solid #f0f0f0',
      }}
    >
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{ height: '100%', borderRight: 0 }}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  );
};

export default Sidebar; 