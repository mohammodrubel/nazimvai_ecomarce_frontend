"use client"; // Ensure this is at the very top

import { useDispatch, useSelector } from 'react-redux';
import { Table as AntdTable, Image as AntdImage, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { removeWishlistItem } from '@/lib/fetchers/wishlist/wishlistSlice'; // Adjust the path if necessary

function Page() {
    const { wishlist } = useSelector((state) => state?.wishlist) || []; 
    const dispatch = useDispatch();

    const handleDeleteWishlist = (product) => {
        console.log(product);
        dispatch(removeWishlistItem({ key: product.key }));
    };

    const columns = [
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (text, record) => (
                <AntdImage
                    src={record.images[0]} // Display the first image
                    width={80}
                    height={80}
                    alt={`Product ${record.name}`}
                />
            ),
        },
        {
            title: "Product Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Current Stock",
            dataIndex: "in_stock",
            key: "in_stock",
        },        
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <div className="flex items-center">
                    <Button
                        type="link"
                        danger
                        onClick={() => handleDeleteWishlist(record)}
                        icon={<CloseOutlined />}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    const dataSource = wishlist?.map((item) => ({
        key: item._id, // Unique key for each row
        images: item.images,
        name: item.name,
        price: item.price,
        in_stock: item.in_stock,
    }));

    return (
        <div className="mx-auto">
    <AntdTable columns={columns} dataSource={dataSource} />
  </div>
    );
}

export default Page;
