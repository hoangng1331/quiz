import React from "react";
import { Table, Spin, Menu } from "antd";
import axios from "axios";
import moment from "moment";
import { FaMedal } from "react-icons/fa";
import { BiTimer } from "react-icons/bi";
import { GrScorecard } from "react-icons/gr";
import { MdNumbers } from "react-icons/md";
import { useQuery } from "react-query";
import { API_URL } from "../constants/URLS";
import { LoadingOutlined } from "@ant-design/icons";

const RankingTable = () => {
  const [pack, setPack] = React.useState(5);
  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / 1000 / 60 / 60) % 24);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const {
    data: rankingData,
    isLoading,
    isError,
  } = useQuery(
    "rankingData",
    async () => {
      const response = await axios.get(`${API_URL}/results/package/${pack}`);
      const filteredData = response.data.filter(
        (item) => item.status === "Pass"
      );
      const sortedData = filteredData.sort((a, b) => {
        if (a.score !== b.score) {
          return b.score - a.score;
        } else {
          return (
            moment(a.endTime).valueOf() -
            moment(a.startTime).valueOf() -
            (moment(b.endTime).valueOf() - moment(b.startTime).valueOf())
          );
        }
      });

      const top20Data = sortedData.slice(0, 20);
      return top20Data;
    },
    { refetchInterval: 3000 }
  );

  const columns = [
    {
      title: <MdNumbers />,
      width: "5%",
      align: "center",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => {
        if (index === 0) {
          return (
            <span style={{ color: "gold" }}>
              <FaMedal />
            </span>
          );
        } else if (index === 1) {
          return (
            <span style={{ color: "silver" }}>
              <FaMedal />
            </span>
          );
        } else if (index === 2) {
          return (
            <span style={{ color: "#cd7f32" }}>
              <FaMedal />
            </span>
          );
        } else {
          return index + 1;
        }
      },
    },
    {
      title: "Date",
      width: "32%",
      dataIndex: "endTime",
      align: "center",
      key: "endTime",
      render: (text) => {
        return <span>{moment(text).format("DD/MM/yyyy")}</span>;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: <GrScorecard style={{ fontSize: "larger" }} />,
      width: "10%",
      align: "center",
      dataIndex: "score",
      key: "score",
    },
    {
      title: <BiTimer style={{ fontSize: "x-large" }} />,
      align: "center",
      key: "finishTime",
      render: (text, record) => {
        const totalTime =
          moment(record.endTime) -
          moment(record.startTime) -
          record.questions?.length * 8000;
        return formatTime(totalTime);
      },
    },
  ];

  if (isLoading) {
    return (
      <div className="question-loading">
        <Spin
          indicator={<LoadingOutlined style={{ fontSize: "xx-large" }} />}
          tip="Loading..."
        />
        {"Loading..."}
      </div>
    );
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div>
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
        <h2>Ranking Table</h2>
        <Table
          dataSource={rankingData}
          columns={columns}
          scroll={{ y: 240 }}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default RankingTable;
