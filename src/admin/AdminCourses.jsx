import React, { useEffect, useState } from "react";
import "../styles/admincourse.css";
import Sidebar from "./Sidebar";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  addLectureFail,
  addLectureRequest,
  addLectureSuccess,
  clearError,
  clearMessage,
  deleteCourseFail,
  deleteCourseRequest,
  deleteCourseSuccess,
  deleteLectureFail,
  deleteLectureRequest,
  deleteLectureSuccess,
} from "../redux/reducers/adminSlice";
import axios from "axios";
import { server } from "../redux/store";
import {
  allCoursesFail,
  allCoursesRequest,
  allCoursesSuccess,
  getCourseFail,
  getCourseRequest,
  getCourseSuccess,
} from "../redux/reducers/courseSlice";
import { toast } from "react-toastify";

function Row({ item, coursedetailshandler, deletebuttonhandler, loading }) {
  return (
    <tr>
      <td>{item._id}</td>
      <td>
        <img src={item.poster.url} className="a-c-img-prev" />
      </td>
      <td>{item.title}</td>
      <td>{item.category}</td>
      <td>{item.createdBy}</td>
      <td>{item.views}</td>
      <td>{item.numofVideos}</td>

      <td>
        <button
          className="a-c-bt mg-bt-sm3"
          onClick={() => coursedetailshandler(item._id, item.title)}
        >
          View Lectures
        </button>
        <button
          className="a-c-bt"
          onClick={() => deletebuttonhandler(item._id)}
          disabled={loading}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

const AdminCourses = () => {
  const [modal, setmodal] = useState(false);
  const [courseId, setcourseId] = useState("");
  const [coursetitle, setcoursetitle] = useState("");

  const { courses, lectures } = useSelector((state) => state.course);
  const { error, message, loading } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  //function

  const close = () => {
    setmodal(false);
  };

  const coursedetailshandler = async (courseId, title) => {
    try {
      dispatch(getCourseRequest());
      const { data } = await axios.get(`${server}/course/${courseId}`, {
        withCredentials: true,
      });
      dispatch(getCourseSuccess(data.lectures));
    } catch (error) {
      dispatch(getCourseFail("lectures not fetched"));
    }

    setmodal(true);
    setcourseId(courseId);
    setcoursetitle(title);
  };

  const deletebuttonhandler = async (courseId) => {
    try {
      dispatch(deleteCourseRequest());
      const { data } = await axios.delete(`${server}/course/${courseId}`, {
        withCredentials: true,
      });
      dispatch(deleteCourseSuccess("course deleted successfully"));
      toast.success("Course deleted successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      dispatch(deleteCourseFail("Course not deleted"));
      toast.error("Course not deleted", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const deletelecturehandler = async (courseId, lectureId) => {
    try {
      dispatch(deleteLectureRequest());
      const { data } = await axios.delete(
        `${server}/lecture?courseId=${courseId}&lectureId=${lectureId}`,
        {
          withCredentials: true,
        }
      );
      dispatch(deleteLectureSuccess("Lecture deleted"));
      toast.success("Lecture deleted", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      dispatch(deleteLectureFail("Delete lecture fail"));
      toast.error("Delete lecture fail", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    try {
      dispatch(getCourseRequest());
      const { data } = await axios.get(`${server}/course/${courseId}`, {
        withCredentials: true,
      });
      dispatch(getCourseSuccess(data.lectures));
    } catch (error) {
      dispatch(getCourseFail("Lectures not fetched"));
    }
  };

  const addlecturehandler = async (e, courseId, title, description, video) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);
    try {
      dispatch(addLectureRequest());
      const { data } = await axios.post(
        `${server}/course/${courseId}`,
        myForm,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      dispatch(addLectureSuccess("Lecture added"));
      toast.success("Lecture added", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      dispatch(addLectureFail("Lecture not added"));
      toast.error("Lecture not added", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    try {
      dispatch(getCourseRequest());
      const { data } = await axios.get(`${server}/course/${courseId}`, {
        withCredentials: true,
      });
      dispatch(getCourseSuccess(data.lectures));
    } catch (error) {
      dispatch(getCourseFail("Lectures not fetched"));
    }
  };

  //sample array
  // const courses = [
  //   {
  //     _id: "ssds",
  //     title: "course",
  //     category: "web dev",
  //     poster: {
  //       url: "https://images.unsplash.com/photo-1614174124242-4b3656523295?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
  //     },
  //     createdby: "a",
  //     views: 444444,
  //     numofvideos: 878,
  //   },
  // ];

  useEffect(() => {
    if (error) {
      // toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      // toast.success(message);
      dispatch(clearMessage());
    }
    async function getCourses() {
      try {
        dispatch(allCoursesRequest());
        const { data } = await axios.get(`${server}/courses`);
        dispatch(allCoursesSuccess(data.courses));
      } catch (error) {
        dispatch(allCoursesFail("Courses load fail"));
      }
    }
    getCourses();
  }, [dispatch, error, message]);
  return (
    <>
      <div className="admin-course-container">
        <div className="left-admin-course">
          <div className="left-admin-course-sub">
            <table>
              <tbody>
                <tr>
                  <th>Id</th>
                  <th>Poster</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Creator</th>
                  <th>Views</th>
                  <th>Lectures</th>
                  <th>Action</th>
                </tr>

                {courses.map((item) => (
                  <Row
                    key={item._id}
                    item={item}
                    deletebuttonhandler={deletebuttonhandler}
                    coursedetailshandler={coursedetailshandler}
                    loading={loading}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="right-admin-course">
          <Sidebar />
        </div>
      </div>
      {modal && (
        <Modal
          close={close}
          id={courseId}
          coursetitle={coursetitle}
          addlecturehandler={addlecturehandler}
          deletebuttonhandler={deletelecturehandler}
          lectures={lectures}
          loading={loading}
        />
      )}
    </>
  );
};

export default AdminCourses;
