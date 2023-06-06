import React from "react";
import History from "./history";
import Information from "./profile";
import ChangePass from "./ChangePassword";
import { Menu } from "antd";
import {
  FileTextOutlined,
  RetweetOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
function IndexProfile() {
  let navigate = useNavigate();
  const location = useLocation();
  const { pages } = location.state || {};
  React.useEffect(() => {
    const handleBeforeUnload = () => {
      navigate("/profile");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  const [comp, setComp] = React.useState("profile-information");
  React.useEffect(() => {
    if (pages) {
      setComp(pages);
    }
  }, [pages]);
  return (
    <div>
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
        defaultSelectedKeys={[pages ?? comp]}
        onSelect={({ key }) => {
          setComp(key);
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
      {comp === "profile-changepass" && <ChangePass />}
      {comp === "profile-information" && <Information />}
      {comp === "profile-history" && <History />}
    </div>
  );
}

export default IndexProfile;
