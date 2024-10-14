import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchVPSData = createAsyncThunk(
  "VPSData/fetchVPSData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(import.meta.env.VITE_VPS_MANAGEMENT, {
        withCredentials: true,
      });
      return response.data.VPSPlanData || []; // Ensure we always return an array
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const VPSDetails = createAsyncThunk(
  "VPSData/userDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_VPS_MANAGEMENT}/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateVPS = createAsyncThunk(
  "VPSData/updateVPS",
  async ({ plan, id }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_VPS_MANAGEMENT}/${id}`, { vpsData: plan }, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addVPS = createAsyncThunk(
  "VPSData/addVPS",
  async ({ plan }, { rejectWithValue }) => {
    try {
      const response = await axios.post(import.meta.env.VITE_VPS_MANAGEMENT, { vpsData: plan }, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const HiddenVPSPlan = createAsyncThunk(
  "VPSData/HiddenVPSPlan",
  async ( id , { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_VPS_MANAGEMENT}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const VPSDataSlice = createSlice({
  name: "VPSData",
  initialState: {
    vpsList: [],
    currentVPS: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVPSData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchVPSData.fulfilled, (state, action) => {
        state.vpsList = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchVPSData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.vpsList = [];
      })
      .addCase(VPSDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(VPSDetails.fulfilled, (state, action) => {
        state.currentVPS = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(VPSDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.currentVPS = null;
      })
      .addCase(updateVPS.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateVPS.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update the specific VPS in the list if needed
        const index = state.vpsList.findIndex(vps => vps._id === action.payload._id);
        if (index !== -1) {
          state.vpsList[index] = action.payload;
        }
        state.currentVPS = action.payload;
      })
      .addCase(updateVPS.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addVPS.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addVPS.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vpsList.push(action.payload);
      })
      .addCase(addVPS.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default VPSDataSlice.reducer;