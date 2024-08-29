"use client"
import React from 'react';
import { Form, Input, Button } from 'antd';
import style from './login.module.css';
import Link from 'next/link';
import { useLoginMutation } from '@/lib/fetchers/Authintication/authApi';
import { setUsers } from '@/lib/fetchers/Authintication/authSlice';
import { useDispatch } from 'react-redux';
import { DecodedData } from '@/utils/DecodedData';
import { toast, Toaster } from 'sonner';
import { useRouter } from 'next/navigation';



const Login = () => {
  const [loginInfo, { isError, isLoading, data }] = useLoginMutation()
  const router = useRouter()
  const dispathch = useDispatch()
  const onFinish = async (values) => {
      try{
        const res = await loginInfo(values).unwrap();
      const user = DecodedData (res?.data?.accessToken)
      dispathch(setUsers({user:user,token:res?.data?.accessToken}))
      toast.success(res?.message)
      router.push('/')
      }
      catch(err){
        toast.error(err?.data?.message)
      }
  };

 
 

  const onFinishFailed = (errorInfo) => {};

  return (
    <div className={`${style.background} min-h-screen flex items-center justify-center`}>
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <h2 className="text-2xl font-bold text-[#663130] mb-6 text-center">Login</h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="space-y-4"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              size='large'
              type="email"
              placeholder="Email"
              className="mt-1 border bg-transparent outline-none block w-full rounded-md shadow-sm p-2"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              size="large"
              placeholder="Password"
              className="mt-1 border bg-transparent outline-none  w-full rounded-md shadow-sm "
            />
          </Form.Item>
          <Form.Item className="text-center">
            <Button
              type="primary"
              htmlType="submit"
              style={{ background: '#663130', padding: '0px 40px', color: 'white', fontWeight: 'bold', fontSize: '18px' }}
              className='border px-5'
            >
              Login
            </Button>
          </Form.Item>

          <small className='text-center'>
            If you have no account, please <Link className='font-bold' href='/registration'>Create Account</Link>
          </small>
        </Form>
      </div>
    </div>
  );
};

export default Login;
