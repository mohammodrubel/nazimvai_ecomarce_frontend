"use client";
import React, { useState } from "react";
import { Select, InputNumber, Button, Form, Input, message, Row, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { toast } from "sonner"; // Assuming this is your custom toast library
import { useAddNewProductMutation } from "@/lib/fetchers/Product/ProductApi";
import { useFetchAllBrandQuery } from "@/lib/fetchers/Brand/BrandApi";
import { useFetchAllCategoryQuery } from "@/lib/fetchers/Category/CategoryApi";

const Page = () => {
  const [fileList, setFileList] = useState([]);
  const { data: brandData } = useFetchAllBrandQuery();
  const { data: categoryData } = useFetchAllCategoryQuery();
  const categoryOption = categoryData?.data.map((item) => ({ value: item._id, label: item?.name }));
  console.log(categoryOption)
  const brandOption = brandData?.data.map((item) => ({ value: item._id, label: item?.name }));
  const [addNewProduct, { isLoading, isError, data: productData }] = useAddNewProductMutation();

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      return Upload.LIST_IGNORE;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const onSubmit = async (values) => {
    console.log(values)
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files", file.originFileObj);
    });

    formData.append("data", JSON.stringify(values));

    try {
      await addNewProduct(formData);
      toast.success("Product added successfully");
    } catch (error) {
      toast.error("Error adding product");
    }
  };

  const uploadButton = (
    <Button style={{ border: 0, background: "none" }} type="button">
      {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </Button>
  );

  return (
    <>
      <h3 className="font-bold text-2xl px-2">Add New Product</h3>
      <Form onFinish={onSubmit}>
        <div className="mx-5 mt-5 mb-5">
          <Row justify="center" align="middle">
            <Upload
              name="avatar"
              listType="picture-card"
              fileList={fileList}
              beforeUpload={beforeUpload}
              onChange={handleChange}
              multiple
              onRemove={(file) => {
                const newFileList = fileList.filter((item) => item.uid !== file.uid);
                setFileList(newFileList);
              }}
            >
              {fileList.length >= 3 ? null : uploadButton}
            </Upload>
          </Row>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-3">
          <Form.Item name="name" rules={[{ required: true, message: "Please enter the name" }]}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item name="price" rules={[{ required: true, message: "Please enter the price" }]}>
            <InputNumber style={{ width: "100%" }} placeholder="Price" />
          </Form.Item>

          <Form.Item name="in_stock" rules={[{ required: true, message: "Please enter the stock quantity" }]}>
            <InputNumber style={{ width: "100%" }} placeholder="In Stock" />
          </Form.Item>

          <Form.Item name="weight">
            <InputNumber style={{ width: "100%" }} placeholder="Weight" />
          </Form.Item>
          <Form.Item name="category" rules={[{ required: true, message: "Please select the category" }]}>
            <Select options={categoryOption} placeholder="Category" />
          </Form.Item>
          <Form.Item name="brand" rules={[{ required: true, message: "Please select the brand" }]}>
            <Select options={brandOption} placeholder="Brand" />
          </Form.Item>
        </div>
        <Form.Item name="desc" rules={[{ required: true, message: "Please enter the description" }]}>
          <Input.TextArea rows={4} placeholder="Description" />
        </Form.Item>
        <Form.Item className="text-center">
          <Button loading={isLoading} type="dashed" size="large" htmlType="submit">
            Create New Product
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Page;
