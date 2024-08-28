"use client"
import { useSelector, useDispatch } from "react-redux";
import { Table, Image as AntdImage, InputNumber, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { deleteFromCart } from "@/lib/fetchers/Product/ProductSlice";
import { useMemo } from "react";

function FinalProduct() {
    const currentCart = useSelector((state) => state.products.cartItem);
    const dispatch = useDispatch();

    
    const deleteHandler = (record) => {
        dispatch(deleteFromCart(record));
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
            render: (text) => <><i className="fa-solid mx-1 fa-bangladeshi-taka-sign"></i> {`${text}`}</>,
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Button
                    type="link"
                    danger
                    onClick={() => deleteHandler(record)}
                    icon={<CloseOutlined />}
                >
                    Delete
                </Button>
            ),
        },
    ];

    // Calculate subtotal
    const subtotal = useMemo(() => {
        return currentCart.reduce((total, item) => total + item.price * item.quantity, 0);
    }, [currentCart]);

    const dataSource = currentCart.map((item) => ({
        key: item._id,
        images: item.images,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
    }));

    return (
        <>
            <h2 className="text-2xl font-bold mb-6">Product</h2>
            <div className="container mx-auto">
                <div className="mt-6 bg-slate-50 p-5 rounded">
                    <div className="flex justify-between items-center">
                        <span>Subtotal</span>
                        <span><i class="fa-solid mx-1 fa-bangladeshi-taka-sign"></i>{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <span>Shipping</span>
                        <span>Enter shipping address</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <span>Estimated Taxes</span>
                        <span><i class="fa-solid mx-1 fa-bangladeshi-taka-sign"></i>{(subtotal * 0.09).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center font-bold text-lg mt-4">
                        <span>Total</span>
                        <span><i class="fa-solid mx-1 fa-bangladeshi-taka-sign"></i>{(subtotal + subtotal * 0.09).toFixed(2)}</span>
                    </div>
                </div>
                <div className="overflow-x-auto max-w-full">
                    <Table className="mt-4" columns={columns} dataSource={dataSource} pagination={false} />
                </div>
            </div>
        </>
    );
}

export default FinalProduct;
