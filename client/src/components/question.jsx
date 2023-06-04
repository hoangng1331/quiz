import React, { useEffect, useState } from "react";
import { Radio, Spin, message, Modal } from "antd";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import formatTime from "../helpers/formatTime";
import { API_URL } from "../constants/URLS";

function Question() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [showQuestionInfo, setShowQuestionInfo] = useState(true);
  const [completed, setCompleted] = useState(false);

  const location = useLocation();
  const { name } = location.state || {};

  const navigate = useNavigate();
  if (!name) {
    navigate("/start");
  }

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      if (currentQuestion < questions.length) {
        e.returnValue = "";
        navigate("/question");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [currentQuestion, questions]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("https://opentdb.com/api.php?amount=5");
      const data = response.data.results.map((question) => ({
        ...question,
        selected_answer: "",
      }));
      setQuestions(data);
      setStartTime(Date.now());
      setShowQuestionInfo(true);
      setTimeout(() => {
        setShowQuestionInfo(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (questions.length > 0 && currentQuestion < questions.length) {
      const question = questions[currentQuestion];
      const answers = [...question.incorrect_answers, question.correct_answer];
      const shuffledArray = shuffleArray(answers);
      setShuffledAnswers(shuffledArray);
    }
  }, [currentQuestion, questions]);

  useEffect(() => {
    if (selectedAnswer !== "") {
      if (selectedAnswer === questions[currentQuestion].correct_answer) {
        const messages = [
          "Exactly!",
          "Well-done!",
          "Excellent!",
          "Good job!",
          "Correct!",
        ];
        const randomIndex = Math.floor(Math.random() * messages.length);
        message.success(messages[randomIndex]);
      } else {
        const messages = ["Incorrect!", "Wrong!", "False!"];
        const randomIndex = Math.floor(Math.random() * messages.length);
        message.error(messages[randomIndex]);
      }
      const timer = setTimeout(() => {
        handleNextQuestion();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [selectedAnswer, currentQuestion, questions]);

  const handleAnswerChange = (e) => {
    const answer = e.target.value;
    setSelectedAnswer(answer);
    setIsTimerRunning(false);
  };

  const handleNextQuestion = () => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestion].selected_answer = selectedAnswer;
    updatedQuestions[currentQuestion].mixed_answers = shuffledAnswers;

    setQuestions(updatedQuestions);
    setSelectedAnswer("");
    setCurrentQuestion(currentQuestion + 1);
    setCurrentTime(0);
    setIsTimerRunning(true);
    setShowQuestionInfo(true);
    setTimeout(() => {
      setShowQuestionInfo(false);
    }, 5000);
  };

  useEffect(() => {
    if (isTimerRunning && !showQuestionInfo) {
      const timer = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isTimerRunning, showQuestionInfo]);
  const handleQuizFinish = () => {
    navigate("/report", { state: { questions, startTime, endTime, name } });
  };

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  if (questions.length === 0) {
    return (
      <div className="question-loading">
        <Spin indicator={<LoadingOutlined />} tip="Loading..." />
      </div>
    );
  }
  if (currentQuestion >= questions.length) {
    if (!completed) {
      setCompleted(true);
      setEndTime(Date.now());
    }
    axios.post(`${API_URL}/results`, {
      name: name,
      startTime: startTime,
      endTime: endTime,
      questions: questions,
    });
    handleQuizFinish();
    return null;
  }
  const question = questions[currentQuestion];

  return (
    <div
      className={`question-container ${selectedAnswer !== "" ? "" : "fade-in"}`}
    >
      {showQuestionInfo ? (
        <div className="question-info">
          <h3>Question {currentQuestion + 1}: </h3>
          <p className="question-category">
            This is question about {question.category}
          </p>
          <p className="question-difficulty">
            Difficulty: {question.difficulty}
          </p>
        </div>
      ) : (
        <>
          <div
            className={`question ${selectedAnswer !== "" ? "fade-out" : ""}`}
          >
            <h2
              className={`question-text ${
                selectedAnswer !== "" ? "fade-out" : "fade-in"
              }`}
            >
              {question?.question}
            </h2>
          </div>
          <Radio.Group
            onChange={handleAnswerChange}
            value={selectedAnswer}
            style={{ display: "block" }}
            className={`question-text ${
              selectedAnswer !== "" ? "fade-out" : "fade-in"
            }`}
          >
            {shuffledAnswers.map((answer, index) => (
              <Radio.Button
                style={{ borderRadius: 0 }}
                className={
                  selectedAnswer === answer &&
                  answer === question.correct_answer
                    ? "correct-answer"
                    : selectedAnswer === answer &&
                      answer !== question.correct_answer
                    ? "wrong-answer"
                    : "answer-option"
                }
                key={index}
                value={answer}
                disabled={selectedAnswer !== ""}
              >
                {answer}
              </Radio.Button>
            ))}
          </Radio.Group>
          <div>
            <span className="timer">{formatTime(currentTime)}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default Question;
