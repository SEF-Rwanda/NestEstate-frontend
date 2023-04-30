import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import propertyReducer from "./property/propertySlice";
import chatSlice from "./chat/chatSlice";
import messageSlice from "./message/MessageSlice";
import preferenceSlice from "./preference/preferenceSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    property: propertyReducer,
    chat: chatSlice,
    message: messageSlice,
    preference: preferenceSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
