import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import activitiesReducer from "./slices/activitiesSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    activities: activitiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
