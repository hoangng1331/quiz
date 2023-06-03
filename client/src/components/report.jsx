import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const Report = () => {
  const [score, setScore] = useState(0);
  const [view, setView] = useState(false);
  const location = useLocation();
  const { questions, startTime, endTime, name } = location.state || {};
  let navigate = useNavigate();
  let totalScore = 0;
  questions.forEach((question, index) => {
    if (question.correct_answer === question.selected_answer) {
      totalScore++;
    }
  });

  useEffect(() => {
    setScore(totalScore);
  }, [totalScore]);

  const resetQuiz = () => {
    setScore(0);
    navigate("/start", { state: {} });
  };
  const viewResult = () => {
    navigate("/reportdetails", { state: { questions, startTime, endTime } });
  };

  const passFail = score > questions.length / 2 ? "Pass" : "Fail";

  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / 1000 / 60 / 60) % 24);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const totalTime = endTime - startTime - questions.length * 8000;

  return (
    <div className="report-container" style={{ textAlign: "center" }}>
      <h2 className="title">Quiz Result</h2>
      <p className="subtitle">Total time: {formatTime(totalTime)}</p>
      <p className="subtitle">Total Questions: {questions.length}</p>
      <p className="subtitle">Correct Answers: {score}</p>
      <p className="result">Result: {passFail}</p>
      <div className="button-container">
        <Button className="button" onClick={viewResult}>
          View Result
        </Button>
        <Button className="button" onClick={()=>{ setView(true)}}>
          Restart Quiz
        </Button>
      </div>
      <Modal
      centered
      open={view}
      onOk={resetQuiz}
      onCancel={()=>setView(false)}>
        <h2>Do you want to take this quiz again?</h2>
      </Modal>
    </div>
  );
};

export default Report;
