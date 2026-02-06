import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLogs = createAsyncThunk(
  "logs/fetchLogs",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate dynamic data on each fetch to show refresh is working
    const baseActivities = [
      { activity: "Car Travel", baseCarbon: 4 },
      { activity: "Electricity Usage", baseCarbon: 6 },
      { activity: "Cycling", baseCarbon: 0 },
      { activity: "Public Transport", baseCarbon: 2 },
      { activity: "Walking", baseCarbon: 0 },
    ];

    // Randomly select 3-5 activities and add some variation to carbon values
    const numActivities = Math.floor(Math.random() * 3) + 3; // 3-5 activities
    const selectedActivities = baseActivities
      .sort(() => Math.random() - 0.5)
      .slice(0, numActivities)
      .map((item, index) => ({
        id: index + 1,
        activity: item.activity,
        carbon: Math.max(0, item.baseCarbon + Math.floor(Math.random() * 3) - 1), // ±1 variation
      }));

    return selectedActivities;
  }
);

const logsSlice = createSlice({
  name: "logs",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default logsSlice.reducer;