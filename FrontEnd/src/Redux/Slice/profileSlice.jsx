import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// جلب بيانات الملف الشخصي
export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async () => {
    const response = await axios.get(import.meta.env.VITE_USER_DATA, {
      withCredentials: true,
    });
    return response.data;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    status: "idle", // تحديد الحالة الافتراضية كـ "idle"
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading"; // تغيير الحالة إلى "loading"
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload; // تخزين بيانات المستخدم
        state.status = "succeeded"; // تغيير الحالة إلى "succeeded"
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        console.error("Error fetching user profile:", action.error.message);
        state.status = "failed"; // تغيير الحالة إلى "failed"
      });
  },
});

export default profileSlice.reducer;
