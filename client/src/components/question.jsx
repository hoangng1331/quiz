import React, { useEffect, useState } from "react";
import { Radio, Spin, message, Progress } from "antd";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import formatTime from "../helpers/formatTime";
import { API_URL } from "../constants/URLS";
import { useAuth } from "../hooks/useAuth";

function Question() {
  const { auth } = useAuth((state) => state);
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
  const [progress, setProgress] = useState(0);

  const location = useLocation();
  const { name, pack } = location.state || {};

  const navigate = useNavigate();
  if (!name && !auth | !pack) {
    navigate("/home");
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
      const response = await axios.get(
        "https://opentdb.com/api.php?amount=" + pack
      );
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
      setProgress(currentQuestion + 1);
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
    navigate("/report", {
      state: { questions, startTime, endTime, name, pack },
    });
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
        <Spin
          indicator={<LoadingOutlined style={{ fontSize: "xx-large" }} />}
          tip="Loading..."
        />
      </div>
    );
  }
  if (currentQuestion >= questions.length) {
    if (!completed) {
      setCompleted(true);
      setEndTime(Date.now());
    }
    if (endTime && completed) {
      axios
        .post(`${API_URL}/results`, {
          name: name ?? auth?.loggedInUser?.fullName,
          playerId: auth?.loggedInUser?._id,
          startTime: startTime,
          endTime: endTime,
          questions: questions,
          package_question: pack,
        })
        .then((res) => {
          handleQuizFinish();
        });
    }
    return null;
  }
  const question = questions[currentQuestion];
  const calculateProgress = () => {
    const prog = (progress / questions.length) * 100;
    return Math.floor(prog);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Progress
        percent={calculateProgress()}
        status="active"
        strokeColor={{ from: "#e91010", to: "#87d068" }}
        format={() => (
          <strong>
            {progress}/{pack}
          </strong>
        )}
        size={[(window.innerWidth * 95) / 100]}
      />
      <div
        className={`question-container ${
          selectedAnswer !== "" ? "" : "fade-in"
        }`}
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
    </div>
  );
}

export default Question;
