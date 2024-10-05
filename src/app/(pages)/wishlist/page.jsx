"use client"; // Ensure this is at the very top

import { useDispatch, useSelector } from 'react-redux';
import { Table as AntdTable, Image as AntdImage, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { removeWishlistItem } from '@/lib/fetchers/wishlist/wishlistSlice'; // Adjust the path if necessary
import { addProduct } from '@/lib/fetchers/Product/ProductSlice';
import { toast } from 'sonner';

function Page() {
    const user = useSelector((state)=> state?.auth?.user?.email)
    const { wishlist } = useSelector((state) => state?.wishlist) || {}; 
    const dispatch = useDispatch();

    const handleDeleteWishlist = (product) => {
        dispatch(removeWishlistItem({ key: product._id }));
    };

    const handleAddToCart = (product) => {
        if (!user) {
            toast.warning('Please log in to your account to add products to your cart.');
        } else {
            dispatch(addProduct(product));
        }
    };

    const columns = [
        {
            title: "Image",
            dataIndex: "images",
            key: "image",
            render: (images) => (
                images && images.length > 0 ? (
                    <AntdImage
                        src={images[0]} // Display the first image
                        width={80}
                        height={80}
                        alt="Product Image"
                    />
                ) : (
                    <span>No Image Available</span> // Handle case where no images are available
                )
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
            render: (price) => `${price}`, // Format price to 2 decimal places
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
                <>
                    <Button
                        type="link"
                        danger
                        onClick={() => handleDeleteWishlist(record)}
                        icon={<CloseOutlined />}
                    >
                        Delete
                    </Button>
                    <Button
                        type="link"
                        onClick={() => handleAddToCart(record)}
                    >
                        Add To Cart
                    </Button>
                </>
            ),
        },
    ];

    const dataSource = wishlist?.map((item) => ({
        ...item, // Spread the item to keep all original properties, including _id
    })) || [];

    return (
        <div className="mx-auto">
            <AntdTable columns={columns} dataSource={dataSource} pagination={{ pageSize: 5 }} />
        </div>
    );
}

export default Page;
