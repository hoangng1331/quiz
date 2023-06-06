import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Start from "./components/start";
import Question from "./components/question";
import ReportDetails from "./components/reportdetails";
import Report from "./components/report";
import "./App.css";
import { Layout, Spin, Image } from "antd";
import Login from "./components/Login";
import MainMenu from "./components/menu/menu";
import Register from "./components/Register";
import { useAuth } from "./hooks/useAuth";
import Information from "./components/player/profile";
import axios from "axios";
import { API_URL } from "./constants/URLS";
import { LoadingOutlined } from "@ant-design/icons";
import ChangePass from "./components/player/ChangePassword";
import ProfileMenu from "./components/menu/profilemenu";
import History from "./components/player/history";
import HistoryDetails from "./components/player/historydetails";
import Rank from "./components/React-query/Rank";
import Home from "./components/home";
import IndexProfile from "./components/player/indexprofile";

const { Header, Content, Footer } = Layout;
function App() {
  const [wakeUp, setWakeUp] = React.useState(null);
  const [players, setPlayers] = React.useState();
  const { auth, logout } = useAuth((state) => state);
  React.useEffect(() => {
    axios.get(`${API_URL}/players`).then((res) => {
      setWakeUp(res);
    });
  }, []);

  React.useEffect(() => {
    if (auth) {
      setTimeout(() => {
        axios.get(`${API_URL}/players/${auth.loggedInUser._id}`).then((res) => {
          setPlayers(res.data);
        });
      }, 1500);
    }
  }, [players, auth]);

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
            <Link to="/home" className="active">
              Online Quiz
            </Link>
          </h1>
          {auth && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {" "}
              <div style={{ display: "flex", color: "white" }}></div>
              <div style={{ display: "flex", color: "white" }}>
                <Image
                  style={{ borderRadius: "50%", marginInline: -8 }}
                  width={40}
                  src={
                    players?.imageUrl !== undefined
                      ? `${API_URL}${players?.imageUrl}`
                      : "no-ava.jpg"
                  }
                />{" "}
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
          <Routes>
            <Route exact path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/start" element={<Start />} />
            <Route path="/question" element={<Question />} />
            <Route path="/report" element={<Report />} />
            <Route path="/reportdetails" element={<ReportDetails />} />
            <Route path="/top" element={<Rank />} />
            {auth && (
              <>
                <Route path="/profile" element={<IndexProfile />} />
                <Route path="/results/:resultId" element={<HistoryDetails />} />
                <Route
                  path="/login"
                  element={<Navigate to="/profile" replace />}
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
                  path="/results/:resultId"
                  element={<Navigate to="/login" replace />}
                />
                <Route
                  path="/profile"
                  element={<Navigate to="/login" replace />}
                />
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
