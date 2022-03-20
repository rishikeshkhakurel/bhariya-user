import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authentication",
  initialState: {
    role: localStorage.getItem("userRole"),
    sentOtpNumber: null,
    userid: localStorage.getItem("userid"),
    userBulkData: null,
    reFetch: false,
  },
  reducers: {
    changingRole: (state, action) => {
      localStorage.setItem("userRole", action.payload);
      const newState = {
        ...state,
        role: action.payload,
      };
      return newState;
    },
    changingId: (state, action) => {
      localStorage.setItem("userid", action.payload);
      return {
        ...state,
        userid: action.payload,
      };
    },
    changingNumber: (state, action) => {
      return {
        ...state,
        sentOtpNumber: action.payload,
      };
    },
    setuserbulkdata: (state, action) => {
      return {
        ...state,
        userBulkData: action.payload,
      };
    },
    changeRefetch: (state, action) => {
      return {
        ...state,
        reFetch: action,
      };
    },
  },
});
export const { changingRole, changingNumber, changingId, setuserbulkdata } =
  authSlice.actions;
export default authSlice.reducer;
