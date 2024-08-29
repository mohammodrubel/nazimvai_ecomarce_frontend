"use client";
import Error from "@/components/Error/Error";
import Loading from "@/components/Loading/Loading";
import { useFetchAllProductsQuery, useFetchSingleProductQuery } from "@/lib/fetchers/Product/ProductApi";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Breadcrumb, Button, InputNumber, Image as AntdImage, Modal } from "antd";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, decrementQuantity } from "@/lib/fetchers/Product/ProductSlice";
import { toggleWishlistItem } from "@/lib/fetchers/wishlist/wishlistSlice";
import { Tabs } from 'antd';
import style from './product.module.css'
import Slider from "react-slick/lib/slider";


function Page() {
  const { id } = useParams();
  const currentCart = useSelector((state) => state?.products?.cartItem);
  const { isLoading, isError, data } = useFetchSingleProductQuery(id);
  const [singleProductData, setSingleProductData] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const dispatch = useDispatch();
  const { isLoading: productLoading, isError: productError, data: allProductData } = useFetchAllProductsQuery([])
  const [open, setOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [title, setTitle] = useState('');
  const [selectImage, setSelectImage] = useState(0);
  const wishlistHandeler = (product) => {
    dispatch(toggleWishlistItem(product))
  }


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
        <div className="mt-20 md:px-10 sm:px-5 px-3 py-5 bg-slate-100 flex gap-4 font-bold">
          <Breadcrumb style={{ fontSize: '18px' }} items={[
            {
              title: <Link href="/">Home</Link>,
            },
            {
              title: <Link href={`/category/${mainData?.category?._id}`}>{mainData?.category?.name}</Link>,
            },
            {
              title: mainData?.name,
            },
          ]} />
        </div>
        <div className="container mx-auto">
          <div className="grid grid-cols-12 ">
            <div className="mx-3 sm:mx-4 md:mx-5 col-span-12 md:col-span-6 lg:col-span-7 justify-between items-center">
              <div className="flex gap-5 justify-center items-center">
                <div className="mt-5">
                  <AntdImage.PreviewGroup>
                    <AntdImage
                      src={mainData?.images[selectedImage]}
                      width={400}
                      height={500}
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
              <h1 className="text-2xl sm:text-4xl text-gray-500">{mainData?.name}</h1>
              <div className='flex items-center gap-5 bg-slate-50 p-4'>
                <h1 className="text-2xl text-gray-800">Price: $ {mainData?.price}</h1>
                <h4 className='font-medium p-2'>In Stock: {mainData?.in_stock}</h4>
              </div>
              <p className="text-gray-500 mt-4">
                {mainData?.desc.slice(0, 300)}
              </p>
              <div className='flex gap-4 my-4 items-center'>
                <Button className='font-bold border-[#663130]' onClick={() => increment(singleProductData)}>+</Button>
                <InputNumber className="font-bold text-black" disabled value={currentCart?.find((checkProduct) => checkProduct?._id === singleProductData?._id)?.quantity || 0}></InputNumber>
                <Button className='font-bold border-[#663130]' onClick={() => decrement(singleProductData)}>-</Button>
              </div>
              <Button onClick={() => wishlistHandeler(mainData)} className='font-bold border-[#663130]'>Add To Wishlist</Button>
            </div>
          </div>
        </div>
      </>
    );
  }
  var settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },

      {
        breakpoint: 350,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  // tabs 
  const mainData = data?.data
  const items = [
    {
      key: '1',
      label: <b className="text-bold text-black">Description</b>,
      children: <div className="p-5 bg-slate-50">{mainData?.desc}</div>,
    },
    {
      key: '2',
      label: <b className="text-bold text-black">Product Reviewer</b>,
      children: 'Content of Tab Pane 2',
    }
  ];
  let product
  // fetch product by category 
  if (productLoading) {
    product = <Loading />
  }
  if (!productLoading && productError) {
    product = <Error errorText="somthing went wrong" />
  }
  if (!productLoading && !productError && allProductData?.data.length === 0) {
    product = <Error errorText="No Data Found" />
  }
  if (!productLoading && !productError && allProductData.data.length > 0) {
    const categoryWiseData = allProductData.data.filter((item, index) => item?.category._id === mainData?.category._id)
     
    product = categoryWiseData?.map((item, index) => <div key={index}>
      <div className={style.imgContainer}>
        {item?.images?.slice(0, 2).map((img, imgIndex) => (
          <div key={imgIndex} className={style.img_single}>
            <Link href={`/product/${item?._id}`}><Image src={img} width={300} height={300} className='mx-auto text-center' alt={`Image ${imgIndex}`} /></Link>
          </div>
        ))}
        <div style={{ width: "300px", margin: '0 auto' }}>
          <ul className={`${style.iconul} flex flex-col justify-center items-center gap-8 rounded`}>
            <li onClick={() => wishlistHandeler(item)}><i className="text-[20px] text-white fa-regular fa-heart"></i></li>
            <li onClick={() => increment(item)}><i className="text-[20px] text-white fa-solid fa-cart-shopping"></i></li>
            <li onClick={() => { setOpen(true); setSingleProductData(item); setSelectedImages(item.images); setTitle(item.name); setSelectImage(0); }}><i className="text-[20px] text-white fa-solid fa-eye"></i></li>
          </ul>
        </div>
      </div>
      <div className='flex justify-evenly'>
        <h4 className='font-medium p-2'>Price: {item?.price} Tk</h4>
        <h4 className='font-medium p-2'>In Stock: {item?.in_stock}</h4>
      </div>
      <h3 className='font-bold text-[20px] text-gray-600 text-center'>{item?.name}</h3>
    </div>)
  }


  const onChange = (key) => {
   
  };

  return <>
    {content}
    <div className="container mx-auto">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
    <div className='text-center mb-5'>
      <h4 className='text-2xl sm:text-4xl md:text-6xl font-bold extraFont my-5'>Related Products,</h4>
    </div>
    <div className="container mx-auto">
      <div className="slider-container">
        <Slider {...settings}>
          {product}
        </Slider>
      </div>
    </div>
    <Modal
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={1000}
      footer={null}
    >
      <div className='grid grid-cols-1 md:grid-cols-2 mx-auto'>
        <div className='flex gap-4 justify-center items-center'>
          <div>
            {selectedImages.map((item, index) => (
              <div key={index} onClick={() => setSelectImage(index)} className='flex gap-4 cursor-pointer'>
                <Image width={80} height={80} className='mt-3' src={item} alt={`Thumbnail ${index}`} />
              </div>
            ))}
          </div>
          <Image src={selectedImages[selectImage]} width={300} height={300} alt={`Modal Image ${selectImage}`} />
        </div>
        <div>
          <h2 className='text-2xl sm:text-4xl text-[#663130] font-bold'>{title}</h2>
          <div className='flex gap-4'>
            <p className={`font-bold ${singleProductData?.in_stock === 0 ? 'text-red-500' : 'text-gray-600'}`}>In Stock - <span>{singleProductData?.in_stock}</span></p>
            <p className='font-bold text-gray-500'>weight - {singleProductData?.weight}</p>
          </div>
          <h3 className="text-2xl">Price : {singleProductData.price}</h3>
          <p className='text-gray-400'>{singleProductData?.desc?.slice(0, 450)}</p>
          <div className='flex gap-4 my-4 items-center'>
            <Button className='font-bold border-[#663130]' onClick={() => increment(singleProductData)}>+</Button>
            <InputNumber disabled value={currentCart?.find((checkProduct) => checkProduct?._id === singleProductData?._id)?.quantity || 0}></InputNumber>
            <Button className='font-bold border-[#663130]' onClick={() => decrement(singleProductData)}>-</Button>
          </div>
          <div className='flex gap-5 mt-5'>
            <button onClick={() => increment(singleProductData)} disabled={singleProductData.in_stock === 0} className='addToCart'>Add To Cart <i className=" mt-1  hover:text-[#381B1A] fa-solid fa-cart-shopping"></i></button>
            <button onClick={() => wishlistHandeler(singleProductData)} disabled={singleProductData.in_stock === 0} className='addToCart'>Add To Wishlist <i className=" mt-1  hover:text-[#381B1A] fa-solid fa-solid fa-heart"></i></button>
          </div>
        </div>
      </div>
    </Modal>
  </>
}

export default Page;
