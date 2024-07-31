"use client";
import React, { useState } from 'react';
import { Badge, Dropdown, Menu } from 'antd';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/lib/fetchers/Authintication/authSlice';

function NavbarUserInformation() {
  const currentCart = useSelector((state) => state?.products?.cartItem)
  const user = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch()
  const [show, setShow] = useState(true);

  const logoutUser = () => {
    dispatch(logout())
  }


  let totalQuantity = currentCart.reduce((total, item) => total += item.quantity, 0)

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
      label: user?.email ? <Link href='/' onClick={() => logoutUser()}>Logout</Link> : <Link href='/login'>Login</Link>,
      key: '3',
    },
  ];

  const menu = <Menu items={items} />;

  return (
    <ul className='flex gap-10'>
      <li className='relative'>
        <Link href="/product-cart"><i className="cursor-pointer text-[#663130] text-[20px] fa-solid fa-cart-shopping"></i>
        {totalQuantity > 0 && (
          <div className='absolute top-[-8px]'>
            <p className='absolute flex items-center bg-[#FF4D4F] text-white justify-center w-4 h-4 p-3 cursor-pointer rounded-full -top-4 left-4'>
              {totalQuantity}
            </p>
          </div>
        )}</Link>
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
