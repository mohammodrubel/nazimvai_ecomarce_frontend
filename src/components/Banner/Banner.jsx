import { Carousel } from 'antd';
import styles from './Banner.module.css';
import brand from '../../assets/brand1bg.jpg';
import Image from 'next/image';
import img1 from '../../assets/slider/1.jpg';
import img2 from '../../assets/slider/2.jpg';
import img3 from '../../assets/slider/3.jpg';
import img4 from '../../assets/slider/4.jpg';

const data = [
    {
        img: img1,
        title: "Beautiful Landscape",
        description: "A breathtaking view of the mountains during sunset."
    },
    {
        img: img2,
        title: "City Skyline",
        description: "A vibrant cityscape with towering skyscrapers."
    },
    {
        img: img3,
        title: "Serene Beach",
        description: "A peaceful beach with crystal clear water and white sand."
    },
    {
        img: img4,
        title: "Serene Beach",
        description: "A peaceful beach with crystal clear water and white sand."
    }
];

const brand1 = {
    img: brand,
    title: "Unlimited Shop Pages",
    percent: '40%',
    description: "Time To Customize Unlimited Shop Pages, Sheena, helps to Spread your web appearance with an unlimited Shop option. It carries the latest post type and also a custom page to display all your images including features like isotope, load more, infinity scroll, etc"
};

const Banner = () => (
    <>
        <div className="w-full">
            <div className="grid grid-cols-12 items-center">
                <div className="col-span-12 md:col-span-8">
                    <Carousel
                        autoplay={true}
                        autoplaySpeed={2000}
                        dots={false}
                        arrows={true}
                        infinite={true}
                        draggable={true}
                        vertical
                    >
                        {data.map((item, index) => (
                            <div key={index}>
                                <Image src={item.img} width={1800} height={800} alt={item.title} />
                            </div>
                        ))}
                    </Carousel>
                </div>
                <div className=" md:col-span-4 col-span-12">
                    <div className="relative">
                        <div className={`${styles.overlay} flex justify-center items-center`}>
                            <h1 className="text-white text-left text-4xl">Discount {brand1.percent}</h1>
                        </div>
                        <Image src={brand1.img} width={500} height={500} className="w-full h-full object-cover" alt="brand-background" />
                    </div>
                    <div className="relative py-1 px-2 z-10 bg-slate-200">
                        <h3 className="py-1 text-[#663130] text-2xl mx-3 uppercase font-bold">{brand1.title}</h3>
                        <p className="mx-1 text-[#663130]">{brand1.description.slice(0, 80)}</p>
                    </div>
                </div>
            </div>
        </div>
    </>
);

export default Banner;
