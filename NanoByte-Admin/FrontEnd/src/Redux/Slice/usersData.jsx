import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all users data
export const fetchUserData = createAsyncThunk(
  "UserData/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL_ADMIN}/api/usersData`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch specific user details by ID
export const userDetails = createAsyncThunk(
  "UserData/userDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL_ADMIN}/api/usersData/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
    "UserData/updateUserProfile",
    async ({ formData , id }, { rejectWithValue }) => {
      try {  
        const response = await axios.put(`${import.meta.env.VITE_API_URL_ADMIN}/api/usersData/${id}`, {Data : formData}, {
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );

const UserDataSlice = createSlice({
  name: "UserData",
  initialState: {
    user: null, // Holds the user data
    status: "idle", // Can be 'idle', 'loading', 'succeeded', or 'failed'
    error: null, // To store any error message
  },
  reducers: {},
  extraReducers: (builder) => {
    // For fetching all user data
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // For fetching specific user details
    builder
      .addCase(userDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(userDetails.fulfilled, (state, action) => {
        state.user = action.payload; // Store the user data from the response
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(userDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default UserDataSlice.reducer;
