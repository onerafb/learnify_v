import React, { useState } from "react";
import { Link } from "react-router-dom";
import usericon from "../assets/usericon.png";
import "../styles/register.css";
import axios from "axios";
import { server } from "../redux/store";
import {
  registerRequest,
  registerSuccess,
  registerFail,
} from "../redux/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [imagePrev, setimagePrev] = useState("");
  const [image, setimage] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  //function
  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setimagePrev(reader.result);
      setimage(file);
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("file", image);
    try {
      dispatch(registerRequest());
      const { data } = await axios.post(`${server}/register`, myForm, {
        headers: {
          "Content-type": "multipart/formdata",
        },
        withCredentials: true,
      });

      dispatch(registerSuccess(data));
      toast.success("Registration Succesfull", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      dispatch(registerFail("Registration failed"));
      toast.error("Registration failed", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <div className="container flex-column">
      <h2 className="mg-top mg-bt text-align-center">Register</h2>
      <form onSubmit={submitHandler}>
        <div className="reg-img">
          <img src={imagePrev || usericon} alt="" />
        </div>
        <input
          type="text"
          onChange={(e) => setname(e.target.value)}
          placeholder="Enter Name"
          value={name}
          className="register-input"
          required
        />
        <br />

        <input
          type="email"
          onChange={(e) => setemail(e.target.value)}
          placeholder="Enter Email"
          value={email}
          className="register-input"
          required
        />
        <br />

        <input
          type="password"
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Enter Password"
          value={password}
          className="register-input"
          required
        />
        <br />

        <div className="avatar-div">
          <label htmlFor="avatar" className="label mg-bt-sm3">
            Choose Avatar
          </label>
          <input
            type="file"
            accept="image/*"
            className="choose"
            onChange={changeImageHandler}
            required
          />
        </div>

        <button type="submit" disabled={loading} className="btn mg-bt-sm2">
          {loading ? "loading..." : "Sign-up"}
        </button>

        <div className="new-here">
          Already a user?
          <Link to="/login" className="redirect pdz">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
