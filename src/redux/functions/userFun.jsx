// import axios from "axios";
// import {
//   loadUserRequest,
//   loadUserSuccess,
//   loadUserFail,
// } from "../reducers/userSlice";
// import { useDispatch } from "react-redux";
// import { server } from "../store";

// import React, { useEffect } from "react";

// const userFun = () => {
//   dispatch = useDispatch();
//   const loadUser = async () => {
//     try {
//       dispatch(loadUserRequest());
//       const { data } = await axios.get(`${server}/me`, {
//         withCredentials: true,
//       });

//       dispatch(loadUserSuccess(data.user));
//     } catch (error) {
//       dispatch(loadUserFail("User Not Found"));
//     }
//   };
//   useEffect(() => {
//     loadUser();
//   }, []);
//   return <div></div>;
// };

// export default userFun;
