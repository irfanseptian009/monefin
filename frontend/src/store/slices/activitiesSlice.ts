// src/store/slices/activitiesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Activity {
  activities_no: string;
  subject: string;
  description: string;
  status: string;
}

interface ActivitiesState {
  list: Activity[];
}

const initialState: ActivitiesState = {
  list: [],
};

const activitiesSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    setActivities: (state, action: PayloadAction<Activity[]>) => {
      state.list = action.payload;
    },
    addActivity: (state, action: PayloadAction<Activity>) => {
      state.list.push(action.payload);
    },
    updateActivity: (state, action: PayloadAction<Activity>) => {
      const index = state.list.findIndex(
        (activity) => activity.activities_no === action.payload.activities_no
      );
      if (index !== -1) state.list[index] = action.payload;
    },
    deleteActivity: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(
        (activity) => activity.activities_no !== action.payload
      );
    },
  },
});

export const { setActivities, addActivity, updateActivity, deleteActivity } =
  activitiesSlice.actions;
export default activitiesSlice.reducer;
