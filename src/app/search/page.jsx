"use client";
import { useFetchAllProductsQuery } from '@/lib/fetchers/Product/ProductApi';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { InputNumber, Button, Input, Modal, Pagination } from 'antd';
import Image from 'next/image';
import style from './search.module.css';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { addProduct, decrementQuantity } from '@/lib/fetchers/Product/ProductSlice';
import { toggleWishlistItem } from '@/lib/fetchers/wishlist/wishlistSlice';
import Loading from '@/components/Loading/Loading';
import Error from '@/components/Error/Error';

function Page() {
    const searchParams = useSearchParams();
    const query = searchParams.toString();
    const decodedQuery = decodeURIComponent(query.split('=')[0]).replace(/\+/g, ' ');    
    const currentCart = useSelector((state) => state?.products?.cartItem)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(8)
    const [open, setOpen] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [title, setTitle] = useState('');
    const [selectImage, setSelectImage] = useState(0);
    const [singleProductData, setSingleProductData] = useState({})
    const dispatch = useDispatch()
    const { isLoading, isError, data } = useFetchAllProductsQuery(
        [
            { name: "searchTerm", value: decodedQuery },
            { name: "page", value: page },
            { name: "limit", value: limit },
        ]
    )
    let totalQuantity = data?.meta?.total
    
  const wishlistHandeler = (product)=>{
    dispatch(toggleWishlistItem(product))
  }


    const handelAddToCart = (product) => {
        dispatch(addProduct(product))

    }
    const handlePageChange = (page) => {
        setPage(page);
    };

    let content = null;

    if (isLoading) {
        content = <Loading />;
    }
    if (!isLoading && isError) {
        content = <Error text="Something went wrong" />;
    }
    if (!isLoading && !isError &&  data?.data?.length === 0) {
        content = <Error text="No Data Found" />;
    } else {
        content = data?.data?.map((item, index) => (
            <div key={index}>
                <div className={style.imgContainer}>
                    {item?.images?.slice(0, 2).map((img, imgIndex) => (
                        <div key={imgIndex} className={style.img_single}>
                            <Link href={`/product/${item?._id}`}><Image src={img} width={300} height={300} className='mx-auto text-center' alt={`Image ${imgIndex}`} /></Link>
                        </div>
                    ))}
                    <div style={{ width: "300px", margin: '0 auto' }}>
                        <ul className={`${style.iconul} flex flex-col justify-center items-center gap-8 rounded`}>
                            <li onClick={()=> wishlistHandeler(item)}><i className="text-[20px] text-white fa-regular fa-heart"></i></li>
                            <li onClick={() => handelAddToCart(item)}><i className="text-[20px] text-white fa-solid fa-cart-shopping"></i></li>
                            <li onClick={() => { setOpen(true); setSingleProductData(item); setSelectedImages(item.images); setTitle(item.name); setSelectImage(0); }}><i className="text-[20px] text-white fa-solid fa-eye"></i></li>
                        </ul>
                    </div>
                </div>
                <div className='flex justify-evenly'>
                    <h4 className='font-medium p-2'>Price: {item?.price} Tk</h4>
                    <h4 className='font-medium p-2'>In Stock: {item?.in_stock}</h4>
                </div>
                <h3 className='font-bold text-[20px] text-gray-600 text-center'>{item?.name}</h3>
            </div>
        ));
    }

    const increment = (product) => {
        dispatch(addProduct(product))
    }
    const decrement = (product) => {
        dispatch(decrementQuantity(product))
    }
    return (
        <div className='container mx-auto my-10'>
        <div className='grid grid-cols-1 gap-5 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {content}
        </div>
        <div className='flex justify-center my-10'>
            <Pagination current={page} onChange={handlePageChange} total={totalQuantity} />
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
                    <p className='text-gray-400'>{singleProductData?.desc?.slice(0,450)}</p>
                    <div className='flex gap-4 my-4 items-center'>
                        <Button className='font-bold border-[#663130]' onClick={() => increment(singleProductData)}>+</Button>
                        <InputNumber disabled value={currentCart?.find((checkProduct) => checkProduct?._id === singleProductData?._id)?.quantity || 0}></InputNumber>
                        <Button className='font-bold border-[#663130]' onClick={() => decrement(singleProductData)}>-</Button>
                    </div>
                    <div className='flex gap-5 mt-5'>
                        <button onClick={() => handelAddToCart(singleProductData)} disabled={singleProductData.in_stock === 0} className='addToCart'>Add To Cart <i className=" mt-1  hover:text-[#381B1A] fa-solid fa-cart-shopping"></i></button>
                        <button onClick={()=>wishlistHandeler(singleProductData)} disabled={singleProductData.in_stock === 0} className='addToCart'>Add To Wishlist <i className=" mt-1  hover:text-[#381B1A] fa-solid fa-solid fa-heart"></i></button>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
    );
}

export default Page;
