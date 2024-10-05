"use client";
import { useState } from 'react'
import Error from '@/components/Error/Error';
import Loading from '@/components/Loading/Loading';
import { useFetchAllProductsQuery } from '@/lib/fetchers/Product/ProductApi';
import { Table, Button, Popconfirm, Pagination, Input } from 'antd';
import Image from 'next/image';

export default function Page() {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(8)
    const [searchTerm, setSearchTerm] = useState('');
    const { isLoading, isError, data } = useFetchAllProductsQuery([
    { name: 'searchTerm', value: searchTerm || '' },
        { name: 'page', value: page || 1 },
        { name: 'limit', value: limit },
        { name: 'sort', value: 'desc' }
    ]);;
    let totalQuantity = data?.meta?.total

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
    ];
    const handlePageChange = (page) => {
        setPage(page);
    };

    return (
        <div className="mb-10">
            <div className="container text-center my-8 mx-auto">
                <Input size="large" style={{ width: '60%' }} placeholder="Search Your Product" onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            {content}
            {dataSource.length > 0 && <Table
                bordered
                scroll={{ x: true }}
                columns={columns}
                dataSource={dataSource}
                pagination={false}
            />}
              <div className='flex justify-center my-10'>
                <Pagination current={page} onChange={handlePageChange} total={totalQuantity} />
            </div>
        </div>
    );
}
