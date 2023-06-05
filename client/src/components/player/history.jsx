import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import axios from "axios";
import moment from "moment";
import { EyeOutlined } from "@ant-design/icons";
import { API_URL } from "../../constants/URLS";
import { useAuth } from "../../hooks/useAuth";

const History = () => {
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
      .get(`${API_URL}/results/playerId/${playerId}`)
      .then((response) => {
        setHistoryData(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, [playerId]);

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Date",
      dataIndex: "endTime",
      key: "endTime",
      render: (text) => moment(text).format("DD/MM/yyyy"),
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "Time",
      dataIndex: "totalTime",
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
      dataIndex: "status",
      key: "status",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: () => <Button icon={<EyeOutlined />} />,
    },
  ];

  return (
    <div className="container-history">
      <h2>Quiz History</h2>
      <Table dataSource={historyData} columns={columns} />
    </div>
  );
};

export default History;
