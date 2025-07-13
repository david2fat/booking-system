import React from 'react';
import { Table, Button, Tag, Space, Card } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const StoreManagement: React.FC = () => {
  const columns = [
    {
      title: '店舖名稱',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '電話',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '狀態',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? '營業中' : '暫停營業'}
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
      name: '台北旗艦店',
      address: '台北市信義區信義路五段7號',
      phone: '02-2345-6789',
      is_active: true,
    },
    {
      id: 2,
      name: '台中分店',
      address: '台中市西區台灣大道二段2號',
      phone: '04-2345-6789',
      is_active: true,
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2>店舖管理</h2>
        <Button type="primary" icon={<PlusOutlined />}>
          新增店舖
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

export default StoreManagement; 