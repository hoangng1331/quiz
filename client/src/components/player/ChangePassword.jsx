import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { message } from "antd";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { API_URL } from "../../constants/URLS";
function ChangePass() {
  const { auth, login } = useAuth((state) => state);
  const [passWord, setpassWord] = useState();
  const [newPassword, setNewPassword] = useState();
  const handleChange = (event) => {
    switch (event.target.name) {
      case "password":
        setpassWord(event.target.value);
        break;
      case "newPassword":
        setNewPassword(event.target.value);
        break;

      default:
        break;
    }
  };

  const handelChange = (event) => {
    event.preventDefault();
    const data = {
      password: passWord,
    };
    if (passWord === newPassword) {
      axios
        .patch(API_URL + "/players/" + auth.loggedInUser._id, data)
        .then((res) => {
          const { username, password } = res.data;
          message.success("Thay đổi thông tin thành công");
          login({ username, password });
          setNewPassword("");
          setpassWord("");
        })
        .catch(() => {
          message.error("Vui lòng kiểm tra lại thông tin");
        });
    } else {
      message.error("Mật khẩu xác nhận không đúng");
    }
  };
  return (
    <div className="container-table">
      <div className="wrapper rounded bg-white">
        <div className="h3">Change Password</div>

        <div className="form">
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
              <input
                placeholder="New Password"
                type="password"
                className="form-control short-input"
                onChange={handleChange}
                value={passWord ? passWord : ""}
                name="password"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
              <input
                placeholder="Confirm New Password"
                value={newPassword ? newPassword : ""}
                onChange={handleChange}
                type="password"
                className="form-control short-input"
                name="newPassword"
                required
              />
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              className="btn btn-dark btn-lg btn-block mt-3"
              style={{ textAlign: "center" }}
              onClick={handelChange}
            >
              Save change
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePass;
