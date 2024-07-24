'use client';

import React, { useState } from 'react';
import { Modal } from 'antd';
import { useFetchAllProductsQuery } from '@/lib/fetchers/Product/ProductApi';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import Image from 'next/image';
import style from './ProductCard.module.css';
import { toast } from 'sonner';

function ProductCard() {
    const { isLoading, isError, data } = useFetchAllProductsQuery();
    const [open, setOpen] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [title, setTitle] = useState('');
    const [selectImage, setSelectImage] = useState(0);

    const addToWishlist = () => {
        toast.success('Added to wishlist');
    };

    let content = null;

    if (isLoading) {
        content = <Loading />;
    } else if (isError) {
        content = <Error text="Something went wrong" />;
    } else if (!data || data?.data?.length === 0) {
        content = <Error text="No Data Found" />;
    } else {
        content = data.data.map((item, index) => (
            <div key={index}>
                <div className={style.imgContainer}>
                    {item?.images?.slice(0, 2).map((img, imgIndex) => (
                        <div key={imgIndex} className={style.img_single}>
                            <Image src={img} width={300} height={300} className='mx-auto text-center' alt={`Image ${imgIndex}`} />
                        </div>
                    ))}
                    <div style={{ width: "300px", margin: '0 auto' }}>
                        <ul className={`${style.iconul} flex flex-col justify-center items-center gap-8 rounded`}>
                            <li><i onClick={addToWishlist} className="text-[20px] text-white fa-regular fa-heart"></i></li>
                            <li><i className="text-[20px] text-white fa-solid fa-cart-shopping"></i></li>
                            <li onClick={() => { setOpen(true); setSelectedImages(item.images); setTitle(item.name); setSelectImage(0); }}><i className="text-[20px] text-white fa-solid fa-eye"></i></li>
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

    return (
        <div className='container mx-auto'>
            <h3 className='text-2xl md:text-4xl text-[#663130] font-bold my-5'>Recent Product</h3>
            <div className='grid grid-cols-1 gap-5 mx-auto sm:grid-cols-2 md:grid-cols-3'>
                {content}
            </div>
            <Modal
                title={<div className='text-center py-3 text-[20px]'>{title} <hr /> </div>}
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
                        
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ProductCard;
