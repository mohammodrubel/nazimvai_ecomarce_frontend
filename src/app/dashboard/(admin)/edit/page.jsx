"use client";
import Error from '@/components/Error/Error';
import Loading from '@/components/Loading/Loading';
import { useFetchAllProductsQuery } from '@/lib/fetchers/Product/ProductApi';
import { Table, Button, Popconfirm } from 'antd';

export default function Page() {
  const { isLoading, isError, data } = useFetchAllProductsQuery([]);
  
  let content = null;
  let dataSource = [];

  if (isLoading) {
    content = <Loading />;
  }

  if (isError) {
    content = <Error errorText="Something went wrong" />;
  }

  if (data?.data) {
    if (data.data.length === 0) {
      content = <Error errorText="No Data found" />;
    } else {
      dataSource = data.data; // Set data source only if data exists and has items
    }
  }

  const handleDelete = (id) => {
    console.log(`Delete item with id: ${id}`);
    // Implement delete logic here (e.g., API call)
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Brand Name',
      dataIndex: ['brand', 'name'], // Accessing nested data
      key: 'brand',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'In Stock',
      dataIndex: 'in_stock',
      key: 'in_stock',
    },
    {
      title: 'Category',
      dataIndex: ['category', 'name'],
      key: 'category',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this item?"
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="dashed" >
            Edit Product
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="mb-10">
      {content}
      {dataSource.length > 0 && <Table 
      bordered
      scroll={{ x: true }}  
      columns={columns} 
      dataSource={dataSource} 
      pagination={false}
      />} 
    </div>
  );
}
