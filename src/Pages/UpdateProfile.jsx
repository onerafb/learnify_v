import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/updateprofile.css";
// import {
//   updateProfileFail,
//   updateProfileRequest,
//   updateProfileSuccess,
// } from "../redux/reducers/userSlice";
// import {
//   updateProfileRequest,
//   updateProfileSuccess,
//   updateProfileFail,
// } from "../redux/reducers/profileSlice";
// import { profileActions } from "../redux/reducers/userSlice";
import {
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFail,
} from "../redux/reducers/userSlice";
import {
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
} from "../redux/reducers/userSlice";
import axios from "axios";
import { server } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateProfile = ({ user }) => {
  const [name, setname] = useState(user.name);
  const [email, setemail] = useState(user.email);
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
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateProfileRequest());
      const { data } = await axios.put(
        `${server}/updateprofile`,
        {
          name,
          email,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(updateProfileSuccess("Profile Updated"));
      toast.success("Profile Updated", {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        loadUser(dispatch);
      }, 2000);

      navigate("/profile");
    } catch (error) {
      dispatch(updateProfileFail("Update Profile Fail"));
      toast.error("Update Profile Fail", {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        loadUser(dispatch);
      }, 2000);
    }
  };

  return (
    <div className="container flex-column">
      <h2 className="mg-top mg-bt text-align-center">Update Profile</h2>
      <form className="update-profile-form" onSubmit={submitHandler}>
        <input
          type="text"
          onChange={(e) => setname(e.target.value)}
          placeholder="Enter name"
          value={name}
          className="up-p-input"
          required
        />
        <br />
        <input
          type="text"
          onChange={(e) => setemail(e.target.value)}
          placeholder="Enter email"
          value={email}
          className="up-p-input"
          required
        />
        <br />

        <button type="submit" disabled={loading} className="btn">
          {loading ? "loading..." : "Change"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
