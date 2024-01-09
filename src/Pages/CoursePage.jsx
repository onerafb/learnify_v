import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { server } from "../redux/store";
// import test from "../assets/TEST.mp4";
import "../styles/coursepage.css";
import axios from "axios";
import Loader from "../components/Loader";
import {
  getCourseFail,
  getCourseRequest,
  getCourseSuccess,
} from "../redux/reducers/courseSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
const CoursePage = ({ user }) => {
  const [lectureNumber, setlecturenumber] = useState(0);
  const { lectures, loading } = useSelector((state) => state.course);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  // const lectures = [
  //   {
  //     _id: "xxx",
  //     title: "sample",
  //     description: "sample description",
  //     video: {
  //       url: "video url",
  //     },
  //   },
  //   {
  //     _id: "xxx2",
  //     title: "sample2",
  //     description: "sample description2",
  //     video: {
  //       url: "video url",
  //     },
  //   },
  //   {
  //     _id: "xxx3",
  //     title: "sample3",
  //     description: "sample description3",
  //     video: {
  //       url: "video url",
  //     },
  //   },
  // ];

  useEffect(() => {
    async function getLectures() {
      try {
        dispatch(getCourseRequest());
        const { data } = await axios.get(`${server}/course/${params.id}`, {
          withCredentials: true,
        });
        dispatch(getCourseSuccess(data.lectures));
      } catch (error) {
        dispatch(getCourseFail(""));
        toast.error("Subscription unactive", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
    getLectures();
  }, [dispatch, params.id]);

  useEffect(() => {
    if (
      user.role !== "admin" &&
      (user.subscription === undefined || user.subscription.status !== "active")
    ) {
      return navigate("/subscribe");
    }
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div className="container-big">
      {lectures && lectures.length > 0 ? (
        <>
          <div className="container-big-sub">
            <video
              src={lectures[lectureNumber].video.url}
              type="video/mp4"
              controlsList="nodownload noremoteplayback"
              controls={["PlayPause", "Seek", "Time", "Volume", "Fullscreen"]}
              disablePictureInPicture
              disableRemotePlayback
              className="c-p-vid"
            ></video>

            <div className="coursepage-sidediv">
              {lectures.map((element, index) => (
                <button
                  key={element._id}
                  onClick={() => setlecturenumber(index)}
                  className="coursepage-btn"
                >
                  <p className="coursepage-p">
                    {index + 1}
                    {`)`} {element.title}
                  </p>
                </button>
              ))}
            </div>
            <div className="coursepage-sidediv3">
              <h2>
                <span>#{`${lectureNumber + 1}`}</span>
                <br />
                {`  ${lectures[lectureNumber].title}  `}
              </h2>
              <h3 className="c-p-h3">Description</h3>
              <p>{`  ${lectures[lectureNumber].description}  `}</p>
            </div>
          </div>
        </>
      ) : (
        <h2>No Lectures</h2>
      )}
    </div>
  );
};

export default CoursePage;
