import { configureStore } from "@reduxjs/toolkit";
import profileReducer from '../Slice/profileSlice';
const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
});

export default store;
