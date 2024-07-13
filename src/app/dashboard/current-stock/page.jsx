"use client"
// Import necessary components and hooks from Ant Design and your custom API fetcher
import { Badge, Table } from 'antd';
import { useFetchAllProductsQuery } from "@/lib/fetchers/Product/ProductApi";
import Image from 'next/image';

// Define the Page component
function Page() {
    // Fetch products data using useFetchAllProductsQuery hook
    const { isLoading, isError, data } = useFetchAllProductsQuery();
    const tableData = data?.data; // Extract data from the fetched response

    // Define columns for the Table component
    const columns = [
        {
            title: 'Image',
            dataIndex: 'images',
            key: 'name',
            render: (images) => (
              <div className='flex gap-2'>
                {images.map((item, index) => (
                  <Image key={index} width={50} height={50} style={{borderRadius:'50%'}} src={item} />
                ))}
              </div>
            ),
          },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (data) => (
                <Badge count={data} showZero color="#52C41A" />
            ),
        },
        {
            title: 'Total Quantity',
            dataIndex: 'total_quantity',
            key: 'total_quantity',
            render: (data) => (
                <Badge count={data} showZero color="#f76b8a" />
            ),
        },
        {
            title: 'In Stock',
            dataIndex: 'in_stock',
            key: 'in_stock',
            render: (data) => (
                <Badge count={data} showZero color="#faad14" />
            ),
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku',
            render: (data) => (
                <Badge count={data} showZero color="#ff347f" />
            ),
        },
        {
            title: 'Weight',
            dataIndex: 'weight',
            key: 'weight',
            render: (data) => (
                <Badge count={data} showZero color="#00bbf0" />
            ),
        }
    ];

    // Handle table onChange event
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    // Render the Table component with defined columns and data
    return (
        <div>
            <Table 
                scroll={{
                    x: 1300, // Horizontal scroll
                    y: 500   // Vertical scroll height
                }} 
                columns={columns} 
                loading={isLoading} 
                dataSource={tableData} 
                onChange={onChange} 
            />
        </div>
    );
}

// Export the Page component as default
export default Page;
