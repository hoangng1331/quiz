import { useParams, useNavigate } from "react-router-dom";
import React from "react";
import { Button, Radio } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import axios from "axios";
import { API_URL } from "../../constants/URLS";

const HistoryDetails = () => {
  let { resultId } = useParams();
  const [questions, setQuestions] = React.useState();
  let navigate = useNavigate();
  React.useEffect(() => {
    axios.get(`${API_URL}/results/${resultId}`).then((res) => {
      setQuestions(res.data.questions);
    });
  }, [resultId]);
  return (
    <div className="report-details">
      <h2>History Details</h2>
      {questions?.map((question, index) => (
        <div className="question" key={index}>
          <h3>Question {index + 1}:</h3>
          <p className="question-text" style={{ marginTop: 25 }}>
            {question.question}
          </p>
          <Radio.Group
            value={question.selected_answer}
            style={{ display: "block" }}
          >
            {question.mixed_answers.map((answer, answerIndex) => (
              <Radio.Button
                style={{ borderRadius: 0 }}
                key={answerIndex}
                value={answer}
                className={
                  question.selected_answer === answer &&
                  question.selected_answer === question.correct_answer
                    ? "correct-answer"
                    : question.selected_answer === answer &&
                      question.selected_answer !== question.correct_answer
                    ? "wrong-answer"
                    : "answer-option"
                }
              >
                {answer}
              </Radio.Button>
            ))}
          </Radio.Group>
          {question.selected_answer !== question.correct_answer && (
            <p className="answer">
              Correct Answer: <span>{question.correct_answer}</span>
            </p>
          )}
        </div>
      ))}
      <Button
        className="back-button"
        type="primary"
        onClick={() => {
          navigate("/profile/history");
        }}
        icon={<ArrowLeftOutlined />}
      >
        Go Back
      </Button>
    </div>
  );
};

export default HistoryDetails;
