import { configureStore } from "@reduxjs/toolkit";
import userReducer, {
  subscriptionSlice,
  profileSlice,
} from "./reducers/userSlice";
import courseReducer from "./reducers/courseSlice";
import adminSlice from "./reducers/adminSlice";
import otherSlice from "./reducers/otherSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer,
    profile: profileSlice.reducer,
    subscription: subscriptionSlice.reducer,
    admin: adminSlice,
    other:otherSlice
  },
});
export default store;
export const server = "https://learnify-vd2o.onrender.com/api/v1";
