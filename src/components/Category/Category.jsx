"use client"
import { Pagination } from 'antd';
import { useFetchAllCategoryQuery } from '@/lib/fetchers/Category/CategoryApi'
import React, { useState } from 'react'
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import Image from 'next/image';
import style from './Category.module.css'
import Link from 'next/link';
import Slider from "react-slick";

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
        <Link href={`/category/${item?._id}`}>
          <Image
            className='mx-auto text-center'
            width={200}
            height={200}
            src={item?.image}
            alt={item?.name}
            style={{ borderRadius: '50%' }}
          />

          <div className={style.category}>
            <div className={`${style.categoryTitle} text-center`}>{item?.name}</div>
          </div>
        </Link>
      </div>
    ));
  }
  var settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
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

  return (
    <div className='container mx-auto my-5'>
      <div className="slider-container text-center">
        <Slider {...settings}>
          {content}
        </Slider>
      </div>
    </div>
  )
}

export default Category
