"use client";
import React from 'react';
import { Dropdown, Menu } from 'antd';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/lib/fetchers/Authintication/authSlice';

function NavbarUserInformation() {
    const user = useSelector((state) => state?.auth?.user);
    const dispatch = useDispatch()


    const logoutUser  = ()=>{
       dispatch(logout())
  }

    const items = [
        {
          label: "Profile",
          key: '0',
        },
        {
          label: "Forget Password",
          key: '1',
        },
        {
          type: 'divider',
        },
        {
          label: user?.email ? <Link href='/' onClick={()=>logoutUser()}>Logout</Link> : <Link href='/login'>Login</Link>,
          key: '3',
        },
    ];

    const menu = <Menu items={items} />;

    return (
        <ul className='flex gap-5'>
            <li>
                <i className="cursor-pointer text-[#663130] text-[20px] fa-solid fa-cart-shopping"></i>
            </li>
            <li>
                <i className="cursor-pointer text-[#663130] text-[20px] fa-solid fa-heart"></i>
            </li>
            <li onClick={(e) => e.preventDefault()}>
                <Dropdown overlay={menu} trigger={['click']}>
                    <i className="cursor-pointer text-[#663130] text-[20px] fa-solid fa-user"></i>
                </Dropdown>
            </li>
        </ul>
    );
}

export default NavbarUserInformation;
