import "./App.css";
import Start from "./components/start";
import Question from "./components/question";
import ReportDetails from "./components/reportdetails";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Report from "./components/report";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Navigate to="/start" replace />} />
        <Route path="/start" element={<Start />} />
        <Route path="/question" element={<Question />} />
        <Route path="/report" element={<Report />} />
        <Route path="/reportdetails" element={<ReportDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
