import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  TeamOutlined,
  FolderOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useLocation, Link } from "react-router-dom";
import AdminCourses from "./AdminCourses";
import "./Admin.css";
import Users from "./Users/Users";
const { Header, Content, Sider } = Layout;

export default function Admin() {
  const [state, setState] = useState({
    collapsed: false,
  });
  const location = useLocation();
  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setState({ collapsed });
  };

  const { collapsed } = state;
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" icon={<FolderOutlined />}>
            <Link to={"/admin/courses"}>Courses</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<TeamOutlined />}>
            <Link to={"/admin/users"}>Users</Link>{" "}
          </Menu.Item>
          <Menu.Item key="3" icon={<ShoppingCartOutlined />}>
            <Link to={"/admin/shop"}>Shop</Link>{" "}
          </Menu.Item>
          {/* <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item> */}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {location.pathname.includes("courses") && <AdminCourses />}
            {location.pathname.includes("shop") && <h1>Shop</h1>}
            {location.pathname.includes("users") && <Users />}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
