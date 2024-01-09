import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  courses: [],
  lectures: [],
  message: null,
  loading: false,
  error: false,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    allCoursesRequest: (state) => {
      state.loading = true;
    },
    allCoursesSuccess: (state, action) => {
      state.loading = false;
      state.courses = action.payload;
    },
    allCoursesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addToPlaylistRequest: (state) => {
      state.loading = true;
    },
    addToPlaylistSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addToPlaylistFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeFromPlaylistRequest: (state) => {
      state.loading = true;
    },
    removeFromPlaylistSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    removeFromPlaylistFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getCourseRequest: (state) => {
      state.loading = true;
    },
    getCourseSuccess: (state, action) => {
      state.loading = false;
      state.lectures = action.payload;
    },
    getCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
});
export const {
  allCoursesRequest,
  allCoursesSuccess,
  allCoursesFail,
  addToPlaylistFail,
  addToPlaylistSuccess,
  addToPlaylistRequest,
  removeFromPlaylistRequest,
  removeFromPlaylistSuccess,
  removeFromPlaylistFail,
  getCourseRequest,
  getCourseSuccess,
  getCourseFail,
} = courseSlice.actions;
export default courseSlice.reducer;
