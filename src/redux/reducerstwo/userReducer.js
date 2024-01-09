import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { server } from "../store";
import axios from "axios";

const initialState = {
  user: null,
  isAuthenticated: null,
  message: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  
    // clearError: (state) => {
    //   state.error = null;
    // },
    // clearMessage: (state) => {
    //   state.message = null;
    // },
    // extraReducers: (builder) => {
    //   builder
    //     .addCase(login.pending, (state) => {
    //       state.loading = true;
    //     })
    //     .addCase(login.fulfilled, (state, action) => {
    //       state.loading = false;
    //       state.isAuthenticated = false;
    //       state.error = action.payload;
    //     })
    //     .addCase(login.rejected, (state) => {
    //       state.loading = false;
    //       state.isAuthenticated = false;
    //       state.error = "Invalid Credentials";
    //     });
    // },
  },
});


// export const login = createAsyncThunk(
//   "user/loginUser",
//   async (userCredentials) => {
//     const { data } = await axios.post(`${server}/login`, userCredentials, {
//       headers: {
//         "Content-type": "application/json",
//       },
//       withCredentials: true,
//     });
//   }
// );


// export const { loginRequest, loginSuccess, loginFail } = userReducer.actions;
// export default userSlice.reducer;

  // loginRequest: (state) => {
  //     state.loading = true;
  //   },
  //   loginSuccess: (state, action) => {
  //     state.loading = false;
  //     state.isAuthenticated = true;
  //     state.user = action.payload;
  //     state.message = action.payload;
  //   },
  //   loginFail: (state, action) => {
  //     state.loading = false;
  //     state.isAuthenticated = false;
  //     state.error = action.payload;
  //   },