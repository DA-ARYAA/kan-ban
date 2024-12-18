import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./store/taskSlice";

export default configureStore({
  reducer: {
    tasks: taskReducer,
  },
});
