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
    UsergroupAddOutlined
  } from '@ant-design/icons';
  
  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Home'
    },
    {
        key: 'user',
        icon: <UserOutlined />,
        label: 'User',
        children: [
          {
            key: 'allUsers',
            icon: <UserOutlined />,
            label: 'All Users'
          },
          {
            key: 'blockedUsers',
            icon: <UsergroupDeleteOutlined />,
            label: 'Blocked Users'
          },
          {
            key: 'addUser',
            icon: <UserAddOutlined />,
            label: 'Add User'
          },
          {
            key: 'userRoles',
            icon: <UserSwitchOutlined />,
            label: 'User Roles'
          },
          {
            key: 'userGroups',
            icon: <UsergroupAddOutlined />,
            label: 'User Groups'
          }
        ]
      },
    {
      key: 'stockManagement',
      icon: <StockOutlined />,
      label: 'Stock Management',
      children: [
        {
          key: 'currentStock',
          icon: <DatabaseOutlined />,
          label: 'Current Stock'
        },
        {
          key: 'stockHistory',
          icon: <FileSearchOutlined />,
          label: 'Stock History'
        },
        {
          key: 'stockReports',
          icon: <BarChartOutlined />,
          label: 'Stock Reports'
        }
      ]
    },
    {
      key: 'productManagement',
      icon: <ShoppingOutlined />,
      label: 'Product Management',
      children: [
        {
          key: 'addNewProduct',
          icon: <PlusOutlined />,
          label: 'Add New Product'
        },
        {
          key: 'editProduct',
          icon: <EditOutlined />,
          label: 'Edit Product'
        },
        {
          key: 'deleteProduct',
          icon: <DeleteOutlined />,
          label: 'Delete Product'
        }
      ]
    },
    {
      key: 'order',
      icon: <OrderedListOutlined />,
      label: 'Order',
      children: [
        {
          key: 'allOrders',
          icon: <ProfileOutlined />,
          label: 'All Orders'
        },
        {
          key: 'completedOrders',
          icon: <CheckCircleOutlined />,
          label: 'Completed Orders'
        },
        {
          key: 'cancelledOrders',
          icon: <CloseCircleOutlined />,
          label: 'Cancelled Orders'
        }
      ]
    },
    {
      key: 'delivery',
      icon: <CarOutlined />,
      label: 'Delivery'
    },
    {
      key: 'banner',
      icon: <PictureOutlined />,
      label: 'Banner'
    }
  ];
  
  export default menuItems;
  