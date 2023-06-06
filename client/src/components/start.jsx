import React, { useEffect } from "react";
import { Button, Image, Form, Modal, Input, message, Drawer } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { BiArrowBack } from "react-icons/bi";

const Start = () => {
  const { auth } = useAuth((state) => state);
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [createForm] = Form.useForm();
  let navigate = useNavigate();
  const location = useLocation();
  const { pack } = location.state || {};
  const validateUsername = (rule, value, callback) => {
    const regex = /^[A-Za-z0-9_\.@]+$/;
    if (!value || value.trim() === "" || regex.test(value)) {
      callback();
    } else {
      callback();
    }
  };
  useEffect(() => {
    if (auth) {
      setShowDrawer(false);
    }
  }, [auth]);
  const { login } = useAuth((state) => state);
  const onFinish = (values, e) => {
    const { email, password } = values;
    login({ email, password });
    loginForm.resetFields(["password"]);
  };
  const [loginForm] = Form.useForm();
  const handleStartQuiz = () => {
    if (auth) {
      navigate("/question", { state: { name: auth.name, pack } });
    } else {
      setShowDrawer(true);
    }
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
        navigate("/question", { state: { name: values.name, pack } });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };
  if (!pack) {
    navigate("/home");
    return null;
  }

  return (
    <div>
      <Button
        style={{ border: "none", background: "none" }}
        icon={<BiArrowBack style={{ fontSize: "x-large" }} />}
        onClick={() => {
          navigate("/home");
        }}
      />
      <div className="start-container">
        <h2 className="start-heading">Package: {pack} questions</h2>
        <div className="start-image-wrapper">
          <Image
            src="questions-186_256.gif"
            alt="Animated Image"
            preview={false}
            className="start-image"
          />
        </div>
        <Button
          type="primary"
          onClick={handleStartQuiz}
          className="start-button"
        >
          Start Quiz
        </Button>

        <Drawer
          title="Get Started"
          placement="top"
          closable={true}
          onClose={() => setShowDrawer(false)}
          visible={showDrawer}
          height={400}
        >
          {" "}
          <div>
            <Form
              form={loginForm}
              name="login-form"
              className="login-form"
              initialValues={{ email: "", password: "" }}
              onFinish={onFinish}
              autoComplete="on"
            >
              {" "}
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Can not be blank" },
                  { validator: validateUsername },
                  { type: "email", message: "Invalid email!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Input your email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Can not be blank" },
                  {
                    min: 1,
                    max: 30,
                    message: "At least 1 character",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Input your password"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div style={{ textAlign: "center", fontWeight: "bold" }}>or</div>
          <div style={{ textAlign: "center" }}>
            <Button
              className="login-form login-form-button"
              type="default"
              block
              onClick={handleStartNow}
            >
              Start Now
            </Button>
          </div>
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
    </div>
  );
};

export default Start;
