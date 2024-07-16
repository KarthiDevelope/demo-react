// DashboardLayout.js
import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { UnorderedListOutlined, BookOutlined, LoginOutlined, UserAddOutlined, UsergroupAddOutlined} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const DashboardLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<UnorderedListOutlined />}>
            <Link to="/home">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<BookOutlined />}>
            <Link to="/books">Book List</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UsergroupAddOutlined /> }>
            <Link to="/users">Users List</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<LoginOutlined />}>
            <Link to="/">Login</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<UserAddOutlined />}>
            <Link to="/register">Register</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Book Collection ©2024 Created by Karthikeyan
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
