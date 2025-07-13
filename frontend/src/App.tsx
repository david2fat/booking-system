import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';

// 簡單的 API 服務
const API_BASE = 'https://david2fat-booking-system-299d0c6a305f.herokuapp.com/api/v1';

const api = {
  login: async (email: string, password: string) => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('登入失敗');
    }
    
    return response.json();
  },
};

// 登入組件
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await api.login(email, password);
      localStorage.setItem('token', result.access_token);
      window.location.href = '/booking-system/';
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <h1>登入</h1>
      <form onSubmit={handleLogin} className="booking-form">
        <div className="form-group">
          <label>電子郵件：</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>密碼：</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn btn-primary">登入</button>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <span>還沒有帳號？</span>
          <button 
            type="button" 
            onClick={() => window.location.href = '/booking-system/register'}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#1890ff', 
              cursor: 'pointer',
              textDecoration: 'underline',
              marginLeft: '10px'
            }}
          >
            立即註冊
          </button>
        </div>
      </form>
    </div>
  );
};

// 註冊組件
const Register = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    email: '',
    password: '',
    confirm_password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirm_password) {
      setError('密碼確認不一致');
      return;
    }

    if (formData.password.length < 6) {
      setError('密碼至少需要6個字元');
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          username: formData.username,
          email: formData.email,
          password: formData.password
        }),
      });

      if (response.ok) {
        setSuccess('註冊成功！正在跳轉到登入頁面...');
        setTimeout(() => {
          window.location.href = '/booking-system/login';
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.detail || '註冊失敗');
      }
    } catch (err: any) {
      setError('註冊失敗，請稍後再試');
    }
  };

  return (
    <div className="page">
      <h1>註冊帳號</h1>
      <form onSubmit={handleRegister} className="booking-form">
        <div className="form-group">
          <label>姓名：</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>使用者名稱：</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>電子郵件：</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>密碼：</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>確認密碼：</label>
          <input
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleInputChange}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit" className="btn btn-primary">註冊</button>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <span>已有帳號？</span>
          <button 
            type="button" 
            onClick={() => window.location.href = '/booking-system/login'}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#1890ff', 
              cursor: 'pointer',
              textDecoration: 'underline',
              marginLeft: '10px'
            }}
          >
            立即登入
          </button>
        </div>
      </form>
    </div>
  );
};

