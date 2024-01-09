import React, { useEffect } from "react";
import "../styles/courses.css";
import { useState } from "react";
import { Link } from "react-router-dom";
// import one from "../assets/one.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  addToPlaylistFail,
  addToPlaylistRequest,
  addToPlaylistSuccess,
  allCoursesFail,
  allCoursesRequest,
  allCoursesSuccess,
} from "../redux/reducers/courseSlice";
import { server } from "../redux/store";
import axios from "axios";
import { toast } from "react-toastify";
import {
  clearError,
  clearMessage,
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
} from "../redux/reducers/userSlice";
const Course = ({
  views,
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lectureCount,
}) => {
  return (
    <div className="courses-auto-x">
      <img src={imageSrc} alt="test" className="courses-image" />
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{`Creator - ${creator}`}</p>
      <p>{`Lectures - ${lectureCount}`}</p>
      <p>{`Views - ${views}`}</p>
      <Link to={`/course/${id}`} className="btn mg-rt mg-tp-sm">
        Watch now
      </Link>
      <button onClick={() => addToPlaylistHandler(id)} className="btn mg-tp-sm">
        Add to Playlist
      </button>
    </div>
  );
};

const Courses = () => {
  const [keyword, setkeyword] = useState("");
  const [category, setcategory] = useState("");
  const dispatch = useDispatch();
  const { courses, error, message } = useSelector((state) => state.course);
  const loadCourses = async () => {
    try {
      dispatch(allCoursesRequest());
      const { data } = await axios.get(
        `${server}/courses?keyword=${keyword}&category=${category}`
      );
      dispatch(allCoursesSuccess(data.courses));
    } catch (error) {
      dispatch(allCoursesFail("Failed to Load Courses"));
    }
  };
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

  const addToPlaylistHandler = async (id) => {
    try {
      dispatch(addToPlaylistRequest());
      const { data } = await axios.post(
        `${server}/addtoplaylist`,
        { id },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(addToPlaylistSuccess("Item Added Succesfully"));
      toast.success("Item Added Succesfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        loadUser(dispatch);
      }, 2000);
    } catch (error) {
      dispatch(addToPlaylistFail("Item already exist"));
      toast.error("Item already exist", {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        loadUser(dispatch);
      }, 2000);
    }
  };

  useEffect(() => {
    loadCourses();
    if (error) {
      dispatch(clearError());
    }
    if (message) {
      dispatch(clearMessage());
    }
  }, [category, keyword, error, message]);

  return (
    <div className="container flex-column">
      <h2 className="mg-top mg-bt text-align-center">Courses</h2>
      <input
        type="text"
        value={keyword}
        placeholder="Search a course"
        onChange={(e) => setkeyword(e.target.value)}
        className="course-input mgbt"
      />
      <div className="courses-three">
        {/* <Course
          key={"Hello1"}
          title={"Hello"}
          description={"Hello"}
          views={"Hello"}
          imageSrc={one}
          id={"hello"}
          creator={"Hello"}
          lectureCount={"hello"}
          addToPlaylistHandler={addToPlaylistHandler}
       />*/}
        {courses.length > 0 ? (
          courses.map((item) => (
            <Course
              key={item._id}
              title={item.title}
              description={item.description}
              views={item.views}
              imageSrc={item.poster.url}
              id={item._id}
              creator={item.createdBy}
              lectureCount={item.numofVideos}
              addToPlaylistHandler={addToPlaylistHandler}
            />
          ))
        ) : (
          <h2>Course not found</h2>
        )}
      </div>
    </div>
  );
};

export default Courses;
