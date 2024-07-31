"use client";
import { useSelector, useDispatch } from "react-redux";
import { Table, Image as AntdImage, InputNumber, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

function Page() {
  const currentCart = useSelector((state) => state?.products?.cartItem);
  const dispatch = useDispatch();

  const updateQuantity = (index, value) => {
    console.log("Updating quantity:", value);
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { index, quantity: value },
    });
  };

  const deleteItem = (index) => {
    console.log("Deleting item at index:", index);
    dispatch({
      type: "DELETE_ITEM",
      payload: index,
    });
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
          alt={`Product ${record.key}`}
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
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <InputNumber
          defaultValue={record.quantity}
          onChange={(value) => updateQuantity(record.key, value)}
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
            onClick={() => deleteItem(record.key)}
            icon={<CloseOutlined />}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const dataSource = currentCart.map((item, index) => ({
    key: index,
    images: item.images,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));

  return (
    <div className="bg-slate-50 h-auto">
      <div className="mt-20 container mx-auto">
        <Table style={{mx:auto}} columns={columns} dataSource={dataSource} pagination={false} />
      </div>
    </div>
  );
}

export default Page;
