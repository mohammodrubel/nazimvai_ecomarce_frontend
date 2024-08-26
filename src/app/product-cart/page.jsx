"use client";
import { useSelector, useDispatch } from "react-redux";
import { Table, Image as AntdImage, InputNumber, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { deleteFromCart, updateQuantity } from "@/lib/fetchers/Product/ProductSlice";
import Link from "next/link";


function Page() {
  const currentCart = useSelector((state) => state.products.cartItem);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, value) => {
    dispatch(updateQuantity({ _id: id, quantity: value }));
  };
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
    },
    {
      title: "Current Stock",
      dataIndex: "in_stock",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <InputNumber
          min={1}
          max={record.in_stock}
          value={record.quantity}
          onChange={(value) => handleQuantityChange(record.key, value !== undefined && value !== null && value !== "" ? value : 1)}
          onBlur={(e) => {
            if (e.target.value === "" || e.target.value === "0") {
              handleQuantityChange(record.key, 1);
            }
          }}
          className="mx-2"
        />
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="flex items-center">
          <Button
            type="link"
            danger
            onClick={() => deleteHandler(record)}
            icon={<CloseOutlined />}
          >
            Delete
          </Button>
        </div>
      ),
    }
  ];

  const dataSource = currentCart.map((item) => ({
    key: item._id,
    images: item.images,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    in_stock: item.in_stock,
  }));

  return (
    <div className="bg-slate-50 h-auto">
      <div className="mt-20 container mx-auto">
        <Table columns={columns} dataSource={dataSource} pagination={false} />
        <div className="text-end">
          <Link href='/checkout'><Button className="mt-5 mb-5 font-bold" type="primary" danger size="large">CheckOut</Button></Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
