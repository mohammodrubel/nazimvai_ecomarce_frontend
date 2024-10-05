"use client"
import { Pagination, InputNumber, Button, Modal } from 'antd';
import { useFetchSingleCategoryQuery } from '@/lib/fetchers/Category/CategoryApi';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { addProduct } from '@/lib/fetchers/Product/ProductSlice';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'sonner';
import Loading from '@/components/Loading/Loading';
import Error from '@/components/Error/Error';
import style from '../../../components/ProductCard/ProductCard.module.css'
import { useFetchAllFeatchersProductsQuery } from '@/lib/fetchers/homeProduct/homeProduct';

function Page() {
    const user = useSelector((state)=> state?.auth?.user?.email)
    const dispatch = useDispatch();
    const currentCart = useSelector((state) => state?.products?.cartItem);
    const { id } = useParams();
    const {isLoading:categoryLoading,isError:categoryError, data:categoryData } = useFetchSingleCategoryQuery(id);
    const {isLoading,isError, data: productData } = useFetchAllFeatchersProductsQuery();
    const filterData = productData?.data?.filter((item) => item?.category?._id === id);
    const [open, setOpen] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [title, setTitle] = useState('');
    const [selectImage, setSelectImage] = useState(0);
    const [singleProductData, setSingleProductData] = useState({});
    const [page,setPage]=useState(1)
    
    const addToWishlist = () => {
        toast.success('Added to wishlist');
    };

    const handelAddToCart = (product) => {
        if (!user) {
            toast.warning('Please log in to your account to add products to your cart.');
        } else {
            dispatch(addProduct(product));
        }
    }
    let content = null;

    if (isLoading) {
        content = <Loading />;
    }
    if (!isLoading && isError) {
        content = <Error text="Something went wrong" />;
    }
    if (!isLoading && !isError &&  filterData?.length === 0) {
        content = <Error text="No Data Found" />;
    } else {
        content = filterData?.map((item, index) => (
            <div key={index} className='mt-4'>
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

    const increment = (product) => {
        if (!user) {
            toast.warning('Please log in to your account to add products to your cart.');
        } else {
            dispatch(addProduct(product));
        }
       
    }
    const decrement = (product) => {
        if (!user) {
            toast.warning('Please log in to your account to add products to your cart.');
        } else {
            dispatch(decrementQuantity(product))
        }
        
    }
    const handlePageChange = (page) => {
        setPage(page);
      };


    return (
        <>
            <div className='h-[400px] uppercase text-2xl sm:text-4xl md:text-6xl  w-full flex justify-center items-center bg-slate-50'>
            {categoryData?.data ? categoryData.data.name : "No Data Found"}
            </div>
            <div className='grid grid-cols-1 gap-5 mx-auto md:grid-cols-2 lg:grid-cols-4'>
                {content || "no data found"}
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
            <div className='flex justify-center my-20'>
            <Pagination  current={page} onChange={handlePageChange}className='text-center mx-auto' total={10} />
            </div>
        </>
    )
}

export default Page;
