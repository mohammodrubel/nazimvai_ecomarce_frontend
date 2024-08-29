"use client"
import { Button, Table } from 'antd';
import Image from 'next/image';
import { useFetchAllCategoryQuery } from '@/lib/fetchers/Category/CategoryApi';


function page() {
  const { isLoading, isError, data } = useFetchAllCategoryQuery()
  const tableData = data?.data
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'age',
      render: (image) => <Image src={image} width={70} height={70} style={{ borderRadius: '50%' }} />
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: () => <><Button type="dashed" className='bg-red-500 text-white hover:bg-sky-500'>Delete Brand</Button></>
    },
  ];


  return (
    <div>
      <h3 className="font-bold text-2xl px-2">View Category List</h3>
     <div className='mx-auto'>
     <Table scroll={{
        x: 1300, // Horizontal scroll
        y: 500   // Vertical scroll height
      }} loading={isLoading} pagination={false} dataSource={tableData} columns={columns} />;
     </div>
    </div>
  )
}

export default page