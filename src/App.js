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

function App() {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/tasks").then(
      (response) => {
        var result = response.data;
        dispatch(setData(result, {}));
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const handleDragEnd = () => {};

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
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
