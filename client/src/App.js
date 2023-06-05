import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Start from "./components/start";
import Question from "./components/question";
import ReportDetails from "./components/reportdetails";
import Report from "./components/report";
import "./App.css";
import { Layout, Spin } from "antd";
import Login from "./components/Login";
import MainMenu from "./components/menu/menu";
import Register from "./components/Register";
import { useAuth } from "./hooks/useAuth";
import RankingTable from "./components/Top";
import Information from "./components/player/profile";
import axios from "axios";
import { API_URL } from "./constants/URLS";
import { LoadingOutlined } from "@ant-design/icons";
import ChangePass from "./components/player/ChangePassword";
import ProfileMenu from "./components/menu/profilemenu";
import History from "./components/player/history";

const { Header, Content, Footer } = Layout;
function App() {
  const [displayProfileMenu, setDisplayProfileMenu] = React.useState();
  const [wakeUp, setWakeUp] = React.useState(null);
  const { auth, logout } = useAuth((state) => state);
  React.useEffect(() => {
    axios.get(`${API_URL}/players`).then((res) => {
      setWakeUp(res);
    });
  });
  React.useEffect(() => {
    const showProfileMenu =
      auth && window.location.pathname.includes("/profile");
    setDisplayProfileMenu(showProfileMenu);
  }, [auth, window]);
  if (!wakeUp) {
    return (
      <div className="question-loading">
        <Spin
          indicator={<LoadingOutlined style={{ fontSize: "xx-large" }} />}
          tip=" Waiting for server..."
        />
        {" Waiting for server..."}
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Layout className="app-container">
        <Header
          className="header"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h1>
            <Link to="/start" className="active">
              Online Quiz
            </Link>
          </h1>
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
                  Log out
                </strong>
              </div>
            </div>
          )}
        </Header>
        <Content className="content">
          {displayProfileMenu && <ProfileMenu />}
          <Routes>
            <Route exact path="/" element={<Navigate to="/start" replace />} />
            <Route path="/start" element={<Start />} />
            <Route path="/question" element={<Question />} />
            <Route path="/report" element={<Report />} />
            <Route path="/reportdetails" element={<ReportDetails />} />
            <Route path="/top" element={<RankingTable />} />
            {auth && (
              <>
                <Route path="/profile/changepass" element={<ChangePass />} />

                <Route path="/profile/information" element={<Information />} />
                <Route path="/profile/history" element={<History />} />
                <Route
                  path="/login"
                  element={<Navigate to="/profile/information" replace />}
                />
                <Route
                  path="/register"
                  element={<Navigate to="/profile/information" replace />}
                />
              </>
            )}
            {!auth && (
              <>
                <Route
                  path="/profile/changepass"
                  element={<Navigate to="/login" replace />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/profile/information"
                  element={<Navigate to="/login" replace />}
                />
                <Route
                  path="/profile/history"
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
