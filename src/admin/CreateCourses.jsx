import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { server } from "../redux/store";
import "../styles/createcourse.css";
import {
  clearMessage,
  clearError,
  createCourseRequest,
  createCourseSuccess,
  createCourseFail,
} from "../redux/reducers/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
const CreateCourses = () => {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [createdBy, setcreatedby] = useState("");
  const [category, setcategory] = useState("");
  const [image, setimage] = useState("");
  const [imageprev, setimageprev] = useState("");
  const { error, message, loading } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setimageprev(reader.result);
      setimage(file);
    };
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("createdBy", createdBy);
    myForm.append("file", image);
    try {
      dispatch(createCourseRequest());
      const { data } = await axios.post(`${server}/createcourse`, myForm, {
        headers: {
          "Content-type": "multipart/form-data",
        },
        withCredentials: true,
      });
      dispatch(createCourseSuccess("Course Created"));
      toast.success("Course Created", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      dispatch(createCourseFail("Course Creation Failed"));
      toast.error("Course Creation Failed", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const categories = [
    "Web Development",
    "Game Development",
    "Artificial Intelligence",
    "Data Structure",
    "App Development",
    "Data Science",
  ];
  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
    if (message) {
      dispatch(clearMessage());
    }
  }, [dispatch, error, message]);
  return (
    <div className="createCourse-container">
      <div className="create-course-left">
        <form className="create-course-form" onSubmit={submitHandler}>
          <input
            type="text"
            onChange={(e) => settitle(e.target.value)}
            placeholder="Enter Title"
            value={title}
            className="c-courses-input mg-top"
            required
          />
          <br />
          <input
            type="text"
            onChange={(e) => setdescription(e.target.value)}
            placeholder="Enter Description"
            value={description}
            className="c-courses-input"
            required
          />
          <br />

          <input
            type="text"
            onChange={(e) => setcreatedby(e.target.value)}
            placeholder="Creator name"
            value={createdBy}
            className="c-courses-input"
            required
          />
          <br />

          <select
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            className="c-courses-select"
          >
            <option value="">Category</option>
            {categories.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <br />

          <input
            type="file"
            accept="image/*"
            onChange={changeImageHandler}
            className="choose"
          />
          <br />

          {imageprev && (
            <div className="c-courses-img-prev-div">
              <img src={imageprev} className="c-courses-imgprev" />
            </div>
          )}
          <button type="submit" className="btn mg-top" disabled={loading}>
            {loading ? "loading" : "Create"}
          </button>
        </form>
      </div>
      <div className="create-course-right">
        <Sidebar />
      </div>
    </div>
  );
};

export default CreateCourses;
