import React from "react";
import { Layout, Menu } from "antd";
import {
  BarChartOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
} from "react-router-dom";
function MainMenu() {
  let navigate = useNavigate();
  return (
    <Menu
      className="menu"
      style={{
        width: "100%",
        justifyContent: "center",
        position: "fixed",
        bottom: 0,
        fontSize: "xx-large",
      }}
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["2"]}
      onSelect={(value) => {
        navigate("/" + value.key);
      }}
    >
      {" "}
      <Menu.Item key="charts">
        <BarChartOutlined
          style={{
            fontSize: "x-large",
          }}
        />
      </Menu.Item>
      <Menu.Item key="start">
        <HomeOutlined
          style={{
            fontSize: "x-large",
          }}
        />
      </Menu.Item>
      <Menu.Item key="profile">
        <UserOutlined
          style={{
            fontSize: "x-large",
          }}
        />
      </Menu.Item>
    </Menu>
  );
}

export default MainMenu;
