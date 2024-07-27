"use client";
import Error from "@/components/Error/Error";
import Loading from "@/components/Loading/Loading";
import { useFetchSingleProductsQuery } from "@/lib/fetchers/Product/ProductApi";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Breadcrumb,Button ,InputNumber} from "antd";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, decrementQuantity } from "@/lib/fetchers/Product/ProductSlice";

function Page() {
  const { id } = useParams();
  const currentCart = useSelector((state) => state?.products?.cartItem)
  const { isLoading, isError, data } = useFetchSingleProductsQuery(id);
  const [singleProductData, setSingleProductData] = useState({})
  const [selectedImage, setSelectedImage] = useState(0);
  const dispatch = useDispatch()
  const increment = (product) => {
    dispatch(addProduct(product))
  }
  const decrement = (product) => {
    dispatch(decrementQuantity(product))
  }

  let content;
  if (isLoading) {
    content = <Loading />;
  }
  if (!isLoading && isError) {
    content = <Error errorText="something went wrong" />;
  }
  if (!isLoading && !isError && data?.data) {
    const mainData = data?.data;
    content = (
      <>
        <div className="py-10 px-10 bg-slate-100 flex gap-4 font-bold">
          <Breadcrumb
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
          <div className="grid grid-cols-12">
            <div className="col-span-1 md:col-span-6 lg:col-span-8 justify-between items-center">
              <div className="flex gap-5 justify-center items-center">
                <div className="mt-5">
                  <Image
                    src={mainData?.images[selectedImage]}
                    width={400}
                    height={400}
                    alt="single product image"
                  />
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
            <div className="col-span-1 mx-auto md:col-span-4 lg:col-span-4">
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
