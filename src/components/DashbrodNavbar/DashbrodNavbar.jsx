"use client"
import React from 'react';
import { Button } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';


function DashbrodNavbar() {
    const user = useSelector((state) => state?.auth?.user);
    const dispatch = useDispatch()


    const logoutUser = () => {
        dispatch(logout())
    }
    return (
        <div className='px-5 flex justify-between item-center mt-4 sticky top-0'>
            <h2 className='text-2xl'>LOGO</h2>
            <Button onClick={()=>logoutUser()} type="dashed"><LoginOutlined /> Logout</Button>
        </div>
    );
}

export default DashbrodNavbar;
