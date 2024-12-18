import { createSlice } from "@reduxjs/toolkit";
// import tasks from "../../data/db.json";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    increment: (state) => {
      console.log("state is , ", state);
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
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
export const { increment, decrement, incrementByAmount, addTask, setData } =
  taskSlice.actions;

export default taskSlice.reducer;
