"use client";
import { useSelector, useDispatch } from "react-redux";
import { Table, Image as AntdImage, InputNumber, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { updateQuantity as updateQuantityAction } from "@/lib/fetchers/Product/ProductSlice";

function Page() {
  const currentCart = useSelector((state) => state.products.cartItem);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, value) => {
    dispatch(updateQuantityAction({ _id: id, quantity: value }));
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
          defaultValue={record.quantity}
          onChange={(item) => handleQuantityChange(record.key,item)}
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
            // onClick={() => deleteItem(record._id)}
            icon={<CloseOutlined />}
          >
            Delete
          </Button>
        </div>
      ),
    },
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
      </div>
    </div>
  );
}

export default Page;
