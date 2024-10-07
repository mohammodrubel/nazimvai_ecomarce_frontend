"use client";
import { Form, Input, Button, Checkbox, message } from 'antd';

const Address = () => {
    const [form] = Form.useForm();
    

    // Handler for successful form submission
    const handleFinish = (values) => {
        
        message.success('Form submitted successfully!');
        // Add your custom logic for form submission, such as an API call
    };

    // Handler for failed form submission (validation errors)
    const handleFinishFailed = (errorInfo) => {
       
        message.error('Please complete the required fields!');
    };

    return (
        <div className=" mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Billing Address</h2>
            <Form
                form={form}
                layout="vertical"
                name="contactForm"
                onFinish={handleFinish}
                onFinishFailed={handleFinishFailed}
                className="w-full"
            >
                <Form.Item
                    name="emailOrPhone"
                    label="Contact"
                    rules={[{ required: true, message: 'Please input your email or phone number!' }]}
                    className="w-full"
                >
                    <Input placeholder="Email or Phone number" />
                </Form.Item>

                <div className="flex gap-4">
                    <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[{ required: true, message: 'Please input your first name!' }]}
                        className="w-full"
                    >
                        <Input placeholder="First Name" />
                    </Form.Item>

                    <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[{ required: true, message: 'Please input your last name!' }]}
                        className="w-full"
                    >
                        <Input placeholder="Last Name" />
                    </Form.Item>
                </div>

                <Form.Item
                    name="address"
                    label="Address"
                    rules={[{ required: true, message: 'Please input your address!' }]}
                    className="w-full"
                >
                    <Input placeholder="Address" />
                </Form.Item>

                <Form.Item
                    name="apartment"
                    label="Apartment"
                    className="w-full"
                >
                    <Input placeholder="Apartment, suite, etc. (optional)" />
                </Form.Item>

                <div className="flex gap-2">
                    <Form.Item
                        name="city"
                        label="City"
                        rules={[{ required: true, message: 'Please input your city!' }]}
                        className="w-full"
                    >
                        <Input placeholder="City" />
                    </Form.Item>

                    <Form.Item
                        name="state"
                        label="State"
                        rules={[{ required: true, message: 'Please input your state!' }]}
                        className="w-full"
                    >
                        <Input placeholder="State" />
                    </Form.Item>

                    <Form.Item
                        name="pincode"
                        label="Pincode"
                        rules={[{ required: true, message: 'Please input your pincode!' }]}
                        className="w-full"
                    >
                        <Input placeholder="Pincode" />
                    </Form.Item>
                </div>

                <Form.Item name="saveInfo" valuePropName="checked" className="w-full">
                    <Checkbox>Save this information for next time</Checkbox>
                </Form.Item>

                <Form.Item className="w-full">
                    <Button type="primary" htmlType="submit" className="w-full">
                        Submit
                    </Button>
                    <Button type="dashed" className="mt-5 w-full" size="large">
                    <i  class="fa-solid mx-1 fa-bangladeshi-taka-sign"></i>
                        Pay Now
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Address;
