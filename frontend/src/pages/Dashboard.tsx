import React, { useEffect } from 'react';
import { Row, Col, Card, Statistic, Table, Button } from 'antd';
import { 
  CalendarOutlined, 
  UserOutlined, 
  ShopOutlined, 
  DollarOutlined 
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchBookings } from '../store/slices/bookingSlice';
import { fetchStores } from '../store/slices/storeSlice';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { bookings, loading } = useSelector((state: RootState) => state.booking);
  const { stores } = useSelector((state: RootState) => state.store);

  useEffect(() => {
    dispatch(fetchBookings());
    dispatch(fetchStores());
  }, [dispatch]);

  const recentBookings = bookings.slice(0, 5);

  const bookingColumns = [
    {
      title: '預約時間',
      dataIndex: 'booking_date',
      key: 'booking_date',
      render: (date: string) => new Date(date).toLocaleDateString('zh-TW'),
    },
    {
      title: '服務',
      dataIndex: ['service', 'name'],
      key: 'service',
    },
    {
      title: '店舖',
      dataIndex: ['store', 'name'],
      key: 'store',
    },
    {
      title: '狀態',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap: { [key: string]: string } = {
          pending: '待確認',
          confirmed: '已確認',
          completed: '已完成',
          cancelled: '已取消',
        };
        return statusMap[status] || status;
      },
    },
    {
      title: '金額',
      dataIndex: 'total_amount',
      key: 'total_amount',
      render: (amount: number) => `NT$ ${amount}`,
    },
  ];

  return (
    <div>
      <h2>儀表板</h2>
      
      {/* 統計卡片 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="今日預約"
              value={bookings.filter(b => 
                new Date(b.booking_date).toDateString() === new Date().toDateString()
              ).length}
              prefix={<CalendarOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="總預約數"
              value={bookings.length}
              prefix={<CalendarOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="店舖數量"
              value={stores.length}
              prefix={<ShopOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="本月營收"
              value={bookings.reduce((sum, booking) => sum + booking.total_amount, 0)}
              prefix={<DollarOutlined />}
              suffix="NT$"
            />
          </Card>
        </Col>
      </Row>

      {/* 最近預約 */}
      <Card title="最近預約" style={{ marginBottom: 24 }}>
        <Table
          columns={bookingColumns}
          dataSource={recentBookings}
          loading={loading}
          pagination={false}
          rowKey="id"
        />
      </Card>

      {/* 快速操作 */}
      <Row gutter={16}>
        <Col span={8}>
          <Card title="快速操作">
            <Button type="primary" block style={{ marginBottom: 8 }}>
              新增預約
            </Button>
            <Button block style={{ marginBottom: 8 }}>
              管理店舖
            </Button>
            <Button block>
              查看報表
            </Button>
          </Card>
        </Col>
        <Col span={16}>
          <Card title="系統公告">
            <p>歡迎使用線上預約系統！</p>
            <p>• 新功能：QR Code確認預約</p>
            <p>• 新功能：會員積分系統</p>
            <p>• 新功能：促銷活動管理</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard; 