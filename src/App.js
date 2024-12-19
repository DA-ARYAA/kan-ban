import { DragDropContext } from "react-beautiful-dnd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import AddTask from "./components/AddTask";
import Done from "./components/Done";
import InProgress from "./components/InProgress";
import ToDo from "./components/ToDo";
import { setData } from "./store/taskSlice";
import { useSelector } from "react-redux";
import { getAllTasks } from "./utils/TaskApis";

function App() {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const tasks = useSelector((state) => state.tasks);

  const callGetAllTasks = async () => {
    const result = await getAllTasks();
    dispatch(setData(result, {}));
  };

  useEffect(() => {
    callGetAllTasks();
  }, []);

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    // making change on frontend
    let todoTasks = [],
      inProgressTasks = [],
      doneTasks = [],
      draggingTask = {};

    tasks.map((task) => {
      if (task.id === draggableId) draggingTask = { ...task };
      if (task.status === "to_do") todoTasks.push(task);
      else if (task.status === "in_progress") inProgressTasks.push(task);
      else doneTasks.push(task);
    });

    const pairs = {
      todo: todoTasks,
      inprogress: inProgressTasks,
      done: doneTasks,
    };
    const status = {
      todo: "to_do",
      inprogress: "in_progress",
      done: "done",
    };
    draggingTask.status = status[destination.droppableId];
    if (source.droppableId === destination.droppableId) {
      // dropping into same column
      const start = pairs[source.droppableId];
      const from = source.index;
      const to = destination.index;
      const removedElement = start.splice(from, 1)[0];
      start.splice(to, 0, removedElement);
    } else {
      //  dropping into different column
      const start = pairs[source.droppableId];
      const finish = pairs[destination.droppableId];
      finish.splice(destination.index, 0, draggingTask);
      start.splice(source.index, 1);
    }
    dispatch(setData([], {}));
    dispatch(setData([...todoTasks, ...inProgressTasks, ...doneTasks], {}));
    // making changes in the backend by calling api
    // need to update the data by using put api

    await axios
      .put(`http://localhost:8000/tasks/${draggableId}`, draggingTask)
      .then(
        (response) => {
          var result = response.data;
        },
        (error) => {
          // console.log(error);
        }
      );
  };

  useEffect(() => {}, [tasks]);

  return (
    <DragDropContext onDragEnd={handleDragEnd} isCombineEnabled={false}>
      <div className="mt-5">
        <AddTask
          openModal={openModal}
          setOpenModal={setOpenModal}
          editTaskId={editTaskId}
          setEditTaskId={setEditTaskId}
        />
        <div className="columns-3xs m-5 flex min-h-[500px] gap-2">
          <ToDo
            openModal={openModal}
            setOpenModal={setOpenModal}
            setEditTaskId={setEditTaskId}
          />
          <InProgress
            openModal={openModal}
            setOpenModal={setOpenModal}
            setEditTaskId={setEditTaskId}
          />
          <Done
            openModal={openModal}
            setOpenModal={setOpenModal}
            setEditTaskId={setEditTaskId}
          />
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
