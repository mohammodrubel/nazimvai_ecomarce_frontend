"use client";
import PageHeader from '@/components/PageHeader/PageHeader';
import { Pagination, InputNumber, Input, Modal, Button, Drawer, Space, Radio } from 'antd';
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
const { Option } = Select;
import { FilterFilled } from '@ant-design/icons';

function Page() {
    const currentCart = useSelector((state) => state?.products?.cartItem);
    const { isLoading: categoryLoading, isError: categoryError, data: categoryData } = useFetchAllCategoryQuery();
    const { isLoading: brandLoading, isError: brandError, data: brandData } = useFetchAllBrandQuery();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false); 
    const [selectedImages, setSelectedImages] = useState([]);
    const [title, setTitle] = useState('');
    const [selectImage, setSelectImage] = useState(0);
    const [singleProductData, setSingleProductData] = useState({});
    const [placement, setPlacement] = useState('right');
    const [categoryValue, setCategoryValue] = useState(''); 
    const [brandValue, setBrandValue] = useState(''); 
    //grap information for filter 
    const [searchTerm,setSearchTerm]=useState('')
    const [sort,setSort]=useState('')
    const [limit,setLimit]=useState(10)
    const [page,setPage]=useState(1)
    const [minPrice,setMinPrice]=useState(0)
    const [maxPrice,setMaxprice]=useState(100)
    let totalProduct = 0
    //sendingValueForBackend 
    const { isLoading: productLoading, isError: productError, data: productData } = useFetchAllProductsQuery([
        { name: 'category', value: categoryValue || '' },
        { name: 'brand', value: brandValue || '' },
        { name: 'searchTerm', value: searchTerm || '' },
        { name: 'page', value: page || 1 },
        { name: 'limit', value: limit || 10 },
      ]);

    totalProduct = productData?.meta?.total
    console.log(totalProduct)
    const showDrawer = () => {
        setDrawerOpen(true);
    };

    const onClose = () => {
        setDrawerOpen(false);
    };

    const onChangePlacement = (e) => {
        setPlacement(e.target.value); // This changes the drawer's placement
    };

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
        dispatch(addProduct(product));
    };

    const increment = (product) => {
        dispatch(addProduct(product));
    };

    const decrement = (product) => {
        dispatch(decrementQuantity(product));
    };
    const handlePageChange = (page) => {
        setPage(page);
      };

    let content = null;

    if (productLoading) {
        content = <Loading />;
    } else if (productError) {
        content = <Error text="Something went wrong" />;
    } else if (!productData || productData?.data?.length === 0) {
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
                <Radio value={item?._id}>{item?.name}</Radio>
            </div>
        ));
    }

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
                <Radio value={item?._id}>{item?.name}</Radio>
            </div>
        ));
    }

  const onSortChange = (values)=>{
    console.log(values);
  }

    return (
        <>
            <PageHeader title="SHOP" />

            <div className='bg-slate-50'>
                <div className='flex container mx-auto gap-5 py-5 items-center justify-between mt-5'>
                    <Select
                        placeholder="Sort by Product"
                        onChange={onSortChange}
                        style={{ width: 200 }}
                        suffixIcon={<FilterFilled />}
                    >
                        <Option value="lowToHigh">Price: Low to High</Option>
                        <Option value="highToLow">Price: High to Low</Option>
                        <Option value="rating">Sort by Rating</Option>
                        <Option value="popularity">Sort by Popularity</Option>
                    </Select>
                    <div className='flex items-center' onClick={showDrawer}>
                        <b className='mx-2 cursor-pointer'>Filter</b><i className={` cursor-pointer text-[#663130] fa-solid fa-filter`}></i>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto'>
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
                            <Button className='font-bold border-[#663130]' onClick={() => increment(singleProductData)}>+</Button>
                            <InputNumber disabled value={currentCart?.find((checkProduct) => checkProduct?._id === singleProductData?._id)?.quantity || 0}></InputNumber>
                            <Button className='font-bold border-[#663130]' onClick={() => decrement(singleProductData)}>-</Button>
                        </div>
                        <div className='flex gap-5 mt-5'>
                            <button onClick={() => handelAddToCart(singleProductData)} disabled={singleProductData.in_stock === 0} className='addToCart'>Add To Cart <i className="mt-1 hover:text-[#381B1A] fa-solid fa-cart-shopping"></i></button>
                            <button disabled={singleProductData.in_stock === 0} className='addToCart'>Add To Wishlist <i className="mt-1 hover:text-[#381B1A] fa-solid fa-heart"></i></button>
                        </div>
                    </div>
                </div>
            </Modal>

            <Drawer
                title="Filter Your Product"
                placement={placement}
                className='w-[50%]'
                onClose={onClose}
                open={drawerOpen}
            >
                <Input placeholder="Search Your Product" onChange={(e)=> setSearchTerm(e.target.value)} />
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
            </Drawer>
            <div className='flex justify-center my-20'>
            <Pagination  current={page} onChange={handlePageChange}className='text-center mx-auto' total={totalProduct} />
            </div>
        </>
    );
}

export default Page;
