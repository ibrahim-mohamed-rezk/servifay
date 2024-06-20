import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth/authSlice'
import servicesSlice from "./slices/services/servicesSlice";
import filtersSlice from "./slices/services/filtersSlice";
import serviceCardsSlice from "./slices/services/serviceCardsSlice";
import profileSlice from "./slices/profile/profileSlice";
import langSlice from "./slices/lang/langSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: servicesSlice,
    filters: filtersSlice,
    serviceCard: serviceCardsSlice,
    profile: profileSlice,
    lang: langSlice,
  },
});