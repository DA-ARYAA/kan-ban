import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useTaskOperations({
  setData,
  setOpenModal,
  setEditTaskId,
  type,
}) {
  const allTasks = useSelector((state) => state);
  const [todoTask, setTodoTask] = useState([]);
  console.log("allTask from todo app ", allTasks);
  const dispatch = useDispatch();

  const handleDeleteTask = async (id) => {
    await axios.delete(`http://localhost:8000/tasks/${id}`).then(
      (response) => {
        var result = response.data;
        console.log("result for delete is ", result);
      },
      (error) => {
        console.log(error);
      }
    );

    await axios.get("http://localhost:8000/tasks").then(
      (response) => {
        var result = response.data;
        console.log("result for get is ", result);
        dispatch(setData(result, {}));
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleEdit = async (id) => {
    setOpenModal(true);
    setEditTaskId(id);
  };

  useEffect(() => {
    console.log("allTask from todo app ", allTasks);
    setTodoTask([]);
    allTasks.tasks.map((task) => {
      if (task.status === type)
        setTodoTask((prevTodoTasks) => [...prevTodoTasks, task]);
    });
    console.log(todoTask);
  }, [allTasks]);
  return { todoTask, handleEdit, handleDeleteTask };
}
