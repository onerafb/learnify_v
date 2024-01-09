import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../redux/store";
import {
  loginRequest,
  loginSuccess,
  loginFail,
} from "../redux/reducers/userSlice";
import axios from "axios";
import { toast } from "react-toastify";

import "../styles/login.css";
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { message } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.user);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginRequest());
      const { data } = await axios.post(
        `${server}/login`,
        { email, password },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(loginSuccess(data));
      toast.success("Logged in Succesfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      dispatch(loginFail("Invalid Credentials"));
      toast.error("Invalid Credentials", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <div className="container flex-column">
      <h2 className="mg-top mg-bt text-align-center">Login</h2>
      {/* <p>{user.name}</p> */}
      <form className="login-form" onSubmit={submitHandler}>
        <input
          type="email"
          onChange={(e) => setemail(e.target.value)}
          placeholder="Enter Email"
          value={email}
          required
        />
        <br />
        <input
          type="password"
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Enter Password"
          value={password}
          required
        />
        <br />

        <button type="submit" disabled={loading} className="btn mg-bt-sm2">
          {loading ? "loading..." : "Login"}
        </button>
        <Link to="/forgetpassword" className="forget-login mg-bt-sm2">
          <button className="btn">Forget Password ?</button>
        </Link>

        <div className="new-here">
          New Here?
          <Link to="/register" className="redirect pdz">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
