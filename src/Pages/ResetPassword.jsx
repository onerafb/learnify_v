import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../styles/resetpass.css";

import {
  clearError,
  clearMessage,
  resetPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
} from "../redux/reducers/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../redux/store";
import { useSelector } from "react-redux";
const ResetPassword = () => {
  const [password, setpassword] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const token = params.token;

  const { loading } = useSelector((state) => state.profile);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(resetPasswordRequest());
      const { data } = await axios.put(
        `${server}/resetpassword/${token}`,
        {
          token,
          password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(resetPasswordSuccess("Password Changed"));
      navigate("/login");
      toast.success("Password Changed", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      dispatch(resetPasswordFail("Password reset failed"));
      toast.error("Password reset failed", {
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
      <h2 className="mg-top mg-bt text-align-center">Reset Password</h2>
      <form className="reset-form" onSubmit={submitHandler}>
        <input
          type="password"
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Enter new password"
          value={password}
          className="reset-input"
          required
        />
        <br />
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "loading" : " Update Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