// 側邊欄組件
const Sidebar = ({ onLogout }: { onLogout: () => void }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleMenu = (menuKey: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuKey) 
        ? prev.filter(key => key !== menuKey)
        : [...prev, menuKey]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  const isSubmenuActive = (paths: string[]) => paths.some(path => location.pathname === path);

  const menuItems = [
    {
      key: 'dashboard',
      label: '儀表板',
      icon: '📊',
      path: '/',
      submenu: [
        { label: '首頁概覽', path: '/' },
        { label: '統計報表', path: '/reports' },
        { label: '系統設定', path: '/settings' }
      ]
    },
    {
      key: 'booking',
      label: '預約管理',
      icon: '📅',
      path: '/booking',
      submenu: [
        { label: '新增預約', path: '/booking' },
        { label: '預約列表', path: '/booking-list' },
        { label: '預約日曆', path: '/booking-calendar' },
        { label: '預約設定', path: '/booking-settings' }
      ]
    },
    {
      key: 'schedule',
      label: '時間管理',
      icon: '⏰',
      path: '/schedule',
      submenu: [
        { label: '員工時間表', path: '/schedule' },
        { label: '工作時段', path: '/work-hours' },
        { label: '休息時間', path: '/break-time' },
        { label: '假期管理', path: '/vacation' }
      ]
    },
    {
      key: 'store',
      label: '店舖管理',
      icon: '🏪',
      path: '/store',
      submenu: [
        { label: '店舖資訊', path: '/store' },
        { label: '營業時間', path: '/business-hours' },
        { label: '服務項目', path: '/services' },
        { label: '設備管理', path: '/equipment' }
      ]
    },
    {
      key: 'customer',
      label: '客戶管理',
      icon: '👥',
      path: '/customer',
      submenu: [
        { label: '客戶資料', path: '/customer' },
        { label: '會員等級', path: '/membership' },
        { label: '客戶分析', path: '/customer-analytics' },
        { label: '客戶回饋', path: '/feedback' }
      ]
    },
    {
      key: 'payment',
      label: '收款管理',
      icon: '💰',
      path: '/payment',
      submenu: [
        { label: '收款記錄', path: '/payment' },
        { label: '付款方式', path: '/payment-methods' },
        { label: '發票管理', path: '/invoices' },
        { label: '退款處理', path: '/refunds' }
      ]
    },
    {
      key: 'promotion',
      label: '行銷活動',
      icon: '🎯',
      path: '/promotion',
      submenu: [
        { label: '促銷活動', path: '/promotion' },
        { label: '優惠券', path: '/coupons' },
        { label: '會員積分', path: '/points' },
        { label: '推薦獎勵', path: '/referrals' }
      ]
    },
    {
      key: 'notification',
      label: '通知中心',
      icon: '🔔',
      path: '/notification',
      submenu: [
        { label: '系統通知', path: '/notification' },
        { label: '簡訊設定', path: '/sms-settings' },
        { label: '郵件設定', path: '/email-settings' },
        { label: '推播通知', path: '/push-notifications' }
      ]
    }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>預約系統</h2>
        <p>專業的預約管理平台</p>
      </div>
      
      <ul className="nav-menu">
        {menuItems.map((item) => (
          <li key={item.key} className="nav-item">
            <div
              className={`nav-link ${isSubmenuActive(item.submenu.map(sub => sub.path)) ? 'active' : ''} ${expandedMenus.includes(item.key) ? 'expanded' : ''}`}
              onClick={() => toggleMenu(item.key)}
            >
              <span>{item.label}</span>
              <span className="arrow">›</span>
            </div>
            
            <ul className="submenu" style={{ 
              maxHeight: expandedMenus.includes(item.key) ? '500px' : '0px' 
            }}>
              {item.submenu.map((subItem) => (
                <li key={subItem.path} className="submenu-item">
                  <Link
                    to={subItem.path}
                    className={`submenu-link ${isActive(subItem.path) ? 'active' : ''}`}
                  >
                    {subItem.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      
      <div className="logout-section">
        <button onClick={onLogout} className="logout-btn">
          登出系統
        </button>
      </div>
    </div>
  );
};

// 頁面組件
const Home = () => {
  const [stats, setStats] = useState({ bookings: 0, stores: 0, users: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setStats({ bookings: 0, stores: 2, users: 1 });
          return;
        }
        
        const response = await fetch('https://david2fat-booking-system-299d0c6a305f.herokuapp.com/api/v1/bookings/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setStats({ bookings: Array.isArray(data) ? data.length : 0, stores: 2, users: 1 });
        } else {
          setStats({ bookings: 0, stores: 2, users: 1 });
        }
      } catch (err) {
        console.log('無法獲取統計資料');
        setStats({ bookings: 0, stores: 2, users: 1 });
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div className="page">
      <h1>預約系統首頁</h1>
      <p>歡迎使用線上預約系統</p>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>總預約數</h3>
          <p className="amount">{stats.bookings}</p>
        </div>
        <div className="stat-card">
          <h3>店舖數量</h3>
          <p className="amount">{stats.stores}</p>
        </div>
        <div className="stat-card">
          <h3>用戶數量</h3>
          <p className="amount">{stats.users}</p>
        </div>
      </div>

      <div className="feature-grid">
        <div className="feature-card">
          <h3>線上預約</h3>
          <p>客戶可以線上預約服務時間</p>
        </div>
        <div className="feature-card">
          <h3>時間表管理</h3>
          <p>管理員工工作時間和預約時段</p>
        </div>
        <div className="feature-card">
          <h3>QR Code 確認</h3>
          <p>掃描 QR Code 快速確認預約</p>
        </div>
        <div className="feature-card">
          <h3>多員工帳號</h3>
          <p>支援多員工同時管理</p>
        </div>
      </div>
    </div>
  );
};

const Booking = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    // 客戶資料
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    customer_id: null as number | null,
    
    // 預約資料
    booking_date: '',
    start_time: '',
    end_time: '',
    store_id: 1,
    service_id: 1,
    employee_id: null as number | null,
    total_amount: 1000,
    notes: ''
  });

  const [isNewCustomer, setIsNewCustomer] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('請先登入');
        setLoading(false);
        return;
      }
      
      const response = await fetch('https://david2fat-booking-system-299d0c6a305f.herokuapp.com/api/v1/bookings/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          setError('登入已過期，請重新登入');
          localStorage.removeItem('token');
          window.location.href = '/booking-system/login';
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      // 確保 data 是陣列
      setBookings(Array.isArray(data) ? data : []);
      setError('');
    } catch (err: any) {
      setError(err.message || '獲取預約資料失敗');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let customerId = formData.customer_id;
      
      // 如果是新增客戶，先建立客戶
      if (isNewCustomer) {
        const customerData = {
          name: formData.customer_name,
          phone: formData.customer_phone,
          email: formData.customer_email,
          address: '',
          notes: ''
        };
        const token = localStorage.getItem('token');
        const customerResponse = await fetch('https://david2fat-booking-system-299d0c6a305f.herokuapp.com/api/v1/customers/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(customerData),
        });
        const customerResult = await customerResponse.json();
        customerId = customerResult.id;
      }
      
      // 建立預約
      const bookingData = {
        booking_date: formData.booking_date,
        start_time: formData.start_time,
        end_time: formData.end_time,
        store_id: formData.store_id,
        service_id: formData.service_id,
        employee_id: formData.employee_id,
        total_amount: formData.total_amount,
        notes: formData.notes,
        customer_id: customerId
      };
      
      const token = localStorage.getItem('token');
      await fetch('https://david2fat-booking-system-299d0c6a305f.herokuapp.com/api/v1/bookings/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
      alert('預約成功！');
      setFormData({
        customer_name: '',
        customer_phone: '',
        customer_email: '',
        customer_id: null,
        booking_date: '',
        start_time: '',
        end_time: '',
        store_id: 1,
        service_id: 1,
        employee_id: null,
        total_amount: 1000,
        notes: ''
      });
      fetchBookings();
    } catch (error: any) {
      alert('預約失敗：' + error.message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'service_id' || name === 'total_amount' || name === 'employee_id' 
        ? (value === '' ? null : parseInt(value))
        : value
    });
  };

  return (
    <div className="page">
      <h1>預約管理</h1>
      
      <div className="booking-form">
        <h2>新增預約</h2>
        <form onSubmit={handleSubmit}>
          {/* 客戶資料區塊 */}
          <div className="form-section">
            <h3>客戶資料</h3>
            <div className="form-group">
              <label>
                <input
                  type="radio"
                  checked={isNewCustomer}
                  onChange={() => setIsNewCustomer(true)}
                />
                新增客戶
              </label>
              <label>
                <input
                  type="radio"
                  checked={!isNewCustomer}
                  onChange={() => setIsNewCustomer(false)}
                />
                選擇現有客戶
              </label>
            </div>
            
            {isNewCustomer ? (
              <>
                <div className="form-group">
                  <label>客戶姓名：</label>
                  <input
                    type="text"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleInputChange}
                    placeholder="請輸入客戶姓名"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>客戶電話：</label>
                  <input
                    type="tel"
                    name="customer_phone"
                    value={formData.customer_phone}
                    onChange={handleInputChange}
                    placeholder="請輸入客戶電話"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>客戶信箱：</label>
                  <input
                    type="email"
                    name="customer_email"
                    value={formData.customer_email}
                    onChange={handleInputChange}
                    placeholder="請輸入客戶信箱"
                  />
                </div>
              </>
            ) : (
              <div className="form-group">
                <label>選擇客戶：</label>
                <select name="customer_id" onChange={handleInputChange}>
                  <option value="">請選擇客戶</option>
                  <option value="1">張小姐 (0912-345-678)</option>
                  <option value="2">李先生 (0923-456-789)</option>
                  <option value="3">王太太 (0934-567-890)</option>
                </select>
              </div>
            )}
          </div>

          {/* 預約資料區塊 */}
          <div className="form-section">
            <h3>預約資料</h3>
            <div className="form-group">
              <label>預約日期：</label>
              <input
                type="date"
                name="booking_date"
                value={formData.booking_date}
                onChange={handleInputChange}
                required
              />
            </div>
          <div className="form-group">
            <label>開始時間：</label>
            <input
              type="datetime-local"
              name="start_time"
              value={formData.start_time}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>結束時間：</label>
            <input
              type="datetime-local"
              name="end_time"
              value={formData.end_time}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>服務項目：</label>
            <select
              name="service_id"
              value={formData.service_id}
              onChange={handleInputChange}
              required
            >
              <option value="1">美髮</option>
              <option value="2">美甲</option>
              <option value="3">按摩</option>
              <option value="4">美容</option>
            </select>
          </div>
          <div className="form-group">
            <label>員工：</label>
            <select
              name="employee_id"
              value={formData.employee_id || ''}
              onChange={handleInputChange}
            >
              <option value="">請選擇員工</option>
              <option value="1">張美美</option>
              <option value="2">李小華</option>
              <option value="3">王小明</option>
            </select>
          </div>
          <div className="form-group">
            <label>總金額（分）：</label>
            <input
              type="number"
              name="total_amount"
              value={formData.total_amount}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>備註：</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="請輸入備註"
            />
          </div>
          <button type="submit" className="btn btn-primary">確認預約</button>
        </div>
        </form>
      </div>

      <div className="booking-list">
        <h2>預約列表</h2>
        {loading ? (
          <p>載入中...</p>
        ) : error ? (
          <p className="error">錯誤：{error}</p>
        ) : bookings.length === 0 ? (
          <p>目前沒有預約</p>
        ) : (
          <div className="booking-grid">
            {bookings.map((booking: any, index: number) => (
              <div key={index} className="booking-item">
                <h4>預約 #{booking.id}</h4>
                <p>客戶名稱：{booking.customer?.name || '無'}</p>
                <p>客戶電話：{booking.customer?.phone || '無'}</p>
                <p>服務名稱：{booking.service?.name || '無'}</p>
                <p>員工職稱：{booking.employee?.position || '無'}</p>
                <p>開始時間：{new Date(booking.start_time).toLocaleString()}</p>
                <p>結束時間：{new Date(booking.end_time).toLocaleString()}</p>
                <p>狀態：{booking.status}</p>
                <p>金額：${booking.total_amount / 100}</p>
                <p>備註：{booking.notes || '無'}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Schedule = () => (
  <div className="page">
    <h1>時間表管理</h1>
    <div className="schedule-grid">
      <div className="schedule-card">
        <h3>今日預約</h3>
        <div className="schedule-item">
          <span>09:00 - 張美美 - 美髮</span>
        </div>
        <div className="schedule-item">
          <span>10:30 - 李小華 - 美甲</span>
        </div>
        <div className="schedule-item">
          <span>14:00 - 王小明 - 按摩</span>
        </div>
      </div>
      <div className="schedule-card">
        <h3>員工時間表</h3>
        <div className="employee-schedule">
          <h4>張美美</h4>
          <p>工作時間：09:00-18:00</p>
          <p>休息時間：12:00-13:00</p>
        </div>
        <div className="employee-schedule">
          <h4>李小華</h4>
          <p>工作時間：10:00-19:00</p>
          <p>休息時間：13:00-14:00</p>
        </div>
      </div>
    </div>
  </div>
);

const Store = () => (
  <div className="page">
    <h1>店舖管理</h1>
    <div className="store-grid">
      <div className="store-card">
        <h3>總店</h3>
        <p>地址：台北市信義區信義路五段7號</p>
        <p>電話：02-2345-6789</p>
        <p>營業時間：09:00-21:00</p>
        <button className="btn btn-primary">編輯</button>
      </div>
      <div className="store-card">
        <h3>分店A</h3>
        <p>地址：台北市大安區忠孝東路四段1號</p>
        <p>電話：02-2345-6790</p>
        <p>營業時間：10:00-20:00</p>
        <button className="btn btn-primary">編輯</button>
      </div>
    </div>
  </div>
);

const Customer = () => (
  <div className="page">
    <h1>客戶管理</h1>
    <div className="customer-list">
      <div className="customer-item">
        <h3>張小姐</h3>
        <p>電話：0912-345-678</p>
        <p>會員等級：金卡</p>
        <p>積分：1,250</p>
        <button className="btn btn-primary">查看詳情</button>
      </div>
      <div className="customer-item">
        <h3>李先生</h3>
        <p>電話：0923-456-789</p>
        <p>會員等級：銀卡</p>
        <p>積分：850</p>
        <button className="btn btn-primary">查看詳情</button>
      </div>
    </div>
  </div>
);

const Payment = () => (
  <div className="page">
    <h1>收款管理</h1>
    <div className="payment-stats">
      <div className="stat-card">
        <h3>今日收入</h3>
        <p className="amount">$15,800</p>
      </div>
      <div className="stat-card">
        <h3>本月收入</h3>
        <p className="amount">$285,600</p>
      </div>
      <div className="stat-card">
        <h3>待收款</h3>
        <p className="amount">$3,200</p>
      </div>
    </div>
    <div className="payment-methods">
      <h2>付款方式</h2>
      <div className="method-grid">
        <div className="method-item">
          <h4>現金</h4>
          <p>今日：$8,500</p>
        </div>
        <div className="method-item">
          <h4>信用卡</h4>
          <p>今日：$5,200</p>
        </div>
        <div className="method-item">
          <h4>行動支付</h4>
          <p>今日：$2,100</p>
        </div>
      </div>
    </div>
  </div>
);

const Promotion = () => (
  <div className="page">
    <h1>促銷活動</h1>
    <div className="promotion-grid">
      <div className="promotion-card">
        <h3>新客戶優惠</h3>
        <p>首次預約享8折優惠</p>
        <p>有效期：2024/12/31</p>
        <button className="btn btn-primary">編輯</button>
      </div>
      <div className="promotion-card">
        <h3>會員積分加倍</h3>
        <p>週末消費積分加倍</p>
        <p>有效期：2024/12/31</p>
        <button className="btn btn-primary">編輯</button>
      </div>
      <div className="promotion-card">
        <h3>推薦獎勵</h3>
        <p>推薦朋友各得100積分</p>
        <p>有效期：長期有效</p>
        <button className="btn btn-primary">編輯</button>
      </div>
    </div>
  </div>
);

const Notification = () => (
  <div className="page">
    <h1>通知中心</h1>
    <div className="notification-list">
      <div className="notification-item">
        <h4>新預約通知</h4>
        <p>張小姐預約了明天14:00的美髮服務</p>
        <span className="time">2分鐘前</span>
      </div>
      <div className="notification-item">
        <h4>系統提醒</h4>
        <p>今日預約已滿，建議調整時間</p>
        <span className="time">10分鐘前</span>
      </div>
      <div className="notification-item">
        <h4>付款完成</h4>
        <p>李先生已完成付款 $1,200</p>
        <span className="time">30分鐘前</span>
      </div>
    </div>
  </div>
);

// 其他頁面組件（用於子選單）
const Reports = () => (
  <div className="page">
    <h1>統計報表</h1>
    <p>這裡是統計報表頁面</p>
  </div>
);

const Settings = () => (
  <div className="page">
    <h1>系統設定</h1>
    <p>這裡是系統設定頁面</p>
  </div>
);

const BookingList = () => (
  <div className="page">
    <h1>預約列表</h1>
    <p>這裡是預約列表頁面</p>
  </div>
);

const BookingCalendar = () => (
  <div className="page">
    <h1>預約日曆</h1>
    <p>這裡是預約日曆頁面</p>
  </div>
);

const BookingSettings = () => (
  <div className="page">
    <h1>預約設定</h1>
    <p>這裡是預約設定頁面</p>
  </div>
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href = '/booking-system/login';
  };

  if (!isLoggedIn) {
    return (
      <Router basename="/booking-system">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router basename="/booking-system">
      <div className="App">
        <Sidebar onLogout={handleLogout} />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking-list" element={<BookingList />} />
            <Route path="/booking-calendar" element={<BookingCalendar />} />
            <Route path="/booking-settings" element={<BookingSettings />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/work-hours" element={<div className="page"><h1>工作時段</h1><p>這裡是工作時段頁面</p></div>} />
            <Route path="/break-time" element={<div className="page"><h1>休息時間</h1><p>這裡是休息時間頁面</p></div>} />
            <Route path="/vacation" element={<div className="page"><h1>假期管理</h1><p>這裡是假期管理頁面</p></div>} />
            <Route path="/store" element={<Store />} />
            <Route path="/business-hours" element={<div className="page"><h1>營業時間</h1><p>這裡是營業時間頁面</p></div>} />
            <Route path="/services" element={<div className="page"><h1>服務項目</h1><p>這裡是服務項目頁面</p></div>} />
            <Route path="/equipment" element={<div className="page"><h1>設備管理</h1><p>這裡是設備管理頁面</p></div>} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/membership" element={<div className="page"><h1>會員等級</h1><p>這裡是會員等級頁面</p></div>} />
            <Route path="/customer-analytics" element={<div className="page"><h1>客戶分析</h1><p>這裡是客戶分析頁面</p></div>} />
            <Route path="/feedback" element={<div className="page"><h1>客戶回饋</h1><p>這裡是客戶回饋頁面</p></div>} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/payment-methods" element={<div className="page"><h1>付款方式</h1><p>這裡是付款方式頁面</p></div>} />
            <Route path="/invoices" element={<div className="page"><h1>發票管理</h1><p>這裡是發票管理頁面</p></div>} />
            <Route path="/refunds" element={<div className="page"><h1>退款處理</h1><p>這裡是退款處理頁面</p></div>} />
            <Route path="/promotion" element={<Promotion />} />
            <Route path="/coupons" element={<div className="page"><h1>優惠券</h1><p>這裡是優惠券頁面</p></div>} />
            <Route path="/points" element={<div className="page"><h1>會員積分</h1><p>這裡是會員積分頁面</p></div>} />
            <Route path="/referrals" element={<div className="page"><h1>推薦獎勵</h1><p>這裡是推薦獎勵頁面</p></div>} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/sms-settings" element={<div className="page"><h1>簡訊設定</h1><p>這裡是簡訊設定頁面</p></div>} />
            <Route path="/email-settings" element={<div className="page"><h1>郵件設定</h1><p>這裡是郵件設定頁面</p></div>} />
            <Route path="/push-notifications" element={<div className="page"><h1>推播通知</h1><p>這裡是推播通知頁面</p></div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 