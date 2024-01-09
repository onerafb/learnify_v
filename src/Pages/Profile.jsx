import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import one from "../assets/one.jpg";
import "../styles/profile.css";
import axios from "axios";
import { server } from "../redux/store";
import {
  removeFromPlaylistFail,
  removeFromPlaylistRequest,
  removeFromPlaylistSuccess,
} from "../redux/reducers/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelSubscriptionFail,
  cancelSubscriptionRequest,
  cancelSubscriptionSuccess,
  clearError,
  clearMessage,
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
} from "../redux/reducers/userSlice";
import { toast } from "react-toastify";

// import { useSelector } from "react-redux";
const Profile = ({ user }) => {
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.course);
  const {
    message: subscriptionMessage,
    error: subscriptionError,
    loading: subloading,
  } = useSelector((state) => state.subscription);
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

  const removeFromPlaylistHandler = async (id) => {
    try {
      dispatch(removeFromPlaylistRequest());
      const { data } = await axios.delete(
        `${server}/removefromplaylist?id=${id}`,

        {
          withCredentials: true,
        }
      );
      dispatch(removeFromPlaylistSuccess("Removed from playlist"));
      toast.success("Removed from playlist", {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        loadUser(dispatch);
      }, 2000);
    } catch (error) {
      dispatch(removeFromPlaylistFail("Something went wrong"));
      toast.error("Remove went wrong", {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        loadUser(dispatch);
      }, 2000);
    }
  };

  const cancelSubsHandler = async () => {
    try {
      dispatch(cancelSubscriptionRequest());
      const { data } = await axios.delete(`${server}/subscribe/cancel`, {
        withCredentials: true,
      });

      dispatch(cancelSubscriptionSuccess("Subscription Cancelled"));
      toast.success("Subscription Cancelled", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      setTimeout(() => {
        loadUser(dispatch);
      }, 4000);
    } catch (error) {
      dispatch(cancelSubscriptionFail("Cancellation failed"));
      toast.error("Cancellation failed", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
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
    if (subscriptionError) {
      dispatch(clearError());
    }
    if (subscriptionMessage) {
      dispatch(clearMessage());
    }
  }, [dispatch, error, message, subscriptionError, subscriptionMessage]);
  // const { user } = useSelector((state) => state.user);
  //array of object
  // const user = {
  //   name: "User",
  //   email: "a@g.com",
  //   createdAt: String(new Date().toISOString()),
  //   role: "user",
  //   subscription: {
  //     status: "active",
  //   },
  //   playlist: [
  //     {
  //       course: "ss",
  //       poster:
  //         "https://images.unsplash.com/photo-1614174124242-4b3656523295?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
  //     },
  //     {
  //       course: "ffs",
  //       poster:
  //         "https://images.unsplash.com/photo-1614174124242-4b3656523295?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
  //     },
  //     {
  //       course: "ffs",
  //       poster:
  //         "https://images.unsplash.com/photo-1614174124242-4b3656523295?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
  //     },
  //     {
  //       course: "ffs",
  //       poster:
  //         "https://images.unsplash.com/photo-1614174124242-4b3656523295?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
  //     },
  //     {
  //       course: "ffs",
  //       poster:
  //         "https://images.unsplash.com/photo-1614174124242-4b3656523295?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
  //     },
  //     {
  //       course: "ffs",
  //       poster:
  //         "https://images.unsplash.com/photo-1614174124242-4b3656523295?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
  //     },
  //     {
  //       course: "ffs",
  //       poster:
  //         "https://images.unsplash.com/photo-1614174124242-4b3656523295?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
  //     },
  //   ],
  // };
  return (
    <div className="container">
      <h2 className="mg-top mg-bt text-align-center">Profile</h2>
      <div className="even-columns-profile">
        <div className="profile-img">
          <img src={user.avatar.url || one} alt="" />
        </div>

        <div className="user-info">
          <div className="user-info-div-one">
            <p className="profile-user-info-p-one">Name -</p>
            <p className="profile-user-info-p-two">{user.name}</p>
          </div>
          <div className="user-info-div-two">
            <p className="profile-user-info-p-one">Email -</p>
            <p className="profile-user-info-p-two">{user.email}</p>
          </div>
          <div className="user-info-div-three">
            <p className="profile-user-info-p-one">CreationTime -</p>
            <p className="profile-user-info-p-two">
              {user.createdAt.split("T")[0]}
            </p>
          </div>

          {user.role != "admin" && (
            <div className="user-info-div-four">
              <p className="profile-user-info-p-one">Subscription -</p>

              <p>
                {user.subscription && user.subscription.status === "active" ? (
                  <button
                    disabled={subloading}
                    className="btn"
                    onClick={cancelSubsHandler}
                  >
                    {subloading ? "loading" : "Cancel Sub"}
                  </button>
                ) : (
                  <Link to="/subscribe" className="no-border-bottom-link">
                    <button className="btn">Subscribe</button>
                  </Link>
                )}
              </p>
            </div>
          )}
          <div className="user-info-div-five">
            <Link to="/updateprofile" className="no-border-bottom-link ">
              <button className="btn">UpdateProfile</button>
            </Link>
            <Link to="/changepassword" className="no-border-bottom-link">
              <button className="btn">ChangePassword</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="profile-playlist-div">
        <h2 className="mg-top mg-bt">Playlist</h2>
        {user.playlist.length > 0 && (
          <div className="profile-playlist-div-sub">
            {user.playlist.map((element, index) => (
              <div className="profile-playlist-div-sub-child" key={index}>
                <img
                  src={user.playlist[0].poster}
                  alt=""
                  className="watchlater-poster"
                />
                {/* <Link to={`/course/${element.course}`}> */}
                <div className="profile-row">
                  <Link
                    to={`/course/${element.course}`}
                    className="course-link-reactdom"
                  >
                    <button className="course-link-button">Watch Now</button>
                  </Link>
                  <button
                    onClick={() => removeFromPlaylistHandler(element.course)}
                    className="btn"
                  >
                    delete video
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="invisible-div">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias pariatur
        molestias autem, asperiores excepturi laborum labore iste quasi velit
        dicta doloribus, natus amet sed nostrum vel, officiis voluptas et
        recusandae.
      </div>
    </div>
  );
};

export default Profile;
