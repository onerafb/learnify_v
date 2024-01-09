import React, { useState } from "react";
import "../styles/modal.css";

function Videocard({
  title,
  description,
  num,
  lectureid,
  courseid,
  deletebuttonhandler,
  loading,
}) {
  return (
    <div className="m-v-div">
      <div className="m-v-div-one">
        <h3 className="h-black-h3 mg-bt-sm4 ">{`#${num} ${title}`}</h3>
        <h4 className="modal-h4-dec">Description:</h4>
        <p className="h-black">{description}</p>
      </div>
      <div className="m-v-div-two">
        <button
          className="vc-de-bt btn mg-bt-sm3"
          onClick={() => deletebuttonhandler(courseid, lectureid)}
          disabled={loading}
        >
          {loading ? "loading" : "Delete"}
        </button>
      </div>
    </div>
  );
}

const Modal = ({
  close,
  lectures,
  loading,
  coursetitle,
  id,
  addlecturehandler,
  deletebuttonhandler,
}) => {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [video, setvideo] = useState("");
  const [videoprev, setvideoprev] = useState("");

  const changevideohandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setvideoprev(reader.result);
      setvideo(file);
    };
  };
  const handleclose = () => {
    settitle("");
    setdescription("");
    setvideo("");
    setvideoprev("");
  };
  return (
    <div className="modal-container">
      <div className="modal-left">
        <h2 className="mg-top">{coursetitle}</h2>
        <h3 className="h-black">Lectures</h3>
        {lectures.map((item, i) => (
          <Videocard
            key={i}
            title={item.title}
            description={item.description}
            num={i + 1}
            lectureid={item._id}
            courseid={id}
            deletebuttonhandler={deletebuttonhandler}
            loading={loading}
          />
        ))}
      </div>
      <div className="modal-right">
        <button
          onClick={() => {
            close();
            handleclose();
          }}
          className="modal-close-bt"
        >
          close
        </button>

        <form
          onSubmit={(e) => addlecturehandler(e, id, title, description, video)}
          className="modal-form"
        >
          <input
            type="text"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            placeholder="Title"
            required
            className="modal-input"
          />
          <br />
          <input
            type="text"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            placeholder="Description"
            required
            className="modal-input"
          />
          <br />

          <input
            type="file"
            accept="video/mp4"
            onChange={changevideohandler}
            required
            className="modal-choose"
          />
          <br />

          {videoprev && (
            <div className="video-modal-div">
              <video
                src={videoprev}
                controlsList="nodownload noremoteplayback"
                controls={["PlayPause", "Seek", "Time", "Volume", "Fullscreen"]}
                disablePictureInPicture
                disableRemotePlayback
                className="video-modal"
              ></video>
            </div>
          )}
          <button
            type="submit"
            className="btn"
            disabled={loading}
            // onSubmit={handleclose}
          >
            {loading ? "loading" : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
