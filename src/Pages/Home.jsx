import React from "react";
import "../styles/home.css";
import homemaintwo from "../assets/homemaintwo.png";
import { MdOutlineArrowOutward } from "react-icons/md";
import stars from "../assets/stars.gif";
const Home = () => {
  // <section className="homesection">
  //   <div className="container-big">
  //     <div className="even-columns1">

  //     <div className="left">

  // <div className="text">
  //   <h2 className="af">LEARNIFY</h2>
  //   <h2>INNOVATION</h2>
  // </div>
  // <p>
  //   Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
  //   tempore voluptate accusamus vitae veritatis voluptatum!lorem15
  // </p>
  // <button className="home-bt">
  //   Explore
  //   <MdOutlineArrowOutward />
  // </button>
  //     </div>
  //     <div className="right">
  //       <img src={homemaintwo} alt="" />
  //     </div>
  //     </div>
  //   </div>
  // </section>
  return (
    <>
      <div className="home-section">
        <div className="home-container">
          <div className="even-columns-one">
            <div className="left">
              <div className="text">
                <h2 className="h2-after h2">LEARNIFY</h2>
                <h2 className="u">INNOVATION</h2>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
                Lorem ipsum dolor sit amet.
              </p>
              <button className="home-bt">
                Explore
                <MdOutlineArrowOutward />
              </button>
              <img src={stars} alt="" className="stars" />
            </div>
            <div className="right">
              <img src={homemaintwo} alt="" className="homemaintwo" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
