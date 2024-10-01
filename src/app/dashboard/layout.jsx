'use client';

import React from 'react';
import { Layout, Menu } from 'antd';
import DashbrodNavbar from '@/components/DashbrodNavbar/DashbrodNavbar';
import menuItems from '@/components/DashbrodNavbar/DashbrodNavbarMenu';
import { Toaster } from 'sonner';

const { Header, Content, Sider } = Layout;

const Page = ({ children }) => {
  return (
    <Layout>
      <Sider
        style={{ background: 'white' }}
        breakpoint="lg"
        width="300px"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          // Handle breakpoint changes if needed
        }}
        onCollapse={(collapsed, type) => {
          // Handle collapse changes if needed
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="light" mode="inline" defaultSelectedKeys={['4']} items={menuItems} />
      </Sider>
      <Layout>
        <Header style={{ background: 'white' }}>
          <DashbrodNavbar />
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            style={{
              padding: 24,
              height: '100vh',
              background: 'white',
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
      <Toaster richColors position="top-center" />
    </Layout>
  );
};

export default Page;
