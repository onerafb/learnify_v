import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="mg-top  text-align-center">Navigation</h2>

      <NavLink to="/admin/createcourses" className="sidebarlink">
        Create Course
      </NavLink>
      <NavLink to="/admin/admincourses" className="sidebarlink">
        Courses
      </NavLink>
      <NavLink to="/admin/users" className="sidebarlink">
        Users
      </NavLink>
    </div>
  );
};

export default Sidebar;
