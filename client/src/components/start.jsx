import React from "react";
import { Button, Image, Form, Modal, Input, message, Drawer } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Start = () => {
  const { auth } = useAuth((state) => state);
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [createForm] = Form.useForm();
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    if (auth) {
      navigate("/question", { state: { name: auth.name } });
    } else {
      setShowDrawer(true);
    }
  };

  const handleLogin = () => {
    setShowDrawer(false);
    navigate("/login");
  };

  const handleStartNow = () => {
    setShowDrawer(false);
    setShowModal(true);
  };

  const handleModalOk = () => {
    createForm
      .validateFields()
      .then((values) => {
        createForm.resetFields();
        setShowModal(false);
        navigate("/question", { state: { name: values.name } });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

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
      <Button type="primary" onClick={handleStartQuiz} className="start-button">
        Start Quiz
      </Button>

      <Drawer
        title="Get Started"
        placement="top"
        closable={true}
        onClose={() => setShowDrawer(false)}
        visible={showDrawer}
        height={200}
      >
        <Button type="primary" block onClick={handleStartNow}>
          Start Now
        </Button>
        <Button type="default" block onClick={handleLogin}>
          Log in
        </Button>
      </Drawer>

      <Modal
        centered
        visible={showModal}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        title="Let me know your name"
      >
        <Form form={createForm}>
          <Form.Item
            name="name"
            required
            hasFeedback
            rules={[{ required: true, message: "Please input your name" }]}
          >
            <Input placeholder="Your name" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Start;
