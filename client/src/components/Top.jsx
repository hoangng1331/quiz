import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";
import { API_URL } from "../constants/URLS";
import moment from "moment";
import { FaMedal } from "react-icons/fa";
import { BiTimer } from "react-icons/bi";
import { GrScorecard } from "react-icons/gr";
import { MdNumbers } from "react-icons/md";
const RankingTable = () => {
  const [rankingData, setRankingData] = useState([]);
  const [questions, setQuestions] = useState([]);
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
      .get(`${API_URL}/results`)
      .then((response) => {
        setQuestions(response.data);
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
        setRankingData(top20Data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

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
      render: (text, record, index) => {
        const totalTime =
          moment(record.endTime) -
          moment(record.startTime) -
          record.questions?.length * 8000;
        return formatTime(totalTime);
      },
    },
  ];

  return (
    <div className="container-table">
      <h2>Ranking Table</h2>
      <Table
        dataSource={rankingData}
        columns={columns}
        scroll={{ y: 240 }}
        pagination={false}
      />
    </div>
  );
};

export default RankingTable;
