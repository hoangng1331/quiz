import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { message, Upload, Button, Image } from "antd";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import moment from "moment";
import { API_URL } from "../../constants/URLS";
import { UploadOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
function Information() {
  const [refresh, setRefresh] = React.useState(0);
  const dateRef = useRef(null);
  const { auth, login } = useAuth((state) => state);
  const [passWord, setpassWord] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [birthDay, setBirthDay] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [gender, setGender] = useState();
  const [players, setPlayers] = useState();
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
      case "phoneNumber":
        setPhoneNumber(event.target.value);
        break;
      case "gender":
        setGender(event.target.value);
        break;

      default:
        break;
    }
  };

  const handelChange = (event) => {
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
    axios
      .patch(API_URL + "/players/" + auth.loggedInUser._id, data)
      .then((res) => {
        const { email, password } = res.data;
        message.success("Success");
        login({ email, password });
      })
      .catch((error) => {
        message.error("Please check the information again!");
      });
  };

  React.useEffect(() => {
    axios.get(`${API_URL}/players/${auth.loggedInUser._id}`).then((res) => {
      setPlayers(res.data);
    });
  }, [refresh, auth]);
  React.useEffect(() => {
    if (auth) {
      const timeout = setTimeout(() => {
        axios.get(`${API_URL}/players/${auth.loggedInUser._id}`).then((res) => {
          setPlayers(res.data);
        });
      }, 1500);
      return () => clearTimeout(timeout);
    }
  });
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ marginTop: 5, marginBottom: 5 }}>
        <Image
          style={{ borderRadius: "50%" }}
          width={80}
          src={
            players?.imageUrl !== undefined
              ? `${API_URL}${players?.imageUrl}`
              : "no-ava.jpg"
          }
        />
      </div>
      <div style={{ marginBottom: -45 }}>
        <ImgCrop rotationSlider>
          <Upload
            showUploadList={false}
            name="file"
            action={
              API_URL + "/upload/players/" + auth.loggedInUser._id + "/image"
            }
            headers={{ authorization: "authorization-text" }}
            onChange={(info) => {
              setRefresh((f) => f + 1);
              if (info.file.status !== "uploading") {
                console.log(info.file, info.fileList);
              }

              if (info.file.status === "done") {
                message.success(`${info.file.name} file uploaded successfully`);

                setRefresh((f) => f + 1);
              } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
              }
              setRefresh((f) => f + 1);
            }}
          >
            <Button>
              <UploadOutlined />
              Update avatar
            </Button>
          </Upload>
        </ImgCrop>
      </div>

      <div className="container-table">
        <div className="wrapper rounded bg-white">
          <div className="h3">Profile</div>

          <div className="form">
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <input
                  disabled
                  placeholder="Last Name"
                  type="text"
                  className="form-control short-input"
                  onChange={handleChange}
                  name="lastName"
                  defaultValue={auth.loggedInUser.lastName}
                  required
                />
              </div>
              <div className="col-md-6 mt-md-0 mt-3">
                <input
                  disabled
                  placeholder="First Name"
                  type="text"
                  className="form-control short-input"
                  onChange={handleChange}
                  name="firstName"
                  defaultValue={auth.loggedInUser.firstName}
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
                  defaultValue={moment(auth.loggedInUser.birthday).format(
                    "YYYY-MM-DD"
                  )}
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
                      defaultChecked={
                        auth.loggedInUser.gender === "Male" ?? false
                      }
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
                      defaultChecked={
                        auth.loggedInUser.gender === "Female" ?? false
                      }
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
                  disabled
                  placeholder="Email"
                  type="email"
                  className="form-control short-input"
                  onChange={handleChange}
                  name="email"
                  defaultValue={auth.loggedInUser.email}
                  required
                />
              </div>
              <div className="col-md-6 mt-md-0 mt-3">
                <input
                  placeholder="Phone Number"
                  type="tel"
                  className="form-control short-input"
                  onChange={handleChange}
                  name="phoneNumber"
                  defaultValue={auth.loggedInUser.phoneNumber}
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
                Save changes
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Information;
