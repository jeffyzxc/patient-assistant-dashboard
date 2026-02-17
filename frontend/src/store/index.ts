import { configureStore } from "@reduxjs/toolkit";
import patientsReducer from "../features/patient-dashboard/redux/patientsSlice";
import authReducer from "./authSlice";
import aiChatReducer from "../features/patient-dashboard/redux/aiChatSlice";

export const store = configureStore({
  reducer: {
    patients: patientsReducer,
    auth: authReducer,
    aiChat: aiChatReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
