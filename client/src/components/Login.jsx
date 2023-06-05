import React from "react";
import { Drawer, Form, Input, Button, Divider } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const validateUsername = (rule, value, callback) => {
    const regex = /^[A-Za-z0-9_\.@]+$/;
    if (!value || value.trim() === "" || regex.test(value)) {
      callback();
    } else {
      callback();
    }
  };
  const { login } = useAuth((state) => state);
  const onFinish = (values, e) => {
    const { email, password } = values;
    login({ email, password });
    loginForm.resetFields(["password"]);
  };
  const [loginForm] = Form.useForm();
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <div className="container-login">
      <h1 className="login-title">Login</h1>
      <Divider />
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
            Đăng nhập
          </Button>
        </Form.Item>
        <Form.Item>
          <div style={{ textAlign: "center" }}>
            Don't have an account?{" "}
            <a href="#" onClick={handleSignUp}>
              Sign up here!
            </a>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
