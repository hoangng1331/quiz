import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../constants/URLS";

function Register() {
  const dateRef = useRef(null);
  const [passWord, setpassWord] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [birthDay, setBirthDay] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [gender, setGender] = useState();
  const [newPass, setNewPass] = useState();
  const navigate = useNavigate();
  const handleChange = (event) => {
    switch (event.target.name) {
      case "password":
        setpassWord(event.target.value);
        break;
      case "firstName":
        setFirstName(event.target.value);
        break;
      case "lastName":
        setLastName(event.target.value);
        break;
      case "email":
        setEmail(event.target.value);
        break;
      case "birthday":
        setBirthDay(dateRef.current?.value);
        break;
      case "phonenumber":
        setPhoneNumber(event.target.value);
        break;
      case "gender":
        setGender(event.target.value);
        break;
      case "newPass":
        setNewPass(event.target.value);
        break;

      default:
        break;
    }
  };

  const handelCreate = (event) => {
    event.preventDefault();
    const data = {
      password: passWord,
      gender: gender,
      firstName: firstName,
      lastName: lastName,
      email: email,
      birthday: birthDay,
      phoneNumber: phoneNumber,
    };
    if (passWord === newPass) {
      axios
        .post(API_URL + "/players", data)
        .then((res) => {
          message.success("Tạo tài khoản thành công");
          navigate("/login");
        })
        .catch((error) => {
          message.error("Vui lòng kiểm tra lại thông tin");
        });
    } else {
      message.error("Mật khẩu xác nhận không đúng");
    }
  };
  return (
    <div className="container">
      <div className="wrapper rounded bg-white">
        <div className="h3">Create New User</div>

        <div className="form">
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
              <input
                placeholder="Last Name"
                type="text"
                className="form-control short-input"
                onChange={handleChange}
                value={lastName ? lastName : ""}
                name="lastName"
                required
              />
            </div>
            <div className="col-md-6 mt-md-0 mt-3">
              <input
                placeholder="First Name"
                type="text"
                className="form-control short-input"
                onChange={handleChange}
                value={firstName ? firstName : ""}
                name="firstName"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
              <label>Date of Birth</label>
              <input
                type="date"
                className="form-control short-input"
                onChange={handleChange}
                ref={dateRef}
                name="birthday"
                required
              />
            </div>
            <div className="col-md-6 mt-md-0 mt-3">
              <label>Gender</label>
              <div
                className="d-flex align-items-center mt-2"
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                <label className="option">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={handleChange}
                  />
                  Male
                  <span className="checkmark"></span>
                </label>
                <label className="option ms-4">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={handleChange}
                  />
                  Female
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
              <input
                placeholder="Email"
                type="email"
                className="form-control short-input"
                onChange={handleChange}
                value={email ? email : ""}
                name="email"
                required
              />
            </div>
            <div className="col-md-6 mt-md-0 mt-3">
              <input
                placeholder="Phone Number"
                type="tel"
                className="form-control short-input"
                onChange={handleChange}
                value={phoneNumber ? phoneNumber : ""}
                name="phonenumber"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
              <input
                placeholder="Password"
                type="password"
                className="form-control short-input"
                onChange={handleChange}
                value={passWord ? passWord : ""}
                name="password"
                required
              />
            </div>
            <div className="col-md-6 mt-md-0 mt-3">
              <input
                placeholder="Confirm Password"
                onChange={handleChange}
                value={newPass ? newPass : ""}
                name="newPass"
                type="password"
                className="form-control short-input"
                required
              />
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              className="btn btn-dark btn-lg btn-block mt-3"
              style={{ textAlign: "center" }}
              onClick={handelCreate}
            >
              Register
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
