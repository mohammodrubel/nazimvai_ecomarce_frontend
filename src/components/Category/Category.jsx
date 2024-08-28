"use client"
import { useFetchAllCategoryQuery } from '@/lib/fetchers/Category/CategoryApi';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import Link from 'next/link';
import Image from 'next/image';
import style from './Category.module.css'
import Slider from 'react-slick/lib/slider';

function Category() {
  const { isLoading, isError, data } = useFetchAllCategoryQuery();
  let content ;

  if(isLoading){
    content = <Loading/>
  }
  if(!isLoading && isError){
    content = <Error/>
  }
  if(!isLoading && !isError && data?.data?.length === 0){
    content = <Error errorText="No Data Found"/>
  }
  if(!isLoading && !isError && data?.data.length > 0){
    content = data?.data?.map((item,index)=> <div className="relative p-4" key={item._id}>
    <Link href={`/category/${item._id}`}>
      <Image
        className="mx-auto text-center rounded-full"
        width={200}
        height={200}
        src={item.image}
        alt={item.name}
      />
      <div className={style.category}>
        <div className={`${style.categoryTitle} text-center mt-4`}>{item.name}</div>
      </div>
    </Link>
  </div>)
  }
  var settings = {
    arrows:false,
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
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
  return (
    <div style={{width:'90%',margin:'0 auto'}}>
      <div className="slider-container text-center">
        <Slider {...settings}>
          {content}
        </Slider>
      </div>
    </div>
  )
}

export default Category