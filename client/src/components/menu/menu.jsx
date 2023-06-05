import React from "react";
import { Menu } from "antd";
import {
  BarChartOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function MainMenu() {
  let navigate = useNavigate();

  return (
    <Menu
      className="menu"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        position: "fixed",
        bottom: 0,
        fontSize: "xx-large",
      }}
      theme="light"
      mode="horizontal"
      defaultSelectedKeys={["home"]}
      onSelect={(value) => {
        navigate("/" + value.key.split("-").join("/"));
      }}
    >
      <Menu.Item key="top" style={{ position: "absolute", left: 0 }}>
        <BarChartOutlined style={{ fontSize: "x-large" }} />{" "}
        <strong className="hide-on-mobile">Ranking</strong>
      </Menu.Item>
      <Menu.Item
        key="start"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <HomeOutlined style={{ fontSize: "x-large" }} />{" "}
        <strong className="hide-on-mobile">Home</strong>
      </Menu.Item>
      <Menu.Item key="profile-information">
        <UserOutlined style={{ fontSize: "x-large" }} />{" "}
        <strong className="hide-on-mobile">Profile</strong>
      </Menu.Item>
    </Menu>
  );
}

export default MainMenu;
