import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../styles/forgetpass.css";
import { useDispatch, useSelector } from "react-redux";

import {
  clearError,
  clearMessage,
  forgetPasswordFail,
  forgetPasswordRequest,
  forgetPasswordSuccess,
} from "../redux/reducers/userSlice";
import axios from "axios";
import { server } from "../redux/store";
const ForgetPassword = () => {
  const [email, setemail] = useState("");
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.profile);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(forgetPasswordRequest());
      const { data } = await axios.post(
        `${server}/forgetpassword`,
        {
          email,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(forgetPasswordSuccess("Email Sent"));
      toast.success("Email Sent", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      dispatch(forgetPasswordFail("Email Not Sent"));
      toast.error("Email Not Sent", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
    if (message) {
      dispatch(clearMessage());
    }
  }, [dispatch, error, message]);
  return (
    <div className="container flex-column">
      <h2 className="mg-top mg-bt text-align-center">ForgetPassword</h2>
      <form className="forget-form" onSubmit={submitHandler}>
        <input
          type="email"
          onChange={(e) => setemail(e.target.value)}
          placeholder="Enter Email"
          value={email}
          className="forget-input"
          required
        />
        <br />
        <button type="submit" className="btn">
          {loading ? "loading" : "Send reset link"}
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
