import React from "react";
import { Menu } from "antd";
import {
  FileTextOutlined,
  RetweetOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function ProfileMenu() {
  let navigate = useNavigate();

  return (
    <Menu
      className="menu"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        bottom: 0,
        fontSize: "xx-large",
      }}
      theme="light"
      mode="horizontal"
      defaultSelectedKeys={["profile-information"]}
      onSelect={({ key }) => {
        navigate("/" + key.split("-").join("/"));
      }}
    >
      <Menu.Item key="profile-information">
        <FileTextOutlined style={{ fontSize: "x-large" }} />{" "}
        <strong className="hide-on-mobile">Information</strong>
      </Menu.Item>
      <Menu.Item key="profile-changepass">
        <RetweetOutlined style={{ fontSize: "x-large" }} />{" "}
        <strong className="hide-on-mobile">Change Password</strong>
      </Menu.Item>
      <Menu.Item key="profile-history">
        <HistoryOutlined style={{ fontSize: "x-large" }} />{" "}
        <strong className="hide-on-mobile">History</strong>
      </Menu.Item>
    </Menu>
  );
}

export default ProfileMenu;
