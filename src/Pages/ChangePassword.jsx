import React, { useState, useEffect } from "react";
import "../styles/changepass.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { server } from "../redux/store";
import {
  changePasswordFail,
  changePasswordRequest,
  changePasswordSuccess,
} from "../redux/reducers/userSlice";
import {
  clearError,
  clearMessage,
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
} from "../redux/reducers/userSlice";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [oldpassword, setoldpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.profile);

  const loadUser = async (dispatch) => {
    try {
      dispatch(loadUserRequest());
      const { data } = await axios.get(`${server}/me`, {
        withCredentials: true,
      });

      dispatch(loadUserSuccess(data.user));
    } catch (error) {
      dispatch(loadUserFail("Not Logged-In"));
      toast.error("Not Logged-In", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const {  message, error } = useSelector((state) => state.user);
  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
    if (message) {
      dispatch(clearMessage());
    }
  }, [dispatch, error, message]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(changePasswordRequest());
      const { data } = await axios.put(
        `${server}/changepassword`,
        {
          oldpassword,
          newpassword,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(changePasswordSuccess("Password Updated"));

      toast.success("Password  Updated", {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        loadUser(dispatch);
      }, 2000);
      navigate("/profile");
    } catch (error) {
      dispatch(changePasswordFail("Password Update Fail"));
      toast.error("Password Update Fail", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <div className="container flex-column">
      <h2 className="mg-top mg-bt text-align-center">ChangePassword</h2>
      <form className="change-pass-form" onSubmit={submitHandler}>
        <input
          type="password"
          onChange={(e) => setoldpassword(e.target.value)}
          placeholder="Enter Current Password"
          value={oldpassword}
          className="ch-pass-input"
          required
        />
        <br />
        <input
          type="password"
          onChange={(e) => setnewpassword(e.target.value)}
          placeholder="Enter New Password"
          value={newpassword}
          className="ch-pass-input"
          required
        />
        <br />

        <button disabled={loading} type="submit" className="btn">
          {loading ? "loading..." : "Change"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
