"use client"
import { Form, Input, Button, Radio } from 'antd';
import style from './registration.module.css';
import Link from 'next/link';
import { useRegistrationMutation } from '@/lib/fetchers/Authintication/authApi';
import { toast, Toaster } from 'sonner';
import { useRouter } from 'next/navigation';

const Register = () => {
  const [register, { isError, isLoading, data, error }] = useRegistrationMutation();
  const router = useRouter()
  const onFinish = async (values) => {
    try {
      const res = await register(values).unwrap();
      toast.success(res?.message)
      router.push('/login')
    } catch (err) {
      console.error(err?.data?.message);
    }
  };

  if(error?.data?.success === false){
    toast.error(error?.data?.message)
  }

  const onFinishFailed = (errorInfo) => {
   
  };

  return (
    <div className={`${style.background} min-h-screen flex items-center justify-center`}>
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <h2 className="text-2xl font-bold text-[#663130] mb-6 text-center">Registration</h2>
        <Form
          name="registration"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="space-y-4"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              size="large"
              type="text"
              placeholder="Name"
              className="mt-1 border bg-transparent outline-none block w-full rounded-md shadow-sm p-2"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              size="large"
              type="email"
              placeholder="Email"
              className="mt-1 border bg-transparent  outline-none block w-full rounded-md shadow-sm p-2"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              size="large"
              placeholder="Password"
              className="mt-1 border bg-transparent outline-none w-full rounded-md shadow-sm p-2"
            />
          </Form.Item>

          <Form.Item
            name="gender"
            rules={[{ required: true, message: 'Please select your gender!' }]}
          >
            <Radio.Group className="text-white">
              <Radio value="male" >Male</Radio>
              <Radio value="female" >Female</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item className="text-center">
            <Button
              type="primary"
              htmlType="submit"
              style={{ background: '#663130', padding: '0px 40px', color: 'white', fontWeight: 'bold', fontSize: '18px' }}
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
          </Form.Item>

          {isError && <div className="text-red-500 text-center mt-2">Registration failed. Please try again.</div>}

          <small className="text-center ">
            If you already have an account, please <Link className="font-bold" href="/login">Login</Link>
          </small>
        </Form>
      </div>
    </div>
  );
};

export default Register;
