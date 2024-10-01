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
    icon: <HomeOutlined />,
    label: <Link href="/dashboard/home">Home</Link>,
  },
  {
    key: 'user',
    icon: <UserOutlined />,
    label: 'User',
    children: [
      {
        key: 'allUsers',
        icon: <UserOutlined />,
        label: <Link href="/dashboard/users/all">All Users</Link>,
      },
      {
        key: 'blockedUsers',
        icon: <UsergroupDeleteOutlined />,
        label: <Link href="/dashboard/users/blocked">Blocked Users</Link>,
      },
      {
        key: 'addUser',
        icon: <UserAddOutlined />,
        label: <Link href="/dashboard/users/add">Add User</Link>,
      },
      {
        key: 'userRoles',
        icon: <UserSwitchOutlined />,
        label: <Link href="/dashboard/users/roles">User Roles</Link>,
      },
      {
        key: 'userGroups',
        icon: <UsergroupAddOutlined />,
        label: <Link href="/dashboard/users/groups">User Groups</Link>,
      },
    ],
  },
  {
    key: 'stockManagement',
    icon: <StockOutlined />,
    label: 'Stock Management',
    children: [
      {
        key: 'currentStock',
        icon: <DatabaseOutlined />,
        label: <Link href="/dashboard/current-stock">Current Stock</Link>,
      },
      {
        key: 'stockHistory',
        icon: <FileSearchOutlined />,
        label: <Link href="/dashboard/stock/history">Stock History</Link>,
      },
      {
        key: 'stockReports',
        icon: <BarChartOutlined />,
        label: <Link href="/dashboard/stock/reports">Stock Reports</Link>,
      },
    ],
  },
  {
    key: 'productManagement',
    icon: <ShoppingOutlined />,
    label: 'Product Management',
    children: [
      {
        key: 'addNewProduct',
        icon: <PlusOutlined />,
        label: <Link href="/dashboard/add-new-product">Add New Product</Link>,
      },
      {
        key: 'editProduct',
        icon: <EditOutlined />,
        label: <Link href="/dashboard/edit">Edit Product</Link>,
      },
      {
        key: 'deleteProduct',
        icon: <DeleteOutlined />,
        label: <Link href="/dashboard/delete-product">Delete Product</Link>,
      },
    ],
  },
  {
    key: 'order',
    icon: <OrderedListOutlined />,
    label: 'Order',
    children: [
      {
        key: 'allOrders',
        icon: <ProfileOutlined />,
        label: <Link href="/dashboard/orders/all">All Orders</Link>,
      },
      {
        key: 'completedOrders',
        icon: <CheckCircleOutlined />,
        label: <Link href="/dashboard/orders/completed">Completed Orders</Link>,
      },
      {
        key: 'cancelledOrders',
        icon: <CloseCircleOutlined />,
        label: <Link href="/dashboard/orders/cancelled">Cancelled Orders</Link>,
      },
    ],
  },
  {
    key: 'category',
    icon: <PictureOutlined />,
    label: 'Category',
    children: [
      {
        key: 'viewCategories',
        icon: <PictureOutlined />,
        label: <Link href="/dashboard/view-category">View Categories</Link>,
      },
      {
        key: 'createCategory',
        icon: <PlusOutlined />,
        label: <Link href="/dashboard/category">Create Category</Link>,
      },
    ],
  },
  {
    key: 'brand',
    icon: <PictureOutlined />,
    label: 'Brand',
    children: [
      {
        key: 'createBrand',
        icon: <PlusOutlined />,
        label: <Link href="/dashboard/brand">Create Brand</Link>,
      },
      {
        key: 'viewBrands',
        icon: <PictureOutlined />,
        label: <Link href="/dashboard/view-brand">View Brands</Link>,
      },
    ],
  },
  {
    key: 'delivery',
    icon: <CarOutlined />,
    label: <Link href="/dashboard/delivery">Delivery</Link>,
  },
  {
    key: 'banner',
    icon: <PictureOutlined />,
    label: <Link href="/dashboard/banner">Banner</Link>,
  },
];

export default menuItems;
