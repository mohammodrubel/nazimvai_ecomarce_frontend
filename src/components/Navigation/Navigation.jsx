"use client"
import Link from 'next/link';
import style from './Navigation.module.css';
import { useState, useEffect } from 'react';
import CategorySubMenu from './CategorySubMenu';
import ShopSubMenu from './ShopSubMenu';
import NavbarUserInformation from '../userActivity/NavbarUserInformation';



function Navigation() {
    const [scrollSize, setScrollSize] = useState(0)
  
    useEffect(() => {
        const handleScroll = () => {
            setScrollSize(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`${style.navigation} relative z-50 ${scrollSize > 300 ? style.activeNavigation : ''}`}>
            <div className='container mx-auto'>
                <div className='flex justify-between items-center'>
                    <div className='text-2xl'>LOGO</div>
                    <div className='flex items-center gap-5'>
                        <ul className='flex  gap-5'>
                            <li className=''>
                                <Link href="/" className='text-[18px] font-medium block px-4 my-2.5 relative transition-all duration-300 uppercase list-none tracking-widest'>Home</Link>
                            </li>
                            <li className={`${style.singleShopSubmenu} relative`}>
                                <Link href="/" className='text-[18px] font-medium block px-4 my-2.5 relative transition-all duration-300 uppercase list-none tracking-widest'>Category</Link>
                                <CategorySubMenu />
                            </li>
                            <li className={`${style.singleShopSubmenu} relative`}>
                                <Link href="/" className='text-[18px] font-medium block px-4 my-2.5 relative transition-all duration-300 uppercase list-none tracking-widest'>Shop</Link>
                                <ShopSubMenu/>
                            </li>
                            <li className='relative'>
                                <Link href="/" className='text-[18px] font-medium block px-4 my-2.5 relative transition-all duration-300 uppercase list-none tracking-widest'>About</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <NavbarUserInformation/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navigation;
