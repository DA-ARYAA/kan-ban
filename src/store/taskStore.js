import { createStore } from "redux";

export default () => {
  const store = createStore((state = { tasks: [] }, action) => {
    // console.log({ state, action });
    // switch (action.type) {
    //   case "to_do":
    //     return { counter: state.counter + 1 };
    //   case "in_progress":
    //     return { counter: state.counter - 1 };
    //   case "done":
    //     return { counter: state.counter - 1 };
    //   default:
    //     return state;
    // }
  });
  console.log(store.getState());
  return store;
};
