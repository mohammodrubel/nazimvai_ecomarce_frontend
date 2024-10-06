"use client";
import Error from '@/components/Error/Error';
import Loading from '@/components/Loading/Loading';
import { useDeleteProductMutation, useFetchAllProductsQuery } from '@/lib/fetchers/Product/ProductApi';
import { Button, Popconfirm, Table } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Page() {
  const { isLoading, isError, data } = useFetchAllProductsQuery([]);
const [deleteDataId, setDeleteDataId] = useState('');
const [deletedId,{isLoading:deleteLoading,isError:deleteError,data:deleteData}] = useDeleteProductMutation();

let content = null;
let dataSource = [];

// Handle loading state
if (isLoading) {
  content = <Loading />;
}

// Handle error state
if (isError) {
  content = <Error errorText="Something went wrong" />;
}

// Handle no data found case
if (data?.data && data.data.length === 0) {
  content = <Error errorText="No Data found" />;
}

// Set data source if data is available
if (data?.data) {
  dataSource = data.data.filter((item) => !item.isDeleted); // Only keep items where isDeleted is true
}
if(deleteData){
  toast.success(deleteData?.message)
}

// Handle delete action
const handleDelete = async (id) => {
  await deletedId(id)
};

// Table columns
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Image',
    dataIndex: 'images',
    key: 'image',
    render: (images) => {
      return images && images.length > 0 ? (
        <Image src={images[0]} alt="Product" width={100} height={100} />
      ) : (
        <span>No image found</span>
      );
    },
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
        title="Are you sure you want to delete this product?"
        onConfirm={() => handleDelete(record._id)} // Trigger the delete action here
        okText="Yes"
        cancelText="No"
      >
        <Button type="primary" loading={isLoading} danger> {/* Show loading spinner if deleting */}
          Delete Product
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
