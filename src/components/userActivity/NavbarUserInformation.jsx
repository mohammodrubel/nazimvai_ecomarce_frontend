import { Dropdown } from 'antd';
import Link from 'next/link';
import React from 'react'

function NavbarUserInformation() {
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
          label: <Link href='/login'>Login</Link>,
          key: '3',
        },
      ];
      
    return (

        <ul className='flex gap-5'>
            <li><i className="cursor-pointer text-[#663130] text-[20px] fa-solid fa-cart-shopping"></i></li>
            <li><i className="cursor-pointer text-[#663130] text-[20px] fa-solid fa-heart"></i></li>
            <li onClick={(e) => e.preventDefault()}><Dropdown menu={{
      items,
    }}
    trigger={['click']}><i className="cursor-pointer text-[#663130] text-[20px] fa-solid fa-user"></i></Dropdown></li>
        </ul>

    )
}

export default NavbarUserInformation