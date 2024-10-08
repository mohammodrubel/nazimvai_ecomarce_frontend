"use client";
import { logout } from '@/lib/fetchers/Authintication/authSlice';
import { Dropdown, Input, Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavbarUserInformation from '../userActivity/NavbarUserInformation';
import CategorySubMenu from './CategorySubMenu';
import style from './Navigation.module.css';
import ShopSubMenu from './ShopSubMenu';

const { Search } = Input;

function Navigation() {
  const user = useSelector((state) => state?.auth?.user);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const [showNav, setShowNav] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const router = useRouter();
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollTop > lastScrollTop && currentScrollTop > 10) {
        // Scrolling down, hide the nav completely
        setShowNav(false);
      } else if (currentScrollTop < lastScrollTop && currentScrollTop > 10) {
        // Scrolling up, show the nav
        setShowNav(true);
      }
      setLastScrollTop(currentScrollTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  

  const onSearch = (value) => {
    router.push(`/search?${value}`);
  };
  

  const menu = (
    <Menu>
      <Menu.Item key="login">
        <li>{user?.email ? <p onClick={()=>logoutHandeler()}>Logout</p> : <Link href='/login'>Login</Link>}</li>
      </Menu.Item>
      <Menu.Item key="registration">
        <a href="/registration">Registration</a>
      </Menu.Item>
      <Menu.Item key="forgot-password">
        <a href="/forgot-password">Forgot Password</a>
      </Menu.Item>
      <Menu.Item key="reset-password">
        <a href="/reset-password">Reset Password</a>
      </Menu.Item>
      {user?.role === 'admin' && <Menu.Item key="dashboard">
        <a href="/dashboard">Dashboard</a>
      </Menu.Item>}
    </Menu>
  );

  const logoutHandeler = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className="wrapper">
        <div className={`bg-pink-300 fixed left-0 w-full z-50 transition-transform duration-300 ${showNav ? 'translate-y-0' : '-translate-y-full'} top-0`}>
          <div className='px-2 container mx-auto py-4'>
            <div className='flex justify-between items-center flex-wrap'>
              <h3 className='text-4xl font-light text-white'>LOGO</h3>
              <div className={`${style.search} flex-grow mx-4`}>
                <Search
                  placeholder="input search text"
                  onSearch={onSearch}
                  size='large'
                />
              </div>
              <div className='flex space-x-4 items-center justify-center'>
                <Dropdown overlay={menu} trigger={['click']}>
                  <p className='cursor-pointer flex justify-center text-center text-white items-center font-bold'>
                  <i class="cursor-pointer text-white text-[20px] fa-solid fa-user-large"></i>
                  </p>
                </Dropdown>
                <NavbarUserInformation />
              </div>
              <div className={style.mobileSearch}>
                <Search
                  placeholder="input search text"
                  onSearch={onSearch}
                />
              </div>
            </div>
            <div className='flex gap-5 justify-center py-4'>
              <nav>
                <ul className='flex gap-5'>
                  <li>
                    <Link className='font-bold text-white' href='/'>Home</Link>
                  </li>
                  <li className={`${style.singleShopSubmenu} relative`}>
                    <Link className='font-bold text-white' href='/shop'>Shop</Link>
                    <ShopSubMenu />
                  </li>
                  <li className={`${style.singleShopSubmenu} relative`}>
                    <Link className='font-bold text-white' href='/category'>Category</Link>
                    <CategorySubMenu />
                  </li>
                  <li>
                    <Link className='font-bold text-white' href='/contact'>Contact Us</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* Adjust the margin-top for the content to reserve space for the fixed navigation */}
        <div className="content mt-[126px]">
          {/* Your page content */}
        </div>
      </div>
    </>
  );
}

export default Navigation;
