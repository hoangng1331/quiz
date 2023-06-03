import React from 'react';
import { Button, Image } from 'antd';
import { useNavigate } from "react-router-dom";
const Start = () => {
    let navigate = useNavigate()
    const onClick = () => {
        navigate("/question");
    }
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Welcome</h2>
      <div><Image
        src="questions-186_256.gif"
        alt="Animated Image"
        preview={false}
        style={{ width: '200px', height: '200px', display: "block" }}
      /></div>
      <Button type="primary" onClick={onClick}>Start Quiz</Button>
    </div>
  );
};

export default Start;
