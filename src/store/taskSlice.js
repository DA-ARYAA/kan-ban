import { createSlice } from "@reduxjs/toolkit";
// import tasks from "../../data/db.json";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      const { payload, type } = action;
      const newTasks = [...state, payload];
      return newTasks;
    },
    setData: (state, action) => {
      const { payload, type } = action;
      const newTasks = [...payload];
      return newTasks;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTask, setData } = taskSlice.actions;

export default taskSlice.reducer;
