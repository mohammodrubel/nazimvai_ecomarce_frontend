import style from './Navigation.module.css'
import Image from 'next/image';
import img from '../../assets/lip1.jpg';

function CategorySubMenu() {
    return (

        <div className={style.meghaMenu}>
            <div className=' grid justify-between mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
                <div>
                    <h3 className='text-2xl text-center font-bold text-white'>Shop Item</h3><hr/>
                    <Image className='rounded-xl mx-auto mt-5' width={250} height={250} src={img} alt='megha-menu-image' />
                </div>
                <div>
                    <h3 className='text-2xl font-bold text-white'>Skincare</h3> <hr/>
                    <ul className={style.subul}>
                        <li className='mt-2'><i style={{ color: "#FBEADE", padding: '0px 2px', margin: '0 10px' }} className="fa-solid fa-arrow-right"></i><span className='px-4 my-2.5 relative duration-300 uppercase list-none tracking-widest text-[#663130] font-bold hover:text-[#381918] transition-all'>Lipstick </span></li>
                        <li className='mt-2'><i style={{ color: "#FBEADE", padding: '0px 2px', margin: '0 10px' }} className="fa-solid fa-arrow-right"></i><span className='px-4 my-2.5 relative duration-300 uppercase list-none tracking-widest text-[#663130] font-bold hover:text-[#381918] transition-all'>Mascara </span></li>
                        <li className='mt-2'><i style={{ color: "#FBEADE", padding: '0px 2px', margin: '0 10px' }} className="fa-solid fa-arrow-right"></i><span className='px-4 my-2.5 relative duration-300 uppercase list-none tracking-widest text-[#663130] font-bold hover:text-[#381918] transition-all'>Foundation </span></li>
                        <li className='mt-2'><i style={{ color: "#FBEADE", padding: '0px 2px', margin: '0 10px' }} className="fa-solid fa-arrow-right"></i><span className='px-4 my-2.5 relative duration-300 uppercase list-none tracking-widest text-[#663130] font-bold hover:text-[#381918] transition-all'>Eyeliner </span></li>
                        <li className='mt-2'><i style={{ color: "#FBEADE", padding: '0px 2px', margin: '0 10px' }} className="fa-solid fa-arrow-right"></i><span className='px-4 my-2.5 relative duration-300 uppercase list-none tracking-widest text-[#663130] font-bold hover:text-[#381918] transition-all'>Blush </span></li>
                        <li className='mt-2'><i style={{ color: "#FBEADE", padding: '0px 2px', margin: '0 10px' }} className="fa-solid fa-arrow-right"></i><span className='px-4 my-2.5 relative duration-300 uppercase list-none tracking-widest text-[#663130] font-bold hover:text-[#381918] transition-all'>Eyeshadow Palette </span></li>
                    </ul>
                </div>
                <div>
                    <h3 className='text-2xl font-bold text-white'>Makeup</h3> <hr/>
                    <ul className={style.subul}>
                        <li className='mt-2'><i style={{ color: "#FBEADE", padding: '0px 2px', margin: '0 10px' }} className="fa-solid fa-arrow-right"></i><span className='px-4 my-2.5 relative duration-300 uppercase list-none tracking-widest text-[#663130] font-bold hover:text-[#381918] transition-all'>Lipstick </span></li>
                        <li className='mt-2'><i style={{ color: "#FBEADE", padding: '0px 2px', margin: '0 10px' }} className="fa-solid fa-arrow-right"></i><span className='px-4 my-2.5 relative duration-300 uppercase list-none tracking-widest text-[#663130] font-bold hover:text-[#381918] transition-all'>Mascara </span></li>
                        <li className='mt-2'><i style={{ color: "#FBEADE", padding: '0px 2px', margin: '0 10px' }} className="fa-solid fa-arrow-right"></i><span className='px-4 my-2.5 relative duration-300 uppercase list-none tracking-widest text-[#663130] font-bold hover:text-[#381918] transition-all'>Foundation </span></li>
                        <li className='mt-2'><i style={{ color: "#FBEADE", padding: '0px 2px', margin: '0 10px' }} className="fa-solid fa-arrow-right"></i><span className='px-4 my-2.5 relative duration-300 uppercase list-none tracking-widest text-[#663130] font-bold hover:text-[#381918] transition-all'>Eyeliner </span></li>
                        <li className='mt-2'><i style={{ color: "#FBEADE", padding: '0px 2px', margin: '0 10px' }} className="fa-solid fa-arrow-right"></i><span className='px-4 my-2.5 relative duration-300 uppercase list-none tracking-widest text-[#663130] font-bold hover:text-[#381918] transition-all'>Blush </span></li>
                        <li className='mt-2'><i style={{ color: "#FBEADE", padding: '0px 2px', margin: '0 10px' }} className="fa-solid fa-arrow-right"></i><span className='px-4 my-2.5 relative duration-300 uppercase list-none tracking-widest text-[#663130] font-bold hover:text-[#381918] transition-all'>Eyeshadow Palette </span></li>
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default CategorySubMenu