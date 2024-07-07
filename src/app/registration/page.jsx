import { Button } from 'antd';
import React from 'react';
import style from './registration.module.css';
import Link from 'next/link';

const LoginForm = () => {
  return (
    <div className={`${style.background} min-h-screen flex items-center justify-center `}>
      <div className="bg-[#000000ab] p-8 shadow-md rounded-md w-96">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Registration</h2>
        <form className="space-y-4 ">
          <div>
            <label htmlFor="username" className="text-white block text-sm font-medium ">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 border bg-transparent text-white outline-none block w-full rounded-md shadow-sm  p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="Email" className="text-white block text-sm font-medium ">
              Email
            </label>
            <input
              type="text"
              id="username"
              name="email"
              className="mt-1 border bg-transparent text-white outline-none block w-full rounded-md shadow-sm  p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="text-white block text-sm font-medium ">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 border bg-transparent text-white outline-none block w-full rounded-md shadow-sm  p-2"
              required
            />
          </div>
          <div>
            <div className='text-center'><button>Submit</button></div>
          </div>
          <small className='text-center text-white'>if you have already account please <Link className='font-bold text-[#FFC0CB]' href='/login'>Login</Link></small>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
