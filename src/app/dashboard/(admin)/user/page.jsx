"use client"
import React, { useState } from 'react';
import { Table, Button, Tag } from 'antd';
import { useFatchAllUserQuery } from '@/lib/fetchers/user/userApi';
import Loading from '@/components/Loading/Loading';
import Error from '@/components/Error/Error';

const Page = () => {
    const { isLoading, isError, data } = useFatchAllUserQuery();
    let content;
    let dataSource;

    // Error handling
    if (!isLoading && isError) {
        content = <Error errorText="Something went wrong" />;
    }
    if (!isLoading && !isError && data?.data?.length <= 0) {
        content = <Error errorText="No Data Found" />;
    }
    if (!isLoading && !isError && data?.data?.length > 0) {
        dataSource = data?.data;
    }

    // Function to handle role conversion
    const handleRoleChange = (record) => {
        const newData = data.map((item) =>
            item._id === record._id
                ? { ...item, role: item.role === 'admin' ? 'user' : 'admin' }
                : item
        );
        setData(newData); // Make sure you define `setData`
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Role',
            key: 'role',
            render: (record) => (
                <Tag color={record.role === 'admin' ? 'green' : 'blue'}>
                    {record.role.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Button onClick={() => handleRoleChange(record)}>
                    {record.role === 'admin' ? 'Convert to User' : 'Convert to Admin'}
                </Button>
            ),
        },
    ];

    return (
        <>
            <Table loading={isLoading} columns={columns} dataSource={dataSource} rowKey="_id" />
            <p className="text-center">{content}</p>
        </>
    );
};

export default Page;
