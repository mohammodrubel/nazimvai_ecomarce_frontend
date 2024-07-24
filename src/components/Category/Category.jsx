"use client"
import { useFetchAllCategoryQuery } from '@/lib/fetchers/Category/CategoryApi'
import React from 'react'
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import Image from 'next/image';
import style from './Category.module.css'

function Category() {
    const { isLoading, isError, data } = useFetchAllCategoryQuery()

    let content = null;
    if (isLoading) {
        content = <Loading />;
    }
    if (!isLoading && isError) {
        content = <Error text="something went wrong" />;
    }
    if (!isLoading && !isError && data && data.data.length === 0) {
        content = <Error text="No Data Found" />;
    }
    if (!isLoading && !isError && data && data.data.length > 0) {
        content = data?.data?.map((item, index) => (
            <div className='relative' key={index}>
                <Image
                    className='mx-auto text-center'
                    width={200}
                    height={200}
                    src={item?.image}
                    alt={item?.name}
                    style={{ borderRadius: '50%' }}
                />
                <div className={style.category}>
                    <div className={style.categoryTitle}>{item?.name}</div>
                </div>
            </div>
        ));
    }

    return (
        <div className='container mx-auto my-5'>
            <div className='grid mx-auto justify-center items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {content}
            </div>
        </div>
    )
}

export default Category
