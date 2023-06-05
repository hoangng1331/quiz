import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Start from "./components/start";
import Question from "./components/question";
import ReportDetails from "./components/reportdetails";
import Report from "./components/report";
import "./App.css";
import { Layout } from "antd";
import Login from "./components/Login";
import MainMenu from "./components/menu/menu";
import Register from "./components/Register";
import { useAuth } from "./hooks/useAuth";
import RankingTable from "./components/Top";

const { Header, Content, Footer } = Layout;
function App() {
  const { auth, logout } = useAuth((state) => state);
  return (
    <BrowserRouter>
      <Layout className="app-container">
        <Header
          className="header"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h1>Online Quiz</h1>
          {auth && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {" "}
              <div style={{ display: "flex", color: "white" }}></div>
              <div style={{ display: "flex", color: "white" }}>
                <strong>{auth?.loggedInUser?.firstName}</strong>
                <span style={{ marginInline: 8 }}>|</span>
                <strong
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </strong>
              </div>
            </div>
          )}
        </Header>
        <Content className="content">
          <Routes>
            <Route exact path="/" element={<Navigate to="/start" replace />} />
            <Route path="/start" element={<Start />} />
            <Route path="/question" element={<Question />} />
            <Route path="/report" element={<Report />} />
            <Route path="/reportdetails" element={<ReportDetails />} />
            <Route path="/top" element={<RankingTable />} />
            {auth && (
              <>
                <Route
                  path="/login"
                  element={<Navigate to="/start" replace />}
                />
                <Route
                  path="/register"
                  element={<Navigate to="/start" replace />}
                />
              </>
            )}
            {!auth && (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/profile"
                  element={<Navigate to="/login" replace />}
                />
              </>
            )}
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
