"use client";
import React from 'react';
import { Badge, Dropdown } from 'antd';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/lib/fetchers/Authintication/authSlice';

function NavbarUserInformation() {
  const currentCart = useSelector((state) => state?.products?.cartItem);
  const wishlist = useSelector((state) => state?.wishlist?.wishlist);
  const user = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
  };

  let totalQuantity = currentCart.reduce((total, item) => total += item.quantity, 0);
  
 

  return (
    <ul className='flex gap-5'>
      <li className='relative'>
        <Link href="/product-cart">
          <i className="cursor-pointer text-white text-[20px] fa-solid fa-cart-shopping"></i>
          {totalQuantity > 0 && (
            <div className='absolute top-[-5px] left-[-4px]'>
              <p className='absolute flex items-center bg-transparent border text-white justify-center w-4 h-4 p-3 cursor-pointer rounded-full -top-4 left-4'>
                {totalQuantity}
              </p>
            </div>
          )}
        </Link>
      </li>
      <li className='relative'>
        <Link href="/wishlist">
          <i className="cursor-pointer text-white text-[20px] fa-solid fa-heart"></i>
          {wishlist.length > 0 && (
            <div className='absolute top-[-5px] left-[-4px]'>
              <p className='absolute flex items-center bg-transparent border text-white justify-center w-4 h-4 p-3 cursor-pointer rounded-full -top-4 left-4'>
                {wishlist.length}
              </p>
            </div>
          )}
        </Link>
      </li>
    </ul>
  );
}

export default NavbarUserInformation;
