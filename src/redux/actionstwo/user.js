// import { server } from "../store";
// import { loginSuccess, loginRequest, loginFail } from "../reducers/userReducer";
// import axios from "axios";

// export const login = (email, password) => async (dispatch) => {
//   try {
//     // dispatch({ type: "loginRequest" });
//     dispatch(loginRequest);
//     const { data } = await axios.post(
//       `${server}/login`,
//       { email, password },
//       {
//         headers: {
//           "Content-type": "application/json",
//         },
//         withCredentials: true,
//       }
//     );

//     // dispatch({ type: "loginSuccess", payload: data });
//     dispatch(loginSuccess);
//   } catch (error) {
//     // dispatch({ type: "loginFail", payload: error.response.data.message });
//     dispatch(loginFail);
//   }
// };
