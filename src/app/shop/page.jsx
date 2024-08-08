"use client";
import PageHeader from '@/components/PageHeader/PageHeader';
import ShopFilter from '@/components/ShopFilter/ShopFilter';
import { InputNumber, Modal, Slider, AutoComplete, Button } from 'antd';
import React, { useState } from 'react';
import style from './shop.module.css';
import classNames from 'classnames';
import { SearchOutlined } from '@ant-design/icons';
import Loading from '@/components/Loading/Loading';
import Error from '@/components/Error/Error';
import { useFetchAllCategoryQuery } from '@/lib/fetchers/Category/CategoryApi';
import { useFetchAllProductsQuery } from '@/lib/fetchers/Product/ProductApi';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '@/lib/fetchers/Product/ProductSlice';
import Link from 'next/link';
import Image from 'next/image';


function Page() {
    const currentCart = useSelector((state) => state?.products?.cartItem)
    const [shopFilterActive, setShopFilterActive] = useState(false);
    const { isLoading, isError, data } = useFetchAllCategoryQuery();
    const { isLoading:productLoading, isError:productError, data:productData } = useFetchAllProductsQuery();
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [title, setTitle] = useState('');
    const [selectImage, setSelectImage] = useState(0);
    const [singleProductData, setSingleProductData] = useState({})
    let content = null;
    const addToWishlist = () => {
        toast.success('Added to wishlist');
    };

    const handelAddToCart = (product) => {
        dispatch(addProduct(product))

    }
    const increment = (product) => {
        dispatch(addProduct(product))
    }
    const decrement = (product) => {
        dispatch(decrementQuantity(product))
    }
    

    if (productLoading) {
        content = <Loading />;
    }
    if (!productLoading && productError) {
        content = <Error text="Something went wrong" />;
    }
    if (!productLoading && !productError && !productData || productData?.data?.length === 0) {
        content = <Error text="No Data Found" />;
    } else {
        content = productData?.data?.map((item, index) => (
            <div key={index} className='mt-5'>
                <div className={style.imgContainer}>
                    {item?.images?.slice(0, 2).map((img, imgIndex) => (
                        <div key={imgIndex} className={style.img_single}>
                            <Link href={`/product/${item?._id}`}><Image src={img} width={300} height={300} className='mx-auto text-center' alt={`Image ${imgIndex}`} /></Link>
                        </div>
                    ))}
                    <div style={{ width: "300px", margin: '0 auto' }}>
                        <ul className={`${style.iconul} flex flex-col justify-center items-center gap-8 rounded`}>
                            <li><i onClick={addToWishlist} className="text-[20px] text-white fa-regular fa-heart"></i></li>
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

   

    let categoryOptions = [];
    const [initialValue, setInitialValue] = useState([10,90])

    if (isLoading) {
        categoryOptions = <Loading />;
    }
    if (!isLoading && isError) {
        categoryOptions = <Error errorText="Something went wrong" />;
    }
    if (!isLoading && !isError &&  data?.data.length === 0) {
        categoryOptions = <Error errorText="No data found" />;
    }
    if (!isLoading && !isError &&  data?.data.length > 0) {
        categoryOptions = data.data.map((item) => ({ value: item.name }));
    }
    const handleSearch = (value) => {
        console.log(value);
    };

    return (
        <>
            <PageHeader title="SHOP" />
            <div className='mt-20 container mx-auto'>
                <div className='flex justify-between flex-wrap items-center'>
                    {Array.isArray(categoryOptions) ? (
                        <>
                            <div className='mt-4'>
                            <p className='text-gray-500'>Search Categories Or Product Name</p>
                            <AutoComplete
                                options={categoryOptions}
                                placeholder="Search Categories Or Product Name"
                                filterOption={(inputValue, option) =>
                                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                                style={{minWidth:'90%'}}
                                size='large'
                                onSearch={handleSearch}
                            />
                            </div>
                            <div className='text-center mt-4'>
                            <p className='text-gray-500'>Filter Your Price</p>
                            <Slider
                                range={{
                                    editable: true,
                                    minCount: 1,
                                    maxCount: 5,
                                }}
                                style={{width:"250px"}}
                                value={initialValue}
                                onChange={setInitialValue}
                            />
                            </div>
                        </>
                    ) : (
                        categoryOptions
                    )}
                    <Button
                        onClick={() => setShopFilterActive(!shopFilterActive)}
                        className='font-bold mt-4'
                        type="dashed"
                        size="large"
                    >
                        Filter Your Product
                    </Button>
                </div>
                <div className={classNames({
                    [style.shopFilter]: true,
                    [style.shopFilterActive]: shopFilterActive
                })}>
                    <ShopFilter />
                </div>
            </div>
            <div className='grid grid-cols1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto'>
                {content}
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
                        <p className='text-gray-400'>{singleProductData?.desc}</p>
                        <div className='flex gap-4 my-4 items-center'>
                            <Button className='font-bold border-[#663130]' onClick={()=>increment(singleProductData)}>+</Button>
                            <InputNumber disabled value={currentCart?.find((checkProduct) => checkProduct?._id === singleProductData?._id)?.quantity || 0}></InputNumber>
                            <Button className='font-bold border-[#663130]' onClick={()=>decrement(singleProductData)}>-</Button>
                        </div>
                        <div className='flex gap-5 mt-5'>
                            <button onClick={() => handelAddToCart(singleProductData)} disabled={singleProductData.in_stock === 0} className='addToCart'>Add To Cart <i className=" mt-1  hover:text-[#381B1A] fa-solid fa-cart-shopping"></i></button>
                            <button disabled={singleProductData.in_stock === 0} className='addToCart'>Add To Wishlist <i className=" mt-1  hover:text-[#381B1A] fa-solid fa-solid fa-heart"></i></button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default Page;
