import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import propertyReducer from "./property/propertySlice";
import chatSlice from "./chat/chatSlice";
import messageSlice from "./message/MessageSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    property: propertyReducer,
    chat: chatSlice,
    message: messageSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
