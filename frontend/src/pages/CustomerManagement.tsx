import React from 'react';
import { Table, Button, Tag, Space, Card, Avatar } from 'antd';
import { UserOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const CustomerManagement: React.FC = () => {
  const columns = [
    {
      title: '客戶',
      key: 'customer',
      render: (record: any) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div>{record.full_name}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: '電話',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '會員等級',
      dataIndex: 'membership_level',
      key: 'membership_level',
      render: (level: string) => {
        const levelConfig = {
          bronze: { color: 'brown', text: '銅牌' },
          silver: { color: 'silver', text: '銀牌' },
          gold: { color: 'gold', text: '金牌' },
          platinum: { color: 'purple', text: '白金' },
        };
        const config = levelConfig[level as keyof typeof levelConfig] || { color: 'default', text: level };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '積分',
      dataIndex: 'points',
      key: 'points',
    },
    {
      title: '總消費',
      dataIndex: 'total_spent',
      key: 'total_spent',
      render: (amount: number) => `NT$ ${amount}`,
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} size="small">
            編輯
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} size="small">
            刪除
          </Button>
        </Space>
      ),
    },
  ];

  const mockData = [
    {
      id: 1,
      full_name: '張小明',
      email: 'zhang@example.com',
      phone: '0912-345-678',
      membership_level: 'gold',
      points: 1500,
      total_spent: 25000,
    },
    {
      id: 2,
      full_name: '李小華',
      email: 'li@example.com',
      phone: '0923-456-789',
      membership_level: 'silver',
      points: 800,
      total_spent: 12000,
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2>客戶管理</h2>
        <Button type="primary" icon={<UserOutlined />}>
          新增客戶
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={mockData}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      </Card>
    </div>
  );
};

export default CustomerManagement; 