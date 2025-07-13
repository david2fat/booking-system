import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingList from './pages/BookingList';
import StoreManagement from './pages/StoreManagement';
import ServiceManagement from './pages/ServiceManagement';
import CustomerManagement from './pages/CustomerManagement';
import PaymentManagement from './pages/PaymentManagement';
import PromotionManagement from './pages/PromotionManagement';
import NotificationCenter from './pages/NotificationCenter';

import './App.css';

const { Content } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Layout>
        <Sidebar />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: '#fff',
            }}
          >
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/bookings" element={<BookingList />} />
              <Route path="/stores" element={<StoreManagement />} />
              <Route path="/services" element={<ServiceManagement />} />
              <Route path="/customers" element={<CustomerManagement />} />
              <Route path="/payments" element={<PaymentManagement />} />
              <Route path="/promotions" element={<PromotionManagement />} />
              <Route path="/notifications" element={<NotificationCenter />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App; 