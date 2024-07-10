"use client"
import React from 'react';
import { Layout, Menu } from 'antd';
import DashbrodNavbar from '@/components/DashbrodNavbar/DashbrodNavbar';
import menuItems from '@/components/DashbrodNavbar/DashbrodNavbarMenu';
const { Header, Content, Footer, Sider } = Layout;

const page = () => {
  return (
    <Layout>
      <Sider
      style={{background:'white'}}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="light" mode="inline" defaultSelectedKeys={['4']} items={menuItems} />
      </Sider>
      <Layout>
        <Header style={{background:'white'}}>
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
              background:'white'
            }}
          >
            content
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default page;