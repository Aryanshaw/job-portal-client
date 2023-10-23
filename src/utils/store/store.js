import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../reducers/userSlice";
import jobSlice from "../reducers/jobSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
  },
});

export default store;
