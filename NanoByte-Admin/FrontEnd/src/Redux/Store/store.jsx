import { configureStore } from "@reduxjs/toolkit";
import usersDataReducer from '../Slice/usersData';
import VPSManagementSlice from "../Slice/VPSManagementSlice";
const store = configureStore({
  reducer: {
    UserData: usersDataReducer,
    VPSData: VPSManagementSlice,
  },
});

export default store;
