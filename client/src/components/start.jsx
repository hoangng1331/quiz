import React from 'react';
import { Button, Image, Form, Modal, Input, message } from 'antd';
import { useNavigate } from "react-router-dom";

const Start = () => {
  const [viewModal, setViewModal] = React.useState(false)
  let navigate = useNavigate()
  const onClick = (value) => {
    const name = value.name
    console.log(name)
    if (name){navigate("/question", {state: {name}});} else {
      message.error("Input your name, please!")
    }
    
  }
  const [createForm] = Form.useForm()
  return (
    <div className="start-container"> 
      <h2 className="start-heading">Welcome</h2>
      <div className="start-image-wrapper">
        <Image
          src="questions-186_256.gif"
          alt="Animated Image"
          preview={false}
          className="start-image"
        />
      </div>
      <Button type="primary" onClick={()=>{setViewModal(true)}} className="start-button">Start Quiz</Button>
      <Modal
      centered
      open={viewModal}
      onOk={()=>{
        createForm.submit();
      }}
      onCancel={()=>{setViewModal(false)}}
      title="Let me know your name">
        <Form
        form={createForm}
        onFinish={onClick}>
          <Form.Item
          name="name"
          required
          hasFeedback>
            <Input/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Start;
