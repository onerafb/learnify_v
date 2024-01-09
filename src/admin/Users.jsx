import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import "../styles/user.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { server } from "../redux/store";
import {
  clearError,
  clearMessage,
  deleteUserFail,
  deleteUserRequest,
  deleteUserSuccess,
  getAllUsersFail,
  getAllUsersRequest,
  getAllUsersSuccess,
  updateUserRoleRequest,
  updateUserRoleSuccess,
  updateUsersRoleFail,
} from "../redux/reducers/adminSlice";
import { toast } from "react-toastify";
function Row({ item, updatehandler, deletebuttonhandler, loading }) {
  return (
    <tr>
      <td>{item.name}</td>
      <td>{item._id}</td>
      <td>{item.email}</td>
      <td>{item.role}</td>
      <td>
        {item.subscription && item.subscription.status === "active"
          ? "Active"
          : "Not Active"}
      </td>
      <td>
        <button
          className="user-btn mg-bt-sm3"
          onClick={() => updatehandler(item._id)}
          disabled={loading}
        >
          Change Role
        </button>
        <button
          className="user-btn"
          onClick={() => deletebuttonhandler(item._id)}
          disabled={loading}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
const Users = () => {
  // const users = [
  //   {
  //     _id: "sss",
  //     name: "ss",
  //     email: "ddd",
  //     role: "admin",
  //     subscription: {
  //       status: "activen",
  //     },
  //   },
  //   {
  //     _id: "dsss",
  //     name: "ss",
  //     email: "ddd",
  //     role: "admin",
  //     subscription: {
  //       status: "active",
  //     },
  //   },
  //   {
  //     _id: "dssas",
  //     name: "ss",
  //     email: "ddd",
  //     role: "admin",
  //     subscription: {
  //       status: "active",
  //     },
  //   },
  // ];
  const dispatch = useDispatch();
  const { users, loading, error, message } = useSelector(
    (state) => state.admin
  );
  const updatehandler = async (userId) => {
    try {
      dispatch(updateUserRoleRequest());
      const { data } = await axios.put(
        `${server}/admin/user/${userId}`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(updateUserRoleSuccess("User role updated"));
      toast.success("Role updated", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      dispatch(updateUsersRoleFail("Error"));
      toast.error("Error", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const deletebuttonhandler = async (userId) => {
    try {
      dispatch(deleteUserRequest());
      const { data } = await axios.delete(
        `${server}/admin/user/${userId}`,
        {
          withCredentials: true,
        }
      );
      dispatch(deleteUserSuccess("User deleted"));
      toast.success("User deleted", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      dispatch(deleteUserFail("error"));
      toast.error("Error", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  useEffect(() => {
    async function getUsers() {
      try {
        dispatch(getAllUsersRequest());
        const { data } = await axios.get(`${server}/admin/users`, {
          withCredentials: true,
        });
        dispatch(getAllUsersSuccess(data.users));
      } catch (error) {
        dispatch(getAllUsersFail("USER NOT FETCHED"));
      }
    }
    getUsers();
    if (error) {
      dispatch(clearError());
    }
    if (message) {
      dispatch(clearMessage());
    }
  }, [dispatch, error, message]);
  return (
    <div className="user-container">
      <div className="user-left">
        <div className="user-left-sub">
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Id</th>
                <th>Email</th>
                <th>Role</th>
                <th>Subscription</th>
                <th itemType="">Action</th>
              </tr>
              {users &&
                users.map((item) => (
                  <Row
                    key={item._id}
                    item={item}
                    deletebuttonhandler={deletebuttonhandler}
                    updatehandler={updatehandler}
                    loading={loading}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="user-right">
        <Sidebar />
      </div>
    </div>
  );
};

export default Users;
