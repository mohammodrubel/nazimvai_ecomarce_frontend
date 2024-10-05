"use client";
import PageHeader from '@/components/PageHeader/PageHeader';
import { Pagination, InputNumber, Input, Modal, Button, Drawer, Space, Radio, Slider } from 'antd';
import React, { useState } from 'react';
import style from './shop.module.css';
import Loading from '@/components/Loading/Loading';
import Error from '@/components/Error/Error';
import { useFetchAllProductsQuery } from '@/lib/fetchers/Product/ProductApi';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, decrementQuantity } from '@/lib/fetchers/Product/ProductSlice';
import Link from 'next/link';
import Image from 'next/image';
import { useFetchAllCategoryQuery } from '@/lib/fetchers/Category/CategoryApi';
import { useFetchAllBrandQuery } from '@/lib/fetchers/Brand/BrandApi';
import { Select } from 'antd';
import { FilterFilled } from '@ant-design/icons';
import { toast } from 'sonner';

const { Option } = Select;

function Shop() {
    const currentCart = useSelector((state) => state?.products?.cartItem);
    const { isLoading: categoryLoading, isError: categoryError, data: categoryData } = useFetchAllCategoryQuery();
    const { isLoading: brandLoading, isError: brandError, data: brandData } = useFetchAllBrandQuery();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [title, setTitle] = useState('');
    const [selectImage, setSelectImage] = useState(0);
    const [singleProductData, setSingleProductData] = useState({});
    const [placement, setPlacement] = useState('right');
    const [categoryValue, setCategoryValue] = useState('');
    const [brandValue, setBrandValue] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    // Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [sort, setSort] = useState('');
    const [limit, setLimit] = useState(9);
    const [page, setPage] = useState(1);

    let totalProduct = 0;

    // Fetch product data with filters
    const { isLoading: productLoading, isError: productError, data: productData } = useFetchAllProductsQuery([
        { name: 'category', value: categoryValue || '' },
        { name: 'brand', value: brandValue || '' },
        { name: 'searchTerm', value: searchTerm || '' },
        { name: 'page', value: page || 1 },
        { name: 'limit', value: limit || 10 },
        { name: 'minPrice', value: minPrice || 0 },
        { name: 'maxPrice', value:  maxPrice},
    ]);

    totalProduct = productData?.meta?.total;

    const onChangeCategory = (e) => {
        setCategoryValue(e.target.value);
    };

    const onChangeBrand = (e) => {
        setBrandValue(e.target.value);
    };

    const addToWishlist = () => {
        toast.success('Added to wishlist');
    };

    const handelAddToCart = (product) => {
        if (!user) {
            toast.warning('Please log in to your account to add products to your cart.');
        } else {
            dispatch(addProduct(product));
        }
     
    };

    const increment = (product) => {
        if (!user) {
            toast.warning('Please log in to your account to add products to your cart.');
        } else {
            dispatch(addProduct(product));
        }
       
    };

    const decrement = (product) => {
        if (!user) {
            toast.warning('Please log in to your account to add products to your cart.');
        } else {
            dispatch(decrementQuantity(product));
        }
        
    };

    const handlePageChange = (page) => {
        setPage(page);
    };

    // Rendering product content
    let content = null;

    if (productLoading) {
        content = <Loading />;
    } else if (productError) {
        content = <Error text="Something went wrong" />;
    } else if (!productData || productData?.data?.length === 0) {
        content = <Error text="No Data Found" />;
    } else {
        content = productData?.data?.map((item, index) => (
            <div key={index} className='mt-5 mx-auto'>
                <div className={style.imgContainer}>
                    {item?.images?.slice(0, 2).map((img, imgIndex) => (
                        <div key={imgIndex} className={style.img_single}>
                            <Link href={`/product/${item?._id}`}>
                                <Image src={img} width={300} height={300} className='mx-auto text-center' alt={`Image ${imgIndex}`} />
                            </Link>
                        </div>
                    ))}
                    <div style={{ width: "300px", margin: '0 auto' }}>
                        <ul className={`${style.iconul} flex flex-col justify-center items-center gap-8 rounded`}>
                            <li><i onClick={addToWishlist} className="text-[20px] text-white fa-regular fa-heart"></i></li>
                            <li onClick={() => handelAddToCart(item)}><i className="text-[20px] text-white fa-solid fa-cart-shopping"></i></li>
                            <li onClick={() => { setOpen(true); setSingleProductData(item); setSelectedImages(item.images); setTitle(item.name); setSelectImage(0); }}>
                                <i className="text-[20px] text-white fa-solid fa-eye"></i>
                            </li>
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

    // Rendering category content
    let categoryContent = null;

    if (categoryLoading) {
        categoryContent = <Loading />;
    } else if (categoryError) {
        categoryContent = <Error text="Something went wrong" />;
    } else if (!categoryData || categoryData?.data?.length === 0) {
        categoryContent = <Error text="No Data Found" />;
    } else {
        categoryContent = categoryData?.data?.map((item, index) => (
            <div key={index}>
                <Radio className="text-gray-700" value={item?._id}>{item?.name}</Radio>
            </div>
        ));
    }

    // Rendering brand content
    let brandContent = null;

    if (brandLoading) {
        brandContent = <Loading />;
    } else if (brandError) {
        brandContent = <Error text="Something went wrong" />;
    } else if (!brandData || categoryData?.data?.length === 0) {
        brandContent = <Error text="No Data Found" />;
    } else {
        brandContent = brandData?.data?.map((item, index) => (
            <div key={index}>
                <Radio className="text-gray-700" value={item?._id}>{item?.name}</Radio>
            </div>
        ));
    }

    // Determine the maximum price for the slider
    const maximumPrice = productData?.data?.reduce((max, item) => {
        return item.price > max ? item.price : max;
    }, minPrice);
    

    const onSortChange = (values) => {
        setSort(values);
    };
    const handlePriceSlider = (values) => {
        setMinPrice(values)
    }


    return (
        <>
            <PageHeader title="SHOP" />
            <div className="container text-center my-8 mx-auto">
                <Input size="large" style={{ width: '60%' }} placeholder="Search Your Product" onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className="w-full px-5">
                <div className="flex gap-5">
                    <div className="filter">
                        <Select
                            className="mt-5"
                            placeholder="Sort by Product"
                            onChange={onSortChange}
                            suffixIcon={<FilterFilled />}
                        >
                            <Option value="lowToHigh">Price: Low to High</Option>
                            <Option value="highToLow">Price: High to Low</Option>
                            <Option value="rating">Sort by Rating</Option>
                        </Select>

                        <h3 className='text-bold text-gray-700 font-bold mt-5'>Price Range</h3>

                        <Slider
                            defaultValue={minPrice}
                            max={maximumPrice}
                            onChange={handlePriceSlider}
                        />
                        <h3 className='text-bold text-gray-700 font-bold mt-5'>Categories</h3>
                        <Radio.Group onChange={onChangeCategory} value={categoryValue}>
                            <Space direction="vertical">
                                {categoryContent}
                            </Space>
                        </Radio.Group>

                        <h3 className='text-bold text-gray-700 font-bold mt-5'>Brand</h3>
                        <Radio.Group onChange={onChangeBrand} value={brandValue}>
                            <Space direction="vertical">
                                {brandContent}
                            </Space>
                        </Radio.Group>
                    </div>
                    <div className="w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {content}
                        </div>

                    </div>
                </div>
                <div className="flex justify-center my-10">
                    <Pagination
                        className="text-center"
                        current={page}
                        total={totalProduct}
                        pageSize={limit}
                        onChange={handlePageChange}
                    />
                </div>
            </div>
            <Modal title={title} open={open} onCancel={() => setOpen(false)} footer={null}>
                <div className='w-full'>
                    <div className={style.imgContainer}>
                        <div className='flex justify-center items-center'>
                            {selectedImages.length > 0 && (
                                <div className={style.singleImg}>
                                    <Image src={selectedImages[selectImage]} width={300} height={300} alt={title} />
                                </div>
                            )}
                        </div>
                        <div className='flex justify-center gap-5'>
                            {selectedImages?.map((img, index) => (
                                <div key={index} className={`${style.thumbimg} ${index === selectImage ? style.selectedThumb : ''}`}>
                                    <Image src={img} width={50} height={50} alt={`Thumbnail ${index}`} onClick={() => setSelectImage(index)} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <h2 className='text-center text-2xl font-bold my-5'>{singleProductData?.name}</h2>
                <h4 className='text-center text-xl font-semibold my-3'>Price: {singleProductData?.price} Tk</h4>
                <h4 className='text-center text-xl font-semibold my-3'>In Stock: {singleProductData?.in_stock}</h4>
                <div className='flex justify-center items-center mt-5 gap-5'>
                    {currentCart?.find((cartItem) => cartItem._id === singleProductData._id) ? (
                        <>
                            <Button onClick={() => decrement(singleProductData)}>-</Button>
                            <InputNumber min={0} value={currentCart.find((cartItem) => cartItem._id === singleProductData._id)?.quantity} />
                            <Button onClick={() => increment(singleProductData)}>+</Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={() => decrement(singleProductData)}>-</Button>
                            <InputNumber min={0} value={0} />
                            <Button onClick={() => increment(singleProductData)}>+</Button>
                        </>
                    )}
                </div>
            </Modal>
        </>
    );
}

export default Shop;
