import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { FaBarsProgress } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { FiGitPullRequest } from "react-icons/fi";
import { MdContacts } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { IoBag } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoCallSharp } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import {
  logoutRequest,
  logoutFail,
  logoutSuccess,
} from "../redux/reducers/userSlice";
import "../styles/nav.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { server } from "../redux/store";

const Navbar = ({ isAuthenticated = false, user }) => {
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    setActiveNav("nav");
    try {
      dispatch(logoutRequest());
      const { data } = await axios.get(`${server}/logout`, {
        withCredentials: true,
      });
      dispatch(logoutSuccess("Logged out Succesfully"));
    } catch (error) {
      dispatch(logoutFail("Something went wrong"));
    }
  };

  const [activeNav, setActiveNav] = useState("nav");
  return (
    <header>
      <div className="nav-logo">Learnify.io</div>
      <nav className={activeNav}>
        <ul>
          <li>
            <NavLink to="/" onClick={() => setActiveNav("nav")}>
              <FaHome className="icon" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/courses" onClick={() => setActiveNav("nav")}>
              <IoBag className="icon" />
              All-Course
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={() => setActiveNav("nav")}>
              <IoCallSharp className="icon" />
              Contact
            </NavLink>
          </li>

          {isAuthenticated ? (
            <li className="flex-nav ">
              <NavLink
                to="/profile"
                className="mg-r-15"
                onClick={() => setActiveNav("nav")}
              >
                <CgProfile className="icon" />
                Profile
              </NavLink>
              {user && user.role === "admin" && (
                <NavLink
                  to="/admin/admincourses"
                  className="mg-r-15"
                  onClick={() => setActiveNav("nav")}
                >
                  <MdDashboard className="icon" />
                  Dashboard
                </NavLink>
              )}
              <button className="btn" onClick={logoutHandler}>
                Logout
              </button>
            </li>
          ) : (
            <li className="flex-nav">
              <button className="btn">
                <Link
                  to="/login"
                  className="mg-r-15 white-clr"
                  onClick={() => setActiveNav("nav")}
                >
                  <FaArrowRightToBracket className="icon" />
                  Login
                </Link>
              </button>
              <button className="btn">
                <Link
                  to="/register"
                  className="white-clr"
                  onClick={() => setActiveNav("nav")}
                >
                  <FaArrowRightFromBracket className="icon" />
                  Sign-Up
                </Link>
              </button>
            </li>
          )}
        </ul>
        <div className="close" onClick={() => setActiveNav("nav")}>
          <FaWindowClose className="icon-two" />
        </div>
      </nav>
      <div className="bars" onClick={() => setActiveNav("nav nav-active")}>
        <FaBarsProgress className="icon" />
      </div>
    </header>
  );
};

export default Navbar;
