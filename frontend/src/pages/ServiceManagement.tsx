import React from 'react';
import { Table, Button, Tag, Space, Card } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ServiceManagement: React.FC = () => {
  const columns = [
    {
      title: '服務名稱',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '時長',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration: number) => `${duration} 分鐘`,
    },
    {
      title: '價格',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `NT$ ${price}`,
    },
    {
      title: '狀態',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? '啟用' : '停用'}
        </Tag>
      ),
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
      name: '基礎按摩',
      description: '全身放鬆按摩',
      duration: 60,
      price: 1200,
      is_active: true,
    },
    {
      id: 2,
      name: '深層按摩',
      description: '深層肌肉放鬆',
      duration: 90,
      price: 1800,
      is_active: true,
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2>服務管理</h2>
        <Button type="primary" icon={<PlusOutlined />}>
          新增服務
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

export default ServiceManagement; 