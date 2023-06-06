import React, { useEffect, useState } from "react";
import { Table, Button, Menu } from "antd";
import axios from "axios";
import moment from "moment";
import { EyeOutlined } from "@ant-design/icons";
import { API_URL } from "../../constants/URLS";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const History = () => {
  const [pack, setPack] = React.useState(5);
  let navigate = useNavigate();
  const [historyData, setHistoryData] = useState([]);
  const playerId = useAuth((state) => state.auth.loggedInUser._id);
  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / 1000 / 60 / 60) % 24);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };
  useEffect(() => {
    axios
      .get(`${API_URL}/results/playerId/${playerId}/package_question/${pack}`)
      .then((response) => {
        setHistoryData(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, [playerId, pack]);

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      align: "center",
      width: "5%",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Date",
      align: "center",
      width: "10%",
      dataIndex: "endTime",
      key: "endTime",
      render: (text) => moment(text).format("DD/MM/yyyy"),
    },
    {
      title: "Score",
      align: "center",
      width: "5%",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "Time",
      dataIndex: "totalTime",
      align: "center",
      width: "5%",
      key: "totalTime",
      render: (text, record, index) => {
        const totalTime =
          moment(record.endTime) -
          moment(record.startTime) -
          record.questions?.length * 8000;
        return formatTime(totalTime);
      },
    },
    {
      title: "Status",
      align: "center",
      width: "5%",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "View",
      align: "center",
      width: "5%",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Button
          icon={<EyeOutlined />}
          onClick={() => {
            navigate("/results/" + record._id);
          }}
        />
      ),
    },
  ];

  return (
    <div className="container-table">
      <Menu
        className="menu"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          fontSize: "xx-large",
        }}
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={["5"]}
        onSelect={(value) => {
          setPack(value.key);
        }}
      >
        <Menu.Item key="5">
          <strong>5</strong>
        </Menu.Item>
        <Menu.Item key="10">
          <strong>10</strong>
        </Menu.Item>
        <Menu.Item key="15">
          <strong>15</strong>
        </Menu.Item>
        <Menu.Item key="20">
          <strong>20</strong>
        </Menu.Item>
      </Menu>
      <h2>{pack} Questions</h2>
      <Table
        dataSource={historyData}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default History;
