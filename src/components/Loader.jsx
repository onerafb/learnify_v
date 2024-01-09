import React from "react";
import "../styles/loader.css";
import finalloader from "../assets/finalloader.gif";
const Loader = () => {
  return (
    <div className="Loader">
      <div className="loader-con">
        <img src={finalloader} alt="" />
      </div>
    </div>
  );
};

export default Loader;
