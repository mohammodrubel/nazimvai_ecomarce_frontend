"use client"
import { useFetchAllBrandQuery } from '@/lib/fetchers/Brand/BrandApi'
import React from 'react'
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import Image from 'next/image';
import Slider from "react-slick";

function Brand() {
    const { isLoading, isError, data } = useFetchAllBrandQuery()
    var settings = {
        autoplay: true,
        autoplaySpeed: 1000,
        pauseOnHover: true,
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },

            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }
    let content;
    if (isLoading) {
        content = <Loading />
    }
    if (!isLoading && isError) {
        content = <Error errorText="somthing went wrong" />
    }
    if (!isLoading && !isError && data?.data?.length === 0) {
        content = <Error errorText="No Data Found" />
    }
    if (!isLoading && !isError && data?.data?.length > 0) {
        content = data?.data?.map((item, index) => <div className="m-16  mx-auto mt-5  text-center">
            <Image className="text-center" width={200} height={200} src={item?.image} />
            <p>{item?.name}</p>
        </div>)
    }

    return (
        <div className="container mx-auto">
            <div className="slider-container text-center">
                <Slider {...settings}>
                    {content}
                </Slider>
            </div>
        </div>
    )
}

export default Brand