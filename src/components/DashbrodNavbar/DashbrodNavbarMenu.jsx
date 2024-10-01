import {
  HomeOutlined,
  StockOutlined,
  ShoppingOutlined,
  CarOutlined,
  PictureOutlined,
  DatabaseOutlined,
  FileSearchOutlined,
  BarChartOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  OrderedListOutlined,
  ProfileOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  UserOutlined,
  UsergroupDeleteOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

const menuItems = [
  {
    key: 'home',
    icon: <HomeOutlined style={{fontSize:'18px',color:'#2CB1EC'}} />,
    label: <Link href="/dashboard/home" className="font-bold text-gray-600">Home</Link>,
  },
  {
    key: 'user',
    icon: <UserOutlined style={{fontSize:'18px',color:'#2CB1EC'}} />,
    label: <Link href="/dashboard/user" className="font-bold text-gray-600">User</Link>,
  },
  {
    key: 'productManagement',
    icon: <ShoppingOutlined style={{fontSize:'18px',color:'#2CB1EC'}} />,
    label: <span className="font-bold text-gray-600">Product Management</span>,
    children: [
      {
        key: 'addNewProduct',
        icon: <PlusOutlined style={{fontSize:'18px',color:'#2CB1EC'}} />,
        label: <Link href="/dashboard/add-new-product" className="font-bold text-gray-600">Add New Product</Link>,
      },
      {
        key: 'editProduct',
        icon: <EditOutlined style={{fontSize:'18px',color:'#2CB1EC'}} />,
        label: <Link href="/dashboard/edit" className="font-bold text-gray-600">Edit Product</Link>,
      },
      {
        key: 'deleteProduct',
        icon: <DeleteOutlined style={{fontSize:'18px',color:'#2CB1EC'}} />,
        label: <Link href="/dashboard/delete-product" className="font-bold text-gray-600">Delete Product</Link>,
      },
    ],
  },
  {
    key: 'order',
    icon: <OrderedListOutlined style={{fontSize:'18px',color:'#2CB1EC'}} />,
    label: <span className="font-bold text-gray-600">Order</span>,
    children: [
      {
        key: 'allOrders',
        icon: <ProfileOutlined style={{fontSize:'18px',color:'#2CB1EC'}} />,
        label: <Link href="/dashboard/all-order" className="font-bold text-gray-600">All Orders</Link>,
      },
      {
        key: 'completedOrders',
        icon: <CheckCircleOutlined style={{fontSize:'18px',color:'#2CB1EC'}} />,
        label: <Link href="/dashboard/complete-order" className="font-bold text-gray-600">Completed Orders</Link>,
      },
      {
        key: 'cancelledOrders',
        icon: <CloseCircleOutlined style={{fontSize:'18px',color:'#2CB1EC'}} />,
        label: <Link href="/dashboard/cancelled_order" className="font-bold text-gray-600">Cancelled Orders</Link>,
      },
    ],
  },
  {
    key: 'category',
    icon: <PictureOutlined style={{fontSize:'18px',color:'#2CB1EC'}} />,
    label: <span className="font-bold text-gray-600">Category</span>,
    children: [
      {
        key: 'viewCategories',
        icon: <PictureOutlined style={{fontSize:'18px',color:'#2CB1EC'}} />,
        label: <Link href="/dashboard/view-category" className="font-bold text-gray-600">View Categories</Link>,
      },
      {
        key: 'createCategory',
        icon: <PlusOutlined style={{fontSize:'18px',color:'#2CB1EC'}} />,
        label: <Link href="/dashboard/category" className="font-bold text-gray-600">Create Category</Link>,
      },
    ],
  },
  {
    key: 'brand',
    icon: <PictureOutlined style={{fontSize:'18px',color:'#2CB1EC'}} />,
    label: <span className="font-bold text-gray-600">Brand</span>,
    children: [
      {
        key: 'createBrand',
        icon: <PlusOutlined style={{fontSize:'18px',color:'#2CB1EC'}} />,
        label: <Link href="/dashboard/brand" className="font-bold text-gray-600">Create Brand</Link>,
      },
      {
        key: 'viewBrands',
        icon: <PictureOutlined style={{fontSize:'18px',color:'#2CB1EC'}} />,
        label: <Link href="/dashboard/view-brand" className="font-bold text-gray-600">View Brands</Link>,
      },
    ],
  },
  {
    key: 'delivery',
    icon: <CarOutlined style={{fontSize:'18px',color:'#2CB1EC'}} />,
    label: <Link href="/dashboard/delivery" className="font-bold text-gray-600">Delivery</Link>,
  },
  {
    key: 'banner',
    icon: <PictureOutlined style={{fontSize:'18px',color:'#2CB1EC'}} />,
    label: <Link href="/dashboard/banner" className="font-bold text-gray-600">Banner</Link>,
  },
];

export default menuItems;
