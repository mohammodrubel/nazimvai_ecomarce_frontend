"use client";
import Error from "@/components/Error/Error";
import Loading from "@/components/Loading/Loading";
import { useFetchSingleProductsQuery } from "@/lib/fetchers/Product/ProductApi";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Breadcrumb, Button, InputNumber, Image as AntdImage } from "antd";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, decrementQuantity } from "@/lib/fetchers/Product/ProductSlice";

function Page() {
  const { id } = useParams();
  const currentCart = useSelector((state) => state?.products?.cartItem);
  const { isLoading, isError, data } = useFetchSingleProductsQuery(id);
  const [singleProductData, setSingleProductData] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.data) {
      setSingleProductData(data.data);
    }
  }, [data]);

  const increment = (product) => {
    dispatch(addProduct(product));
  };

  const decrement = (product) => {
    dispatch(decrementQuantity(product));
  };

  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (!isLoading && isError) {
    content = <Error errorText="something went wrong" />;
  } else if (!isLoading && !isError && data?.data) {
    const mainData = data.data;
    content = (
      <>
        <div className="py-10 md:px-10 sm:px-5 px-3 bg-slate-100 flex gap-4 font-bold">
          <Breadcrumb
          style={{fontSize:'18px'}}
            items={[
              {
                title: <Link href="/">Home</Link>,
              },
              {
                title: <Link href="/">OIL</Link>,
              },
              {
                title: <p>{mainData?.name}</p>,
              },
            ]}
          />
        </div>
        <div className="container mx-auto">
          <div className="grid grid-cols-12 ">
            <div className="mx-3 sm:mx-4 md:mx-5 col-span-12 md:col-span-6 lg:col-span-7 justify-between items-center">
              <div className="flex gap-5 justify-center items-center">
                <div className="mt-5">
                  <AntdImage.PreviewGroup>
                    <AntdImage
                      src={mainData?.images[selectedImage]}
                      width={300}
                      height={300}
                      alt="single product image"
                    />
                  </AntdImage.PreviewGroup>
                </div>
                <div className="flex flex-col mt-5 gap-4">
                  {mainData?.images.map((item, index) => (
                    <div key={index} className="cursor-pointer">
                      <Image
                        onClick={() => setSelectedImage(index)}
                        width={100}
                        height={100}
                        src={item}
                        alt={`Single product thumbnail ${index}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mx-3 sm:mx-4 md:mx-5 col-span-12 md:col-span-6 lg:col-span-5 justify-between items-center">
              <h1 className="text-2xl sm:text-4xl md:text-6xl text-gray-500">{mainData?.name}</h1>
              <div className='flex items-center gap-5 bg-slate-50 p-4'>
                <h1 className="text-2xl text-gray-800">Price: $ {mainData?.price}</h1>
                <h4 className='font-medium p-2'>In Stock: {mainData?.in_stock}</h4>
              </div>
              <p className="text-gray-500 mt-4">
                {mainData?.desc}
              </p>
              <div className='flex gap-4 my-4 items-center'>
                <Button className='font-bold border-[#663130]' onClick={() => increment(singleProductData)}>+</Button>
                <InputNumber className="font-bold text-black" disabled value={currentCart?.find((checkProduct) => checkProduct?._id === singleProductData?._id)?.quantity || 0}></InputNumber>
                <Button className='font-bold border-[#663130]' onClick={() => decrement(singleProductData)}>-</Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return <div className="w-full">{content}</div>;
}

export default Page;
