import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import Courses from "./Pages/Courses";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgetPassword from "./Pages/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword";
import Contact from "./Pages/Contact";
import PaymentSuccess from "./Pages/PaymentSuccess";
import PaymentFail from "./Pages/PaymentFail";
import PageNotFound from "./Pages/PageNotFound";
import Subscribe from "./Pages/Subscribe";
import CoursePage from "./Pages/CoursePage";
import Profile from "./Pages/Profile";
import UpdateProfile from "./Pages/UpdateProfile";
import ChangePassword from "./Pages/ChangePassword";
import CreateCourses from "./admin/CreateCourses";
import AdminCourses from "./admin/AdminCourses";
import Users from "./admin/Users";


import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  clearMessage,
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
} from "./redux/reducers/userSlice";
import { server } from "./redux/store";
import { ProtectedRoute } from "protected-route-react";
import Loader from "./components/Loader";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [isLoader, setIsLoader] = useState(false);
  const setLoaderHandle = () => {
    setTimeout(() => setIsLoader(false), 3000);
  };
  useEffect(() => {
    setIsLoader(true);
    window.addEventListener("load", setLoaderHandle);
    setLoaderHandle();
    return () => {
      window.removeEventListener("load", setLoaderHandle);
    };
  }, []);

  const { isAuthenticated, user, loading, error, message } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

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

  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
    if (message) {
      dispatch(clearMessage());
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    loadUser(dispatch);
  }, [dispatch]);

  return isLoader ? (
    <Loader />
  ) : (
    <Router>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar isAuthenticated={isAuthenticated} user={user} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route
              path="/login"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Profile user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/updateprofile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <UpdateProfile user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/changepassword"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/forgetpassword"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <ForgetPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resetpassword/:token"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <ResetPassword />
                </ProtectedRoute>
              }
            />
            <Route path="/paymentsuccess" element={<PaymentSuccess />} />
            <Route path="/paymentfail" element={<PaymentFail />} />
            <Route
              path="/subscribe"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Subscribe user={user} />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<PageNotFound />} />
            <Route
              path="/course/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <CoursePage user={user} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/createcourses"
              element={
                <ProtectedRoute
                  isAdmin={user && user.role === "admin"}
                  isAuthenticated={isAuthenticated}
                  adminRoute={true}
                >
                  <CreateCourses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/admincourses"
              element={
                <ProtectedRoute
                  isAdmin={user && user.role === "admin"}
                  isAuthenticated={isAuthenticated}
                  adminRoute={true}
                >
                  <AdminCourses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute
                  isAdmin={user && user.role === "admin"}
                  isAuthenticated={isAuthenticated}
                  adminRoute={true}
                >
                  <Users />
                </ProtectedRoute>
              }
            />
          </Routes>

          <ToastContainer />
        </>
      )}
    </Router>
  );
};

export default App;
