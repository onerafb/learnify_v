import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  message: null,
  loading: false,
  error: false,
};

const otherSlice = createSlice({
  name: "other",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    contactRequest: (state) => {
      state.loading = true;
    },
    contactSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    contactFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    courseRequestRequest: (state) => {
      state.loading = true;
    },
    courseRequestSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    courseRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const {
  contactRequest,
  contactSuccess,
  contactFail,
  courseRequestRequest,
  courseRequestSuccess,
  courseRequestFail,
  clearError,
  clearMessage,
} = otherSlice.actions;
export default otherSlice.reducer;
