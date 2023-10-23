import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  successMessage: "",
  userDetails: [],
  userResume: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadingReducer(state, { payload }) {
      state.loading = payload;
    },
    successReducer(state, { payload }) {
      state.successMessage = payload;
    },
    errorReducer(state, { payload }) {
      state.error = payload;
    },
    getUserData(state, { payload }) {
      state.loading = false;
      state.userDetails = payload;
      localStorage.setItem("userData", JSON.stringify(payload));
    },
    getUserResume(state, { payload }) {
      state.userResume = payload;
    },
  },
});

export const {
  loadingReducer,
  successReducer,
  errorReducer,
  getUserData,
  getUserResume,
} = userSlice.actions;

export const loadingSelector = (state) => state.user.loading;
export const userDetailsSelector = (state) => state.user.userDetails;
export const userResumeSelector = (state) => state.user.userResume;
export const resumeSuccessSelector = (state) => state.user.successMessage

export default userSlice.reducer;
