import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import propertyReducer from "./property/propertySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    property: propertyReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
