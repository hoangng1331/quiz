import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Start from "./components/start";
import Question from "./components/question";
import ReportDetails from "./components/reportdetails";
import Report from "./components/report";
import "./App.css";
import { Layout, Menu } from "antd";
import {
  BarChartOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import MainMenu from "./components/menu/menu";
const { Sider, Header, Content, Footer } = Layout;
function App() {
  // let navigate = useNavigate();
  return (
    <BrowserRouter>
      <Layout className="app-container">
        <Header className="header">
          <h1>Online Quiz</h1>
        </Header>
        <Content className="content">
          <Routes>
            <Route exact path="/" element={<Navigate to="/start" replace />} />
            <Route path="/start" element={<Start />} />
            <Route path="/question" element={<Question />} />
            <Route path="/report" element={<Report />} />
            <Route path="/reportdetails" element={<ReportDetails />} />
          </Routes>
        </Content>
        <Footer />
        <footer>
          <MainMenu />
        </footer>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
